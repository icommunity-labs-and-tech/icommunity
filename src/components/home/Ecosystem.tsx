import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import logoCertypass from "@/assets/logo-certypass.webp";
import logoPrivaro from "@/assets/logo-privaro.png";

const texts = {
  en: {
    title: "Solutions built on <span>iCommunity</span>",
    subtitle: "For regulatory traceability and secure data governance.",
    products: [
      {
        id: "certypass",
        eyebrow: "CertyPass",
        title: "Digital Product Passport",
        desc: "Digital Product Passport for traceability and compliance with the European ESPR regulation.",
        tag: "Built on iCommunity",
        cta: "Go to CertyPass",
      },
      {
        id: "privaro",
        eyebrow: "Privaro",
        title: "Secure Data Governance",
        desc: "Anonymization and governance of sensitive data for safe use in AI systems.",
        tag: "Powered by iCommunity",
        cta: "Go to Privaro",
      },
    ],
    bottom: "One integration. Multiple regulatory solutions.",
  },
  es: {
    title: "Soluciones construidas sobre <span>iCommunity</span>",
    subtitle: "Para trazabilidad regulatoria y gobernanza segura de datos.",
    products: [
      {
        id: "certypass",
        eyebrow: "CertyPass",
        title: "Pasaporte Digital de Producto",
        desc: "Pasaporte Digital de Producto para trazabilidad y cumplimiento del reglamento europeo ESPR.",
        tag: "Construido sobre iCommunity",
        cta: "Ir a CertyPass",
      },
      {
        id: "privaro",
        eyebrow: "Privaro",
        title: "Gobernanza Segura de Datos",
        desc: "Anonimización y gobernanza de datos sensibles para su uso seguro en sistemas de IA.",
        tag: "Impulsado por iCommunity",
        cta: "Ir a Privaro",
      },
    ],
    bottom: "Una única integración. Múltiples soluciones regulatorias.",
  },
};

const productMeta = [
  { logo: logoCertypass, href: "https://certypass.com", external: true },
  { logo: logoPrivaro, href: "https://privaro.lovable.app/", external: true },
];

const Ecosystem = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { lang } = useLanguage();
  const t = texts[lang];

  return (
    <section className="ic-section py-24 md:py-32 bg-secondary/30" ref={ref}>
      <div className="ic-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4"
            dangerouslySetInnerHTML={{
              __html: t.title
                .replace("<span>", '<span class="text-primary">')
                .replace("</span>", "</span>"),
            }}
          />
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </motion.div>

        {/* Two-column cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {t.products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
              className="rounded-xl border border-border bg-card p-8 flex flex-col items-center text-center"
              style={{ boxShadow: "var(--ic-shadow-card)" }}
            >
              {/* Logo */}
              <img
                src={productMeta[i].logo}
                alt={product.eyebrow}
                className="h-10 object-contain mb-6"
              />

              {/* Eyebrow */}
              <span className="text-xs font-mono font-medium text-primary tracking-wide uppercase mb-2">
                {product.eyebrow}
              </span>

              {/* Title */}
              <h3 className="text-lg font-bold text-foreground mb-3">
                {product.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-muted-foreground leading-relaxed mb-6 max-w-[260px]">
                {product.desc}
              </p>

              {/* CTA */}
              <a
                href={productMeta[i].href}
                {...(productMeta[i].external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors group mt-auto"
              >
                {product.cta}
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
              </a>
            </motion.div>
          ))}
        </div>

        {/* Closing sentence */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center text-base md:text-lg text-muted-foreground/80 font-medium mt-16 max-w-2xl mx-auto"
        >
          {t.bottom}
        </motion.p>
      </div>
    </section>
  );
};

export default Ecosystem;
