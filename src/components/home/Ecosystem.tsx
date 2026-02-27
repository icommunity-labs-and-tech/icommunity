import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Package, BrainCircuit, ArrowRight, Shield } from "lucide-react";

const products = [
  {
    id: "certypass",
    icon: Package,
    title: "CertyPass",
    desc: "Pasaporte Digital de Producto conforme al reglamento europeo ESPR para trazabilidad y sostenibilidad.",
    tag: "Built on iCommunity",
    cta: "Ir a CertyPass",
    href: "https://certypass.com",
    external: true,
    angle: -30,
  },
  {
    id: "privaura",
    icon: BrainCircuit,
    title: "Privaura",
    desc: "Gobierno, anonimización y control de datos sensibles antes de su uso en sistemas de IA.",
    tag: "Powered by iCommunity",
    cta: "Ir a Privaura",
    href: "https://privaura.lovable.app",
    external: true,
    angle: 30,
  },
];

const badges = ["API Infrastructure", "Evidence Layer", "Audit Ready", "Regulatory Native"];

const Ecosystem = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

  return (
    <section className="ic-section bg-background overflow-hidden" ref={ref}>
      <div className="ic-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            iCommunity Trust Layer
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Infraestructura común sobre la que se construyen soluciones de certificación, cumplimiento y gobierno del dato.
          </p>
        </motion.div>

        {/* Core + Products */}
        <div className="relative max-w-4xl mx-auto flex flex-col items-center">

          {/* Core node */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.15, type: "spring", stiffness: 120 }}
            className="relative z-10 w-full max-w-md mb-16"
          >
            <div className="relative rounded-2xl border-2 border-primary/25 bg-primary/[0.03] p-8 text-center overflow-hidden">
              {/* Animated glow rings */}
              <motion.div
                className="absolute inset-0 rounded-2xl"
                style={{
                  background: "radial-gradient(circle at 50% 50%, hsl(var(--primary) / 0.08) 0%, transparent 70%)",
                }}
                animate={{ scale: [1, 1.05, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute -inset-8 rounded-full"
                style={{
                  background: "radial-gradient(circle, hsl(var(--primary) / 0.04) 0%, transparent 60%)",
                }}
                animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              />

              <div className="relative z-10">
                <motion.div
                  className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4"
                  animate={inView ? { rotate: [0, 5, -5, 0] } : {}}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                >
                  <Shield className="w-7 h-7 text-primary" />
                </motion.div>
                <h3 className="text-lg font-bold text-foreground mb-2">iCommunity Trust Layer</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                  Capa independiente que transforma eventos digitales en pruebas auditables verificables.
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {badges.map((b, i) => (
                    <motion.span
                      key={b}
                      initial={{ opacity: 0, y: 8 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.5 + i * 0.08 }}
                      className="inline-flex items-center px-3 py-1 rounded-md bg-primary/10 text-[11px] font-mono font-medium text-primary"
                    >
                      {b}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* SVG connector lines */}
          <svg
            className="absolute w-full h-full pointer-events-none hidden md:block"
            style={{ zIndex: 2, top: 0, left: 0 }}
            viewBox="0 0 800 500"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <linearGradient id="line-grad-left" x1="50%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.4" />
                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
              </linearGradient>
              <linearGradient id="line-grad-right" x1="50%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.4" />
                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Left connector */}
            <motion.path
              d="M400,200 C400,280 200,280 200,360"
              fill="none"
              stroke="url(#line-grad-left)"
              strokeWidth={hoveredProduct === "certypass" ? 2.5 : 1.5}
              strokeDasharray="6 4"
              filter={hoveredProduct === "certypass" ? "url(#glow)" : undefined}
              className="transition-all duration-500"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={inView ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
            />
            {/* Animated dot on left line */}
            {inView && (
              <motion.circle
                r="3"
                fill="hsl(var(--primary))"
                opacity={0.6}
                animate={{
                  offsetDistance: ["0%", "100%"],
                  opacity: [0, 0.8, 0],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 1 }}
                style={{ offsetPath: "path('M400,200 C400,280 200,280 200,360')" }}
              />
            )}

            {/* Right connector */}
            <motion.path
              d="M400,200 C400,280 600,280 600,360"
              fill="none"
              stroke="url(#line-grad-right)"
              strokeWidth={hoveredProduct === "privaura" ? 2.5 : 1.5}
              strokeDasharray="6 4"
              filter={hoveredProduct === "privaura" ? "url(#glow)" : undefined}
              className="transition-all duration-500"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={inView ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
            />
            {inView && (
              <motion.circle
                r="3"
                fill="hsl(var(--primary))"
                opacity={0.6}
                animate={{
                  offsetDistance: ["0%", "100%"],
                  opacity: [0, 0.8, 0],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 2 }}
                style={{ offsetPath: "path('M400,200 C400,280 600,280 600,360')" }}
              />
            )}
          </svg>

          {/* Product cards */}
          <div className="relative z-10 grid md:grid-cols-2 gap-6 w-full max-w-2xl">
            {products.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 + i * 0.15, type: "spring", stiffness: 100 }}
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
                className={`
                  group rounded-xl border bg-card p-6 flex flex-col transition-all duration-500
                  ${hoveredProduct === product.id
                    ? "border-primary/30 shadow-[0_0_30px_-8px_hsl(var(--primary)/0.2)] -translate-y-1"
                    : "border-border hover:border-primary/15"
                  }
                `}
              >
                <motion.div
                  className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center mb-4"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <product.icon className={`w-5 h-5 transition-colors duration-300 ${hoveredProduct === product.id ? "text-primary" : "text-primary/70"}`} />
                </motion.div>

                <h3 className="text-base font-semibold text-foreground mb-2">{product.title}</h3>

                <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1">
                  {product.desc}
                </p>

                {product.tag && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.8 + i * 0.1 }}
                    className="inline-flex self-start items-center text-[10px] font-medium text-muted-foreground bg-secondary px-2.5 py-1 rounded-md mb-4 border border-border"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/50 mr-1.5 animate-pulse" />
                    {product.tag}
                  </motion.span>
                )}

                <a
                  href={product.href}
                  {...(product.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors group/link"
                >
                  {product.cta}
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/link:translate-x-0.5" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom message */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center text-sm text-muted-foreground mt-14 max-w-2xl mx-auto"
        >
          Una única infraestructura de confianza permite desplegar múltiples soluciones regulatorias sin duplicar integraciones.
        </motion.p>
      </div>
    </section>
  );
};

export default Ecosystem;
