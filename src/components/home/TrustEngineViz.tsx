import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const NUM_NODES = 7;
const CORE_RADIUS = 36;

interface OrbitalNode {
  angle: number;
  orbitRadius: number;  // fraction of scale
  speed: number;        // radians per second
  size: number;
  phase: number;
}

const TrustCoreViz = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const time = useRef(0);
  const nodes = useRef<OrbitalNode[]>([]);

  useEffect(() => {
    // Distribute nodes across two orbit bands for depth
    nodes.current = Array.from({ length: NUM_NODES }, (_, i) => {
      const band = i < 4 ? 0 : 1;
      return {
        angle: (Math.PI * 2 * i) / NUM_NODES + Math.random() * 0.4,
        orbitRadius: band === 0 ? 0.26 + Math.random() * 0.06 : 0.38 + Math.random() * 0.06,
        speed: 0.04 + Math.random() * 0.03, // very slow
        size: 3 + Math.random() * 2,
        phase: Math.random() * Math.PI * 2,
      };
    });

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

      // ── Ambient atmosphere ──
      const ambientR = scale * 0.48;
      const ambient = ctx.createRadialGradient(cx, cy, 0, cx, cy, ambientR);
      ambient.addColorStop(0, "rgba(70,50,180,0.06)");
      ambient.addColorStop(0.3, "rgba(56,109,240,0.04)");
      ambient.addColorStop(0.7, "rgba(56,109,240,0.015)");
      ambient.addColorStop(1, "rgba(56,109,240,0)");
      ctx.fillStyle = ambient;
      ctx.fillRect(0, 0, w, h);

      // ── Subtle orbit tracks ──
      const uniqueRadii = [...new Set(nodes.current.map(n => Math.round(n.orbitRadius * 100)))];
      uniqueRadii.forEach(r100 => {
        const r = (r100 / 100) * scale;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(56,109,240,0.04)";
        ctx.lineWidth = 0.5;
        ctx.stroke();
      });

      // ── Compute node positions ──
      const positions = nodes.current.map((node) => {
        const r = node.orbitRadius * scale;
        const a = node.angle + t * node.speed;
        return { x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r };
      });

      // ── Connection lines to core with energy pulses ──
      positions.forEach((pos, i) => {
        const node = nodes.current[i];

        // Thin connection line with breathing opacity
        const breathe = 0.08 + 0.06 * Math.sin(t * 0.3 + node.phase);
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(pos.x, pos.y);
        ctx.strokeStyle = `rgba(90,130,240,${breathe})`;
        ctx.lineWidth = 0.6;
        ctx.stroke();

        // Energy pulse traveling toward core
        const pulseSpeed = 0.2;
        const pulseT = ((t * pulseSpeed + node.phase) % 1);
        const px = pos.x + (cx - pos.x) * pulseT;
        const py = pos.y + (cy - pos.y) * pulseT;
        const pulseAlpha = Math.sin(pulseT * Math.PI) * 0.5;
        if (pulseAlpha > 0.05) {
          const pg = ctx.createRadialGradient(px, py, 0, px, py, 5);
          pg.addColorStop(0, `rgba(140,170,255,${pulseAlpha})`);
          pg.addColorStop(1, "rgba(140,170,255,0)");
          ctx.fillStyle = pg;
          ctx.fillRect(px - 5, py - 5, 10, 10);
        }
      });

      // ── Inter-node connections (selective, subtle) ──
      for (let i = 0; i < positions.length; i++) {
        for (let j = i + 2; j < positions.length; j += 2) {
          const dx = positions[i].x - positions[j].x;
          const dy = positions[i].y - positions[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = scale * 0.45;
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.04 + 0.01 * Math.sin(t * 0.25 + i + j);
            ctx.beginPath();
            ctx.moveTo(positions[i].x, positions[i].y);
            ctx.lineTo(positions[j].x, positions[j].y);
            ctx.strokeStyle = `rgba(90,130,240,${Math.max(0, alpha)})`;
            ctx.lineWidth = 0.4;
            ctx.stroke();
          }
        }
      }

      // ── Core glow layers (soft, layered) ──
      const corePulse = 1 + 0.03 * Math.sin(t * 0.6);
      for (let layer = 4; layer >= 0; layer--) {
        const r = CORE_RADIUS * (2.2 + layer * 1.8) * corePulse;
        const a = 0.045 - layer * 0.007;
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        grad.addColorStop(0, `rgba(75,60,200,${a + 0.06})`);
        grad.addColorStop(0.3, `rgba(56,109,240,${a + 0.02})`);
        grad.addColorStop(0.65, `rgba(56,109,240,${a})`);
        grad.addColorStop(1, "rgba(56,109,240,0)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
      }

      // ── Core outer ring ──
      ctx.beginPath();
      ctx.arc(cx, cy, CORE_RADIUS * corePulse, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(100,140,255,0.3)";
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // ── Core middle ring ──
      ctx.beginPath();
      ctx.arc(cx, cy, CORE_RADIUS * 0.65, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(120,155,255,0.15)";
      ctx.lineWidth = 0.8;
      ctx.stroke();

      // ── Core fill (organic gradient) ──
      const coreFill = ctx.createRadialGradient(
        cx - 2, cy - 2, 0, // slightly offset for organic feel
        cx, cy, CORE_RADIUS * 0.75
      );
      coreFill.addColorStop(0, "rgba(150,170,255,0.45)");
      coreFill.addColorStop(0.4, "rgba(80,100,220,0.2)");
      coreFill.addColorStop(0.8, "rgba(56,109,240,0.06)");
      coreFill.addColorStop(1, "rgba(56,109,240,0)");
      ctx.beginPath();
      ctx.arc(cx, cy, CORE_RADIUS * 0.75, 0, Math.PI * 2);
      ctx.fillStyle = coreFill;
      ctx.fill();

      // ── Bright center point ──
      ctx.beginPath();
      ctx.arc(cx, cy, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(210,225,255,0.85)";
      ctx.fill();

      // ── Orbital nodes ──
      positions.forEach((pos, i) => {
        const node = nodes.current[i];
        const nodePulse = 1 + 0.12 * Math.sin(t * 0.8 + node.phase);
        const sz = node.size * nodePulse;

        // Node soft glow
        const ng = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, sz * 4);
        ng.addColorStop(0, "rgba(100,145,255,0.2)");
        ng.addColorStop(1, "rgba(100,145,255,0)");
        ctx.fillStyle = ng;
        ctx.fillRect(pos.x - sz * 4, pos.y - sz * 4, sz * 8, sz * 8);

        // Node body
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, sz, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(150,180,255,0.7)";
        ctx.fill();

        // Node bright center
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, sz * 0.35, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(210,225,255,0.85)";
        ctx.fill();
      });

      // ── Periodic connection highlight ──
      const highlightIdx = Math.floor((t * 0.15) % NUM_NODES);
      const hPos = positions[highlightIdx];
      if (hPos) {
        const hAlpha = 0.15 + 0.1 * Math.sin(t * 0.4);
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(hPos.x, hPos.y);
        ctx.strokeStyle = `rgba(140,180,255,${hAlpha})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }

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
      transition={{ duration: 1.4, delay: 0.3 }}
      className="relative w-full max-w-[520px] mx-auto"
      style={{ minHeight: 400 }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </motion.div>
  );
};

export default TrustCoreViz;
