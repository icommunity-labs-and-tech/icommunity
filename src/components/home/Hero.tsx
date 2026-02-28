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

/* ── Blueprint Line-Art Diagram ── */

const origins = [
  { label: "KYC Provider", sub: "identity" },
  { label: "Fintech", sub: "transactions" },
  { label: "Gov / Admin", sub: "documents" },
];
const outputs = [
  { label: "Reguladores", sub: "compliance" },
  { label: "Auditores", sub: "audit trail" },
  { label: "Terceros", sub: "public verify" },
];

const HeroDiagram = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.8, delay: 0.3 }}
    className="relative w-full max-w-[520px] mx-auto"
  >
    {/* Blueprint SVG */}
    <svg
      viewBox="0 0 520 340"
      fill="none"
      className="w-full h-auto"
      style={{ filter: "drop-shadow(0 0 20px rgba(56,152,236,0.08))" }}
    >
      {/* Grid pattern */}
      <defs>
        <pattern id="bp-grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeOpacity="0.04" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="520" height="340" fill="url(#bp-grid)" rx="16" />

      {/* Outer frame */}
      <rect x="1" y="1" width="518" height="338" rx="15" stroke="white" strokeOpacity="0.08" strokeWidth="1" fill="none" />

      {/* ── Left column: Origins ── */}
      {origins.map((o, i) => {
        const y = 50 + i * 85;
        return (
          <g key={o.label}>
            <rect x="16" y={y} width="110" height="52" rx="8" stroke="white" strokeOpacity="0.25" strokeWidth="1" fill="white" fillOpacity="0.04" />
            <text x="71" y={y + 22} textAnchor="middle" fill="white" fillOpacity="0.9" fontSize="11" fontWeight="600" fontFamily="ui-monospace, monospace">{o.label}</text>
            <text x="71" y={y + 38} textAnchor="middle" fill="white" fillOpacity="0.35" fontSize="9" fontFamily="ui-monospace, monospace">{o.sub}</text>
            {/* Connector line to center */}
            <line x1="126" y1={y + 26} x2="190" y2={y + 26} stroke="white" strokeOpacity="0.2" strokeWidth="1" strokeDasharray="4 3" />
            {/* Arrow head */}
            <polygon points={`190,${y + 26} 185,${y + 23} 185,${y + 29}`} fill="white" fillOpacity="0.3" />
          </g>
        );
      })}

      {/* ── Center: Trust Layer ── */}
      <rect x="190" y="30" width="140" height="280" rx="12" stroke="white" strokeOpacity="0.15" strokeWidth="1.5" fill="white" fillOpacity="0.03" />
      {/* Inner glow border */}
      <rect x="194" y="34" width="132" height="272" rx="10" stroke="white" strokeOpacity="0.06" strokeWidth="0.5" fill="none" />

      {/* Title area */}
      <text x="260" y="62" textAnchor="middle" fill="white" fillOpacity="0.3" fontSize="8" fontFamily="ui-monospace, monospace" letterSpacing="3">TRUST LAYER</text>
      <text x="260" y="82" textAnchor="middle" fill="white" fillOpacity="0.95" fontSize="13" fontWeight="700" fontFamily="ui-monospace, monospace">iCommunity</text>

      {/* Process blocks inside */}
      {[
        { y: 105, label: "① Capture", desc: "event intake" },
        { y: 155, label: "② Certify", desc: "hash + TSA seal" },
        { y: 205, label: "③ Anchor", desc: "DLT + immutable" },
      ].map((block) => (
        <g key={block.label}>
          <rect x="206" y={block.y} width="108" height="40" rx="6" stroke="white" strokeOpacity="0.15" strokeWidth="1" fill="white" fillOpacity="0.05" />
          <text x="260" y={block.y + 17} textAnchor="middle" fill="white" fillOpacity="0.85" fontSize="10" fontWeight="600" fontFamily="ui-monospace, monospace">{block.label}</text>
          <text x="260" y={block.y + 31} textAnchor="middle" fill="white" fillOpacity="0.35" fontSize="8.5" fontFamily="ui-monospace, monospace">{block.desc}</text>
        </g>
      ))}

      {/* Vertical connectors between process blocks */}
      <line x1="260" y1="145" x2="260" y2="155" stroke="white" strokeOpacity="0.2" strokeWidth="1" />
      <polygon points="260,155 257,150 263,150" fill="white" fillOpacity="0.25" />
      <line x1="260" y1="195" x2="260" y2="205" stroke="white" strokeOpacity="0.2" strokeWidth="1" />
      <polygon points="260,205 257,200 263,200" fill="white" fillOpacity="0.25" />

      {/* Status indicator */}
      <rect x="220" y="260" width="80" height="26" rx="13" stroke="white" strokeOpacity="0.12" strokeWidth="1" fill="white" fillOpacity="0.05" />
      <circle cx="237" cy="273" r="3" fill="#4ade80" fillOpacity="0.8" />
      <text x="268" y="277" textAnchor="middle" fill="#4ade80" fillOpacity="0.9" fontSize="9" fontWeight="600" fontFamily="ui-monospace, monospace">ACTIVE</text>

      {/* ── Right column: Outputs ── */}
      {outputs.map((o, i) => {
        const y = 50 + i * 85;
        return (
          <g key={o.label}>
            {/* Connector line from center */}
            <line x1="330" y1={y + 26} x2="394" y2={y + 26} stroke="white" strokeOpacity="0.2" strokeWidth="1" strokeDasharray="4 3" />
            <polygon points={`394,${y + 26} 389,${y + 23} 389,${y + 29}`} fill="white" fillOpacity="0.3" />
            <rect x="394" y={y} width="110" height="52" rx="8" stroke="white" strokeOpacity="0.25" strokeWidth="1" fill="white" fillOpacity="0.04" />
            <text x="449" y={y + 22} textAnchor="middle" fill="white" fillOpacity="0.9" fontSize="11" fontWeight="600" fontFamily="ui-monospace, monospace">{o.label}</text>
            <text x="449" y={y + 38} textAnchor="middle" fill="white" fillOpacity="0.35" fontSize="9" fontFamily="ui-monospace, monospace">{o.sub}</text>
          </g>
        );
      })}

      {/* Corner labels */}
      <text x="24" y="24" fill="white" fillOpacity="0.15" fontSize="8" fontFamily="ui-monospace, monospace">BLUEPRINT v2.1</text>
      <text x="520" y="24" textAnchor="end" fill="white" fillOpacity="0.15" fontSize="8" fontFamily="ui-monospace, monospace" dx="-8">iCommunity Trust Infrastructure</text>

      {/* Animated pulse on ACTIVE dot */}
      <circle cx="237" cy="273" r="3" fill="none" stroke="#4ade80" strokeOpacity="0.4" strokeWidth="1">
        <animate attributeName="r" values="3;8;3" dur="2s" repeatCount="indefinite" />
        <animate attributeName="stroke-opacity" values="0.4;0;0.4" dur="2s" repeatCount="indefinite" />
      </circle>
    </svg>
  </motion.div>
);

export default Hero;
