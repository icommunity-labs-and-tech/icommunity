import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Landmark, ShieldCheck, BarChart3, Handshake, FileText } from "lucide-react";

const paths = [
  {
    icon: Landmark,
    title: "Administraciones públicas",
    desc: "Explorar despliegues institucionales y certificación de procesos ciudadanos.",
    cta: "Hablar con sector público",
  },
  {
    icon: ShieldCheck,
    title: "Proveedores de identidad / KYC",
    desc: "Integra evidencia verificable como capa adicional para tus clientes.",
    cta: "Integrar iCommunity",
  },
  {
    icon: BarChart3,
    title: "Plataformas reguladas",
    desc: "Prepara tus sistemas para auditoría y supervisión regulatoria.",
    cta: "Solicitar demo técnica",
  },
  {
    icon: Handshake,
    title: "Partners e integradores",
    desc: "Construye soluciones sobre infraestructura de confianza independiente.",
    cta: "Programa de partners",
  },
];

const FinalCta = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="demo" className="ic-section bg-background" ref={ref}>
      <div className="ic-container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 max-w-2xl mx-auto">
            Despliega{" "}
            <span className="ic-text-gradient">infraestructura de confianza</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Selecciona cómo quieres integrar iCommunity en tu organización.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {paths.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
              className="group rounded-xl border border-border bg-background p-6 flex flex-col text-left hover:border-primary/25 hover:shadow-md transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <p.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-[15px] font-semibold text-foreground mb-2">{p.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">{p.desc}</p>
              <a
                href="mailto:info@icommunity.io"
                className="inline-flex items-center justify-center rounded-lg ic-gradient-cta px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity shadow-sm shadow-primary/15 w-full"
              >
                {p.cta}
              </a>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="text-center"
        >
          <a
            href="mailto:info@icommunity.io"
            className="inline-flex items-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-medium text-foreground hover:bg-secondary transition-colors"
          >
            <FileText className="w-4 h-4" />
            Descargar whitepaper técnico
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCta;
