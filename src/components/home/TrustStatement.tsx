import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/i18n/LanguageContext";

const texts = {
  en: { line1: "Every regulated system needs", line2: "independent evidence." },
  es: { line1: "Todo sistema regulado necesita", line2: "evidencia independiente." },
};

const TrustStatement = () => {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const { lang } = useLanguage();
  const t = texts[lang];

  return (
    <section ref={ref} className="flex items-center justify-center text-center px-6 py-12 md:py-16" style={{ background: "linear-gradient(180deg, hsl(var(--background)) 0%, hsl(var(--secondary)/0.3) 50%, hsl(var(--background)) 100%)" }}>
      <motion.p initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, ease: "easeOut" }} className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground/80 leading-snug max-w-3xl">
        {t.line1}<br /><span className="text-primary font-bold">{t.line2}</span>
      </motion.p>
    </section>
  );
};

export default TrustStatement;
