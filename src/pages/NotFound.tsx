import { Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { LEGACY_INTERNAL_REDIRECTS, NEWS_BLOG } from "@/seo/site";

// Legacy WordPress content now lives on the news blog with the same paths,
// except topics that were rebuilt on the main site (LEGACY_INTERNAL_REDIRECTS).

const NotFound = () => {
  const location = useLocation();
  const path = location.pathname;
  const stripped = path.length > 1 ? path.replace(/\/+$/, "") : path;
  const internalTarget =
    LEGACY_INTERNAL_REDIRECTS[path] ?? LEGACY_INTERNAL_REDIRECTS[`${stripped}/`];
  const isTrailingSlashOfInternal = !internalTarget && stripped !== path;

  useEffect(() => {
    // Trailing-slash variants are retried internally first (see below); everything else goes to the blog.
    if (!internalTarget && !isTrailingSlashOfInternal) {
      window.location.replace(`${NEWS_BLOG}${path}${location.search}`);
    }
  }, [path, location.search, isTrailingSlashOfInternal, internalTarget]);

  if (internalTarget) {
    return <Navigate to={internalTarget} replace />;
  }

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
