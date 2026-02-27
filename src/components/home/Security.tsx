import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Fingerprint, ClipboardList, ShieldCheck } from "lucide-react";

const layers = [
  {
    icon: Fingerprint,
    title: "Integridad criptográfica",
    properties: [
      "Hash SHA-256 por evento certificado",
      "Sellado temporal verificable e independiente",
      "Registro inmutable de evidencia",
    ],
  },
  {
    icon: ClipboardList,
    title: "Auditabilidad",
    properties: [
      "Evidencia exportable en formato estándar",
      "Observabilidad y trazabilidad de accesos",
      "Histórico completo de eventos por tenant",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Privacidad y gobierno del dato",
    properties: [
      "Controles de retención conforme a RGPD",
      "Segregación lógica por tenant",
      "Políticas granulares de acceso y borrado",
    ],
  },
];

const Security = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="seguridad" className="ic-section bg-secondary/50" ref={ref}>
      <div className="ic-container max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-sm font-medium tracking-wide text-primary/60 mb-4">
            Garantías técnicas diseñadas para auditoría regulatoria
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Seguridad & Compliance
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Tres capas de garantía diseñadas desde el primer día para entornos regulados.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-10">
          {layers.map((layer, i) => (
            <motion.div
              key={layer.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              className="border-l-2 border-primary/15 pl-6"
            >
              <div className="w-11 h-11 rounded-lg bg-accent flex items-center justify-center mb-5">
                <layer.icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
              </div>

              <h3 className="text-sm font-semibold text-foreground mb-5 tracking-tight">
                {layer.title}
              </h3>

              <ul className="space-y-3">
                {layer.properties.map((prop) => (
                  <li key={prop} className="flex items-start gap-2.5">
                    <div className="w-1 h-1 rounded-full bg-primary/40 mt-2 flex-shrink-0" />
                    <span className="text-[13px] leading-relaxed text-muted-foreground">
                      {prop}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-10"
        >
          <a href="#" className="text-sm font-medium text-primary hover:text-primary-dark transition-colors">
            Ver detalles técnicos →
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Security;
