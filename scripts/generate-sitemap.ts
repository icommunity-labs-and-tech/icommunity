// Runs before `vite dev` and `vite build` (predev/prebuild hooks); writes public/sitemap.xml.
// Routes come from src/seo/site.ts and articles from src/content/articles.ts.

import { writeFileSync } from "fs";
import { resolve } from "path";
import { SITE_URL, STATIC_ROUTES, canonicalUrl } from "../src/seo/site";
import { articles } from "../src/content/articles";
import { loadBlogPosts } from "./loadBlogPosts";

const blogPosts = await loadBlogPosts();

const today = new Date().toISOString().slice(0, 10);

const entries = [
  ...STATIC_ROUTES.map((r) => ({ loc: canonicalUrl(r.path), lastmod: today, changefreq: r.changefreq, priority: r.priority })),
  ...articles.map((a) => ({
    loc: canonicalUrl(`/recursos/${a.slug}`),
    lastmod: a.date,
    changefreq: "monthly",
    priority: "0.6",
  })),
  ...blogPosts.map((p) => ({
    loc: canonicalUrl(`/blog/${p.slug}`),
    lastmod: p.date,
    changefreq: "yearly",
    priority: p.kind === "news" ? "0.4" : "0.6",
  })),
];

const xml = [
  `<?xml version="1.0" encoding="UTF-8"?>`,
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
  ...entries.map(
    (e) =>
      `  <url>\n    <loc>${e.loc}</loc>\n    <lastmod>${e.lastmod}</lastmod>\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority}</priority>\n  </url>`,
  ),
  `</urlset>`,
].join("\n");

writeFileSync(resolve("public/sitemap.xml"), xml);
console.log(`sitemap.xml written for ${SITE_URL} (${entries.length} entries)`);

// RSS 2.0 + Atom feeds (Spanish, newest first) for feed readers and Google.
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const sorted = [...blogPosts].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 50);
const blogUrl = canonicalUrl("/blog");
const updated = sorted[0] ? new Date(sorted[0].date).toISOString() : new Date().toISOString();
const rss = [
  `<?xml version="1.0" encoding="UTF-8"?>`,
  `<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">`,
  `<channel>`,
  `<title>Blog de iCommunity</title>`,
  `<link>${blogUrl}</link>`,
  `<description>Evidencia verificable, trazabilidad y blockchain: artículos, casos de éxito y noticias de iCommunity.</description>`,
  `<language>es-ES</language>`,
  `<atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>`,
  ...sorted.map((p) => {
    const url = canonicalUrl(`/blog/${p.slug}`);
    return `<item><title>${esc(p.title.es)}</title><link>${url}</link><guid isPermaLink="true">${url}</guid><pubDate>${new Date(p.date).toUTCString()}</pubDate><description>${esc(p.description.es)}</description></item>`;
  }),
  `</channel>`,
  `</rss>`,
].join("\n");
const atom = [
  `<?xml version="1.0" encoding="UTF-8"?>`,
  `<feed xmlns="http://www.w3.org/2005/Atom" xml:lang="es-ES">`,
  `<title>Blog de iCommunity</title>`,
  `<id>${blogUrl}</id>`,
  `<link href="${blogUrl}"/>`,
  `<link rel="self" href="${SITE_URL}/atom.xml"/>`,
  `<updated>${updated}</updated>`,
  `<author><name>iCommunity</name></author>`,
  ...sorted.map((p) => {
    const url = canonicalUrl(`/blog/${p.slug}`);
    const d = new Date(p.date).toISOString();
    return `<entry><title>${esc(p.title.es)}</title><link href="${url}"/><id>${url}</id><published>${d}</published><updated>${d}</updated><summary>${esc(p.description.es)}</summary></entry>`;
  }),
  `</feed>`,
].join("\n");
writeFileSync(resolve("public/rss.xml"), rss);
writeFileSync(resolve("public/atom.xml"), atom);
console.log(`rss.xml + atom.xml written (${sorted.length} items)`);
