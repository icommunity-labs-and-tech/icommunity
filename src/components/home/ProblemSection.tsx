import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const ProblemSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="ic-section bg-background" ref={ref}>
      <div className="ic-container max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
            Cumplir ya no basta.{" "}
            <span className="ic-text-gradient">Hay que poder demostrarlo.</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            La presión regulatoria sobre identidad digital, KYC y verificación de edad crece cada trimestre.
            Los reguladores ya no aceptan capturas de pantalla ni logs internos: exigen prueba
            verificable, consistente e independiente del proveedor. Sin una capa de evidencia neutral,
            cada auditoría es un riesgo operativo.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemSection;
