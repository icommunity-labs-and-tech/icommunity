import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Server, Shield, FileCheck } from "lucide-react";

/* ── Origin systems ── */
const origins = [
  { label: "KYC Provider", sub: "Verificación de identidad" },
  { label: "Fintech", sub: "Operaciones reguladas" },
  { label: "Administración", sub: "Trámites digitales" },
];

/* ── Output targets ── */
const targets = [
  { label: "Reguladores", sub: "Supervisión normativa" },
  { label: "Auditores", sub: "Auditoría independiente" },
  { label: "Terceros", sub: "Verificación pública" },
];

/* ── Animated flowing dots ── */
const FlowDots = ({ delay = 0 }: { delay: number }) => (
  <div className="relative h-px w-full bg-border overflow-visible">
    <motion.div
      className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary"
      initial={{ left: "-4px", opacity: 0 }}
      animate={{ left: "calc(100% + 4px)", opacity: [0, 1, 1, 0] }}
      transition={{
        duration: 2.4,
        delay,
        repeat: Infinity,
        repeatDelay: 1.2,
        ease: "linear",
      }}
    />
  </div>
);

const TrustArchitecture = () => {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="ic-section bg-background overflow-hidden">
      <div className="ic-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Arquitectura de confianza
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Una capa independiente que conecta sistemas digitales con
            supervisión regulatoria, sin modificar tu infraestructura.
          </p>
        </motion.div>

        {/* Diagram */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-6 lg:gap-0"
        >
          {/* ── Column 1: Origin systems ── */}
          <div className="space-y-3">
            {origins.map((o, i) => (
              <motion.div
                key={o.label}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                className="flex items-center gap-3 rounded-xl border border-border bg-card p-4"
                style={{ boxShadow: "var(--ic-shadow-card)" }}
              >
                <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-accent flex items-center justify-center">
                  <Server className="w-4 h-4 text-primary" />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-foreground">{o.label}</div>
                  <div className="text-xs text-muted-foreground">{o.sub}</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* ── Arrow 1 ── */}
          <div className="hidden lg:flex flex-col items-center justify-center gap-3 px-4 w-28">
            {origins.map((_, i) => (
              <div key={i} className="h-[60px] flex items-center w-full">
                <FlowDots delay={i * 0.6} />
              </div>
            ))}
            <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground/60 mt-16 whitespace-nowrap">
              Eventos digitales
            </span>
          </div>

          {/* Mobile arrow */}
          <div className="flex lg:hidden items-center justify-center py-2">
            <div className="flex flex-col items-center gap-1">
              <div className="w-px h-8 bg-border relative overflow-visible">
                <motion.div
                  className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-primary"
                  initial={{ top: "-4px", opacity: 0 }}
                  animate={{ top: "calc(100% + 4px)", opacity: [0, 1, 1, 0] }}
                  transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 1, ease: "linear" }}
                />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground/60">Eventos digitales</span>
            </div>
          </div>

          {/* ── Column 2: Trust Layer ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="relative rounded-2xl border-2 border-primary/20 bg-primary/[0.03] p-6 text-center"
          >
            {/* Glow ring */}
            <div className="absolute inset-0 rounded-2xl bg-primary/5 blur-xl -z-10" />

            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Shield className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-1">
              iCommunity Trust Layer
            </h3>
            <p className="text-xs text-muted-foreground mb-4 max-w-[220px] mx-auto">
              Capa criptográfica independiente con sello temporal e integridad verificable
            </p>

            {/* Status pills */}
            <div className="flex flex-wrap justify-center gap-2">
              {["Hash SHA-256", "Sello temporal", "Registro inmutable"].map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-primary/10 text-xs font-mono text-primary"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  {t}
                </span>
              ))}
            </div>
          </motion.div>

          {/* ── Arrow 2 ── */}
          <div className="hidden lg:flex flex-col items-center justify-center gap-3 px-4 w-28">
            {targets.map((_, i) => (
              <div key={i} className="h-[60px] flex items-center w-full">
                <FlowDots delay={1.8 + i * 0.6} />
              </div>
            ))}
            <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground/60 mt-16 whitespace-nowrap">
              Evidencia verificable
            </span>
          </div>

          {/* Mobile arrow */}
          <div className="flex lg:hidden items-center justify-center py-2">
            <div className="flex flex-col items-center gap-1">
              <div className="w-px h-8 bg-border relative overflow-visible">
                <motion.div
                  className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-primary"
                  initial={{ top: "-4px", opacity: 0 }}
                  animate={{ top: "calc(100% + 4px)", opacity: [0, 1, 1, 0] }}
                  transition={{ duration: 1.6, delay: 1.8, repeat: Infinity, repeatDelay: 1, ease: "linear" }}
                />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground/60">Evidencia verificable</span>
            </div>
          </div>

          {/* ── Column 3: Targets ── */}
          <div className="space-y-3">
            {targets.map((t, i) => (
              <motion.div
                key={t.label}
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.7 + i * 0.1 }}
                className="flex items-center gap-3 rounded-xl border border-border bg-card p-4"
                style={{ boxShadow: "var(--ic-shadow-card)" }}
              >
                <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-accent flex items-center justify-center">
                  <FileCheck className="w-4 h-4 text-primary" />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-foreground">{t.label}</div>
                  <div className="text-xs text-muted-foreground">{t.sub}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustArchitecture;
