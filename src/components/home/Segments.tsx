import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  Fingerprint, Landmark, Building2, Boxes, BrainCircuit,
  Shield, FileCheck, ClipboardCheck, Eye, Globe, RefreshCw,
} from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const texts = {
  en: {
    title: "Designed for processes where <span>evidence must be verifiable</span>",
    subtitle: "Digital certification deployed where regulatory traceability is a requirement",
    processesLabel: "Processes",
    resultsLabel: "Results",
    coreTitle: "iCommunity Trust Layer",
    coreDesc: "Independent layer that certifies digital events through:",
    features: ["Cryptographic hash", "Verifiable timestamp", "Immutable record", "Exportable evidence"],
    badges: ["API-first", "Audit-ready", "Independent"],
    bottom: "A single integration turns any digital event into verifiable evidence for third parties and regulators.",
    processes: [
      { icon: Fingerprint, title: "Digital identity", desc: "User verification and onboarding" },
      { icon: Landmark, title: "Public administration", desc: "Digital procedures and records" },
      { icon: Building2, title: "Financial systems", desc: "Regulated operations and compliance" },
      { icon: Boxes, title: "Supply chain", desc: "Origin and transport traceability" },
      { icon: BrainCircuit, title: "AI platforms", desc: "Algorithmic decision auditing" },
    ],
    results: [
      { icon: FileCheck, title: "Verifiable evidence", desc: "Exportable cryptographic proof" },
      { icon: ClipboardCheck, title: "Automatic audit", desc: "Record ready for inspection" },
      { icon: Eye, title: "Regulatory oversight", desc: "Demonstrable regulatory compliance" },
      { icon: Globe, title: "Public verification", desc: "Validation by independent third parties" },
      { icon: RefreshCw, title: "Continuous compliance", desc: "Real-time monitoring and alerts" },
    ],
  },
  es: {
    title: "Diseñado para procesos donde la <span>evidencia debe ser verificable</span>",
    subtitle: "Certificación digital desplegada donde la trazabilidad regulatoria es un requisito, no una opción.",
    processesLabel: "Procesos",
    resultsLabel: "Resultados",
    coreTitle: "iCommunity Trust Layer",
    coreDesc: "Capa independiente que certifica eventos digitales mediante:",
    features: ["Hash criptográfico", "Sellado de tiempo verificable", "Registro inmutable", "Evidencia exportable"],
    badges: ["API-first", "Audit-ready", "Independiente"],
    bottom: "Una sola integración convierte cualquier evento digital en evidencia verificable para terceros y reguladores.",
    processes: [
      { icon: Fingerprint, title: "Identidad digital", desc: "Verificación de usuarios y onboarding" },
      { icon: Landmark, title: "Administración pública", desc: "Trámites y registros digitales" },
      { icon: Building2, title: "Sistemas financieros", desc: "Operaciones reguladas y compliance" },
      { icon: Boxes, title: "Cadena de suministro", desc: "Trazabilidad de origen y transporte" },
      { icon: BrainCircuit, title: "Plataformas de IA", desc: "Auditoría de decisiones algorítmicas" },
    ],
    results: [
      { icon: FileCheck, title: "Evidencia verificable", desc: "Prueba criptográfica exportable" },
      { icon: ClipboardCheck, title: "Auditoría automática", desc: "Registro listo para inspección" },
      { icon: Eye, title: "Supervisión regulatoria", desc: "Cumplimiento regulatorio demostrable" },
      { icon: Globe, title: "Verificación pública", desc: "Validación por terceros independientes" },
      { icon: RefreshCw, title: "Cumplimiento continuo", desc: "Monitorización en tiempo real y alertas" },
    ],
  },
};

const Segments = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [activeIndex, setActiveIndex] = useState(-1);
  const { lang } = useLanguage();
  const t = texts[lang];

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start 0.6", "end 0.4"] });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => {
      const idx = Math.floor(v * t.processes.length);
      setActiveIndex(Math.min(idx, t.processes.length - 1));
    });
    return unsubscribe;
  }, [scrollYProgress, t.processes.length]);

  return (
    <section id="segments" ref={sectionRef} className="ic-section bg-background overflow-hidden">
      <div className="ic-container">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 max-w-3xl mx-auto" dangerouslySetInnerHTML={{ __html: t.title.replace("<span>", '<span class="text-primary">').replace("</span>", "</span>") }} />
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">{t.subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-6 lg:gap-0 items-start">
          <div className="space-y-3 lg:pr-6">
            <div className="text-[12px] font-medium tracking-widest uppercase text-muted-foreground mb-4 text-center lg:text-left">{t.processesLabel}</div>
            {t.processes.map((p, i) => {
              const isActive = i <= activeIndex;
              return (
                <motion.div key={p.title} initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.4, delay: 0.15 + i * 0.07 }} className={`flex items-start gap-3 rounded-xl p-4 transition-all duration-500 ease-out ${isActive ? "bg-primary/[0.04]" : ""}`}>
                  <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-500 ${isActive ? "bg-primary/10" : "bg-accent"}`}>
                    <p.icon className={`w-[18px] h-[18px] transition-colors duration-500 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
                  </div>
                  <div className="min-w-0">
                    <div className={`text-sm font-semibold transition-colors duration-500 ${isActive ? "text-foreground" : "text-foreground/70"}`}>{p.title}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{p.desc}</div>
                  </div>
                  <div className="hidden lg:flex items-center ml-auto flex-shrink-0">
                    <div className={`w-8 h-px transition-all duration-700 ${isActive ? "bg-primary/40" : "bg-border"}`} />
                    <div className={`w-1.5 h-1.5 rounded-full transition-all duration-700 ${isActive ? "bg-primary scale-100" : "bg-border scale-75"}`} />
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="lg:sticky lg:top-32 self-start lg:px-6 lg:py-8">
            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.6, delay: 0.3 }} className="relative rounded-2xl border-2 border-primary/20 bg-primary/[0.03] p-6 text-center max-w-[280px] mx-auto">
              <div className="absolute inset-0 rounded-2xl bg-primary/5 blur-xl -z-10" />
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4"><Shield className="w-7 h-7 text-primary" /></div>
              <h3 className="text-base font-bold text-foreground mb-1">{t.coreTitle}</h3>
              <p className="text-xs text-muted-foreground mb-4 leading-relaxed">{t.coreDesc}</p>
              <div className="space-y-1.5 mb-5">
                {t.features.map((f) => (
                  <div key={f} className="flex items-center gap-2 text-xs text-foreground/80 justify-center"><span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse flex-shrink-0" />{f}</div>
                ))}
              </div>
              <div className="flex flex-wrap justify-center gap-1.5">
                {t.badges.map((b) => (<span key={b} className="inline-flex items-center px-2.5 py-1 rounded-md bg-primary/10 text-[10px] font-mono font-medium text-primary">{b}</span>))}
              </div>
            </motion.div>
          </div>

          <div className="space-y-3 lg:pl-6">
            <div className="text-[12px] font-medium tracking-widest uppercase text-muted-foreground mb-4 text-center lg:text-left">{t.resultsLabel}</div>
            {t.results.map((r, i) => {
              const isActive = i <= activeIndex;
              return (
                <motion.div key={r.title} initial={{ opacity: 0, x: 20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.4, delay: 0.15 + i * 0.07 }} className={`flex items-start gap-3 rounded-xl p-4 transition-all duration-500 ease-out ${isActive ? "bg-primary/[0.04]" : ""}`}>
                  <div className="hidden lg:flex items-center mr-auto flex-shrink-0 order-first">
                    <div className={`w-1.5 h-1.5 rounded-full transition-all duration-700 ${isActive ? "bg-primary scale-100" : "bg-border scale-75"}`} />
                    <div className={`w-8 h-px transition-all duration-700 ${isActive ? "bg-primary/40" : "bg-border"}`} />
                  </div>
                  <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-500 ${isActive ? "bg-primary/10" : "bg-accent"}`}>
                    <r.icon className={`w-[18px] h-[18px] transition-colors duration-500 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
                  </div>
                  <div className="min-w-0">
                    <div className={`text-sm font-semibold transition-colors duration-500 ${isActive ? "text-foreground" : "text-foreground/70"}`}>{r.title}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{r.desc}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <motion.p initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.6 }} className="text-center text-sm text-muted-foreground mt-14 max-w-2xl mx-auto">{t.bottom}</motion.p>
      </div>
    </section>
  );
};

export default Segments;
