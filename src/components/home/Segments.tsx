import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Fingerprint, Landmark, Gamepad2, Building2, type LucideIcon } from "lucide-react";

const segments: { icon: LucideIcon; title: string; outcome: string; regulation: string }[] = [
  {
    icon: Fingerprint,
    title: "Identidad digital (KYC)",
    outcome: "Certificación digital de cada proceso de verificación ejecutado.",
    regulation: "eIDAS · AML5/6",
  },
  {
    icon: Landmark,
    title: "Exchanges cripto",
    outcome: "Registro independiente de onboarding y operaciones reguladas.",
    regulation: "MiCA · Travel Rule",
  },
  {
    icon: Gamepad2,
    title: "Juego online",
    outcome: "Prueba auditable de verificación de edad por usuario.",
    regulation: "DGOJ · Age Verification",
  },
  {
    icon: Building2,
    title: "Fintech & banca",
    outcome: "Trazabilidad continua de eventos de compliance con certificación criptográfica.",
    regulation: "PSD2 · EBA Guidelines",
  },
];

const Segments = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="segmentos" className="ic-section bg-secondary/50" ref={ref}>
      <div className="ic-container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Diseñado para ecosistemas regulados
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Certificación digital desplegada donde la trazabilidad regulatoria es un requisito, no una opción.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {segments.map((seg, i) => (
            <motion.div
              key={seg.title}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group rounded-2xl border border-border bg-card p-7 transition-all duration-300 ease-out hover:border-primary/20 hover:bg-accent/30"
            >
              <div className="flex items-center gap-4 mb-3">
                <div className="w-11 h-11 rounded-xl bg-accent flex items-center justify-center flex-shrink-0">
                  <seg.icon className="w-5 h-5 text-primary/70" />
                </div>
                <h3 className="text-base font-semibold text-foreground">{seg.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{seg.outcome}</p>
              <span className="text-[11px] font-medium tracking-wider uppercase text-primary/60">
                {seg.regulation}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Segments;
