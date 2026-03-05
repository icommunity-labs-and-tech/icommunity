import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import logoMadrid from "@/assets/logo-ayto-madrid-gray-4.png";
import { useLanguage } from "@/i18n/LanguageContext";

declare global {
  interface Window {
    Gradient: new () => { initGradient: (sel: string) => void; disconnect: () => void };
  }
}

const texts = {
  en: {
    badge: "Trust infrastructure for regulated systems",
    h1: "Turn digital events into auditable evidence",
    sub: "Transform digital processes into verifiable evidence, ready for audit and regulatory oversight from the origin",
    bullets: ["Verifiable digital evidence", "Compliance-ready infrastructure", "Trust layer for AI and automated systems"],
    cta1: "Request technical demo",
    cta2: "View architecture",
    steps: [
      { step: "1", title: "Event", desc: "KYC verification completed" },
      { step: "2", title: "Certification", desc: "Hash + timestamp + immutable record" },
      { step: "3", title: "Evidence", desc: "Verifiable and auditable receipt" },
    ],
    receiptLabel: "Evidence Receipt",
    madridAlt: "Madrid City Council",
    madridText: "iCommunity powers document traceability in public procurement processes for the Madrid City Council",
  },
  es: {
    badge: "Infraestructura de confianza para sistemas regulados",
    h1: "Convierte eventos digitales en evidencia auditable",
    sub: "Transforma procesos digitales en evidencia verificable, lista para auditoría y supervisión regulatoria desde el origen",
    bullets: ["Evidencia digital verificable", "Infraestructura preparada para cumplimiento normativo", "Capa de confianza para IA y sistemas automatizados"],
    cta1: "Solicitar demo técnica",
    cta2: "Ver arquitectura",
    steps: [
      { step: "1", title: "Evento", desc: "Verificación KYC completada" },
      { step: "2", title: "Certificación", desc: "Hash + sello temporal + registro inmutable" },
      { step: "3", title: "Evidencia", desc: "Recibo verificable y auditable" },
    ],
    receiptLabel: "Recibo de Evidencia",
    madridAlt: "Ayuntamiento de Madrid",
    madridText: "iCommunity impulsa la trazabilidad documental en procesos de contratación pública del Ayuntamiento de Madrid",
  },
};

const Hero = ({ onOpenModal }: { onOpenModal?: () => void }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { lang } = useLanguage();
  const t = texts[lang];

  useEffect(() => {
    if (videoRef.current) videoRef.current.playbackRate = 0.5;
  }, []);

  useEffect(() => {
    let script = document.querySelector('script[src="/gradient.js"]') as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.src = "/gradient.js";
      script.async = true;
      document.head.appendChild(script);
    }
    let gradient: { initGradient: (s: string) => void; disconnect: () => void } | null = null;
    const init = () => {
      if (window.Gradient) {
        gradient = new window.Gradient();
        gradient.initGradient("#gradient-canvas");
      }
    };
    if (window.Gradient) init();
    else script.addEventListener("load", init);
    return () => { gradient?.disconnect(); };
  }, []);

  return (
    <section className="hero pt-32 pb-20 md:pt-40 md:pb-28">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
      >
        <source src="/hero-bg.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 z-[1]" style={{ background: 'rgba(5,10,25,0.25)' }} />
      <div className="hero-noise" />

      <div className="hero-content ic-container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="inline-flex items-center rounded-full border border-primary-foreground/10 bg-primary-foreground/5 px-3.5 py-1 mb-6">
              <span className="text-[11px] font-semibold tracking-widest text-primary-foreground uppercase">{t.badge}</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold leading-[1.1] text-primary-foreground mb-6 max-w-[540px]">
              {t.h1}
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/70 mb-8 max-w-[480px] leading-relaxed">
              {t.sub}
            </p>

            <div className="flex flex-col gap-3 mb-10 max-w-[480px]">
              {t.bullets.map((b) => (
                <div key={b} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-ic-blue-glow" />
                  <span className="text-primary-foreground/80 text-sm font-medium">{b}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 justify-center max-w-[480px]">
              <button onClick={onOpenModal} className="inline-flex items-center justify-center rounded-lg ic-gradient-cta px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity shadow-lg shadow-ic-blue/20">
                {t.cta1}
              </button>
              <button
                onClick={() => {
                  const el = document.getElementById("trust-architecture");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center justify-center rounded-lg border border-primary-foreground/20 px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary-foreground/5 transition-colors"
              >
                {t.cta2}
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="hidden lg:block"
          >
            <HeroDiagram steps={t.steps} receiptLabel={t.receiptLabel} madridAlt={t.madridAlt} madridText={t.madridText} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const HeroDiagram = ({ steps, receiptLabel, madridAlt, madridText }: { steps: { step: string; title: string; desc: string }[]; receiptLabel: string; madridAlt: string; madridText: string }) => {
  const now = new Date();
  const ts = `${now.getUTCFullYear()}-${String(now.getUTCMonth() + 1).padStart(2, "0")}-${String(now.getUTCDate()).padStart(2, "0")}T${String(now.getUTCHours()).padStart(2, "0")}:${String(now.getUTCMinutes()).padStart(2, "0")}:${String(now.getUTCSeconds()).padStart(2, "0")}Z`;

  return (
    <div className="relative">
      <div className="rounded-2xl border border-primary-foreground/20 bg-primary-foreground/10 backdrop-blur-md p-8 shadow-lg shadow-black/20">
        <div className="flex flex-col gap-4">
          {steps.map((s, i) => (
            <div key={s.step} className="flex items-start gap-4">
              <motion.div
                className="w-10 h-10 rounded-lg ic-gradient-cta flex items-center justify-center flex-shrink-0"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2.5, ease: "easeInOut", repeat: Infinity, delay: i * 1.8 }}
              >
                <span className="text-primary-foreground font-bold text-sm">{s.step}</span>
              </motion.div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-bold text-primary-foreground drop-shadow-sm">{s.title}</div>
                <div className="text-xs text-primary-foreground/80 mt-0.5 font-medium">{s.desc}</div>
              </div>
            </div>
          ))}

          <div className="mt-4 rounded-[14px] border border-ic-blue-glow/25 p-6" style={{ background: 'rgba(10,15,40,0.08)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }}>
            <div className="flex items-center gap-2 mb-3">
              <motion.div
                className="w-2 h-2 rounded-full bg-green-400"
                animate={{ opacity: [1, 0.4, 1], scale: [1, 0.9, 1] }}
                transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
              />
              <span className="text-xs font-mono text-primary-foreground/80 font-medium">{receiptLabel}</span>
            </div>
            <div className="space-y-1.5 font-mono text-[11px] text-primary-foreground/70">
              <div><span className="font-bold text-primary-foreground">event_type:</span> kyc_verification</div>
              <motion.div
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
              >
                <span className="font-bold text-primary-foreground">timestamp:</span> {ts}
              </motion.div>
              <div><span className="font-bold text-primary-foreground">integrity:</span> sha256:a1b2c3…</div>
              <div>
                <span className="font-bold text-primary-foreground">status:</span>{" "}
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

      <div className="flex items-center gap-3 mt-6 w-full">
        <img src={logoMadrid} alt={madridAlt} className="h-11 w-auto flex-shrink-0 brightness-0 invert" />
        <span className="text-sm text-primary-foreground leading-tight flex-1">
          {madridText}
        </span>
      </div>
    </div>
  );
};
export default Hero;
