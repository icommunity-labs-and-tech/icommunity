import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Landmark, CreditCard, ShieldCheck, Globe } from "lucide-react";

const cases = [
  {
    icon: Landmark,
    name: "Ayuntamiento de Madrid",
    description: "Certificación de procesos de identidad digital ciudadana en servicios municipales.",
    tags: ["Administración pública", "eIDAS"],
  },
  {
    icon: ShieldCheck,
    name: "Identidad digital (KYC)",
    description: "Evidencia verificable para flujos de verificación de identidad en plataformas de onboarding.",
    tags: ["KYC/AML", "RGPD"],
  },
  {
    icon: CreditCard,
    name: "Fintech regulado",
    description: "Registro inmutable de eventos de cumplimiento en plataformas financieras supervisadas.",
    tags: ["PSD2", "MiFID II"],
  },
  {
    icon: Globe,
    name: "Ecosistemas cripto regulados",
    description: "Trazabilidad y sellado temporal de operaciones en entornos sujetos a regulación MiCA.",
    tags: ["MiCA", "Travel Rule"],
  },
];

const ProvenTrust = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="ic-section bg-background" ref={ref}>
      <div className="ic-container max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Confianza demostrada en entornos reales
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Infraestructura desplegada en administraciones públicas y plataformas reguladas.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6">
          {cases.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
              className="rounded-xl border border-border bg-background p-6"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
                  <c.icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-foreground mb-1.5">{c.name}</h3>
                  <p className="text-[13px] leading-relaxed text-muted-foreground mb-3">
                    {c.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {c.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-medium tracking-wide uppercase text-primary/60 bg-accent px-2 py-0.5 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-12 text-xs tracking-widest uppercase text-muted-foreground/60 font-medium"
        >
          Infrastructure operating continuously across regulated environments.
        </motion.p>
      </div>
    </section>
  );
};

export default ProvenTrust;
