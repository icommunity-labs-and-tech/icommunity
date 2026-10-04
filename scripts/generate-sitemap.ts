// Runs before `vite dev` and `vite build` (predev/prebuild hooks); writes public/sitemap.xml.
// Routes come from src/seo/site.ts and articles from src/content/articles.ts.

import { writeFileSync } from "fs";
import { resolve } from "path";
import { SITE_URL, STATIC_ROUTES, canonicalUrl } from "../src/seo/site";
import { articles } from "../src/content/articles";

const today = new Date().toISOString().slice(0, 10);

const entries = [
  ...STATIC_ROUTES.map((r) => ({ loc: canonicalUrl(r.path), lastmod: today, changefreq: r.changefreq, priority: r.priority })),
  ...articles.map((a) => ({
    loc: canonicalUrl(`/recursos/${a.slug}`),
    lastmod: a.date,
    changefreq: "monthly",
    priority: "0.6",
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
