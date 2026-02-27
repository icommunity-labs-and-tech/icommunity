import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { X, Check } from "lucide-react";

const internalItems = [
  "Logs modificables",
  "Dependencia del operador",
  "Auditoría compleja",
  "Pruebas no independientes",
];

const icommunityItems = [
  "Prueba auditada independiente",
  "Independencia criptográfica",
  "Auditoría inmediata",
  "Preparado para reguladores",
];

const StructuralProblem = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="ic-section py-16 md:py-20 bg-background">
      <div className="ic-container max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            El problema estructural
          </h2>
          <p className="text-lg md:text-xl leading-relaxed text-muted-foreground mb-3">
            En los sistemas tradicionales, quien ejecuta el proceso también genera la evidencia.
          </p>
          <p className="text-lg md:text-xl leading-relaxed text-foreground font-medium">
            iCommunity separa ejecución y certificación, creando un registro independiente auditable.
          </p>
        </motion.div>

        {/* Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid md:grid-cols-2 gap-6"
        >
          {/* Internal */}
          <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
            <h3 className="text-base font-bold text-foreground mb-6">Sistemas internos</h3>
            <ul className="space-y-5">
              {internalItems.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -12 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.08 }}
                  className="flex items-center gap-3 text-sm text-muted-foreground"
                >
                  <span className="w-6 h-6 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0">
                    <X className="w-3.5 h-3.5 text-destructive/70" strokeWidth={2.5} />
                  </span>
                  {item}
                </motion.li>
              ))}
            </ul>
          </div>
          {/* iCommunity */}
          <div className="rounded-2xl border-2 border-primary/20 bg-accent/40 p-8 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-primary/60 rounded-l-2xl" />
            <h3 className="text-base font-bold text-foreground mb-6">iCommunity</h3>
            <ul className="space-y-5">
              {icommunityItems.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -12 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.08 }}
                  className="flex items-center gap-3 text-sm text-foreground font-medium"
                >
                  <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3.5 h-3.5 text-primary" strokeWidth={2.5} />
                  </span>
                  {item}
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StructuralProblem;
