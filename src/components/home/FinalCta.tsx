import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const FinalCta = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="demo" className="ic-section bg-background" ref={ref}>
      <div className="ic-container text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 max-w-2xl mx-auto">
            Convierte tus verificaciones en{" "}
            <span className="ic-text-gradient">evidencia auditable.</span>
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="mailto:info@icommunity.io" className="inline-flex items-center justify-center rounded-lg ic-gradient-cta px-8 py-3.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity shadow-lg shadow-primary/20">
              Solicitar demo
            </a>
            <a href="mailto:info@icommunity.io" className="inline-flex items-center justify-center rounded-lg border border-border px-8 py-3.5 text-sm font-medium text-foreground hover:bg-secondary transition-colors">
              Contactar
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCta;
