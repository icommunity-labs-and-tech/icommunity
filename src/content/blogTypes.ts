export type BlogLang = "en" | "es";

export type BlogKind = "article" | "case" | "news";

export type BlogBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "image"; url: string; alt: string };

export interface BlogPost {
  slug: string;
  kind: BlogKind;
  /** Original publication date (ISO), kept from the legacy blog. */
  date: string;
  readingMinutes: number;
  /** Optional cover image URL (set from the admin panel). */
  coverUrl?: string | null;
  title: Record<BlogLang, string>;
  description: Record<BlogLang, string>;
  blocks: Record<BlogLang, BlogBlock[]>;
  /** False when only the Spanish original exists (English shows the Spanish text). */
  translated: boolean;
}

export const BLOG_KIND_LABEL: Record<BlogKind, Record<BlogLang, string>> = {
  article: { es: "Artículo", en: "Article" },
  case: { es: "Caso de éxito", en: "Success story" },
  news: { es: "Noticia", en: "News" },
};

/** Plain text of a block, used by search and reading-time estimates. */
export const blockText = (b: BlogBlock): string =>
  b.type === "list" ? b.items.join(" ") : b.type === "image" ? b.alt : b.text;
