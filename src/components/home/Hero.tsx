import { motion } from "framer-motion";
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
            animate={{ opacity: 1, y: [0, -8, 0] }}
            transition={{
              opacity: { duration: 0.7, delay: 0.2, ease: "easeOut" },
              y: { duration: 7.5, ease: "easeInOut", repeat: Infinity, delay: 0.9 },
            }}
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

const HeroDiagram = () => (
  <div className="relative">
    <div className="rounded-2xl border border-primary-foreground/10 bg-primary-foreground/5 backdrop-blur-sm p-8">
      <div className="flex flex-col gap-4">
        {/* Step flow */}
        {[
          { step: "1", title: "Evento", desc: "Verificación KYC completada" },
          { step: "2", title: "Certificación", desc: "Hash + sello temporal + registro inmutable" },
          { step: "3", title: "Evidencia", desc: "Recibo verificable y auditable" },
        ].map((s, i) => (
          <div key={s.step} className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg ic-gradient-cta flex items-center justify-center flex-shrink-0">
              <span className="text-primary-foreground font-bold text-sm">{s.step}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-primary-foreground">{s.title}</div>
              <div className="text-xs text-primary-foreground/50 mt-0.5">{s.desc}</div>
            </div>
            {i < 2 && (
              <div className="absolute left-[35px] mt-10 w-px h-4 bg-ic-blue-glow/30" style={{ position: 'relative', left: 0, marginTop: 0 }} />
            )}
          </div>
        ))}

        {/* Visual receipt */}
        <div className="mt-4 rounded-xl border border-ic-blue-glow/20 bg-primary-foreground/5 p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full bg-green-400" />
            <span className="text-xs font-mono text-primary-foreground/60">Evidence Receipt</span>
          </div>
          <div className="space-y-1.5 font-mono text-[11px] text-primary-foreground/40">
            <div><span className="text-ic-blue-glow">event_type:</span> kyc_verification</div>
            <div><span className="text-ic-blue-glow">timestamp:</span> 2026-02-26T10:32:00Z</div>
            <div><span className="text-ic-blue-glow">integrity:</span> sha256:a1b2c3…</div>
            <div><span className="text-ic-blue-glow">status:</span> <span className="text-green-400">verified</span></div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Hero;
