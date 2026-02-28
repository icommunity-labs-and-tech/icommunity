import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ShieldCheck, FileCheck2, Webhook, Layers, Scale, Server } from "lucide-react";

const blocks = [
  {
    icon: ShieldCheck,
    title: "Certificación independiente del operador",
    description:
      "La prueba auditada se genera fuera del sistema que ejecuta el proceso, garantizando trazabilidad regulatoria ante terceros.",
  },
  {
    icon: FileCheck2,
    title: "Cada evento nace con registro inmutable",
    description: "Cada evento queda sellado con integridad criptográfica y marca temporal desde su creación.",
  },
  {
    icon: Webhook,
    title: "Se integra sin reemplazar nada",
    description: "Integración mediante SDK, API o Webhooks sin modificar los sistemas existentes.",
  },
  {
    icon: Layers,
    title: "No depende del proveedor",
    description: "Compatible con cualquier proveedor KYC, onboarding o sistema corporativo existente.",
  },
  {
    icon: Scale,
    title: "Alineada con el marco regulatorio europeo",
    description: "Diseñado alineado con eIDAS, AML, MiCA y marcos regulatorios aplicables.",
  },
  {
    icon: Server,
    title: "Arquitectura preparada para escala institucional",
    description: "Arquitectura multi-tenant preparada para operar a escala institucional.",
  },
];

const WhyICommunity = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="ic-section bg-background" ref={ref}>
      <div className="ic-container max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Por qué iCommunity</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Capa de confianza diseñada para convertir eventos digitales en pruebas auditadas con trazabilidad
            regulatoria.
          </p>
        </motion.div>

        {/* 2x3 Grid */}
        <div className="grid md:grid-cols-2 gap-5">
          {blocks.map((b, i) => {
            const isPrimary = i < 2;
            return (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.07 }}
                className={`rounded-xl transition-all duration-300 ${
                  isPrimary
                    ? "p-7"
                    : "p-6"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`rounded-lg flex items-center justify-center flex-shrink-0 ${
                      isPrimary ? "w-11 h-11 bg-primary/10" : "w-10 h-10 bg-accent"
                    }`}
                  >
                    <b.icon
                      className={`text-primary ${isPrimary ? "w-[22px] h-[22px]" : "w-5 h-5"}`}
                      strokeWidth={1.5}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-semibold text-foreground mb-1.5 ${isPrimary ? "text-[15px]" : "text-sm"}`}>
                      {b.title}
                    </h3>
                    <p className="text-[13px] leading-relaxed text-muted-foreground">{b.description}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Closing statement */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 1 }}
          className="text-center mt-14 text-sm md:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed"
        ></motion.p>
      </div>
    </section>
  );
};

export default WhyICommunity;
