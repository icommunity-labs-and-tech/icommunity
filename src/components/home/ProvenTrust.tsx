import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Landmark, UserCheck, Building2, Server, Check } from "lucide-react";
import logoAenor from "@/assets/logo-aenor.png";
import logoLogalty from "@/assets/logo-logalty.png";
import logoEstrella from "@/assets/logo-estrella.png";

const cases = [
  {
    icon: Landmark,
    name: "Ayuntamiento de Madrid",
    description: "Certificación blockchain de procesos de identidad digital ciudadana en servicios municipales.",
    tags: ["Administración pública", "Producción"],
  },
  {
    icon: UserCheck,
    name: "Proveedores de identidad digital",
    description: "Integración de evidencia verificable en flujos reales de onboarding.",
    tags: ["KYC", "eIDAS", "AML"],
  },
  {
    icon: Building2,
    name: "Plataformas financieras reguladas",
    description: "Registro inmutable de eventos de compliance supervisados.",
    tags: ["PSD2", "MiCA"],
  },
  {
    icon: Server,
    name: "Infraestructura API de evidencia",
    description: "Procesamiento de eventos certificados mediante SDK y Webhooks.",
    tags: ["API-First", "Audit Ready"],
  },
];

const trustColumns = [
  {
    title: "Entornos KYC",
    description: "Infraestructura de evidencia verificable integrada en procesos reales de verificación de identidad.",
    logos: [
      { src: logoAenor, alt: "AENOR" },
      { src: logoLogalty, alt: "Logalty" },
    ],
    badges: ["KYC", "eIDAS", "AML"],
  },
  {
    title: "Infraestructura API",
    description: "Certificación de eventos y registros operativos mediante integración API.",
    logos: [
      { src: logoEstrella, alt: "Estrella Galicia" },
    ],
    badges: ["API-First", "Event Certification"],
  },
  {
    title: "Plataformas financieras reguladas",
    description: "Registro inmutable de eventos de compliance en entornos supervisados.",
    logos: [
      { text: "Conforce" },
    ],
    badges: ["PSD2", "MiCA", "Compliance"],
  },
];

const metrics = [
  { value: "+10M", label: "Eventos certificados procesados" },
  { value: "99.99%", label: "Disponibilidad infraestructura" },
  { value: "API-first", label: "Integración vía SDK / Webhooks" },
  { value: "Audit-ready", label: "Evidencia verificable desde origen" },
];

const signals = [
  "Operativo en producción",
  "Infraestructura multi-tenant",
  "Evidencia verificable independiente",
  "Compatible eIDAS / AML",
  "Enterprise API ready",
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
            Confianza institucional en producción
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Infraestructura desplegada en administraciones públicas y plataformas reguladas.
          </p>
        </motion.div>

        {/* Case cards */}
        <div className="grid sm:grid-cols-2 gap-6">
          {cases.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
              className="rounded-xl border border-border bg-background p-6 hover:border-primary/20 transition-colors duration-300"
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

        {/* Trust Wall */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-20"
        >
          <div className="text-center mb-10">
            <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">
              Infraestructura operativa en producción
            </h3>
            <p className="text-sm text-muted-foreground max-w-xl mx-auto">
              Organizaciones y plataformas que ya utilizan iCommunity como capa independiente de evidencia verificable.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {trustColumns.map((col, i) => (
              <motion.div
                key={col.title}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                className="rounded-xl border border-border bg-background p-6 flex flex-col"
              >
                <h4 className="text-sm font-semibold text-foreground mb-2">{col.title}</h4>
                <p className="text-[12px] leading-relaxed text-muted-foreground mb-5">
                  {col.description}
                </p>
                <div className="flex items-center gap-6 justify-center py-6 flex-1">
                  {col.logos.map((logo, j) =>
                    'src' in logo ? (
                      <img
                        key={j}
                        src={logo.src}
                        alt={logo.alt}
                        className="h-8 object-contain grayscale opacity-50 hover:opacity-80 transition-opacity duration-300"
                      />
                    ) : (
                      <span
                        key={j}
                        className="text-sm font-semibold text-muted-foreground/50 hover:text-muted-foreground/80 transition-colors duration-300 tracking-wide"
                      >
                        {logo.text}
                      </span>
                    )
                  )}
                </div>
                <div className="flex flex-wrap gap-1.5 mt-auto pt-4 border-t border-border">
                  {col.badges.map((badge) => (
                    <span
                      key={badge}
                      className="text-[10px] font-medium tracking-widest uppercase text-primary/50 bg-accent px-2 py-0.5 rounded"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {metrics.map((m) => (
            <div key={m.value} className="text-center">
              <p className="text-2xl md:text-3xl font-bold text-foreground mb-1">{m.value}</p>
              <p className="text-[12px] text-muted-foreground">{m.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Deployment signals */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 1.1 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
        >
          {signals.map((s) => (
            <span key={s} className="flex items-center gap-1.5 text-[12px] text-muted-foreground/70">
              <Check className="w-3.5 h-3.5 text-primary/50" strokeWidth={2} />
              {s}
            </span>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 1.3 }}
          className="text-center mt-12 text-xs tracking-widest uppercase text-muted-foreground/60 font-medium"
        >
          Infrastructure operating continuously across regulated environments.
        </motion.p>
      </div>
    </section>
  );
};

export default ProvenTrust;
