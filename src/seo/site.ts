// Single source of truth for the canonical origin and static SEO metadata.
// Used by PageSEO/structuredData (runtime), scripts/generate-sitemap.ts and the
// build-time prerender plugin (scripts/seo-prerender.ts). Keep it dependency-free.

// Canonical host is the apex domain: www.icommunity.io redirects here and
// Search Console traffic is recorded on https://icommunity.io/.
export const SITE_URL = "https://icommunity.io";

export const NEWS_BLOG = "https://noticias.icommunity.io";

export interface StaticRoute {
  path: string;
  title: string;
  description: string;
  h1: string;
  changefreq: "weekly" | "monthly";
  priority: string;
}

// English metadata: crawlers render with an English locale, so the prerendered
// HTML matches what Googlebot sees after hydration.
export const STATIC_ROUTES: StaticRoute[] = [
  {
    path: "/",
    title: "iCommunity | Verifiable Evidence for Audits",
    description:
      "Prove compliance with traceable, timestamped evidence that stands up to audits. Trust infrastructure for regulated industries. Request a demo.",
    h1: "Verifiable evidence and regulatory trust infrastructure for audits",
    changefreq: "weekly",
    priority: "1.0",
  },
  {
    path: "/soluciones",
    title: "Solutions: CertyPass, Privaro and MusicDibs — iCommunity",
    description:
      "Digital product passport, data anonymization for AI and music rights registration, built on iCommunity's verifiable evidence infrastructure.",
    h1: "Solutions: CertyPass (Digital Product Passport), Privaro (AI compliance gateway) and MusicDibs",
    changefreq: "weekly",
    priority: "0.9",
  },
  {
    path: "/partners",
    title: "Partner Program for Integrators — iCommunity",
    description:
      "Join the iCommunity partner ecosystem: technology integrators, certification bodies, SaaS platforms and public administrations.",
    h1: "iCommunity partner program",
    changefreq: "monthly",
    priority: "0.7",
  },
  {
    path: "/empresa",
    title: "About Us: Regulatory Trust Infrastructure — iCommunity",
    description:
      "Meet iCommunity, the Spanish company building verifiable evidence and timestamping infrastructure for regulated industries across Europe.",
    h1: "About iCommunity",
    changefreq: "monthly",
    priority: "0.7",
  },
  {
    path: "/recursos",
    title: "Blockchain Resources & Guides — iCommunity",
    description:
      "Practical guides on blockchain use cases, payment tokenization and real estate tokenization from the iCommunity team.",
    h1: "Resources and guides",
    changefreq: "weekly",
    priority: "0.7",
  },
  {
    path: "/financiacion",
    title: "EU and CDTI Co-funded Projects — iCommunity",
    description:
      "European and national funded projects: PRTR 2025, DATIA, Cervera, NEOTEC and youth employment programs.",
    h1: "EU and CDTI co-funded projects",
    changefreq: "monthly",
    priority: "0.4",
  },
  {
    path: "/legal",
    title: "Legal Notice, Privacy & Cookies — iCommunity",
    description:
      "Legal notice, GDPR-compliant privacy policy and cookie policy of iCommunity Labs & Tech S.L. (Madrid, Spain).",
    h1: "Legal notice, privacy and cookies",
    changefreq: "monthly",
    priority: "0.3",
  },
  {
    path: "/terminos",
    title: "Terms of Service — iCommunity",
    description: "Service conditions of iCommunity Labs & Tech S.L. based on EU regulation (Directive 2011/83/EU, GDPR, DSA).",
    h1: "Terms of service",
    changefreq: "monthly",
    priority: "0.3",
  },
  {
    path: "/reembolsos",
    title: "Refund Policy — iCommunity",
    description: "Refund and withdrawal policy of iCommunity Labs & Tech S.L., compliant with EU consumer law.",
    h1: "Refund policy",
    changefreq: "monthly",
    priority: "0.3",
  },
];

// Legacy WordPress URLs whose topic now lives on the main site: redirect here
// (keeps authority on icommunity.io) instead of sending them to the news blog.
export const LEGACY_INTERNAL_REDIRECTS: Record<string, string> = {
  "/tokenizacion-de-pagos/": "/recursos/tokenizacion-de-pagos",
  "/tokenizacion-de-pagos-mediante-blockchain/": "/recursos/tokenizacion-de-pagos",
  "/en/tokenization-of-payments/": "/recursos/tokenizacion-de-pagos",
  "/en/blockchain-payment-tokenization/": "/recursos/tokenizacion-de-pagos",
  "/tokenizacion-inmobiliaria/": "/recursos/tokenizacion-inmobiliaria",
  "/en/real-estate-tokenization/": "/recursos/tokenizacion-inmobiliaria",
  "/8-casos-de-uso-de-blockchain-con-mayor-potencial/": "/recursos/casos-de-uso-blockchain",
  "/en/8-blockchain-use-cases-with-the-most-potential/": "/recursos/casos-de-uso-blockchain",
  "/sobre-nosotros/": "/empresa",
  "/en/about-us/": "/empresa",
  "/contacto/": "/empresa",
  "/en/contact/": "/empresa",
  "/politica-de-privacidad/": "/legal",
  "/en/privacy-policy/": "/legal",
  "/en/partners/": "/partners",
};

export const canonicalUrl = (path: string) =>
  path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path.replace(/\/+$/, "")}`;
