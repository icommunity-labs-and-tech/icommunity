import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Fingerprint, Landmark, Gamepad2, Building2 } from "lucide-react";

const segments = [
  {
    icon: Fingerprint,
    title: "Proveedores KYC",
    subtitle: "White-label",
    outcome: "Ofrece evidencia verificable como valor diferencial a tus clientes.",
    why: "El mercado exige pruebas independientes del proveedor que ejecuta la verificación.",
  },
  {
    icon: Landmark,
    title: "Exchanges cripto",
    subtitle: "MiCA",
    outcome: "Cumple con los requisitos de trazabilidad y auditoría de MiCA desde el día uno.",
    why: "La regulación MiCA entra en vigor y exige registros inmutables de verificación de identidad.",
  },
  {
    icon: Gamepad2,
    title: "Juego online / Age-restricted",
    subtitle: "Verificación de edad",
    outcome: "Demuestra ante el regulador que cada usuario fue verificado correctamente.",
    why: "Las multas por acceso de menores están creciendo exponencialmente en la UE.",
  },
  {
    icon: Building2,
    title: "Fintech regulado",
    subtitle: "Compliance continuo",
    outcome: "Mantén un historial auditable de cada evento de compliance.",
    why: "Los supervisores financieros exigen cada vez más evidencia granular y verificable.",
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
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Para quién</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Infraestructura de confianza para plataformas reguladas y proveedores de identidad.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {segments.map((seg, i) => (
            <motion.div
              key={seg.title}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="ic-card"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-11 h-11 rounded-xl bg-accent flex items-center justify-center flex-shrink-0">
                  <seg.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{seg.title}</h3>
                  <span className="text-xs font-medium text-primary">{seg.subtitle}</span>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Outcome</span>
                  <p className="text-sm text-foreground mt-1">{seg.outcome}</p>
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Por qué ahora</span>
                  <p className="text-sm text-muted-foreground mt-1">{seg.why}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Segments;
