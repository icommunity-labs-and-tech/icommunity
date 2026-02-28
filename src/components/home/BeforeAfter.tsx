import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FileWarning, ShieldOff, ClipboardList, ShieldCheck, Zap, ExternalLink } from "lucide-react";

const before = [
  { icon: FileWarning, text: "Logs internos sin valor probatorio" },
  { icon: ShieldOff, text: "Dependencia total del proveedor" },
  { icon: ClipboardList, text: "Auditorías manuales y reactivas" },
];

const after = [
  { icon: ShieldCheck, text: "Evidencia independiente y verificable" },
  { icon: Zap, text: "Auditoría inmediata desde el origen" },
  { icon: ExternalLink, text: "Verificación por terceros externos" },
];

const BeforeAfter = () => {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="ic-section py-20 md:py-28 bg-secondary/30 overflow-hidden">
      <div className="ic-container max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            El cambio <span className="text-primary">en la práctica</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-[1fr_auto_1fr] gap-8 md:gap-0 items-start">
          {/* ANTES */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-5 md:pr-10"
          >
            <div className="flex items-center gap-2 mb-6">
              <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase">Antes</span>
              <div className="flex-1 h-px bg-border" />
            </div>
            {before.map((item, i) => (
              <motion.div
                key={item.text}
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                className="flex items-start gap-3"
              >
                <div className="w-9 h-9 rounded-lg bg-destructive/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <item.icon className="w-4 h-4 text-destructive" strokeWidth={1.5} />
                </div>
                <span className="text-sm text-muted-foreground leading-relaxed pt-1.5">{item.text}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Divider */}
          <div className="hidden md:flex flex-col items-center justify-center self-stretch">
            <div className="w-px h-full bg-border relative">
              <motion.div
                className="absolute top-0 w-px bg-primary origin-top"
                initial={{ scaleY: 0 }}
                animate={inView ? { scaleY: 1 } : {}}
                transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
                style={{ height: "100%" }}
              />
            </div>
          </div>
          <div className="md:hidden w-full h-px bg-border" />

          {/* DESPUÉS */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-5 md:pl-10"
          >
            <div className="flex items-center gap-2 mb-6">
              <span className="font-mono text-xs tracking-widest text-primary uppercase font-semibold">Después</span>
              <div className="flex-1 h-px bg-primary/30" />
            </div>
            {after.map((item, i) => (
              <motion.div
                key={item.text}
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                className="flex items-start gap-3"
              >
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <item.icon className="w-4 h-4 text-primary" strokeWidth={1.5} />
                </div>
                <span className="text-sm text-foreground leading-relaxed pt-1.5">{item.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfter;
