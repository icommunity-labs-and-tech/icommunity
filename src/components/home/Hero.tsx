import { useEffect, useRef } from "react";
import { motion } from "framer-motion";


declare global {
  interface Window {
    Gradient: new () => { initGradient: (sel: string) => void; disconnect: () => void };
  }
}

const Hero = ({ onOpenModal }: { onOpenModal?: () => void }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

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
      {/* Video background */}
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
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 z-[1]" style={{ background: 'rgba(5,10,25,0.25)' }} />
      <div className="hero-noise" />

      <div className="hero-content ic-container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            {/* Eyebrow */}
            <div className="inline-flex items-center rounded-full border border-primary-foreground/10 bg-primary-foreground/5 px-3.5 py-1 mb-6">
              <span className="text-[11px] font-semibold tracking-widest text-primary-foreground uppercase">
                Infraestructura de confianza para sistemas regulados
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold leading-[1.1] text-primary-foreground mb-6 max-w-[540px]">
              Convierte eventos digitales en pruebas auditables
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/70 mb-8 max-w-[480px] leading-relaxed">
              Transforma procesos digitales en evidencia verificable, lista para auditoría y supervisión regulatoria desde el origen.
            </p>

            {/* Bullets */}
            <div className="flex flex-col gap-3 mb-10 max-w-[480px]">
              {["Trazabilidad auditada desde el origen", "Integración directa vía API", "Certificación independiente para reguladores"].map((b) => (
                <div key={b} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-ic-blue-glow" />
                  <span className="text-primary-foreground/80 text-sm font-medium">{b}</span>
                </div>
              ))}
            </div>

            {/* CTAs - centered under bullets */}
            <div className="flex flex-wrap gap-4 justify-center max-w-[480px]">
              <button onClick={onOpenModal} className="inline-flex items-center justify-center rounded-lg ic-gradient-cta px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity shadow-lg shadow-ic-blue/20">
                Solicitar demo técnica
              </button>
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
      </div>
    </section>
  );
};

/* ── Architecture Diagram ── */

const origins = ["KYC Provider", "Fintech", "Administración"];
const targets = ["Reguladores", "Auditores", "Terceros"];

const boxClass =
  "px-3 py-2 rounded-lg border border-primary-foreground/25 bg-primary-foreground/[0.07] backdrop-blur-sm text-[11px] font-semibold text-primary-foreground/80 text-center whitespace-nowrap";

const HeroDiagram = () => {
  const now = new Date();
  const ts = `${now.getUTCFullYear()}-${String(now.getUTCMonth() + 1).padStart(2, "0")}-${String(now.getUTCDate()).padStart(2, "0")}T${String(now.getUTCHours()).padStart(2, "0")}:${String(now.getUTCMinutes()).padStart(2, "0")}:${String(now.getUTCSeconds()).padStart(2, "0")}Z`;

  return (
    <div className="relative w-full">
      {/* Evidence Receipt – glass card floating on top */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="relative z-10 mx-auto mb-5 max-w-[340px] rounded-xl border border-primary-foreground/20 bg-primary-foreground/[0.08] backdrop-blur-xl p-5 shadow-lg shadow-black/20"
      >
        <div className="flex items-center gap-2 mb-3">
          <motion.div
            className="w-2 h-2 rounded-full bg-green-400"
            animate={{ opacity: [1, 0.4, 1], scale: [1, 0.9, 1] }}
            transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
          />
          <span className="text-xs font-mono text-primary-foreground font-semibold tracking-wide">Evidence Receipt</span>
        </div>
        <div className="space-y-1 font-mono text-[11px] leading-relaxed">
          <div><span className="text-ic-blue-glow">event_type:</span> <span className="text-primary-foreground/90">kyc_verification</span></div>
          <motion.div animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}>
            <span className="text-ic-blue-glow">timestamp:</span> <span className="text-primary-foreground/90">{ts}</span>
          </motion.div>
          <div><span className="text-ic-blue-glow">integrity_hash:</span> <span className="text-primary-foreground/90">sha256:a1b2c3…f8e9</span></div>
          <div><span className="text-ic-blue-glow">tsa:</span> <span className="text-primary-foreground/90">rfc3161:verified</span></div>
          <div><span className="text-ic-blue-glow">anchor:</span> <span className="text-primary-foreground/90">eth:0x7f3a…</span></div>
          <div>
            <span className="text-ic-blue-glow">status:</span>{" "}
            <motion.span
              className="text-green-400 font-semibold inline-block"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 3, ease: "easeInOut", repeat: Infinity, delay: 1 }}
            >
              verified ✓
            </motion.span>
          </div>
        </div>
      </motion.div>

      {/* Architecture line-art diagram */}
      <div className="flex items-center justify-center gap-0">
        {/* Left column – origins */}
        <div className="flex flex-col gap-3 flex-shrink-0">
          {origins.map((label) => (
            <div key={label} className={boxClass}>{label}</div>
          ))}
        </div>

        {/* Left arrows */}
        <div className="flex flex-col gap-3 flex-shrink-0 w-10">
          {origins.map((_, i) => (
            <div key={i} className="h-[34px] flex items-center">
              <svg width="40" height="2" className="overflow-visible">
                <line x1="0" y1="1" x2="32" y2="1" stroke="white" strokeOpacity="0.4" strokeWidth="2" />
                <polygon points="32,1 26,-3 26,5" fill="white" fillOpacity="0.4" />
              </svg>
            </div>
          ))}
        </div>

        {/* Center – Trust Layer */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex-shrink-0 w-[140px] rounded-xl border-2 border-primary-foreground/25 bg-primary-foreground/[0.08] backdrop-blur-sm px-3 py-5 text-center shadow-lg shadow-black/10"
        >
          <div className="text-[10px] font-mono text-primary-foreground/50 uppercase tracking-widest mb-1">Trust Layer</div>
          <div className="text-xs font-bold text-primary-foreground leading-tight">iCommunity</div>
          <div className="flex flex-wrap justify-center gap-1 mt-3">
            {["SHA-256", "TSA", "DLT"].map((t) => (
              <span key={t} className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-primary-foreground/10 text-[9px] font-mono text-primary-foreground/70">
                <span className="w-1 h-1 rounded-full bg-ic-blue-glow animate-pulse" />
                {t}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Right arrows */}
        <div className="flex flex-col gap-3 flex-shrink-0 w-10">
          {targets.map((_, i) => (
            <div key={i} className="h-[34px] flex items-center">
              <svg width="40" height="2" className="overflow-visible">
                <line x1="0" y1="1" x2="32" y2="1" stroke="white" strokeOpacity="0.4" strokeWidth="2" />
                <polygon points="32,1 26,-3 26,5" fill="white" fillOpacity="0.4" />
              </svg>
            </div>
          ))}
        </div>

        {/* Right column – targets */}
        <div className="flex flex-col gap-3 flex-shrink-0">
          {targets.map((label) => (
            <div key={label} className={boxClass}>{label}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
