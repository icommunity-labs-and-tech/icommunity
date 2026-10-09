import { supabase } from "@/integrations/supabase/client";
import type { Tables, TablesInsert } from "@/integrations/supabase/types";
import type { BlogBlock, BlogKind, BlogLang, BlogPost } from "@/content/blogTypes";

export type BlogPostRow = Tables<"blog_posts">;
/** "scheduled" posts become public automatically once publishAt has passed. */
export type BlogStatus = "draft" | "scheduled" | "published";

export interface AdminBlogPost extends BlogPost {
  id: string;
  status: BlogStatus;
  publishAt: string | null;
  updatedAt: string;
}

type Localized<T> = Record<BlogLang, T>;

const asLocalized = <T,>(value: unknown, empty: T): Localized<T> => {
  const v = (value ?? {}) as Partial<Localized<T>>;
  return { es: v.es ?? empty, en: v.en ?? empty };
};

export const rowToPost = (row: BlogPostRow): AdminBlogPost => ({
  id: row.id,
  slug: row.slug,
  kind: row.kind as BlogKind,
  status: row.status as BlogStatus,
  publishAt: row.publish_at,
  date: row.date,
  readingMinutes: row.reading_minutes,
  coverUrl: row.cover_url,
  title: asLocalized<string>(row.title, ""),
  description: asLocalized<string>(row.description, ""),
  blocks: asLocalized<BlogBlock[]>(row.blocks, []),
  translated: row.translated,
  updatedAt: row.updated_at,
});

export const postToRow = (post: Omit<AdminBlogPost, "id" | "updatedAt">): TablesInsert<"blog_posts"> => ({
  slug: post.slug,
  kind: post.kind,
  status: post.status,
  publish_at: post.status === "scheduled" ? post.publishAt : null,
  date: post.date,
  reading_minutes: post.readingMinutes,
  cover_url: post.coverUrl ?? null,
  title: post.title,
  description: post.description,
  blocks: post.blocks as unknown as TablesInsert<"blog_posts">["blocks"],
  translated: post.translated,
});

/** Display status: a scheduled post whose time has passed is already live. */
export const effectiveStatus = (p: Pick<AdminBlogPost, "status" | "publishAt">): BlogStatus =>
  p.status === "scheduled" && p.publishAt && new Date(p.publishAt) <= new Date() ? "published" : p.status;

export const STATUS_LABEL: Record<BlogStatus, string> = { draft: "Borrador", scheduled: "Programada", published: "Publicada" };

export async function fetchPublishedPosts(): Promise<AdminBlogPost[]> {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .or(`status.eq.published,and(status.eq.scheduled,publish_at.lte.${new Date().toISOString()})`)
    .order("date", { ascending: false });
  if (error) throw error;
  return (data ?? []).map(rowToPost);
}

export async function fetchAllPosts(): Promise<AdminBlogPost[]> {
  const { data, error } = await supabase.from("blog_posts").select("*").order("date", { ascending: false });
  if (error) throw error;
  return (data ?? []).map(rowToPost);
}

export async function fetchPostById(id: string): Promise<AdminBlogPost | null> {
  const { data, error } = await supabase.from("blog_posts").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return data ? rowToPost(data) : null;
}

export const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 90);

export const estimateReadingMinutes = (blocks: BlogBlock[]) => {
  const words = blocks
    .map((b) => (b.type === "list" ? b.items.join(" ") : b.type === "image" ? "" : b.text))
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
};

/** Uploads an image to the private bucket and returns a long-lived signed URL (~10 years). */
export async function uploadBlogImage(file: File): Promise<string> {
  const ext = file.name.split(".").pop()?.toLowerCase().replace(/[^a-z0-9]/g, "") || "jpg";
  const path = `${new Date().toISOString().slice(0, 7)}/${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage.from("blog-images").upload(path, file, { contentType: file.type, upsert: false });
  if (error) throw error;
  const { data, error: signError } = await supabase.storage
    .from("blog-images")
    .createSignedUrl(path, 60 * 60 * 24 * 365 * 10);
  if (signError || !data) throw signError ?? new Error("No se pudo obtener la URL de la imagen");
  return data.signedUrl;
}
