// Vite plugin: after `vite build`, writes static HTML per route into dist/ so
// crawlers that don't execute JS (Bing, GPTBot, ClaudeBot, PerplexityBot, social
// unfurlers) get route-specific <head> and real body content. React replaces
// the #root content on mount (createRoot). JS-enabled browsers show a loading
// indicator instead of flashing the crawler text before React mounts.
//
// - Canonical routes   → dist/<route>/index.html with per-route meta + H1/text/nav
// - Articles           → full article text prerendered
// - Legacy WP URLs     → redirect stubs (meta refresh + canonical) to the new
//                        internal page or to noticias.icommunity.io
import type { Plugin } from "vite";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import {
  SITE_URL,
  NEWS_BLOG,
  STATIC_ROUTES,
  LEGACY_INTERNAL_REDIRECTS,
  canonicalUrl,
} from "../src/seo/site";
import { articles } from "../src/content/articles";
import { loadBlogPosts } from "./loadBlogPosts";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const NAV = `<nav><a href="/">iCommunity</a> · <a href="/soluciones">Solutions</a> · <a href="/partners">Partners</a> · <a href="/recursos">Resources</a> · <a href="/empresa">About</a> · <a href="/blog">Blog</a></nav>`;
const FOOTER_GUIDES = `<footer><a href="/recursos/pasaporte-digital-de-producto-dpp">Digital Product Passport</a> · <a href="/recursos/ai-act-datos-personales-llm">AI Act &amp; personal data</a> · <a href="/recursos/trazabilidad-documental">Document traceability</a> · <a href="/recursos/verifactu-blockchain">Verifactu</a></footer>`;

function setHead(html: string, o: { title: string; description: string; path: string; type?: string; jsonLd?: object[] }) {
  const url = canonicalUrl(o.path);
  const t = esc(o.title);
  const d = esc(o.description);
  let out = html
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${t}</title>`)
    .replace(/<meta name="description"[^>]*>/, `<meta name="description" data-rh="true" content="${d}" />`)
    .replace(/<meta property="og:title"[^>]*>/, `<meta property="og:title" data-rh="true" content="${t}" />`)
    .replace(/<meta name="twitter:title"[^>]*>/, `<meta name="twitter:title" data-rh="true" content="${t}" />`)
    .replace(/<meta property="og:description"[^>]*>/, `<meta property="og:description" data-rh="true" content="${d}" />`)
    .replace(/<meta name="twitter:description"[^>]*>/, `<meta name="twitter:description" data-rh="true" content="${d}" />`)
    .replace(/<meta property="og:url"[^>]*>/, `<meta property="og:url" data-rh="true" content="${url}" />`)
    .replace(/<link rel="canonical"[^>]*>/, `<link rel="canonical" data-rh="true" href="${url}" />`);
  if (o.type) out = out.replace(/<meta property="og:type"[^>]*>/, `<meta property="og:type" data-rh="true" content="${o.type}" />`);
  if (o.jsonLd?.length) {
    const scripts = o.jsonLd.map((j) => `<script type="application/ld+json">${JSON.stringify(j)}</script>`).join("\n");
    out = out.replace("</head>", `${scripts}\n</head>`);
  }
  return out;
}

export function setPrerenderBody(html: string, body: string) {
  // This runs in the head, before any body content can paint. Without JS,
  // the complete crawlable content remains visible and usable.
  const loadingHead = `<script>document.documentElement.classList.add("app-js")</script>
<style>
[data-app-loading]{display:none}
.app-js [data-seo-fallback]{display:none}
.app-js [data-app-loading]{display:grid;place-items:center;min-height:100vh;background:hsl(var(--background,0 0% 100%));color:hsl(var(--primary,225 86% 58%))}
[data-app-loading] span{width:2rem;height:2rem;border:3px solid currentColor;border-right-color:transparent;border-radius:50%;animation:app-loading-spin 1s linear infinite}
@keyframes app-loading-spin{to{transform:rotate(360deg)}}
@media(prefers-reduced-motion:reduce){[data-app-loading] span{animation:none}}
</style>`;
  return html
    .replace("</head>", `${loadingHead}\n</head>`)
    .replace(/<div id="root">[\s\S]*?<\/div>/, `<div id="root"><div data-app-loading role="status" aria-label="Cargando / Loading"><span aria-hidden="true"></span></div><div data-seo-fallback>${NAV}<main>${body}</main>${FOOTER_GUIDES}</div></div>`);
}

function write(dist: string, path: string, html: string) {
  const file = path === "/" ? resolve(dist, "index.html") : resolve(dist, `.${path.replace(/\/+$/, "")}`, "index.html");
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
}

function redirectStub(target: string) {
  const t = esc(target);
  return `<!doctype html><html><head><meta charset="UTF-8" /><title>Redirecting…</title>
<link rel="canonical" href="${t}" /><meta name="robots" content="noindex, follow" />
<meta http-equiv="refresh" content="0; url=${t}" />
<script>location.replace(${JSON.stringify(target)} + location.search + location.hash)</script>
</head><body><p>This page has moved: <a href="${t}">${t}</a></p></body></html>`;
}

export function seoPrerender(): Plugin {
  let outDir = "dist";
  return {
    name: "icommunity-seo-prerender",
    apply: "build",
    configResolved(c) {
      outDir = resolve(c.root, c.build.outDir);
    },
    async closeBundle() {
      const blogPosts = await loadBlogPosts();
      const template = readFileSync(resolve(outDir, "index.html"), "utf8");
      let count = 0;

      for (const r of STATIC_ROUTES) {
        const body =
          `<h1>${esc(r.h1)}</h1><p>${esc(r.description)}</p>` +
          (r.path === "/soluciones"
            ? `<ul><li><a href="https://certypass.com/">CertyPass</a> — <a href="/recursos/pasaporte-digital-de-producto-dpp">Digital Product Passport guide</a></li><li><a href="https://privaro.ai">Privaro</a> — <a href="/recursos/ai-act-datos-personales-llm">AI Act and personal data in LLMs</a></li><li><a href="https://musicdibs.com/">MusicDibs</a></li><li><a href="https://certyfile.com/">CertyFile</a> — <a href="/recursos/trazabilidad-documental">Document traceability</a></li></ul>`
            : "") +
          (r.path === "/" || r.path === "/recursos"
            ? `<ul>${articles.map((a) => `<li><a href="/recursos/${a.slug}">${esc(a.title.en)}</a> — ${esc(a.description.en)}</li>`).join("")}</ul>`
            : "") +
          (r.path === "/blog"
            ? `<ul>${blogPosts.map((p) => `<li><a href="/blog/${p.slug}">${esc(p.title.en)}</a> (${p.date})</li>`).join("")}</ul>`
            : "");
        write(outDir, r.path, setPrerenderBody(setHead(template, r), body));
        count++;
      }

      for (const a of articles) {
        const path = `/recursos/${a.slug}`;
        const body =
          `<article><h1>${esc(a.title.en)}</h1>` +
          a.intro.en.map((p) => `<p>${esc(p)}</p>`).join("") +
          a.sections.en
            .map(
              (s) =>
                `<h2>${esc(s.heading)}</h2>` +
                s.paragraphs.map((p) => `<p>${esc(p)}</p>`).join("") +
                (s.bullets?.length ? `<ul>${s.bullets.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>` : ""),
            )
            .join("") +
          `</article>` +
          (a.product ? `<p><a href="${a.product.url}">${esc(a.product.name)}</a></p>` : "") +
          `<h2>Related guides</h2><ul>` +
          (a.related ?? [])
            .map((slug) => articles.find((x) => x.slug === slug))
            .filter(Boolean)
            .map((x) => `<li><a href="/recursos/${x!.slug}">${esc(x!.title.en)}</a></li>`)
            .join("") +
          `</ul>`;
        const jsonLd = [
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: a.title.en,
            description: a.description.en,
            datePublished: a.date,
            mainEntityOfPage: canonicalUrl(path),
            publisher: { "@id": `${SITE_URL}/#organization` },
          },
        ];
        write(outDir, path, setPrerenderBody(setHead(template, { title: `${a.title.en} — iCommunity`, description: a.description.en, path, type: "article", jsonLd }), body));
        count++;
      }

      for (const p of blogPosts) {
        const path = `/blog/${p.slug}`;
        const l = p.translated ? "en" : "es";
        const body =
          `<article><h1>${esc(p.title[l])}</h1><p><time datetime="${p.date}">${p.date}</time></p>` +
          p.blocks[l]
            .map((b) =>
              b.type === "heading" ? `<h2>${esc(b.text)}</h2>` : b.type === "image" ? `<img src="${esc(b.url)}" alt="${esc(b.alt)}">` : b.type === "list" ? `<ul>${b.items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>` : `<p>${esc(b.text)}</p>`,
            )
            .join("") +
          `</article><p><a href="/blog">Blog</a></p>`;
        const jsonLd = [
          {
            "@context": "https://schema.org",
            "@type": p.kind === "news" ? "NewsArticle" : "Article",
            headline: p.title[l],
            description: p.description[l],
            datePublished: p.date,
            mainEntityOfPage: canonicalUrl(path),
            publisher: { "@id": `${SITE_URL}/#organization` },
          },
        ];
        write(outDir, path, setPrerenderBody(setHead(template, { title: `${p.title[l]} — iCommunity`, description: p.description[l], path, type: "article", jsonLd }), body));
        count++;
      }

      const legacyFile = resolve(__dirname, "legacy-paths.txt");
      const legacy = existsSync(legacyFile)
        ? readFileSync(legacyFile, "utf8").split("\n").map((l) => l.trim()).filter((l) => l.startsWith("/") && l !== "/")
        : [];
      const all = new Set([...legacy, ...Object.keys(LEGACY_INTERNAL_REDIRECTS)]);
      const ownPaths = new Set(STATIC_ROUTES.map((r) => r.path));
      for (const p of all) {
        if (ownPaths.has(p.replace(/\/+$/, ""))) continue;
        const internal = LEGACY_INTERNAL_REDIRECTS[p];
        write(outDir, p, redirectStub(internal ? canonicalUrl(internal) : `${NEWS_BLOG}${p}`));
        count++;
      }
      console.log(`[seo-prerender] ${count} static HTML files written`);
    },
  };
}
