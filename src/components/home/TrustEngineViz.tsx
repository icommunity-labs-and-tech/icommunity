import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

/*
 * Blueprint-style architectural diagram for the Hero.
 * Shows: Source Systems → iCommunity Trust Layer → Regulators/Auditors
 * Rendered on canvas with glass-panel backdrop, low opacity, and micro-animated data pulses.
 */

interface BlueprintNode {
  x: number; // fraction 0-1
  y: number;
  w: number;
  h: number;
  label: string;
  isCore?: boolean;
}

const LEFT_NODES: BlueprintNode[] = [
  { x: 0.04, y: 0.18, w: 0.18, h: 0.1, label: "ERP" },
  { x: 0.04, y: 0.38, w: 0.18, h: 0.1, label: "CRM" },
  { x: 0.04, y: 0.58, w: 0.18, h: 0.1, label: "IAM" },
  { x: 0.04, y: 0.78, w: 0.18, h: 0.1, label: "IoT" },
];

const CORE_NODE: BlueprintNode = {
  x: 0.35, y: 0.32, w: 0.3, h: 0.36, label: "Trust Layer", isCore: true,
};

const RIGHT_NODES: BlueprintNode[] = [
  { x: 0.78, y: 0.18, w: 0.18, h: 0.1, label: "CNMV" },
  { x: 0.78, y: 0.38, w: 0.18, h: 0.1, label: "Audit" },
  { x: 0.78, y: 0.58, w: 0.18, h: 0.1, label: "Legal" },
  { x: 0.78, y: 0.78, w: 0.18, h: 0.1, label: "DLT" },
];

// Connection definitions: [fromNode, toNode]
type Conn = { from: BlueprintNode; to: BlueprintNode };

function buildConnections(): Conn[] {
  const conns: Conn[] = [];
  LEFT_NODES.forEach((n) => conns.push({ from: n, to: CORE_NODE }));
  RIGHT_NODES.forEach((n) => conns.push({ from: CORE_NODE, to: n }));
  return conns;
}

const CONNECTIONS = buildConnections();
const DIAGRAM_OPACITY = 0.42;

const TrustBlueprintViz = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const time = useRef(0);

  useEffect(() => {
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

    // Helpers
    const nodeCenter = (n: BlueprintNode, w: number, h: number) => ({
      x: (n.x + n.w / 2) * w,
      y: (n.y + n.h / 2) * h,
    });

    const drawRoundedRect = (
      x: number, y: number, rw: number, rh: number, radius: number
    ) => {
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.lineTo(x + rw - radius, y);
      ctx.quadraticCurveTo(x + rw, y, x + rw, y + radius);
      ctx.lineTo(x + rw, y + rh - radius);
      ctx.quadraticCurveTo(x + rw, y + rh, x + rw - radius, y + rh);
      ctx.lineTo(x + radius, y + rh);
      ctx.quadraticCurveTo(x, y + rh, x, y + rh - radius);
      ctx.lineTo(x, y + radius);
      ctx.quadraticCurveTo(x, y, x + radius, y);
      ctx.closePath();
    };

    const draw = () => {
      time.current += 0.016;
      const t = time.current;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;

      ctx.clearRect(0, 0, w, h);
      ctx.globalAlpha = DIAGRAM_OPACITY;

      // ── Connection lines ──
      CONNECTIONS.forEach((conn, ci) => {
        const fromC = nodeCenter(conn.from, w, h);
        const toC = nodeCenter(conn.to, w, h);

        // Blueprint line
        ctx.beginPath();
        ctx.moveTo(fromC.x, fromC.y);
        ctx.lineTo(toC.x, toC.y);
        ctx.strokeStyle = "rgba(100,140,240,0.3)";
        ctx.lineWidth = 0.8;
        ctx.stroke();

        // Micro data pulse
        const speed = 0.12 + (ci % 3) * 0.03;
        const pulseT = ((t * speed + ci * 0.37) % 1);
        const px = fromC.x + (toC.x - fromC.x) * pulseT;
        const py = fromC.y + (toC.y - fromC.y) * pulseT;
        const alpha = Math.sin(pulseT * Math.PI) * 0.8;

        if (alpha > 0.05) {
          ctx.beginPath();
          ctx.arc(px, py, 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(150,185,255,${alpha})`;
          ctx.fill();
        }
      });

      // ── Draw nodes ──
      const allNodes = [...LEFT_NODES, CORE_NODE, ...RIGHT_NODES];
      allNodes.forEach((node) => {
        const nx = node.x * w;
        const ny = node.y * h;
        const nw = node.w * w;
        const nh = node.h * h;

        if (node.isCore) {
          // Core glow
          const glowPulse = 1 + 0.03 * Math.sin(t * 0.5);
          const gcx = nx + nw / 2;
          const gcy = ny + nh / 2;
          const gr = Math.max(nw, nh) * 0.8 * glowPulse;
          const glow = ctx.createRadialGradient(gcx, gcy, 0, gcx, gcy, gr);
          glow.addColorStop(0, "rgba(56,109,240,0.15)");
          glow.addColorStop(0.5, "rgba(56,109,240,0.05)");
          glow.addColorStop(1, "rgba(56,109,240,0)");

          ctx.save();
          ctx.globalAlpha = 0.7; // brighter for core
          ctx.fillStyle = glow;
          ctx.fillRect(gcx - gr, gcy - gr, gr * 2, gr * 2);

          // Core box
          drawRoundedRect(nx, ny, nw, nh, 6);
          ctx.fillStyle = "rgba(30,50,120,0.25)";
          ctx.fill();
          ctx.strokeStyle = "rgba(80,130,255,0.5)";
          ctx.lineWidth = 1.2;
          ctx.stroke();

          // Core label
          ctx.fillStyle = "rgba(180,210,255,0.85)";
          ctx.font = `600 ${Math.max(11, nw * 0.085)}px Inter, system-ui, sans-serif`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText("iCommunity", gcx, gcy - 8);
          ctx.font = `500 ${Math.max(9, nw * 0.065)}px Inter, system-ui, sans-serif`;
          ctx.fillStyle = "rgba(140,175,255,0.7)";
          ctx.fillText("Trust Layer", gcx, gcy + 10);
          ctx.restore();
        } else {
          // Regular node
          drawRoundedRect(nx, ny, nw, nh, 4);
          ctx.fillStyle = "rgba(20,35,80,0.2)";
          ctx.fill();
          ctx.strokeStyle = "rgba(80,120,220,0.25)";
          ctx.lineWidth = 0.7;
          ctx.stroke();

          // Label
          ctx.fillStyle = "rgba(160,185,240,0.6)";
          ctx.font = `500 ${Math.max(9, nw * 0.13)}px Inter, system-ui, sans-serif`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(node.label, nx + nw / 2, ny + nh / 2);
        }
      });

      ctx.globalAlpha = 1;
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
      className="relative w-full max-w-[560px] mx-auto rounded-2xl overflow-hidden"
      style={{
        height: 400,
        background: "rgba(15,25,70,0.3)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: "1px solid rgba(80,120,220,0.12)",
      }}
    >
      <canvas ref={canvasRef} className="w-full h-full" />
    </motion.div>
  );
};

export default TrustBlueprintViz;
