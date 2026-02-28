import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import logoMadrid from "@/assets/logo-ayto-madrid-gray-4.png";

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

const steps = [
  { step: "1", title: "Evento", desc: "Verificación KYC completada" },
  { step: "2", title: "Certificación", desc: "Hash + sello temporal + registro inmutable" },
  { step: "3", title: "Evidencia", desc: "Recibo verificable y auditable" },
];

const nodes = [
  { x: 30, y: 20 }, { x: 70, y: 15 }, { x: 85, y: 45 }, { x: 50, y: 55 },
  { x: 15, y: 50 }, { x: 60, y: 80 }, { x: 25, y: 78 }, { x: 80, y: 75 },
  { x: 45, y: 35 }, { x: 10, y: 35 }, { x: 90, y: 20 }, { x: 40, y: 90 },
];

const connections = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 0], [3, 5], [5, 6], [6, 4],
  [1, 8], [8, 3], [0, 9], [2, 7], [5, 7], [1, 10], [10, 2], [6, 11], [5, 11],
];

const HeroDiagram = () => {
  return (
    <div className="relative">
      {/* Background technical layer — nodos y conexiones */}
      <div className="absolute inset-0 opacity-[0.55] blur-[0.5px] pointer-events-none">
        <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
          {connections.map(([a, b], i) => (
            <motion.line
              key={i}
              x1={nodes[a].x} y1={nodes[a].y}
              x2={nodes[b].x} y2={nodes[b].y}
              stroke="hsl(225, 86%, 68%)"
              strokeWidth="0.5"
              animate={{ opacity: [0.4, 0.9, 0.4] }}
              transition={{ duration: 4, ease: "easeInOut", repeat: Infinity, delay: i * 0.3 }}
            />
          ))}
          {nodes.map((n, i) => (
            <motion.circle
              key={i}
              cx={n.x} cy={n.y} r="1.8"
              fill="hsl(225, 86%, 72%)"
              animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.4, 1] }}
              transition={{ duration: 3, ease: "easeInOut", repeat: Infinity, delay: i * 0.4 }}
            />
          ))}
        </svg>
      </div>

      {/* Contenido real: los 3 pasos */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[340px] gap-6">
        {steps.map((s, i) => (
          <motion.div
            key={s.step}
            className="flex items-center gap-5"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 + i * 0.15 }}
          >
            <motion.div
              className="w-12 h-12 rounded-xl ic-gradient-cta flex items-center justify-center flex-shrink-0 shadow-lg shadow-ic-blue/30"
              animate={{ opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 2.5, ease: "easeInOut", repeat: Infinity, delay: i * 1.2 }}
            >
              <span className="text-primary-foreground font-bold text-base">{s.step}</span>
            </motion.div>
            <span className="text-xl font-bold text-primary-foreground drop-shadow-md">{s.title}</span>
          </motion.div>
        ))}
      </div>

      {/* Madrid badge */}
      <div className="flex items-center gap-3 mt-8 w-full">
        <img src={logoMadrid} alt="Ayuntamiento de Madrid" className="h-11 w-auto flex-shrink-0 brightness-0 invert" />
        <span className="text-sm text-primary-foreground leading-tight flex-1">
          iCommunity impulsa la trazabilidad documental en procesos de contratación pública del Ayuntamiento de Madrid
        </span>
      </div>
    </div>
  );
};
export default Hero;
