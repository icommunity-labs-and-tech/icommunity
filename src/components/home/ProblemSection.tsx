import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/i18n/LanguageContext";

const texts = {
  en: {
    title: "Compliance is no longer enough. <span>You need to prove it.</span>",
    body: 'Regulatory pressure on digital identity, KYC, and age verification grows every quarter. <strong>Regulators no longer accept screenshots or internal logs: they demand verifiable</strong>, consistent, and provider-independent proof. Without a neutral evidence layer, every audit is an operational risk.',
  },
  es: {
    title: "Cumplir ya no basta. <span>Hay que poder demostrarlo.</span>",
    body: 'La presión regulatoria sobre identidad digital, KYC y verificación de edad crece cada trimestre. Los <strong>reguladores ya no aceptan capturas de pantalla ni logs internos: exigen prueba verificable</strong>, consistente e independiente del proveedor. Sin una capa de evidencia neutral, cada auditoría es un riesgo operativo.',
  },
};

const ProblemSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { lang } = useLanguage();
  const t = texts[lang];

  return (
    <section className="ic-section bg-background pt-12 md:pt-16" ref={ref}>
      <div className="ic-container max-w-3xl text-center">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight" dangerouslySetInnerHTML={{ __html: t.title.replace("<span>", '<span class="ic-text-gradient">').replace("</span>", "</span>") }} />
          <p className="text-lg text-muted-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: t.body.replace("<strong>", '<strong class="text-foreground font-semibold">') }} />
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemSection;
