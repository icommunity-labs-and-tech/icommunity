import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Clock } from "lucide-react";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import ContactModal from "@/components/home/ContactModal";
import PageSEO from "@/components/PageSEO";
import { useLanguage } from "@/i18n/LanguageContext";
import { articles } from "@/content/articles";

const texts = {
  en: {
    seoTitle: "Blockchain Resources & Guides",
    seoDesc: "Practical guides on blockchain use cases, payment tokenization and real estate tokenization from the iCommunity team.",
    kicker: "Traceable evidence",
    h1: "Resources",
    sub: "Practical guides on blockchain, tokenization and digital trust, written by the team that builds the infrastructure.",
    read: "Read article",
    min: "min read",
  },
  es: {
    seoTitle: "Recursos y guías blockchain",
    seoDesc: "Guías prácticas sobre casos de uso de blockchain, tokenización de pagos y tokenización inmobiliaria, por el equipo de iCommunity.",
    kicker: "Evidencia trazable",
    h1: "Recursos",
    sub: "Guías prácticas sobre blockchain, tokenización y confianza digital, escritas por el equipo que construye la infraestructura.",
    read: "Leer artículo",
    min: "min de lectura",
  },
};

const formatDate = (iso: string, lang: "en" | "es") =>
  new Date(iso).toLocaleDateString(lang === "es" ? "es-ES" : "en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

const Recursos = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { lang } = useLanguage();
  const t = texts[lang];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PageSEO title={t.seoTitle} description={t.seoDesc} path="/recursos" lang={lang} />
      <Navbar onOpenModal={() => setModalOpen(true)} />

      <div className="hero pt-28 md:pt-36 pb-20 md:pb-28">
        <div className="hero-aurora" />
        <div className="hero-noise" />
        <div className="hero-content relative">
          <div className="ic-container max-w-5xl">
            <p className="text-xs font-mono uppercase tracking-widest text-primary-foreground/50 mb-3">{t.kicker}</p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary-foreground tracking-tight leading-[1.1] mb-5">{t.h1}</h1>
            <p className="text-base md:text-lg text-primary-foreground/60 leading-relaxed max-w-2xl">{t.sub}</p>
          </div>
        </div>
      </div>

      <main className="flex-1 py-20">
        <div className="ic-container">
          <div className="grid md:grid-cols-3 gap-8">
            {articles.map((a) => (
              <article key={a.slug} className="ic-card flex flex-col gap-4">
                <div className="flex items-center gap-3 text-xs">
                  <span className="font-mono uppercase tracking-widest text-primary/80">{a.category[lang]}</span>
                  <span className="text-muted-foreground/60">{formatDate(a.date, lang)}</span>
                </div>
                <h2 className="text-lg font-semibold text-foreground leading-snug">
                  <Link to={`/recursos/${a.slug}`} className="hover:text-primary transition-colors">
                    {a.title[lang]}
                  </Link>
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed flex-1">{a.description[lang]}</p>
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground/70">
                    <Clock className="w-3.5 h-3.5" />
                    {a.readingMinutes} {t.min}
                  </span>
                  <Link
                    to={`/recursos/${a.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-medium ic-text-gradient hover:opacity-80 transition-opacity"
                  >
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

export default Recursos;
