import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { X, Check } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const texts = {
  en: {
    title: "A <span>structural</span> problem",
    p1: "In traditional systems, the entity that executes the process also generates the evidence.",
    p2: "iCommunity separates execution from certification, creating an independent auditable record.",
    colLeft: "Internal systems",
    colRight: "iCommunity",
    internal: ["Modifiable logs", "Storage in proprietary databases", "Manual and sample-based auditing", "Dependency on third parties"],
    ic: ["Technology-certified logs", "Decentralized system", "Automatic and comprehensive auditing", "Ready for compliance"],
  },
  es: {
    title: "Un problema <span>estructural</span>",
    p1: "En los sistemas tradicionales, la entidad que ejecuta el proceso también genera la evidencia.",
    p2: "iCommunity separa la ejecución de la certificación, creando un registro auditable independiente.",
    colLeft: "Sistemas internos",
    colRight: "iCommunity",
    internal: ["Logs modificables", "Almacenamiento en bases de datos propietarias", "Auditoría manual y por muestreo", "Dependencia de terceros"],
    ic: ["Logs certificados tecnológicamente", "Sistema descentralizado", "Auditoría automática e integral", "Preparado para cumplimiento"],
  },
};

const StructuralProblem = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { lang } = useLanguage();
  const t = texts[lang];

  return (
    <section ref={ref} className="ic-section py-16 md:py-20 bg-background">
      <div className="ic-container max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-10">
          <h2 <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6" dangerouslySetInnerHTML={{ __html: t.title.replace("<span>", '<span class="text-ic-blue">').replace("</span>", "</span>") }} /> dangerouslySetInnerHTML={{ __html: t.title.replace("<span>", '<span class="text-ic-blue">').replace("</span>", "</span>") }} />
          <p className="text-lg md:text-xl leading-relaxed text-muted-foreground mb-3">{t.p1}</p>
          <p className="text-lg md:text-xl leading-relaxed text-foreground font-medium">{t.p2}</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.3 }} className="grid md:grid-cols-2 gap-5">
          <div className="rounded-xl border border-border bg-card p-6">
            <p className="text-sm font-semibold text-muted-foreground mb-4">{t.colLeft}</p>
            <ul className="space-y-3">
              {t.internal.map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-[14px] text-muted-foreground/70">
                  <X className="w-4 h-4 text-destructive/60 flex-shrink-0" strokeWidth={2} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-primary/20 bg-accent/50 p-6">
            <p className="text-sm font-semibold text-foreground mb-4">{t.colRight}</p>
            <ul className="space-y-3">
              {t.ic.map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-[14px] text-foreground">
                  <Check className="w-4 h-4 text-primary flex-shrink-0" strokeWidth={2} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StructuralProblem;
