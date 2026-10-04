import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowRight, Clock } from "lucide-react";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import ContactModal from "@/components/home/ContactModal";
import PageSEO from "@/components/PageSEO";
import { useLanguage } from "@/i18n/LanguageContext";
import { articles, getArticle } from "@/content/articles";

const formatDate = (iso: string, lang: "en" | "es") =>
  new Date(iso).toLocaleDateString(lang === "es" ? "es-ES" : "en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

const ArticlePage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { slug } = useParams<{ slug: string }>();
  const { lang } = useLanguage();
  const article = getArticle(slug);

  if (!article) return <Navigate to="/recursos" replace />;

  const related = articles.filter((a) => a.slug !== article.slug Sok);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PageSEO
        title={article.title[lang]}
        description={article.description[lang]}
        path={`/recursos/${article.slug}`}
        lang={lang}
      />
      <Navbar onOpenModal={() => setModalOpen(true)} />

      <div className="hero pt-28 md:pt-36 pb-16 md:pb-20">
        <div className="hero-aurora" />
        <div className="hero-noise" />
        <div className="hero-content relative">
          <div className="ic-container max-w-3xl">
            <nav aria-label="Breadcrumb" className="text-xs text-primary-foreground/50 mb-6">
              <Link to="/recursos" className="hover:text-primary-foreground transition-colors">
                {lang === "es" ? "Recursos" : "Resources"}
              </Link>
              <span className="mx-2">/</span>
              <span className="text-primary-foreground/70">{article.category[lang]}</span>
            </nav>

            <div className="flex items-center gap-3 text-xs mb-4">
              <span className="font-mono uppercase tracking-widest text-primary/80">{article.category[lang]}</span>
              <span className="text-primary-foreground/50">{formatDate(article.date, lang)}</span>
              <span className="inline-flex items-center gap-1.5 text-primary-foreground/50">
                <Clock className="w-3.5 h-3.5" />
                {article.readingMinutes} {lang === "es" ? "min de lectura" : "min read"}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold text-primary-foreground tracking-tight leading-[1.15]">
              {article.title[lang]}
            </h1>
          </div>
        </div>
      </div>

      <main className="flex-1 py-16 md:py-20">
        <div className="ic-container max-w-3xl">
          <div className="space-y-5 mb-10">
            {article.intro[lang].map((p, i) => (
              <p key={i} className={i === 0 ? "text-lg text-foreground/90 leading-relaxed" : "text-muted-foreground leading-relaxed"}>
                {p}
              </p>
            ))}
          </div>

          <div className="space-y-10">
            {article.sections[lang].map((section) => (
              <section key={section.heading}>
                <h2 className="text-xl font-semibold text-foreground mb-4">{section.heading}</h2>
                <div className="space-y-4">
                  {section.paragraphs.map((p, i) => (
                    <p key={i} className="text-muted-foreground leading-relaxed">{p}</p>
                  ))}
                </div>
                {section.bullets && (
                  <ul className="mt-4 space-y-2">
                    {section.bullets.map((b, i) => (
                      <li key={i} className="flex gap-3 text-muted-foreground leading-relaxed">
                        <span className="font-mono text-primary mt-0.5">—</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          <div className="ic-card mt-14 flex flex-col md:flex-row md:items-center gap-6 justify-between">
            <p className="text-foreground/90 leading-relaxed md:max-w-xl">{article.cta[lang].text}</p>
            <button
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center justify-center rounded-lg ic-gradient-cta px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity shrink-0"
            >
              {article.cta[lang].button}
            </button>
          </div>

          <div className="mt-14">
            <h3 className="text-xs font-mono uppercase tracking-widest text-muted-foreground/60 mb-5">
              {lang === "es" ? "Seguir leyendo" : "Keep reading"}
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {related.map((a) => (
                <article key={a.slug} className="ic-card flex flex-col gap-3">
                  <span className="font-mono uppercase tracking-widest text-xs text-primary/80">{a.category[lang]}</span>
                  <h4 className="text-base font-semibold text-foreground leading-snug">
                    <Link to={`/recursos/${a.slug}`} className="hover:text-primary transition-colors">
                      {a.title[lang]}
                    </Link>
                  </h4>
                  <Link
                    to={`/recursos/${a.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-medium ic-text-gradient hover:opacity-80 transition-opacity mt-auto"
                  >
                    {lang === "es" ? "Leer artículo" : "Read article"}
                    <ArrowRight className="w-4 h-4 text-primary" />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer onOpenModal={() => setModalOpen(true)} />
      <ContactModal open={modalOpen} onOpenChange={setModalOpen} />
    </div>
  );
};

export default ArticlePage;
