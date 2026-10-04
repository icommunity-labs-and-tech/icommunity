// Schema.org JSON-LD builders. Organization and WebSite live statically in
// index.html; pages reference them by @id to avoid duplicated entities.

export const BASE_URL = "https://www.icommunity.io";
export const ORG_ID = `${BASE_URL}/#organization`;
export const WEBSITE_ID = `${BASE_URL}/#website`;

export type JsonLd = Record<string, unknown>;

const inLang = (lang: string) => (lang === "es" ? "es-ES" : "en");

export const webPage = (opts: {
  path: string;
  name: string;
  description: string;
  lang: string;
  type?: string;
}): JsonLd => ({
  "@context": "https://schema.org",
  "@type": opts.type ?? "WebPage",
  "@id": `${BASE_URL}${opts.path}#webpage`,
  url: `${BASE_URL}${opts.path}`,
  name: opts.name,
  description: opts.description,
  inLanguage: inLang(opts.lang),
  isPartOf: { "@id": WEBSITE_ID },
  about: { "@id": ORG_ID },
});

export const breadcrumbs = (items: { name: string; path: string }[]): JsonLd => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: item.name,
    item: `${BASE_URL}${item.path}`,
  })),
});

export const articleSchema = (opts: {
  path: string;
  headline: string;
  description: string;
  date: string;
  lang: string;
  section: string;
}): JsonLd => ({
  "@context": "https://schema.org",
  "@type": "Article",
  "@id": `${BASE_URL}${opts.path}#article`,
  mainEntityOfPage: `${BASE_URL}${opts.path}`,
  headline: opts.headline,
  description: opts.description,
  datePublished: opts.date,
  dateModified: opts.date,
  inLanguage: inLang(opts.lang),
  articleSection: opts.section,
  image: `${BASE_URL}/logo.png`,
  author: { "@id": ORG_ID, "@type": "Organization", name: "iCommunity" },
  publisher: { "@id": ORG_ID },
});

export const productList = (
  products: { name: string; description: string; url: string; category: string }[],
): JsonLd => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: products.map((p, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Product",
      name: p.name,
      description: p.description,
      url: p.url,
      category: p.category,
      brand: { "@type": "Brand", name: p.name },
      manufacturer: { "@id": ORG_ID },
    },
  })),
});
