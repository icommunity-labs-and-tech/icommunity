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

/* ── Mini Console + Flow Diagram ── */

const flowSteps = [
  { num: "1", label: "Evento", desc: "Acción digital capturada" },
  { num: "2", label: "Certificación", desc: "Hash + sello + registro" },
  { num: "3", label: "Evidencia", desc: "Recibo verificable" },
];

const HeroDiagram = () => {
  const now = new Date();
  const ts = `${now.getUTCFullYear()}-${String(now.getUTCMonth() + 1).padStart(2, "0")}-${String(now.getUTCDate()).padStart(2, "0")}T${String(now.getUTCHours()).padStart(2, "0")}:${String(now.getUTCMinutes()).padStart(2, "0")}:${String(now.getUTCSeconds()).padStart(2, "0")}Z`;

  return (
    <div className="relative w-full max-w-[480px] mx-auto">
      {/* ── API Response Console ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="rounded-xl border border-primary-foreground/15 bg-[#0a0f1e]/80 backdrop-blur-xl shadow-2xl shadow-black/30 overflow-hidden"
      >
        {/* Terminal top bar */}
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-primary-foreground/10 bg-primary-foreground/[0.03]">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-primary-foreground/20" />
            <span className="w-2.5 h-2.5 rounded-full bg-primary-foreground/20" />
            <span className="w-2.5 h-2.5 rounded-full bg-primary-foreground/20" />
          </div>
          <span className="text-[10px] font-mono text-primary-foreground/40 ml-2">POST /v1/certify — 200 OK</span>
          <motion.div
            className="ml-auto w-1.5 h-1.5 rounded-full bg-green-400"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        {/* Payload body */}
        <div className="p-5 font-mono text-[12px] leading-[1.8]">
          <div className="text-primary-foreground/40">{"// API Response"}</div>
          <div className="text-primary-foreground/50">{"{"}</div>
          <div className="pl-4">
            <span className="text-ic-blue-glow">"event_type"</span>
            <span className="text-primary-foreground/40">: </span>
            <span className="text-primary-foreground/90">"kyc_verification"</span>
            <span className="text-primary-foreground/30">,</span>
          </div>
          <motion.div
            className="pl-4"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-ic-blue-glow">"timestamp"</span>
            <span className="text-primary-foreground/40">: </span>
            <span className="text-primary-foreground/90">"{ts}"</span>
            <span className="text-primary-foreground/30">,</span>
          </motion.div>
          <div className="pl-4">
            <span className="text-ic-blue-glow">"integrity"</span>
            <span className="text-primary-foreground/40">: </span>
            <span className="text-primary-foreground/90">"sha256:a1b2c3…f8e9"</span>
            <span className="text-primary-foreground/30">,</span>
          </div>
          <div className="pl-4">
            <span className="text-ic-blue-glow">"status"</span>
            <span className="text-primary-foreground/40">: </span>
            <motion.span
              className="text-green-400 font-semibold inline-block"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
              "verified"
            </motion.span>
          </div>
          <div className="text-primary-foreground/50">{"}"}</div>
        </div>
      </motion.div>

      {/* ── Mini flow 1-2-3 ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mt-5 flex items-stretch gap-0"
      >
        {flowSteps.map((step, i) => (
          <div key={step.num} className="flex items-center flex-1 min-w-0">
            {/* Step card */}
            <motion.div
              className="flex-1 rounded-lg border border-primary-foreground/15 bg-primary-foreground/[0.06] backdrop-blur-sm px-3 py-3 text-center"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.7 + i * 0.15 }}
            >
              <div className="w-7 h-7 rounded-md ic-gradient-cta flex items-center justify-center mx-auto mb-2">
                <span className="text-primary-foreground font-bold text-xs">{step.num}</span>
              </div>
              <div className="text-xs font-bold text-primary-foreground mb-0.5">{step.label}</div>
              <div className="text-[10px] text-primary-foreground/60 leading-tight">{step.desc}</div>
            </motion.div>

            {/* Arrow between steps */}
            {i < flowSteps.length - 1 && (
              <div className="flex-shrink-0 w-6 flex items-center justify-center">
                <svg width="20" height="10" viewBox="0 0 20 10" className="overflow-visible">
                  <line x1="0" y1="5" x2="14" y2="5" stroke="white" strokeOpacity="0.3" strokeWidth="1.5" />
                  <polygon points="14,5 10,2 10,8" fill="white" fillOpacity="0.3" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default Hero;
