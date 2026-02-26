import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Check } from "lucide-react";

const checks = [
  "Integridad criptográfica",
  "Sellado temporal verificable",
  "Evidencia auditable y exportable",
  "Controles de retención y privacidad (RGPD)",
  "Segregación por tenant",
  "Observabilidad y trazabilidad de accesos",
];

const Security = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="seguridad" className="ic-section bg-secondary/50" ref={ref}>
      <div className="ic-container max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Seguridad & Compliance</h2>
          <p className="text-muted-foreground text-lg">
            Diseñada desde el primer día para entornos regulados.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="ic-card"
        >
          <div className="grid sm:grid-cols-2 gap-4">
            {checks.map((c) => (
              <div key={c} className="flex items-center gap-3 py-2">
                <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                  <Check className="w-3.5 h-3.5 text-primary" />
                </div>
                <span className="text-sm text-foreground">{c}</span>
              </div>
            ))}
          </div>
          <div className="mt-8 pt-6 border-t border-border">
            <a href="#" className="text-sm font-medium text-primary hover:text-primary-dark transition-colors">
              Ver detalles técnicos →
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Security;
