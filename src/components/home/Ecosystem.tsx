import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Layers, Package, BrainCircuit, ArrowRight } from "lucide-react";

const cards = [
  {
    icon: Layers,
    title: "iBS",
    desc: "Capa independiente que certifica eventos digitales y genera pruebas auditables mediante blockchain pública.",
    cta: "Ir a iBS",
    href: "https://icommunity.io/ibs",
    external: false,
  },
  {
    icon: Package,
    title: "CertyPass",
    desc: "Pasaporte Digital de Producto conforme al reglamento europeo ESPR, para garantizar la sostenibilidad ambiental de cualquier producto.",
    cta: "Ir a CertyPass",
    href: "https://certypass.com",
    external: true,
  },
  {
    icon: BrainCircuit,
    title: "Privaura",
    desc: "Gobierno, anonimización y control de datos sensibles para su tratamiento en plataformas IA.",
    cta: "Ir a Privaura",
    href: "https://privaura.lovable.app",
    external: true,
  },
];

const Ecosystem = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="ic-section bg-background" ref={ref}>
      <div className="ic-container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">iCommunity Trust Ecosystem</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Una plataforma base sobre la que se construyen soluciones regulatorias especializadas.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
              className="group rounded-xl border border-border bg-card p-7 flex flex-col hover:border-primary/20 hover:shadow-md transition-all duration-300"
            >
              <div className="w-11 h-11 rounded-xl bg-accent flex items-center justify-center mb-5">
                <card.icon className="w-5 h-5 text-primary/70" />
              </div>
              <h3 className="text-base font-semibold text-foreground mb-2">{card.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">{card.desc}</p>
              <a
                href={card.href}
                {...(card.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
              >
                {card.cta}
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Ecosystem;
