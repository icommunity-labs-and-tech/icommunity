import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const StructuralProblem = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="ic-section py-16 md:py-20 bg-background">
      <div className="ic-container max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            El problema estructural
          </h2>
          <p className="text-lg md:text-xl leading-relaxed text-muted-foreground mb-3">
            En los sistemas tradicionales, quien ejecuta el proceso también genera la evidencia.
          </p>
          <p className="text-lg md:text-xl leading-relaxed text-foreground font-medium">
            iCommunity separa ejecución y certificación, creando evidencia independiente verificable.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default StructuralProblem;
