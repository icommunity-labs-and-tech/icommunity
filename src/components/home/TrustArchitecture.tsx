import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Server, Shield, FileCheck } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const texts = {
  en: {
    badge: "HOW IT WORKS",
    title: "From digital events to <span>audit-ready evidence</span>",
    subtitle: "Turns digital events into verifiable audit evidence — without modifying existing systems",
    origins: [
      { label: "KYC Provider", sub: "Identity verification" },
      { label: "Fintech", sub: "Regulated operations" },
      { label: "Public Admin", sub: "Digital procedures" },
    ],
    targets: [
      { label: "Regulators", sub: "Regulatory oversight" },
      { label: "Auditors", sub: "Independent audit" },
      { label: "Third Parties", sub: "Public verification" },
    ],
    eventsLabel: "events",
    evidenceLabel: "evidence",
    coreTitle: "iCommunity Trust Layer",
    coreDesc: "Independent cryptographic layer with timestamp sealing and verifiable integrity",
    coreBadges: ["SHA-256 Hash", "Timestamp", "Immutable Record"],
    netTitle: "Distributed Certification Network",
    netDesc: "Cryptographic anchoring and external timestamp sealing",
    netBadges: ["Blockchain anchor", "External TSA"],
  },
  es: {
    badge: "CÓMO FUNCIONA",
    title: "De eventos digitales a <span>evidencia lista para auditoría</span>",
    subtitle: "Convierte eventos digitales en evidencia de auditoría verificable — sin modificar los sistemas existentes",
    origins: [
      { label: "Proveedor KYC", sub: "Verificación de identidad" },
      { label: "Fintech", sub: "Operaciones reguladas" },
      { label: "Admin. Pública", sub: "Trámites digitales" },
    ],
    targets: [
      { label: "Reguladores", sub: "Supervisión regulatoria" },
      { label: "Auditores", sub: "Auditoría independiente" },
      { label: "Terceros", sub: "Verificación pública" },
    ],
    eventsLabel: "eventos",
    evidenceLabel: "evidencia",
    coreTitle: "iCommunity Trust Layer",
    coreDesc: "Capa criptográfica independiente con sellado temporal e integridad verificable",
    coreBadges: ["Hash SHA-256", "Sello temporal", "Registro inmutable"],
    netTitle: "Red de Certificación Distribuida",
    netDesc: "Anclaje criptográfico y sellado temporal externo",
    netBadges: ["Anclaje blockchain", "TSA externa"],
  },
};

const FlowDots = ({ delay = 0 }: { delay: number }) => (
  <div className="relative h-px w-full bg-border overflow-visible">
    <motion.div className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary" initial={{ left: "-4px", opacity: 0 }} animate={{ left: "calc(100% + 4px)", opacity: [0, 1, 1, 0] }} transition={{ duration: 2.4, delay, repeat: Infinity, repeatDelay: 1.2, ease: "linear" }} />
  </div>
);

const TrustArchitecture = () => {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { lang } = useLanguage();
  const t = texts[lang];

  return (
    <section id="trust-architecture" ref={ref} className="ic-section py-24 md:py-32 bg-background overflow-hidden">
      <div className="ic-container">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16">
          <div className="inline-flex items-center rounded-full border border-border bg-accent px-3.5 py-1 mb-5">
            <span className="text-[12px] font-medium tracking-widest text-muted-foreground uppercase">{t.badge}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" dangerouslySetInnerHTML={{ __html: t.title.replace("<span>", '<span class="text-primary">').replace("</span>", "</span>") }} />
          <p className="text-muted-foreground text-lg max-w-4xl mx-auto">{t.subtitle}</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.2 }} className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-6 lg:gap-0">
          {/* Origins */}
          <div className="space-y-3">
            {t.origins.map((o, i) => (
              <motion.div key={o.label} initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }} className="flex items-center gap-3 rounded-xl border border-border bg-card p-4" style={{ boxShadow: "var(--ic-shadow-card)" }}>
                <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-accent flex items-center justify-center"><Server className="w-4 h-4 text-primary" /></div>
                <div className="min-w-0"><div className="text-sm font-semibold text-foreground">{o.label}</div><div className="text-xs text-muted-foreground">{o.sub}</div></div>
              </motion.div>
            ))}
          </div>

          {/* Flow dots left */}
          <div className="hidden lg:flex flex-col items-center justify-center gap-3 px-4 w-28">
            {t.origins.map((_, i) => (<div key={i} className="h-[60px] flex items-center w-full"><FlowDots delay={i * 0.6} /></div>))}
            <span className="text-[11px] font-mono text-muted-foreground mt-1 whitespace-nowrap">{t.eventsLabel}</span>
          </div>
          <div className="flex lg:hidden items-center justify-center py-2">
            <div className="flex flex-col items-center gap-1">
              <div className="w-px h-8 bg-border relative overflow-visible"><motion.div className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-primary" initial={{ top: "-4px", opacity: 0 }} animate={{ top: "calc(100% + 4px)", opacity: [0, 1, 1, 0] }} transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 1, ease: "linear" }} /></div>
              <span className="text-[11px] font-mono text-muted-foreground">{t.eventsLabel}</span>
            </div>
          </div>

          {/* Center - Trust Layer */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.6, delay: 0.5 }} className="relative rounded-2xl border-2 border-primary/20 bg-primary/[0.03] p-6 text-center">
            <div className="absolute inset-0 rounded-2xl bg-primary/5 blur-xl -z-10" />
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4"><Shield className="w-7 h-7 text-primary" /></div>
            <h3 className="text-lg font-bold text-foreground mb-1">{t.coreTitle}</h3>
            <p className="text-xs text-muted-foreground mb-4 max-w-[220px] mx-auto">{t.coreDesc}</p>
            <div className="flex flex-wrap justify-center gap-2">
              {t.coreBadges.map((b) => (
                <span key={b} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-primary/10 text-xs font-mono text-primary"><span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />{b}</span>
              ))}
            </div>
            <div className="mx-auto mt-4 w-px h-6 bg-border relative overflow-visible">
              <motion.div className="absolute left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-primary" initial={{ top: "-3px", opacity: 0 }} animate={{ top: "calc(100% + 3px)", opacity: [0, 1, 1, 0] }} transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 1.4, ease: "linear" }} />
            </div>
            <div className="rounded-xl border border-dashed border-primary/30 bg-primary/[0.02] px-4 py-3 text-center">
              <div className="text-xs font-semibold text-foreground mb-1">{t.netTitle}</div>
              <p className="text-[11px] text-muted-foreground mb-2 max-w-[200px] mx-auto">{t.netDesc}</p>
              <div className="flex flex-wrap justify-center gap-1.5">
                {t.netBadges.map((b) => (
                  <span key={b} className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-accent text-[10px] font-mono text-muted-foreground"><span className="w-1 h-1 rounded-full bg-primary/60" />{b}</span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Flow dots right */}
          <div className="hidden lg:flex flex-col items-center justify-center gap-3 px-4 w-28">
            {t.targets.map((_, i) => (<div key={i} className="h-[60px] flex items-center w-full"><FlowDots delay={1.8 + i * 0.6} /></div>))}
            <span className="text-[11px] font-mono text-muted-foreground mt-1 whitespace-nowrap">{t.evidenceLabel}</span>
          </div>
          <div className="flex lg:hidden items-center justify-center py-2">
            <div className="flex flex-col items-center gap-1">
              <div className="w-px h-8 bg-border relative overflow-visible"><motion.div className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-primary" initial={{ top: "-4px", opacity: 0 }} animate={{ top: "calc(100% + 4px)", opacity: [0, 1, 1, 0] }} transition={{ duration: 1.6, delay: 1.8, repeat: Infinity, repeatDelay: 1, ease: "linear" }} /></div>
              <span className="text-[11px] font-mono text-muted-foreground">{t.evidenceLabel}</span>
            </div>
          </div>

          {/* Targets */}
          <div className="space-y-3">
            {t.targets.map((tgt, i) => (
              <motion.div key={tgt.label} initial={{ opacity: 0, x: 20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5, delay: 0.7 + i * 0.1 }} className="flex items-center gap-3 rounded-xl border border-border bg-card p-4" style={{ boxShadow: "var(--ic-shadow-card)" }}>
                <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-accent flex items-center justify-center"><FileCheck className="w-4 h-4 text-primary" /></div>
                <div className="min-w-0"><div className="text-sm font-semibold text-foreground">{tgt.label}</div><div className="text-xs text-muted-foreground">{tgt.sub}</div></div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustArchitecture;
