import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { LayoutGrid, Leaf, BrainCircuit, ShieldCheck, ArrowRight, ExternalLink } from "lucide-react";
import caseImage from "@/assets/case-datia.jpg";
import type { OrganizationType } from "./ContactModal";

const benefits = [
  { icon: LayoutGrid, text: "Trazabilidad de cada componente del CPD" },
  { icon: Leaf, text: "Ecodiseño y eficiencia energética certificada" },
  { icon: BrainCircuit, text: "Gemelo digital e IA predictiva integrados" },
  { icon: ShieldCheck, text: "Infraestructura de certificación verificable" },
];

const CaseStudy = ({ onOpenModal }: { onOpenModal?: (orgType?: OrganizationType) => void }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="casos" className="ic-section py-12 md:py-16 bg-secondary/30" ref={ref}>
      <div className="ic-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            Casos de <span className="ic-text-gradient">éxito</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="rounded-2xl overflow-hidden border border-border bg-card shadow-[0_2px_20px_-4px_hsl(225_86%_58%/0.06)]"
        >
          <div className="grid md:grid-cols-2">
            {/* Left column */}
            <div className="flex flex-col">
              <div className="relative h-44 md:h-52 overflow-hidden">
                <img
                  src={caseImage}
                  alt="Técnico en centro de datos DATIA"
                  className="w-full h-full object-cover"
                />
              </div>
              <div
                className="flex-1 p-6 flex flex-col justify-between"
                style={{ background: "linear-gradient(135deg, hsl(222, 47%, 10%) 0%, hsl(225, 60%, 28%) 100%)" }}
              >
                <div>
                  <p className="text-xs font-semibold tracking-widest text-primary-foreground/60 uppercase mb-2">
                    Proyecto Europeo
                  </p>
                  <h3 className="text-3xl font-extrabold text-primary-foreground mb-2 tracking-tight">DATIA</h3>
                   <p className="text-xs text-primary-foreground/75 leading-relaxed max-w-sm">
                    Nueva generación de centros de datos sostenibles con gemelo digital, IA y trazabilidad verificable.
                  </p>
                </div>

                <div className="flex items-end gap-5 mt-6 pt-4 border-t border-primary-foreground/10">
                  <div>
                    <p className="text-xl font-bold text-primary-foreground">5,7M€</p>
                    <p className="text-xs text-primary-foreground/50">Presupuesto</p>
                  </div>
                  <div className="h-8 w-px bg-primary-foreground/15" />
                  <div>
                    <p className="text-xl font-bold text-primary-foreground">11</p>
                    <p className="text-xs text-primary-foreground/50">Partners</p>
                  </div>
                  <div className="h-8 w-px bg-primary-foreground/15" />
                  <a
                    href="https://datiaproject.es"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    datiaproject.es
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right column */}
            <div className="p-6 md:p-8 flex flex-col justify-center">
              <span className="inline-block text-[11px] font-semibold tracking-widest text-primary uppercase mb-4 px-3 py-1 rounded-full bg-accent w-fit">
                Caso de éxito
              </span>

              <h3 className="text-xl md:text-2xl font-bold text-foreground leading-snug mb-3">
                Pasaporte Digital para todos los componentes de un CPD
              </h3>

              <p className="text-xs text-muted-foreground leading-relaxed mb-6">
                CertyPass ha sido seleccionado como la infraestructura de trazabilidad del proyecto DATIA. Cada componente del centro de datos — desde servidores hasta sistemas de refrigeración — contará con un pasaporte digital que garantiza su origen, eficiencia energética y ciclo de vida completo.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6">
                {benefits.map((b) => (
                  <div
                    key={b.text}
                    className="flex items-start gap-2.5 rounded-xl bg-secondary/60 border border-border/60 p-3"
                  >
                    <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center shrink-0 mt-0.5">
                      <b.icon className="w-4.5 h-4.5 text-primary" />
                    </div>
                    <p className="text-sm text-foreground/80 leading-snug">{b.text}</p>
                  </div>
                ))}
              </div>

              <button
                onClick={() => onOpenModal?.("partner-integrador")}
                className="inline-flex items-center justify-center gap-2 rounded-lg ic-gradient-cta px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity shadow-sm shadow-primary/15 w-fit"
              >
                Solicitar una demo similar
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CaseStudy;
