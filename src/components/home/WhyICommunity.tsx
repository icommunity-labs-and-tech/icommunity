import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ShieldCheck, FileCheck2, Webhook, Layers, Scale, Server, X, Check } from "lucide-react";

const blocks = [
  {
    icon: ShieldCheck,
    title: "La evidencia se genera fuera del sistema",
    description: "La evidencia se genera fuera del sistema que ejecuta el proceso, garantizando verificabilidad ante terceros y reguladores.",
  },
  {
    icon: FileCheck2,
    title: "Cada evento nace certificado",
    description: "Cada evento queda certificado con integridad criptográfica y sellado temporal verificable desde su creación.",
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

const internalItems = [
  "Logs modificables",
  "Dependencia del operador",
  "Auditoría compleja",
  "Evidencia no independiente",
];

const icommunityItems = [
  "Evidencia verificable",
  "Independencia criptográfica",
  "Auditoría inmediata",
  "Preparado para reguladores",
];

const WhyICommunity = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="ic-section bg-accent/30" ref={ref}>
      <div className="ic-container max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-sm font-medium tracking-wide text-primary/60 mb-4">
            Why iCommunity
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Por qué iCommunity
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Infraestructura diseñada para convertir eventos digitales en evidencia regulatoria verificable desde origen.
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
                className={`rounded-xl border bg-background transition-all duration-300 ${
                  isPrimary
                    ? "border-primary/15 p-7 hover:border-primary/30 hover:shadow-md"
                    : "border-border p-6 hover:border-primary/20 hover:shadow-sm"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`rounded-lg flex items-center justify-center flex-shrink-0 ${
                    isPrimary ? "w-11 h-11 bg-primary/10" : "w-10 h-10 bg-accent"
                  }`}>
                    <b.icon className={`text-primary ${isPrimary ? "w-[22px] h-[22px]" : "w-5 h-5"}`} strokeWidth={1.5} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-semibold text-foreground mb-1.5 ${isPrimary ? "text-[15px]" : "text-sm"}`}>{b.title}</h3>
                    <p className="text-[13px] leading-relaxed text-muted-foreground">{b.description}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Structural problem */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.65 }}
          className="mt-16 mb-10 text-center max-w-2xl mx-auto"
        >
          <h3 className="text-lg md:text-xl font-semibold text-foreground mb-3">
            El problema estructural
          </h3>
          <p className="text-[14px] leading-relaxed text-muted-foreground">
            En los sistemas tradicionales, quien ejecuta el proceso también genera la evidencia.
          </p>
          <p className="text-[14px] leading-relaxed text-foreground font-medium mt-2">
            iCommunity separa ejecución y certificación, creando evidencia independiente verificable.
          </p>
        </motion.div>

        {/* Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h3 className="text-center text-lg md:text-xl font-semibold text-foreground mb-8">
            Construir confianza internamente vs usar infraestructura independiente
          </h3>
          <div className="grid md:grid-cols-2 gap-5">
            {/* Internal */}
            <div className="rounded-xl border border-border bg-background p-6">
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
          </div>
        </motion.div>

        {/* Closing statement */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 1 }}
          className="text-center mt-14 text-sm md:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed"
        >
          <span className="font-medium text-foreground">iCommunity</span> es la capa independiente de confianza que conecta sistemas digitales con supervisión regulatoria.
        </motion.p>
      </div>
    </section>
  );
};

export default WhyICommunity;
