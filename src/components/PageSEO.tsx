import { Helmet } from "react-helmet-async";

interface PageSEOProps {
  title: string;
  description: string;
  path?: string;
  lang?: string;
}

const BASE_URL = "https://www.icommunity.io";

const PageSEO = ({ title, description, path = "/", lang = "en" }: PageSEOProps) => {
  const canonical = `${BASE_URL}${path}`;
  const fullTitle = title.includes("iCommunity") ? title : `${title} — iCommunity`;

  return (
    <Helmet>
      <html lang={lang} />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
};

export default PageSEO;
