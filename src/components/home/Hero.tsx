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
            {/* Tag */}
            <div className="inline-flex items-center rounded-full border border-primary-foreground/15 bg-primary-foreground/5 px-3.5 py-1 mb-6">
              <span className="text-xs font-medium tracking-wide text-primary-foreground/60 uppercase">
                Infraestructura independiente de confianza regulatoria
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold leading-[1.1] text-primary-foreground mb-6">
              La capa de confianza que conecta sistemas digitales con supervisión regulatoria.
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/70 mb-8 max-w-lg leading-relaxed">
              iCommunity convierte eventos digitales en evidencia verificable, audit-ready y compatible con regulación europea desde origen.
            </p>

            {/* Bullets */}
            <div className="flex flex-col gap-3 mb-10">
              {["Audit-ready por diseño", "Integración vía API / SDK", "Evidencia independiente verificable"].map((b) => (
                <div key={b} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-ic-blue-glow" />
                  <span className="text-primary-foreground/80 text-sm font-medium">{b}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <a href="#demo" className="inline-flex items-center justify-center rounded-lg ic-gradient-cta px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity shadow-lg shadow-ic-blue/20">
                Solicitar demo técnica
              </a>
              <button
                onClick={() => {
                  const el = document.getElementById("arquitectura-de-confianza");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center justify-center rounded-lg border border-primary-foreground/20 px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary-foreground/5 transition-colors"
              >
                Ver arquitectura
              </button>
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
      <div className="rounded-2xl border border-primary-foreground/10 bg-primary-foreground/5 backdrop-blur-sm p-8">
        <div className="flex flex-col gap-4">
          {/* Step flow with staggered progress pulse */}
          {steps.map((s, i) => (
            <div key={s.step} className="flex items-start gap-4">
              <motion.div
                className="w-10 h-10 rounded-lg ic-gradient-cta flex items-center justify-center flex-shrink-0"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{
                  duration: 2.5,
                  ease: "easeInOut",
                  repeat: Infinity,
                  delay: i * 1.8,
                }}
              >
                <span className="text-primary-foreground font-bold text-sm">{s.step}</span>
              </motion.div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-primary-foreground">{s.title}</div>
                <div className="text-xs text-primary-foreground/50 mt-0.5">{s.desc}</div>
              </div>
            </div>
          ))}

          {/* Visual receipt */}
          <div className="mt-4 rounded-xl border border-ic-blue-glow/20 bg-primary-foreground/5 p-5">
            <div className="flex items-center gap-2 mb-3">
              {/* Pulsing green dot */}
              <motion.div
                className="w-2 h-2 rounded-full bg-green-400"
                animate={{ opacity: [1, 0.4, 1], scale: [1, 0.9, 1] }}
                transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
              />
              <span className="text-xs font-mono text-primary-foreground/60">Evidence Receipt</span>
            </div>
            <div className="space-y-1.5 font-mono text-[11px] text-primary-foreground/40">
              <div><span className="text-ic-blue-glow">event_type:</span> kyc_verification</div>
              {/* Timestamp with slow refresh animation */}
              <motion.div
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
              >
                <span className="text-ic-blue-glow">timestamp:</span> {ts}
              </motion.div>
              <div><span className="text-ic-blue-glow">integrity:</span> sha256:a1b2c3…</div>
              {/* Verified status gentle pulse */}
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
          </div>
        </div>
      </div>
    </div>
  );
};
export default Hero;
