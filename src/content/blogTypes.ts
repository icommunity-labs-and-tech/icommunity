export type BlogLang = "en" | "es";

export type BlogKind = "article" | "case" | "news";

export type BlogBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] };

export interface BlogPost {
  slug: string;
  kind: BlogKind;
  /** Original publication date (ISO), kept from the legacy blog. */
  date: string;
  readingMinutes: number;
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
