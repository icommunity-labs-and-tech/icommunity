// Build-time loader: published blog posts from the database (public read),
// falling back to the bundled seed file when the database is unreachable.
import type { BlogPost } from "../src/content/blogTypes";
import { blogPosts as seed } from "../src/content/blogPosts";

const URL = process.env.VITE_SUPABASE_URL ?? "https://hjhqctxvtfnlnvkeufad.supabase.co";
const KEY =
  process.env.VITE_SUPABASE_PUBLISHABLE_KEY ??
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhqaHFjdHh2dGZubG52a2V1ZmFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI1NDY3MzQsImV4cCI6MjA4ODEyMjczNH0.tCOZueAEXn4MZ76BZY37txMCqr1-D66P8_QTYDY3OUg";

interface Row {
  slug: string;
  kind: BlogPost["kind"];
  date: string;
  reading_minutes: number;
  cover_url: string | null;
  title: BlogPost["title"];
  description: BlogPost["description"];
  blocks: BlogPost["blocks"];
  translated: boolean;
}

export async function loadBlogPosts(): Promise<BlogPost[]> {
  try {
    // Public access only returns scheduled posts whose publish time has passed.
    const res = await fetch(`${URL}/rest/v1/blog_posts?select=*&status=in.(published,scheduled)&order=date.desc`, {
      headers: { apikey: KEY, Authorization: `Bearer ${KEY}` },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const rows = (await res.json()) as Row[];
    if (!rows.length) throw new Error("no rows");
    return rows.map((r) => ({
      slug: r.slug,
      kind: r.kind,
      date: r.date,
      readingMinutes: r.reading_minutes,
      coverUrl: r.cover_url,
      title: r.title,
      description: r.description,
      blocks: r.blocks,
      translated: r.translated,
    }));
  } catch (err) {
    console.warn(`[blog] using bundled posts (${(err as Error).message})`);
    return seed;
  }
}
