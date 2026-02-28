import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

/**
 * Animated "Trust Engine" visualization.
 * Particles flow left → core → right, simulating event certification.
 */

interface Particle {
  x: number;
  y: number;
  vx: number;
  phase: "incoming" | "core" | "outgoing";
  opacity: number;
  size: number;
  coreTimer: number;
  yOffset: number;
  seed: number;
}

const CORE_X = 0.5;
const CORE_W = 0.18;
const PARTICLE_COUNT = 45;
const GLOW_LAYERS = 5;

const TrustEngineViz = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const animRef = useRef<number>(0);
  const time = useRef(0);

  const createParticle = (side: "left" | "right" | "random"): Particle => {
    const s = side === "random" ? (Math.random() > 0.5 ? "left" : "right") : side;
    const fromLeft = s === "left";
    return {
      x: fromLeft ? -0.05 - Math.random() * 0.15 : 1.05 + Math.random() * 0.15,
      y: 0.2 + Math.random() * 0.6,
      vx: fromLeft ? 0.001 + Math.random() * 0.001 : -(0.001 + Math.random() * 0.001),
      phase: "incoming",
      opacity: 0,
      size: 3 + Math.random() * 3,
      coreTimer: 0,
      yOffset: (Math.random() - 0.5) * 0.12,
      seed: Math.random() * Math.PI * 2,
    };
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Init particles
    particles.current = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const p = createParticle("random");
      p.x = Math.random(); // scatter initially
      p.opacity = 0.3 + Math.random() * 0.4;
      particles.current.push(p);
    }

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = parent.offsetWidth * dpr;
      canvas.height = parent.offsetHeight * dpr;
      canvas.style.width = parent.offsetWidth + "px";
      canvas.style.height = parent.offsetHeight + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      time.current += 0.016;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      const coreXpx = CORE_X * w;
      const coreR = CORE_W * w;
      const coreYpx = h * 0.5;

      // ── Core glow layers ──
      for (let i = GLOW_LAYERS; i >= 0; i--) {
        const r = coreR * (1.8 + i * 1.2);
        const alpha = 0.14 - i * 0.018;
        const pulse = 1 + 0.1 * Math.sin(time.current * 0.8 + i);
        const grad = ctx.createRadialGradient(coreXpx, coreYpx, 0, coreXpx, coreYpx, r * pulse);
        grad.addColorStop(0, `rgba(56,109,240,${alpha + 0.12})`);
        grad.addColorStop(0.3, `rgba(56,109,240,${alpha + 0.05})`);
        grad.addColorStop(0.7, `rgba(56,109,240,${alpha})`);
        grad.addColorStop(1, "rgba(56,109,240,0)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
      }

      // Core ring
      const ringPulse = 1 + 0.06 * Math.sin(time.current * 1.2);
      ctx.beginPath();
      ctx.arc(coreXpx, coreYpx, coreR * 0.7 * ringPulse, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(56,109,240,0.7)";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Second ring
      ctx.beginPath();
      ctx.arc(coreXpx, coreYpx, coreR * 0.5, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(100,180,255,0.35)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Third outer ring
      ctx.beginPath();
      ctx.arc(coreXpx, coreYpx, coreR * 0.9 * ringPulse, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(56,109,240,0.15)";
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(coreXpx, coreYpx, coreR * 0.35, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(56,109,240,0.4)";
      ctx.fill();

      // Inner bright dot
      ctx.beginPath();
      ctx.arc(coreXpx, coreYpx, 5, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(200,230,255,1)";
      ctx.fill();

      // ── Horizontal guide lines ──
      ctx.setLineDash([2, 6]);
      ctx.lineWidth = 0.5;
      ctx.strokeStyle = "rgba(56,109,240,0.25)";
      for (let i = 0; i < 3; i++) {
        const ly = h * (0.3 + i * 0.2);
        ctx.beginPath();
        ctx.moveTo(0, ly);
        ctx.lineTo(w, ly);
        ctx.stroke();
      }
      ctx.setLineDash([]);

      // ── Update & draw particles ──
      particles.current.forEach((p) => {
        const goingRight = p.vx > 0;
        const distToCore = Math.abs(p.x - CORE_X);

        // Phase transitions
        if (p.phase === "incoming" && distToCore < CORE_W * 0.7) {
          p.phase = "core";
          p.coreTimer = 0;
        }
        if (p.phase === "core") {
          p.coreTimer += 0.016;
          if (p.coreTimer > 0.8 + Math.random() * 0.4) {
            p.phase = "outgoing";
            p.vx = goingRight ? 0.001 + Math.random() * 0.0008 : -(0.001 + Math.random() * 0.0008);
          }
        }

        // Movement
        if (p.phase === "incoming") {
          // Attract toward core center Y
          const targetY = 0.5 + p.yOffset * 0.3;
          p.y += (targetY - p.y) * 0.008;
          p.x += p.vx;
          p.opacity = Math.min(p.opacity + 0.015, 1);
        } else if (p.phase === "core") {
          // Orbit subtly
          const angle = time.current * 1.5 + p.seed;
          const orbitR = 0.015 + 0.01 * Math.sin(time.current + p.seed);
          p.x = CORE_X + Math.cos(angle) * orbitR;
          p.y = 0.5 + Math.sin(angle) * orbitR * 0.6;
          p.opacity = 0.95 + 0.05 * Math.sin(time.current * 3 + p.seed);
        } else {
          // Outgoing — disperse
          p.x += p.vx;
          const targetY = 0.5 + p.yOffset;
          p.y += (targetY - p.y) * 0.005;
          p.opacity = Math.max(p.opacity - 0.004, 0);
        }

        // Float
        p.y += Math.sin(time.current * 0.6 + p.seed) * 0.0003;

        // Reset if off-screen
        if (p.x < -0.2 || p.x > 1.2 || p.opacity <= 0.01) {
          Object.assign(p, createParticle(goingRight ? "left" : "right"));
        }

        // ── Draw particle ──
        const px = p.x * w;
        const py = p.y * h;
        const sz = p.size;

        // Color shifts by phase
        let r = 56, g = 109, b = 240;
        if (p.phase === "core") {
          r = 100; g = 180; b = 255;
        } else if (p.phase === "outgoing") {
          r = 74; g = 222; b = 128; // greenish = verified
        }

        // Glow
        const glowGrad = ctx.createRadialGradient(px, py, 0, px, py, sz * 10);
        glowGrad.addColorStop(0, `rgba(${r},${g},${b},${p.opacity * 0.5})`);
        glowGrad.addColorStop(1, `rgba(${r},${g},${b},0)`);
        ctx.fillStyle = glowGrad;
        ctx.fillRect(px - sz * 10, py - sz * 10, sz * 20, sz * 20);

        // Dot
        ctx.beginPath();
        ctx.arc(px, py, sz, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${p.opacity})`;
        ctx.fill();

        // Trail line (incoming/outgoing only)
        if (p.phase !== "core") {
          ctx.beginPath();
          ctx.moveTo(px, py);
          ctx.lineTo(px - p.vx * w * 18, py);
          ctx.strokeStyle = `rgba(${r},${g},${b},${p.opacity * 0.5})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, delay: 0.3 }}
      className="relative w-full max-w-[520px] mx-auto" style={{ minHeight: 380 }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Minimal labels */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-between px-4">
        <span className="text-xs font-mono tracking-widest text-primary-foreground/70 uppercase">
          events
        </span>
        <span className="text-xs font-mono tracking-widest text-primary-foreground/70 uppercase">
          evidence
        </span>
      </div>

      {/* Core label */}
      <div className="absolute inset-0 pointer-events-none flex items-end justify-center pb-6">
        <span className="text-xs font-mono tracking-[0.25em] text-primary-foreground/60 uppercase">
          trust layer
        </span>
      </div>
    </motion.div>
  );
};

export default TrustEngineViz;
