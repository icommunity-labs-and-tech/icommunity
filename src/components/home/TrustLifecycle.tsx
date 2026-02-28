import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Radio, ShieldCheck, FileDigit, SearchCheck } from "lucide-react";

const steps = [
  { icon: Radio, label: "Captura", sub: "Evento digital registrado" },
  { icon: ShieldCheck, label: "Certificación", sub: "Hash + sello temporal" },
  { icon: FileDigit, label: "Registro", sub: "Evidencia inmutable" },
  { icon: SearchCheck, label: "Verificación", sub: "Prueba auditable" },
];

const TrustLifecycle = () => {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="ic-section py-20 md:py-28 bg-background overflow-hidden">
      <div className="ic-container max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Trust <span className="text-primary">Lifecycle</span>
          </h2>
        </motion.div>

        {/* Desktop: horizontal */}
        <div className="hidden md:block relative">
          {/* Connecting line */}
          <div className="absolute top-6 left-[12.5%] right-[12.5%] h-px bg-border">
            <motion.div
              className="h-full bg-primary origin-left"
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.6, delay: 0.3, ease: "easeOut" }}
            />
          </div>

          <div className="grid grid-cols-4 relative">
            {steps.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.35 }}
                className="flex flex-col items-center text-center"
              >
                {/* Node dot */}
                <div className="w-12 h-12 rounded-full border border-primary/40 flex items-center justify-center bg-background relative z-10">
                  <s.icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                </div>

                {/* Step number */}
                <span className="font-mono text-[10px] text-muted-foreground mt-3">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <span className="text-sm font-semibold text-foreground mt-1">{s.label}</span>
                <span className="text-xs text-muted-foreground mt-0.5 max-w-[140px]">{s.sub}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile: vertical */}
        <div className="md:hidden relative pl-6">
          {/* Vertical line */}
          <div className="absolute left-[23px] top-0 bottom-0 w-px bg-border">
            <motion.div
              className="w-full bg-primary origin-top"
              initial={{ scaleY: 0 }}
              animate={inView ? { scaleY: 1 } : {}}
              transition={{ duration: 1.4, delay: 0.3, ease: "easeOut" }}
              style={{ height: "100%" }}
            />
          </div>

          <div className="space-y-10">
            {steps.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, x: -12 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.3 }}
                className="flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-full border border-primary/40 flex items-center justify-center bg-background relative z-10 flex-shrink-0">
                  <s.icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                </div>
                <div className="pt-1">
                  <span className="font-mono text-[10px] text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="text-sm font-semibold text-foreground">{s.label}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{s.sub}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustLifecycle;
