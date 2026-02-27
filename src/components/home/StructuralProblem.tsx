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
          className="grid md:grid-cols-2 gap-5"
        >
          {/* Internal */}
          <div className="rounded-xl border border-border bg-card p-6">
            <p className="text-sm font-semibold text-muted-foreground mb-4">Sistemas internos</p>
            <ul className="space-y-3">
              {internalItems.map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-[13px] text-muted-foreground/70">
                  <X className="w-4 h-4 text-destructive/60 flex-shrink-0" strokeWidth={2} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          {/* iCommunity */}
          <div className="rounded-xl border border-primary/20 bg-accent/50 p-6">
            <p className="text-sm font-semibold text-foreground mb-4">iCommunity</p>
            <ul className="space-y-3">
              {icommunityItems.map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-[13px] text-foreground">
                  <Check className="w-4 h-4 text-primary flex-shrink-0" strokeWidth={2} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StructuralProblem;
