import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Radio, ShieldCheck, FileDigit, SearchCheck } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const texts = {
  en: {
    badge: "Infrastructure Pipeline",
    title: "Trust <span>Lifecycle</span>",
    steps: [
      { icon: Radio, label: "Capture", sub: "Digital event recorded" },
      { icon: ShieldCheck, label: "Certification", sub: "Hash + timestamp" },
      { icon: FileDigit, label: "Record", sub: "Immutable evidence" },
      { icon: SearchCheck, label: "Verification", sub: "Auditable proof" },
    ],
  },
  es: {
    badge: "Pipeline de Infraestructura",
    title: "Ciclo de <span>Confianza</span>",
    steps: [
      { icon: Radio, label: "Captura", sub: "Evento digital registrado" },
      { icon: ShieldCheck, label: "Certificación", sub: "Hash + sellado de tiempo" },
      { icon: FileDigit, label: "Registro", sub: "Evidencia inmutable" },
      { icon: SearchCheck, label: "Verificación", sub: "Prueba auditable" },
    ],
  },
};

const TrustLifecycle = () => {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { lang } = useLanguage();
  const t = texts[lang];

  return (
    <section ref={ref} className="bg-background px-6 py-20 md:py-28 overflow-hidden">
      <div className="mx-auto max-w-6xl relative rounded-2xl py-16 md:py-24 px-8 md:px-16 overflow-hidden ic-gradient-lead">
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none rounded-3xl" style={{ backgroundImage: "linear-gradient(hsl(225 80% 60%) 1px, transparent 1px), linear-gradient(90deg, hsl(225 80% 60%) 1px, transparent 1px)", backgroundSize: "80px 80px" }} />
        <div className="relative z-10">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-20">
            <span className="font-mono text-xs tracking-[0.2em] uppercase text-primary-foreground/40 mb-4 block">{t.badge}</span>
            <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground" dangerouslySetInnerHTML={{ __html: t.title.replace("<span>", '<span class="text-primary">').replace("</span>", "</span>") }} />
          </motion.div>

          {/* Desktop */}
          <div className="hidden md:block relative">
            <div className="absolute top-6 left-[12.5%] right-[12.5%] h-px bg-primary-foreground/10">
              <motion.div className="h-full bg-primary-foreground/30 origin-left" initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}} transition={{ duration: 1.6, delay: 0.3, ease: "easeOut" }} />
            </div>
            <div className="grid grid-cols-4 relative">
              {t.steps.map((s, i) => (
                <motion.div key={s.label} initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, delay: 0.3 + i * 0.35 }} className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full border border-primary-foreground/15 flex items-center justify-center bg-primary-foreground/5 relative z-10"><s.icon className="w-7 h-7 text-primary-foreground/70" strokeWidth={1.5} /></div>
                  <span className="font-mono text-sm text-primary-foreground/30 mt-4">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-sm font-semibold text-primary-foreground mt-1">{s.label}</span>
                  <span className="text-xs text-primary-foreground/50 mt-0.5 max-w-[160px]">{s.sub}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile */}
          <div className="md:hidden relative pl-6">
            <div className="absolute left-[23px] top-0 bottom-0 w-px bg-primary-foreground/10">
              <motion.div className="w-full bg-primary-foreground/30 origin-top" initial={{ scaleY: 0 }} animate={inView ? { scaleY: 1 } : {}} transition={{ duration: 1.4, delay: 0.3, ease: "easeOut" }} style={{ height: "100%" }} />
            </div>
            <div className="space-y-10">
              {t.steps.map((s, i) => (
                <motion.div key={s.label} initial={{ opacity: 0, x: -12 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.4, delay: 0.3 + i * 0.3 }} className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-full border border-primary-foreground/15 flex items-center justify-center bg-primary-foreground/5 relative z-10 flex-shrink-0"><s.icon className="w-7 h-7 text-primary-foreground/70" strokeWidth={1.5} /></div>
                  <div className="pt-1">
                    <span className="font-mono text-sm text-primary-foreground/30">{String(i + 1).padStart(2, "0")}</span>
                    <div className="text-sm font-semibold text-primary-foreground">{s.label}</div>
                    <div className="text-xs text-primary-foreground/50 mt-0.5">{s.sub}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustLifecycle;
