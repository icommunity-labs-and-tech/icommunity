import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight, Clock, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import ContactModal from "@/components/home/ContactModal";
import PageSEO from "@/components/PageSEO";
import { webPage, breadcrumbs } from "@/lib/structuredData";
import { useLanguage } from "@/i18n/LanguageContext";
import { BLOG_KIND_LABEL, blockText, type BlogKind } from "@/content/blogTypes";
import { usePublishedPosts } from "@/hooks/useBlogPosts";
import { SITE_URL } from "@/seo/site";

type Filter = "all" | BlogKind;

const PAGE_SIZES = [9, 18, 36] as const;
const DEFAULT_PAGE_SIZE = 9;

const normalize = (value: string) =>
  value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

const texts = {
  en: {
    seoTitle: "Blog: Blockchain, Evidence and Company News",
    seoDesc: "Articles on blockchain, IPFS, copyright and GDPR, success stories and iCommunity company news since 2019.",
    kicker: "Blog",
    h1: "Blog and news",
    sub: "Articles, success stories and company news from iCommunity.",
    filters: { all: "All", article: "Articles", case: "Success stories", news: "News" },
    read: "Read",
    min: "min read",
    search: "Search news and articles…",
    clear: "Clear search",
    perPage: "Per page",
    results: (n: number) => `${n} ${n === 1 ? "result" : "results"}`,
    empty: "No posts match your search.",
    prev: "Previous",
    next: "Next",
    page: "Page",
  },
  es: {
    seoTitle: "Blog: blockchain, evidencia y noticias",
    seoDesc: "Artículos sobre blockchain, IPFS, derechos de autor y RGPD, casos de éxito y noticias corporativas de iCommunity desde 2019.",
    kicker: "Blog",
    h1: "Blog y noticias",
    sub: "Artículos, casos de éxito y noticias corporativas de iCommunity.",
    filters: { all: "Todo", article: "Artículos", case: "Casos de éxito", news: "Noticias" },
    read: "Leer",
    min: "min de lectura",
    search: "Buscar noticias y artículos…",
    clear: "Borrar búsqueda",
    perPage: "Por página",
    results: (n: number) => `${n} ${n === 1 ? "resultado" : "resultados"}`,
    empty: "No hay entradas que coincidan con tu búsqueda.",
    prev: "Anterior",
    next: "Siguiente",
    page: "Página",
  },
};

const formatDate = (iso: string, lang: "en" | "es") =>
  new Date(iso).toLocaleDateString(lang === "es" ? "es-ES" : "en-GB", { year: "numeric", month: "long", day: "numeric" });

const Blog = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [params, setParams] = useSearchParams();
  const { lang } = useLanguage();
  const { data: blogPosts = [] } = usePublishedPosts();
  const t = texts[lang];

  const rawFilter = params.get("tipo");
  const filter: Filter = rawFilter === "article" || rawFilter === "case" || rawFilter === "news" ? rawFilter : "all";
  const query = params.get("q") ?? "";
  const perParam = Number(params.get("por"));
  const pageSize = (PAGE_SIZES as readonly number[]).includes(perParam) ? perParam : DEFAULT_PAGE_SIZE;

  const updateParams = (changes: Record<string, string | null>) => {
    const next = new URLSearchParams(params);
    Object.entries(changes).forEach(([key, value]) => (value ? next.set(key, value) : next.delete(key)));
    setParams(next, { replace: true });
  };

  const filtered = useMemo(() => {
    const terms = normalize(query.trim()).split(/\s+/).filter(Boolean);
    return blogPosts.filter((p) => {
      if (filter !== "all" && p.kind !== filter) return false;
      if (!terms.length) return true;
      const haystack = normalize(
        [p.title[lang], p.description[lang], ...p.blocks[lang].map(blockText)].join(" "),
      );
      return terms.every((term) => haystack.includes(term));
    });
  }, [filter, query, lang, blogPosts]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const page = Math.min(Math.max(1, Number(params.get("pagina")) || 1), totalPages);
  const visible = filtered.slice((page - 1) * pageSize, page * pageSize);

  const goToPage = (n: number) => {
    updateParams({ pagina: n > 1 ? String(n) : null });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PageSEO
        title={t.seoTitle}
        description={t.seoDesc}
        path="/blog"
        lang={lang}
        jsonLd={[
          webPage({ path: "/blog", name: t.seoTitle, description: t.seoDesc, lang, type: "CollectionPage" }),
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement: blogPosts.map((p, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: `${SITE_URL}/blog/${p.slug}`,
              name: p.title[lang],
            })),
          },
          breadcrumbs([
            { name: lang === "es" ? "Inicio" : "Home", path: "/" },
            { name: "Blog", path: "/blog" },
          ]),
        ]}
      />
      <Navbar onOpenModal={() => setModalOpen(true)} />

      <div className="hero pt-28 md:pt-36 pb-16 md:pb-20">
        <div className="hero-aurora" />
        <div className="hero-noise" />
        <div className="hero-content relative">
          <div className="ic-container">
            <span className="font-mono text-xs uppercase tracking-widest text-primary/80">{t.kicker}</span>
            <h1 className="mt-3 text-3xl md:text-5xl font-extrabold text-primary-foreground tracking-tight">{t.h1}</h1>
            <p className="mt-4 text-base md:text-lg text-primary-foreground/60 leading-relaxed max-w-2xl">{t.sub}</p>
          </div>
        </div>
      </div>

      <main className="flex-1 py-16 md:py-20">
        <div className="ic-container">
          <div className="relative mb-6 max-w-xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" aria-hidden />
            <Input
              type="search"
              value={query}
              onChange={(e) => updateParams({ q: e.target.value || null, pagina: null })}
              placeholder={t.search}
              aria-label={t.search}
              className="pl-9 pr-9"
            />
            {query && (
              <button
                type="button"
                onClick={() => updateParams({ q: null, pagina: null })}
                aria-label={t.clear}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
          <div className="flex flex-wrap gap-2" role="tablist">
            {(Object.keys(t.filters) as Filter[]).map((f) => (
              <button
                key={f}
                role="tab"
                aria-selected={filter === f}
                onClick={() => updateParams({ tipo: f === "all" ? null : f, pagina: null })}
                className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
                  filter === f ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {t.filters[f]}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span aria-live="polite">{t.results(filtered.length)}</span>
            <label className="flex items-center gap-2">
              {t.perPage}
              <select
                value={pageSize}
                onChange={(e) => updateParams({ por: e.target.value === String(DEFAULT_PAGE_SIZE) ? null : e.target.value, pagina: null })}
                className="rounded-md border border-border bg-background px-2 py-1 text-foreground"
              >
                {PAGE_SIZES.map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </label>
          </div>
          </div>

          {visible.length === 0 && <p className="text-muted-foreground py-12 text-center">{t.empty}</p>}

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {visible.map((p) => (
              <article key={p.slug} className="ic-card flex flex-col gap-4">
                <div className="flex items-center gap-3 text-xs">
                  <span className="font-mono uppercase tracking-widest text-primary/80">{BLOG_KIND_LABEL[p.kind][lang]}</span>
                  <time dateTime={p.date} className="text-muted-foreground/60">{formatDate(p.date, lang)}</time>
                </div>
                <h2 className="text-lg font-semibold text-foreground leading-snug">
                  <Link to={`/blog/${p.slug}`} className="hover:text-primary transition-colors">{p.title[lang]}</Link>
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed flex-1 line-clamp-3">{p.description[lang]}</p>
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground/70">
                    <Clock className="w-3.5 h-3.5" />
                    {p.readingMinutes} {t.min}
                  </span>
                  <Link to={`/blog/${p.slug}`} className="inline-flex items-center gap-1.5 text-sm font-medium ic-text-gradient hover:opacity-80 transition-opacity">
                    {t.read}
                    <ArrowRight className="w-4 h-4 text-primary" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {totalPages > 1 && (
            <nav aria-label={t.page} className="mt-12 flex flex-wrap items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => goToPage(page - 1)}
                disabled={page === 1}
                className="inline-flex items-center gap-1 rounded-full border border-border px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground disabled:opacity-40"
              >
                <ChevronLeft className="w-4 h-4" />
                {t.prev}
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => goToPage(n)}
                  aria-current={n === page ? "page" : undefined}
                  aria-label={`${t.page} ${n}`}
                  className={`min-w-9 rounded-full border px-3 py-1.5 text-sm ${
                    n === page ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {n}
                </button>
              ))}
              <button
                type="button"
                onClick={() => goToPage(page + 1)}
                disabled={page === totalPages}
                className="inline-flex items-center gap-1 rounded-full border border-border px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground disabled:opacity-40"
              >
                {t.next}
                <ChevronRight className="w-4 h-4" />
              </button>
            </nav>
          )}
        </div>
      </main>

      <Footer onOpenModal={() => setModalOpen(true)} />
      <ContactModal open={modalOpen} onOpenChange={setModalOpen} />
    </div>
  );
};

export default Blog;
