import { Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

// Legacy WordPress content now lives on the news blog with the same paths.
const NEWS_BLOG = "https://noticias.icommunity.io";

const NotFound = () => {
  const location = useLocation();
  const path = location.pathname;
  const stripped = path.length > 1 ? path.replace(/\/+$/, "") : path;
  const isTrailingSlashOfInternal = stripped !== path;

  useEffect(() => {
    // Trailing-slash variants are retried internally first (see below); everything else goes to the blog.
    if (!isTrailingSlashOfInternal) {
      window.location.replace(`${NEWS_BLOG}${path}${location.search}`);
    }
  }, [path, location.search, isTrailingSlashOfInternal]);

  if (isTrailingSlashOfInternal) {
    // e.g. /financiacion/ → /financiacion; if that also doesn't exist, it lands here again without slash and goes to the blog.
    return <Navigate to={`${stripped}${location.search}${location.hash}`} replace />;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <Helmet>
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      <p className="text-muted-foreground">Redirigiendo…</p>
    </div>
  );
};

export default NotFound;
