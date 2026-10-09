import { FunctionsHttpError } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import type { BlogBlock, BlogKind } from "@/content/blogTypes";
import { estimateReadingMinutes, postToRow, slugify, uploadBlogImage, type BlogStatus } from "@/lib/blogApi";

export interface AiArticle {
  title: string;
  description: string;
  blocks: BlogBlock[];
}

export interface TrendSource {
  title: string;
  url: string;
  outlet: string;
  summary: string;
}

export interface TrendResult extends TrendSource {
  date: string;
  proposalTitle: string;
  proposalAngle: string;
}

export interface PlanIdea {
  id: string;
  title: string;
  topic: string;
  kind: BlogKind;
  /** Local date-time "YYYY-MM-DDTHH:mm" */
  publishAt: string;
  source?: TrendSource;
}

const invoke = async <T,>(fn: "blog-ai" | "blog-translate", body: Record<string, unknown>, fallback: string): Promise<T> => {
  const { data, error } = await supabase.functions.invoke(fn, { body });
  if (error) {
    const details = error instanceof FunctionsHttpError ? await error.context.json().catch(() => null) : null;
    throw new Error(details?.error ?? fallback);
  }
  return data as T;
};

export const invokeBlogAi = <T,>(body: Record<string, unknown>) => invoke<T>("blog-ai", body, "La IA no ha podido completar la petición");

export const generateArticle = (p: { topic: string; notes?: string; kind: BlogKind; length?: "short" | "medium" | "long"; source?: TrendSource }) =>
  invokeBlogAi<AiArticle>({ action: "article", length: "medium", ...p });

export const generateCoverUrl = async (prompt: string): Promise<string> => {
  const { image, mime } = await invokeBlogAi<{ image: string; mime: string }>({ action: "cover", prompt });
  const bytes = Uint8Array.from(atob(image), (c) => c.charCodeAt(0));
  return uploadBlogImage(new File([bytes], "portada-ia.png", { type: mime }));
};

export const translateArticle = (a: AiArticle) => invoke<AiArticle>("blog-translate", { ...a }, "No se pudo traducir");

const uniqueSlug = (title: string) => `${slugify(title).slice(0, 80).replace(/-+$/, "")}-${Math.random().toString(36).slice(2, 6)}`;

/**
 * Writes a full post with AI (Spanish text, cover, English translation) and saves it.
 * Optional steps that fail are reported as warnings; the post is still saved.
 */
export async function createAiPost(
  idea: Omit<PlanIdea, "id">,
  opts: { status: BlogStatus; cover: boolean; translate: boolean },
): Promise<{ id: string; warnings: string[] }> {
  const warnings: string[] = [];
  const es = await generateArticle({ topic: `${idea.title}. ${idea.topic}`, kind: idea.kind, source: idea.source });
  let coverUrl: string | null = null;
  if (opts.cover) {
    try { coverUrl = await generateCoverUrl(`${es.title}. ${idea.topic}`); } catch (e) { warnings.push(`portada: ${(e as Error).message}`); }
  }
  let en: AiArticle = { title: "", description: "", blocks: [] };
  if (opts.translate) {
    try { en = await translateArticle(es); } catch (e) { warnings.push(`traducción: ${(e as Error).message}`); }
  }
  const publishAt = opts.status === "scheduled" ? new Date(idea.publishAt).toISOString() : null;
  const row = postToRow({
    slug: uniqueSlug(es.title),
    kind: idea.kind,
    status: opts.status,
    publishAt,
    date: idea.publishAt.slice(0, 10),
    readingMinutes: estimateReadingMinutes(es.blocks),
    coverUrl,
    title: { es: es.title, en: en.title },
    description: { es: es.description, en: en.description },
    blocks: { es: es.blocks, en: en.blocks },
    translated: false,
  });
  const { data, error } = await supabase.from("blog_posts").insert(row).select("id").single();
  if (error) throw new Error(`no se pudo guardar (${error.message})`);
  return { id: data.id, warnings };
}

/** Local "YYYY-MM-DDTHH:mm" for datetime-local inputs. */
export const toLocalInput = (d: Date) => {
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}T${p(d.getHours())}:${p(d.getMinutes())}`;
};

/** Spreads n slots over the chosen weekdays starting next week-day occurrence at the given hour. */
export function planDates(count: number, weekdays: number[], perWeek: number, hour: number): string[] {
  const days = [...weekdays].sort((a, b) => a - b).slice(0, Math.max(1, perWeek));
  const out: string[] = [];
  const cursor = new Date();
  cursor.setHours(hour, 0, 0, 0);
  cursor.setDate(cursor.getDate() + 1);
  while (out.length < count) {
    if (days.includes(cursor.getDay())) out.push(toLocalInput(cursor));
    cursor.setDate(cursor.getDate() + 1);
  }
  return out;
}
