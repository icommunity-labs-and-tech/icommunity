import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FileCheck, UserCheck, Bot } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const texts = {
  en: {
    title: "What we do",
    subtitle: "We turn critical identity events into verifiable regulatory evidence.",
    cards: [
      { icon: FileCheck, title: "KYC event evidence", desc: "Generates a cryptographic receipt for each identity verification.", examples: ["Onboarding completed", "Document validated", "Liveness check passed"] },
      { icon: UserCheck, title: "Age verification evidence", desc: "Certifies that the age check was performed correctly.", examples: ["Age gate approved", "Age document verified", "Parental consent recorded"] },
      { icon: Bot, title: "Human interaction evidence (anti-fraud)", desc: "Immutable proof that an action was performed by a real person.", examples: ["CAPTCHA passed", "Negative bot detection", "Biometric session validated"] },
    ],
  },
  es: {
    title: "Qué hacemos",
    subtitle: "Convertimos eventos críticos de identidad en evidencia regulatoria verificable.",
    cards: [
      { icon: FileCheck, title: "Evidencia de eventos KYC", desc: "Genera un recibo criptográfico por cada verificación de identidad.", examples: ["Onboarding completado", "Documento validado", "Liveness check superado"] },
      { icon: UserCheck, title: "Evidencia de verificación de edad", desc: "Certifica que la comprobación de edad se realizó correctamente.", examples: ["Age gate aprobado", "Documento de edad verificado", "Consentimiento parental registrado"] },
      { icon: Bot, title: "Evidencia de interacción humana (anti-fraude)", desc: "Prueba inmutable de que una acción fue realizada por una persona real.", examples: ["CAPTCHA superado", "Detección de bot negativa", "Sesión biométrica validada"] },
    ],
  },
};

const WhatWeDo = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { lang } = useLanguage();
  const t = texts[lang];

  return (
    <section id="product" className="ic-section bg-secondary/50" ref={ref}>
      <div className="ic-container">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t.title}</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{t.subtitle}</p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-8">
          {t.cards.map((card, i) => (
            <motion.div key={card.title} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: i * 0.15 }} className="ic-card">
              <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mb-5"><card.icon className="w-6 h-6 text-primary" /></div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{card.title}</h3>
              <p className="text-sm text-muted-foreground mb-5">{card.desc}</p>
              <ul className="space-y-2">
                {card.examples.map((ex) => (
                  <li key={ex} className="flex items-center gap-2 text-sm text-muted-foreground"><div className="w-1 h-1 rounded-full bg-primary" />{ex}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatWeDo;
