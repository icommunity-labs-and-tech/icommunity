import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Layers, Package, BrainCircuit, ArrowRight, Shield } from "lucide-react";

const products = [
  {
    id: "ibs",
    icon: Layers,
    title: "iBS",
    label: "iCommunity Core",
    desc: "Certificación independiente de eventos digitales mediante registro criptográfico verificable.",
    tag: null,
    cta: "Ver arquitectura",
    href: "#arquitectura-de-confianza",
    external: false,
    color: "primary",
  },
  {
    id: "certypass",
    icon: Package,
    title: "CertyPass",
    label: null,
    desc: "Pasaporte Digital de Producto conforme al reglamento europeo ESPR para trazabilidad y sostenibilidad.",
    tag: "Built on iCommunity",
    cta: "Ir a CertyPass",
    href: "https://certypass.com",
    external: true,
    color: "emerald",
  },
  {
    id: "privaura",
    icon: BrainCircuit,
    title: "Privaura",
    label: null,
    desc: "Gobierno, anonimización y control de datos sensibles antes de su uso en sistemas de IA.",
    tag: "Powered by iCommunity",
    cta: "Ir a Privaura",
    href: "https://privaura.lovable.app",
    external: true,
    color: "violet",
  },
];

const badges = ["API Infrastructure", "Evidence Layer", "Audit Ready", "Regulatory Native"];

const Ecosystem = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

  return (
    <section className="ic-section bg-background" ref={ref}>
      <div className="ic-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            iCommunity Trust Ecosystem
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Infraestructura común sobre la que se construyen soluciones de certificación, cumplimiento y gobierno del dato.
          </p>
        </motion.div>

        {/* Core + Products layout */}
        <div className="relative max-w-4xl mx-auto">
          {/* Core node */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative z-10 mx-auto max-w-md mb-12"
          >
            <div className="relative rounded-2xl border-2 border-primary/25 bg-primary/[0.03] p-8 text-center">
              <div className="absolute inset-0 rounded-2xl bg-primary/5 blur-2xl -z-10" />
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Shield className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">iCommunity Core Infrastructure</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                Capa independiente que transforma eventos digitales en pruebas auditables verificables.
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {badges.map((b) => (
                  <span
                    key={b}
                    className="inline-flex items-center px-3 py-1 rounded-md bg-primary/10 text-[11px] font-mono font-medium text-primary"
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* SVG connector lines — desktop only */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none hidden md:block"
            style={{ zIndex: 1 }}
            preserveAspectRatio="none"
          >
            {/* Left line */}
            <line
              x1="50%" y1="38%" x2="16.6%" y2="58%"
              stroke={`hsl(var(--primary) / ${hoveredProduct === "ibs" ? "0.5" : "0.15"})`}
              strokeWidth="1.5"
              className="transition-all duration-500"
            />
            {/* Center line */}
            <line
              x1="50%" y1="38%" x2="50%" y2="58%"
              stroke={`hsl(var(--primary) / ${hoveredProduct === "certypass" ? "0.5" : "0.15"})`}
              strokeWidth="1.5"
              className="transition-all duration-500"
            />
            {/* Right line */}
            <line
              x1="50%" y1="38%" x2="83.3%" y2="58%"
              stroke={`hsl(var(--primary) / ${hoveredProduct === "privaura" ? "0.5" : "0.15"})`}
              strokeWidth="1.5"
              className="transition-all duration-500"
            />
          </svg>

          {/* Product cards */}
          <div className="relative z-10 grid md:grid-cols-3 gap-5">
            {products.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
                className={`
                  group rounded-xl border bg-card p-6 flex flex-col transition-all duration-300
                  ${hoveredProduct === product.id
                    ? "border-primary/30 shadow-[0_0_24px_-6px_hsl(var(--primary)/0.15)]"
                    : "border-border hover:border-primary/15"
                  }
                `}
              >
                <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center mb-4">
                  <product.icon className="w-5 h-5 text-primary/70" />
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-base font-semibold text-foreground">{product.title}</h3>
                  {product.label && (
                    <span className="text-[10px] font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                      {product.label}
                    </span>
                  )}
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1">
                  {product.desc}
                </p>

                {product.tag && (
                  <span className="inline-flex self-start items-center text-[10px] font-medium text-muted-foreground bg-secondary px-2.5 py-1 rounded-md mb-4 border border-border">
                    {product.tag}
                  </span>
                )}

                <a
                  href={product.href}
                  {...(product.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  {product.cta}
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom message */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center text-sm text-muted-foreground mt-14 max-w-2xl mx-auto"
        >
          Una única infraestructura de confianza permite desplegar múltiples soluciones regulatorias sin duplicar integraciones.
        </motion.p>
      </div>
    </section>
  );
};

export default Ecosystem;
