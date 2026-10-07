import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Clock } from "lucide-react";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import ContactModal from "@/components/home/ContactModal";
import PageSEO from "@/components/PageSEO";
import { webPage, breadcrumbs } from "@/lib/structuredData";
import { useLanguage } from "@/i18n/LanguageContext";
import { blogPosts } from "@/content/blogPosts";
import { BLOG_KIND_LABEL, type BlogKind } from "@/content/blogTypes";
import { SITE_URL } from "@/seo/site";

type Filter = "all" | BlogKind;

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
  },
};

const formatDate = (iso: string, lang: "en" | "es") =>
  new Date(iso).toLocaleDateString(lang === "es" ? "es-ES" : "en-GB", { year: "numeric", month: "long", day: "numeric" });

const Blog = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [filter, setFilter] = useState<Filter>("all");
  const { lang } = useLanguage();
  const t = texts[lang];
  const visible = filter === "all" ? blogPosts : blogPosts.filter((p) => p.kind === filter);

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
          <div className="flex flex-wrap gap-2 mb-10" role="tablist">
            {(Object.keys(t.filters) as Filter[]).map((f) => (
              <button
                key={f}
                role="tab"
                aria-selected={filter === f}
                onClick={() => setFilter(f)}
                className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
                  filter === f ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {t.filters[f]}
              </button>
            ))}
          </div>

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
        </div>
      </main>

      <Footer onOpenModal={() => setModalOpen(true)} />
      <ContactModal open={modalOpen} onOpenChange={setModalOpen} />
    </div>
  );
};

export default Blog;
