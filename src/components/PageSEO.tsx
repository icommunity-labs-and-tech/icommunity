import { Helmet } from "react-helmet-async";
import { BASE_URL, type JsonLd } from "@/lib/structuredData";

interface PageSEOProps {
  title: string;
  description: string;
  path?: string;
  lang?: string;
  ogType?: "website" | "article";
  jsonLd?: JsonLd[];
}

const SUFFIX = " — iCommunity";
const MAX_TITLE = 60;

const PageSEO = ({ title, description, path = "/", lang = "en", ogType = "website", jsonLd = [] }: PageSEOProps) => {
  // Trailing slash only for the root, so every URL has one canonical form.
  const canonical = path === "/" ? `${BASE_URL}/` : `${BASE_URL}${path.replace(/\/+$/, "")}`;
  const fullTitle =
    title.includes("iCommunity") || title.length + SUFFIX.length > MAX_TITLE ? title : `${title}${SUFFIX}`;

  return (
    <Helmet>
      <html lang={lang} />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content={ogType} />
      <meta property="og:locale" content={lang === "es" ? "es_ES" : "en_GB"} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {jsonLd.map((data, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(data)}
        </script>
      ))}
    </Helmet>
  );
};

export default PageSEO;
