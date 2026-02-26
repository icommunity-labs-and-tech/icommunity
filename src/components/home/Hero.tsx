import { motion, AnimatePresence } from "framer-motion";
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

          {/* Right: Diagram */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="hidden lg:block"
          >
            <HeroDiagram />
          </motion.div>
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

const steps = [
  { step: "1", title: "Evento", desc: "Verificación KYC completada" },
  { step: "2", title: "Certificación", desc: "Hash + sello temporal + registro inmutable" },
  { step: "3", title: "Evidencia", desc: "Recibo verificable y auditable" },
];

const HeroDiagram = () => {
  const now = new Date();
  const ts = `${now.getUTCFullYear()}-${String(now.getUTCMonth() + 1).padStart(2, "0")}-${String(now.getUTCDate()).padStart(2, "0")}T${String(now.getUTCHours()).padStart(2, "0")}:${String(now.getUTCMinutes()).padStart(2, "0")}:${String(now.getUTCSeconds()).padStart(2, "0")}Z`;

  return (
    <div className="relative">
      {/* Subtle background processing glow */}
      <motion.div
        className="absolute -inset-px rounded-2xl"
        style={{
          background: "linear-gradient(135deg, hsl(225 86% 58% / 0.08), hsl(225 86% 68% / 0.04), hsl(225 86% 58% / 0.08))",
        }}
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 8, ease: "easeInOut", repeat: Infinity }}
      />

      <div className="relative rounded-2xl border border-primary-foreground/10 bg-primary-foreground/[0.04] backdrop-blur-sm p-8">
        {/* Header */}
        <div className="flex items-center gap-2 mb-6">
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-green-400/80"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, ease: "easeInOut", repeat: Infinity }}
          />
          <span className="text-[10px] font-mono uppercase tracking-widest text-primary-foreground/30">Trust Pipeline — Active</span>
        </div>

        <div className="flex flex-col gap-0">
          {steps.map((s, i) => (
            <div key={s.step}>
              {/* Step */}
              <motion.div
                className="flex items-start gap-4 py-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, delay: i * 1.5, ease: "easeOut" }}
              >
                {/* Step indicator with slow pulse */}
                <div className="relative flex-shrink-0">
                  <motion.div
                    className="w-9 h-9 rounded-lg border border-primary-foreground/10 bg-primary-foreground/[0.06] flex items-center justify-center"
                    animate={{ borderColor: ["hsl(225 86% 58% / 0.1)", "hsl(225 86% 58% / 0.25)", "hsl(225 86% 58% / 0.1)"] }}
                    transition={{ duration: 4, ease: "easeInOut", repeat: Infinity, delay: i * 2 }}
                  >
                    <span className="text-primary-foreground/50 font-mono text-xs">{s.step}</span>
                  </motion.div>
                </div>
                <div className="flex-1 min-w-0 pt-1">
                  <div className="text-sm font-medium text-primary-foreground/80">{s.title}</div>
                  <div className="text-xs text-primary-foreground/35 mt-0.5">{s.desc}</div>
                </div>
              </motion.div>

              {/* Connector line between steps */}
              {i < steps.length - 1 && (
                <div className="ml-[17px] relative h-4">
                  <div className="absolute left-0 top-0 w-px h-full bg-primary-foreground/8" />
                  <motion.div
                    className="absolute left-0 top-0 w-px bg-ic-blue-glow/30"
                    animate={{ height: ["0%", "100%", "100%"] }}
                    transition={{ duration: 3, delay: i * 2 + 1, ease: "easeInOut", repeat: Infinity, repeatDelay: 6 }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Evidence output */}
        <motion.div
          className="mt-5 rounded-xl border border-primary-foreground/8 bg-primary-foreground/[0.03] p-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 4, ease: "easeOut" }}
        >
          <div className="flex items-center gap-2 mb-3">
            <motion.div
              className="w-2 h-2 rounded-full bg-green-400/80"
              animate={{
                opacity: [1, 0.3, 1],
                boxShadow: ["0 0 0px hsl(142 69% 58% / 0)", "0 0 6px hsl(142 69% 58% / 0.3)", "0 0 0px hsl(142 69% 58% / 0)"],
              }}
              transition={{ duration: 2.5, ease: "easeInOut", repeat: Infinity }}
            />
            <span className="text-[10px] font-mono uppercase tracking-wider text-primary-foreground/40">Evidence Output</span>
          </div>
          <div className="space-y-1.5 font-mono text-[11px] text-primary-foreground/35">
            <div><span className="text-ic-blue-glow/60">event:</span> kyc_verification</div>
            <motion.div
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 8, ease: "easeInOut", repeat: Infinity }}
            >
              <span className="text-ic-blue-glow/60">timestamp:</span> {ts}
            </motion.div>
            <div><span className="text-ic-blue-glow/60">hash:</span> sha256:a1b2c3…f8e9</div>
            <div>
              <span className="text-ic-blue-glow/60">status:</span>{" "}
              <motion.span
                className="text-green-400/80 inline-block"
                animate={{
                  opacity: [0.7, 1, 0.7],
                  textShadow: ["0 0 0px hsl(142 69% 58% / 0)", "0 0 8px hsl(142 69% 58% / 0.2)", "0 0 0px hsl(142 69% 58% / 0)"],
                }}
                transition={{ duration: 4, ease: "easeInOut", repeat: Infinity, delay: 1.5 }}
              >
                verified
              </motion.span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
export default Hero;
