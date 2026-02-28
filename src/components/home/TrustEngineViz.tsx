import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const NUM_NODES = 6;
const CORE_RADIUS = 28;

interface OrbitalNode {
  angle: number;
  radius: number;
  speed: number;
  size: number;
  phase: number;
}

const TrustEngineViz = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const time = useRef(0);
  const nodes = useRef<OrbitalNode[]>([]);

  useEffect(() => {
    // Init nodes
    nodes.current = Array.from({ length: NUM_NODES }, (_, i) => ({
      angle: (Math.PI * 2 * i) / NUM_NODES + Math.random() * 0.3,
      radius: 0.22 + Math.random() * 0.12,
      speed: 0.08 + Math.random() * 0.06,
      size: 3.5 + Math.random() * 2.5,
      phase: Math.random() * Math.PI * 2,
    }));

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

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
      const t = time.current;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      const cx = w * 0.5;
      const cy = h * 0.48;
      const scale = Math.min(w, h);

      ctx.clearRect(0, 0, w, h);

      // ── Outer ambient glow ──
      const ambientR = scale * 0.42;
      const ambient = ctx.createRadialGradient(cx, cy, 0, cx, cy, ambientR);
      ambient.addColorStop(0, "rgba(80,60,200,0.08)");
      ambient.addColorStop(0.4, "rgba(56,109,240,0.05)");
      ambient.addColorStop(1, "rgba(56,109,240,0)");
      ctx.fillStyle = ambient;
      ctx.fillRect(0, 0, w, h);

      // ── Orbit track (subtle) ──
      nodes.current.forEach((node) => {
        const r = node.radius * scale;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(56,109,240,0.06)";
        ctx.lineWidth = 0.5;
        ctx.stroke();
      });

      // ── Connection lines & pulse energy ──
      const nodePositions = nodes.current.map((node) => {
        const r = node.radius * scale;
        const a = node.angle + t * node.speed;
        return { x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r };
      });

      // Lines from nodes to core
      nodePositions.forEach((pos, i) => {
        const node = nodes.current[i];
        // Connection line
        const linePulse = 0.12 + 0.1 * Math.sin(t * 0.5 + node.phase);
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(pos.x, pos.y);
        ctx.strokeStyle = `rgba(100,140,255,${linePulse})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();

        // Energy pulse traveling toward core
        const pulseT = ((t * 0.3 + node.phase) % 1);
        const px = pos.x + (cx - pos.x) * pulseT;
        const py = pos.y + (cy - pos.y) * pulseT;
        const pulseAlpha = Math.sin(pulseT * Math.PI) * 0.7;
        const pulseGrad = ctx.createRadialGradient(px, py, 0, px, py, 6);
        pulseGrad.addColorStop(0, `rgba(140,180,255,${pulseAlpha})`);
        pulseGrad.addColorStop(1, `rgba(140,180,255,0)`);
        ctx.fillStyle = pulseGrad;
        ctx.fillRect(px - 6, py - 6, 12, 12);
      });

      // ── Inter-node connections (every other pair) ──
      for (let i = 0; i < nodePositions.length; i++) {
        const j = (i + 2) % nodePositions.length;
        const alpha = 0.04 + 0.03 * Math.sin(t * 0.4 + i);
        ctx.beginPath();
        ctx.moveTo(nodePositions[i].x, nodePositions[i].y);
        ctx.lineTo(nodePositions[j].x, nodePositions[j].y);
        ctx.strokeStyle = `rgba(100,140,255,${alpha})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      // ── Core glow ──
      const corePulse = 1 + 0.04 * Math.sin(t * 0.8);
      for (let layer = 3; layer >= 0; layer--) {
        const r = CORE_RADIUS * (2.5 + layer * 1.5) * corePulse;
        const a = 0.07 - layer * 0.012;
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        grad.addColorStop(0, `rgba(80,70,220,${a + 0.08})`);
        grad.addColorStop(0.35, `rgba(56,109,240,${a + 0.03})`);
        grad.addColorStop(0.7, `rgba(56,109,240,${a})`);
        grad.addColorStop(1, "rgba(56,109,240,0)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
      }

      // Core ring
      ctx.beginPath();
      ctx.arc(cx, cy, CORE_RADIUS * corePulse, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(100,140,255,0.4)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Inner ring
      ctx.beginPath();
      ctx.arc(cx, cy, CORE_RADIUS * 0.6, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(130,160,255,0.2)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Core fill
      const coreFill = ctx.createRadialGradient(cx, cy, 0, cx, cy, CORE_RADIUS * 0.7);
      coreFill.addColorStop(0, "rgba(160,180,255,0.5)");
      coreFill.addColorStop(0.5, "rgba(80,100,220,0.25)");
      coreFill.addColorStop(1, "rgba(56,109,240,0.08)");
      ctx.beginPath();
      ctx.arc(cx, cy, CORE_RADIUS * 0.7, 0, Math.PI * 2);
      ctx.fillStyle = coreFill;
      ctx.fill();

      // Bright center dot
      ctx.beginPath();
      ctx.arc(cx, cy, 3, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(210,225,255,0.9)";
      ctx.fill();

      // ── Orbital nodes ──
      nodePositions.forEach((pos, i) => {
        const node = nodes.current[i];
        const nodePulse = 1 + 0.15 * Math.sin(t * 1.2 + node.phase);
        const sz = node.size * nodePulse;

        // Node glow
        const nGlow = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, sz * 5);
        nGlow.addColorStop(0, "rgba(100,150,255,0.25)");
        nGlow.addColorStop(1, "rgba(100,150,255,0)");
        ctx.fillStyle = nGlow;
        ctx.fillRect(pos.x - sz * 5, pos.y - sz * 5, sz * 10, sz * 10);

        // Node dot
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, sz, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(160,190,255,0.8)";
        ctx.fill();

        // Node inner
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, sz * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(210,225,255,0.9)";
        ctx.fill();
      });

      // Update angles
      nodes.current.forEach((node) => {
        node.angle += node.speed * 0.016;
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
      className="relative w-full max-w-[520px] mx-auto"
      style={{ minHeight: 380 }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </motion.div>
  );
};

export default TrustEngineViz;
