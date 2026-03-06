import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FileWarning, ShieldOff, ClipboardList, ShieldCheck, Zap, ExternalLink } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const texts = {
  en: {
    title: "Evidence ready <span>for regulation</span>",
    beforeLabel: "Before",
    afterLabel: "After",
    before: [
      { icon: FileWarning, text: "Internal logs without evidentiary value" },
      { icon: ShieldOff, text: "Total dependency on the provider" },
      { icon: ClipboardList, text: "Manual and reactive audits" },
    ],
    after: [
      { icon: ShieldCheck, text: "Independent and verifiable evidence" },
      { icon: Zap, text: "Immediate audit from the origin" },
      { icon: ExternalLink, text: "Verification by external third parties" },
    ],
  },
  es: {
    title: "Evidencia preparada <span>para regulación</span>",
    beforeLabel: "Antes",
    afterLabel: "Después",
    before: [
      { icon: FileWarning, text: "Logs internos sin valor probatorio" },
      { icon: ShieldOff, text: "Dependencia total del proveedor" },
      { icon: ClipboardList, text: "Auditorías manuales y reactivas" },
    ],
    after: [
      { icon: ShieldCheck, text: "Evidencia independiente y verificable" },
      { icon: Zap, text: "Auditoría inmediata desde el origen" },
      { icon: ExternalLink, text: "Verificación por terceros externos" },
    ],
  },
};

const BeforeAfter = () => {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { lang } = useLanguage();
  const t = texts[lang];

  return (
    <section ref={ref} className="ic-section py-20 md:py-28 bg-secondary/30 overflow-hidden">
      <div className="ic-container max-w-5xl">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground" dangerouslySetInnerHTML={{ __html: t.title.replace("<span>", '<span class="text-primary">').replace("</span>", "</span>") }} />
        </motion.div>
        <div className="grid md:grid-cols-[1fr_auto_1fr] gap-8 md:gap-0 items-start">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5, delay: 0.2 }} className="space-y-5 md:pr-10">
            <div className="flex items-center gap-2 mb-6"><span className="font-mono text-xs tracking-widest text-muted-foreground uppercase">{t.beforeLabel}</span><div className="flex-1 h-px bg-border" /></div>
            {t.before.map((item, i) => (
              <motion.div key={item.text} initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }} className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-destructive/10 flex items-center justify-center flex-shrink-0 mt-0.5"><item.icon className="w-4 h-4 text-destructive" strokeWidth={1.5} /></div>
                <span className="text-sm text-muted-foreground leading-relaxed pt-1.5">{item.text}</span>
              </motion.div>
            ))}
          </motion.div>
          <div className="hidden md:flex flex-col items-center justify-center self-stretch"><div className="w-px h-full bg-border relative"><motion.div className="absolute top-0 w-px bg-primary origin-top" initial={{ scaleY: 0 }} animate={inView ? { scaleY: 1 } : {}} transition={{ duration: 1, delay: 0.4, ease: "easeOut" }} style={{ height: "100%" }} /></div></div>
          <div className="md:hidden w-full h-px bg-border" />
          <motion.div initial={{ opacity: 0, x: 20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5, delay: 0.4 }} className="space-y-5 md:pl-10">
            <div className="flex items-center gap-2 mb-6"><span className="font-mono text-xs tracking-widest text-primary uppercase font-semibold">{t.afterLabel}</span><div className="flex-1 h-px bg-primary/30" /></div>
            {t.after.map((item, i) => (
              <motion.div key={item.text} initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }} className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5"><item.icon className="w-4 h-4 text-primary" strokeWidth={1.5} /></div>
                <span className="text-sm text-foreground leading-relaxed pt-1.5">{item.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfter;
