import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Shield, Clock, Eye, CheckCircle } from "lucide-react";

const trustPoints = [
  { icon: Shield, label: "Integridad" },
  { icon: Clock, label: "Trazabilidad temporal" },
  { icon: Eye, label: "Privacidad / RGPD" },
  { icon: CheckCircle, label: "Verificación" },
];

const Hero = () => {
  return (
    <section className="hero pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="hero-overlay" />
      <div className="hero-noise" />

      <div className="hero-content ic-container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold leading-[1.1] text-primary-foreground mb-6">
              Infraestructura Independiente de Confianza Regulatoria
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/70 mb-8 max-w-lg leading-relaxed">
              Convertimos eventos de identidad digital en evidencia verificable, independiente y auditable.
            </p>

            {/* Bullets */}
            <div className="flex flex-col gap-3 mb-10">
              {["Auditoría-ready", "Integración vía API", "Capa neutral para proveedores KYC"].map((b) => (
                <div key={b} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-ic-blue-glow" />
                  <span className="text-primary-foreground/80 text-sm font-medium">{b}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <a href="#demo" className="inline-flex items-center justify-center rounded-lg ic-gradient-cta px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity shadow-lg shadow-ic-blue/20">
                Solicitar demo
              </a>
              <a href="#como-funciona" className="inline-flex items-center justify-center rounded-lg border border-primary-foreground/20 px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary-foreground/5 transition-colors">
                Ver cómo funciona
              </a>
            </div>
          </motion.div>

          {/* Right: Diagram with parallax */}
          <ParallaxPanel />
        </div>

        {/* Trust points */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {trustPoints.map((tp) => (
            <div key={tp.label} className="flex items-center gap-3 rounded-xl bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10 px-5 py-4">
              <tp.icon className="w-5 h-5 text-ic-blue-glow flex-shrink-0" />
              <span className="text-sm font-medium text-primary-foreground/80">{tp.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const ParallaxPanel = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
      className="hidden lg:block"
    >
      <motion.div style={{ y }}>
        <HeroDiagram />
      </motion.div>
    </motion.div>
  );
};

const steps = [
  { step: "1", title: "Evento", desc: "Verificación KYC completada" },
  { step: "2", title: "Certificación", desc: "Hash + sello temporal + registro inmutable" },
  { step: "3", title: "Evidencia", desc: "Recibo verificable y auditable" },
];

const CYCLE_DURATION = 7;

const HeroDiagram = () => {
  const now = new Date();
  const ts = `${now.getUTCFullYear()}-${String(now.getUTCMonth() + 1).padStart(2, "0")}-${String(now.getUTCDate()).padStart(2, "0")}T${String(now.getUTCHours()).padStart(2, "0")}:${String(now.getUTCMinutes()).padStart(2, "0")}:${String(now.getUTCSeconds()).padStart(2, "0")}Z`;

  // Each step highlights when the signal passes through it
  const stepHighlight = (index: number) => {
    const offset = (index / 3) * CYCLE_DURATION;
    return {
      opacity: [0.55, 0.55, 1, 1, 0.55, 0.55],
      scale: [1, 1, 1.04, 1.04, 1, 1],
    };
  };

  const stepTiming = (index: number) => ({
    duration: CYCLE_DURATION,
    ease: "easeInOut" as const,
    repeat: Infinity,
    times: [0, index / 3 - 0.05, index / 3, index / 3 + 0.08, index / 3 + 0.16, 1],
  });

  return (
    <div className="relative">
      <div className="rounded-2xl border border-primary-foreground/10 bg-primary-foreground/5 backdrop-blur-sm p-8">
        <div className="relative flex flex-col gap-0">
          {/* Vertical connection line */}
          <div className="absolute left-[19px] top-[20px] bottom-[20px] w-px bg-primary-foreground/10">
            {/* Traveling signal */}
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 w-1.5 h-6 rounded-full"
              style={{
                background: "radial-gradient(ellipse at center, hsl(var(--ic-blue-glow) / 0.7), transparent)",
                boxShadow: "0 0 8px 2px hsl(var(--ic-blue-glow) / 0.3)",
              }}
              animate={{ top: ["-4%", "96%"] }}
              transition={{
                duration: CYCLE_DURATION,
                ease: "linear",
                repeat: Infinity,
              }}
            />
          </div>

          {/* Steps */}
          {steps.map((s, i) => (
            <motion.div
              key={s.step}
              className="flex items-start gap-4 py-4 relative z-10"
              animate={stepHighlight(i)}
              transition={stepTiming(i)}
            >
              <div className="w-10 h-10 rounded-lg ic-gradient-cta flex items-center justify-center flex-shrink-0">
                <span className="text-primary-foreground font-bold text-sm">{s.step}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-primary-foreground">{s.title}</div>
                <div className="text-xs text-primary-foreground/50 mt-0.5">{s.desc}</div>
              </div>
            </motion.div>
          ))}

          {/* Visual receipt */}
          <motion.div
            className="mt-2 rounded-xl border border-ic-blue-glow/20 bg-primary-foreground/5 p-5 relative z-10"
            animate={{ opacity: [0.6, 0.6, 0.6, 1, 1, 0.6] }}
            transition={{
              duration: CYCLE_DURATION,
              ease: "easeInOut",
              repeat: Infinity,
              times: [0, 0.55, 0.7, 0.78, 0.88, 1],
            }}
          >
            <div className="flex items-center gap-2 mb-3">
              <motion.div
                className="w-2 h-2 rounded-full bg-green-400"
                animate={{ opacity: [1, 0.4, 1], scale: [1, 0.9, 1] }}
                transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
              />
              <span className="text-xs font-mono text-primary-foreground/60">Evidence Receipt</span>
            </div>
            <div className="space-y-1.5 font-mono text-[11px] text-primary-foreground/40">
              <div><span className="text-ic-blue-glow">event_type:</span> kyc_verification</div>
              <motion.div
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
              >
                <span className="text-ic-blue-glow">timestamp:</span> {ts}
              </motion.div>
              <div><span className="text-ic-blue-glow">integrity:</span> sha256:a1b2c3…</div>
              <div>
                <span className="text-ic-blue-glow">status:</span>{" "}
                <motion.span
                  className="text-green-400 inline-block"
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 3, ease: "easeInOut", repeat: Infinity, delay: 1 }}
                >
                  verified
                </motion.span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
export default Hero;
