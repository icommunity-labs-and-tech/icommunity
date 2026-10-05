// Google Analytics 4 (gtag.js) initialization.
// The measurement ID comes from the linked Google Analytics connector.

declare global {
  interface Window {
    dataLayer: unknown[];
  }
}

let initialized = false;

export function initAnalytics() {
  const measurementId = import.meta.env.VITE_LOVABLE_CONNECTOR_GOOGLE_ANALYTICS_API_KEY;
  if (!measurementId || initialized) return;
  initialized = true;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(["js", new Date()]);
  // Disable gtag's automatic page_view: AnalyticsTracker (below) sends page
  // views on mount and on every route change, so auto-tracking would
  // double-count every fresh page load.
  window.dataLayer.push(["config", measurementId, { send_page_view: false }]);
}

export function trackPageView(path: string) {
  const measurementId = import.meta.env.VITE_LOVABLE_CONNECTOR_GOOGLE_ANALYTICS_API_KEY;
  if (!measurementId || !initialized) return;
  window.dataLayer.push(["event", "page_view", { page_path: path }]);
}
