import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowRight, Clock } from "lucide-react";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import ContactModal from "@/components/home/ContactModal";
import PageSEO from "@/components/PageSEO";
import { breadcrumbs, articleSchema } from "@/lib/structuredData";
import { useLanguage } from "@/i18n/LanguageContext";
import { blogPosts } from "@/content/blogPosts";
import { BLOG_KIND_LABEL } from "@/content/blogTypes";

const formatDate = (iso: string, lang: "en" | "es") =>
  new Date(iso).toLocaleDateString(lang === "es" ? "es-ES" : "en-GB", { year: "numeric", month: "long", day: "numeric" });

const BlogPostPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { slug } = useParams<{ slug: string }>();
  const { lang } = useLanguage();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) return <Navigate to="/blog" replace />;

  const contentLang = lang === "en" && !post.translated ? "es" : lang;
  const path = `/blog/${post.slug}`;
  const related = blogPosts.filter((p) => p.slug !== post.slug && p.kind === post.kind).slice(0, 4);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PageSEO
        title={post.title[lang]}
        description={post.description[lang]}
        path={path}
        lang={contentLang}
        ogType="article"
        jsonLd={[
          articleSchema({
            path,
            headline: post.title[lang],
            description: post.description[lang],
            date: post.date,
            lang: contentLang,
            section: BLOG_KIND_LABEL[post.kind][lang],
          }),
          breadcrumbs([
            { name: lang === "es" ? "Inicio" : "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.title[lang], path },
          ]),
        ]}
      />
      <Navbar onOpenModal={() => setModalOpen(true)} />

      <div className="hero pt-28 md:pt-36 pb-16 md:pb-20">
        <div className="hero-aurora" />
        <div className="hero-noise" />
        <div className="hero-content relative">
          <div className="ic-container max-w-3xl">
            <nav aria-label="Breadcrumb" className="text-xs text-primary-foreground/50 mb-6">
              <Link to="/blog" className="hover:text-primary-foreground transition-colors">Blog</Link>
              <span className="mx-2">/</span>
              <span className="text-primary-foreground/70">{BLOG_KIND_LABEL[post.kind][lang]}</span>
            </nav>
            <div className="flex items-center gap-3 text-xs mb-4">
              <time dateTime={post.date} className="text-primary-foreground/50">{formatDate(post.date, lang)}</time>
              <span className="inline-flex items-center gap-1.5 text-primary-foreground/50">
                <Clock className="w-3.5 h-3.5" />
                {post.readingMinutes} {lang === "es" ? "min de lectura" : "min read"}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold text-primary-foreground tracking-tight leading-[1.15]">
              {post.title[contentLang]}
            </h1>
          </div>
        </div>
      </div>

      <main className="flex-1 py-16 md:py-20">
        <article className="ic-container max-w-3xl space-y-5" lang={contentLang}>
          {lang === "en" && !post.translated && (
            <p className="text-sm text-muted-foreground border-l-2 border-primary pl-3">This post is only available in Spanish.</p>
          )}
          {post.blocks[contentLang].map((b, i) =>
            b.type === "heading" ? (
              <h2 key={i} className="text-xl font-semibold text-foreground pt-5">{b.text}</h2>
            ) : b.type === "list" ? (
              <ul key={i} className="space-y-2">
                {b.items.map((item, j) => (
                  <li key={j} className="flex gap-3 text-muted-foreground leading-relaxed">
                    <span className="font-mono text-primary mt-0.5">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p key={i} className="text-muted-foreground leading-relaxed">{b.text}</p>
            ),
          )}

          <div className="ic-card !mt-14 flex flex-col md:flex-row md:items-center gap-6 justify-between">
            <p className="text-foreground/90 leading-relaxed md:max-w-xl">
              {lang === "es"
                ? "¿Necesitas evidencia verificable para tus procesos? Te contamos cómo aplicarla en tu caso."
                : "Need verifiable evidence for your processes? We'll show you how it applies to your case."}
            </p>
            <button
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center justify-center rounded-lg ic-gradient-cta px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity shrink-0"
            >
              {lang === "es" ? "Solicitar demo" : "Request demo"}
            </button>
          </div>

          {related.length > 0 && (
            <div className="!mt-14">
              <h3 className="text-xs font-mono uppercase tracking-widest text-muted-foreground/60 mb-5">
                {lang === "es" ? "Seguir leyendo" : "Keep reading"}
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {related.map((p) => (
                  <div key={p.slug} className="ic-card flex flex-col gap-3">
                    <time dateTime={p.date} className="text-xs text-muted-foreground/60">{formatDate(p.date, lang)}</time>
                    <h4 className="text-base font-semibold text-foreground leading-snug">
                      <Link to={`/blog/${p.slug}`} className="hover:text-primary transition-colors">{p.title[lang]}</Link>
                    </h4>
                    <Link to={`/blog/${p.slug}`} className="inline-flex items-center gap-1.5 text-sm font-medium ic-text-gradient hover:opacity-80 transition-opacity mt-auto">
                      {lang === "es" ? "Leer" : "Read"}
                      <ArrowRight className="w-4 h-4 text-primary" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
        </article>
      </main>

      <Footer onOpenModal={() => setModalOpen(true)} />
      <ContactModal open={modalOpen} onOpenChange={setModalOpen} />
    </div>
  );
};

export default BlogPostPage;
