import { motion, useInView } from "framer-motion";
import { useRef, useState, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import {
  LayoutGrid, Leaf, BrainCircuit, ShieldCheck, ArrowRight, ExternalLink,
  ChevronLeft, ChevronRight, FileCheck, ClipboardCheck, Eye, ShieldAlert,
  Quote, Landmark, Scale, SearchCheck, BookCheck,
} from "lucide-react";
import caseDataImage from "@/assets/case-datia.jpg";
import caseEstrellaImage from "@/assets/case-estrella.jpg";
import logoEstrellaGalicia from "@/assets/logo-estrella-galicia.png";
import logoAytoMadrid from "@/assets/logo-ayto-madrid.png";
import type { OrganizationType } from "./ContactModal";

interface CaseData {
  tag: string;
  title: string;
  description: string;
  stats: { value: string; label: string }[];
  link?: { url: string; label: string };
  image: string;
  imageAlt: string;
  badge: string;
  heading: string;
  body: string;
  benefits: { icon: React.ElementType; text: string }[];
  testimonial?: { quote: string; author: string; role: string };
  logo?: string;
  gradient: string;
}

const cases: CaseData[] = [
  {
    tag: "Proyecto Europeo",
    title: "DATIA",
    description: "Nueva generación de centros de datos sostenibles con gemelo digital, IA y trazabilidad verificable.",
    stats: [
      { value: "5,7M€", label: "Presupuesto" },
      { value: "11", label: "Partners" },
    ],
    link: { url: "https://datiaproject.es", label: "datiaproject.es" },
    image: caseDataImage,
    imageAlt: "Técnico en centro de datos DATIA",
    badge: "Caso de éxito",
    heading: "Pasaporte Digital para todos los componentes de un CPD",
    body: "CertyPass ha sido seleccionado como la infraestructura de trazabilidad del proyecto DATIA. Cada componente del centro de datos — desde servidores hasta sistemas de refrigeración — contará con un pasaporte digital que garantiza su origen, eficiencia energética y ciclo de vida completo.",
    benefits: [
      { icon: LayoutGrid, text: "Trazabilidad de cada componente del CPD" },
      { icon: Leaf, text: "Ecodiseño y eficiencia energética certificada" },
      { icon: BrainCircuit, text: "Gemelo digital e IA predictiva integrados" },
      { icon: ShieldCheck, text: "Infraestructura de certificación verificable" },
    ],
    gradient: "linear-gradient(135deg, hsl(222, 47%, 10%) 0%, hsl(225, 60%, 28%) 100%)",
  },
  {
    tag: "Caso Industrial",
    title: "ESTRELLA GALICIA",
    logo: logoEstrellaGalicia,
    description: "Transformación de procesos logísticos en evidencia verificable preparada para auditoría.",
    stats: [
      { value: "✓", label: "Distribución verificable" },
      { value: "✓", label: "Reducción pérdidas" },
    ],
    image: caseEstrellaImage,
    imageAlt: "Instalaciones logísticas de Estrella Galicia",
    badge: "Caso de éxito",
    heading: "Cadena de suministro preparada para auditoría",
    body: "Estrella Galicia implementó iCommunity como capa de infraestructura para generar evidencia verificable en su cadena de suministro. Cada evento crítico — desde producción hasta distribución — queda registrado como prueba independiente, lista para auditoría y supervisión regulatoria desde el origen.",
    benefits: [
      { icon: FileCheck, text: "Evidencia independiente en cada etapa de la cadena" },
      { icon: ClipboardCheck, text: "Registro verificable de eventos críticos" },
      { icon: Eye, text: "Auditoría inmediata sin dependencia del operador" },
      { icon: ShieldAlert, text: "Verificación externa preparada para terceros" },
    ],
    testimonial: {
      quote: "Hoy cada evento crítico en nuestra cadena de suministro puede demostrarse.",
      author: "Ignacio Rivera",
      role: "CEO de Estrella Galicia",
    },
    gradient: "linear-gradient(135deg, hsl(20, 50%, 12%) 0%, hsl(25, 55%, 25%) 100%)",
  },
  {
    tag: "Caso Institucional",
    title: "AYUNTAMIENTO DE MADRID",
    logo: logoAytoMadrid,
    description: "Infraestructura de evidencia verificable en procesos de contratación pública.",
    stats: [
      { value: "✓", label: "Trazabilidad documental certificada" },
      { value: "✓", label: "Supervisión independiente desde el origen" },
      { value: "✓", label: "Evidencia preparada para auditoría" },
    ],
    image: logoAytoMadrid,
    imageAlt: "Ayuntamiento de Madrid",
    badge: "Caso de éxito",
    heading: "Contratación pública con evidencia verificable desde el origen",
    body: "iCommunity fue implementado como capa de infraestructura para generar evidencia independiente en procesos de contratación pública. Cada documento, validación y evento administrativo queda registrado como prueba verificable, disponible para auditoría y supervisión regulatoria sin depender del operador del sistema.",
    benefits: [
      { icon: Landmark, text: "Registro verificable de cada hito administrativo" },
      { icon: Scale, text: "Evidencia independiente ante órganos de control" },
      { icon: SearchCheck, text: "Auditoría inmediata sin reconstrucción posterior" },
      { icon: BookCheck, text: "Supervisión pública preparada desde el origen" },
    ],
    testimonial: {
      quote: "",
      author: "Dirección General de Contratación",
      role: "",
    },
    gradient: "linear-gradient(135deg, hsl(215, 35%, 14%) 0%, hsl(218, 40%, 26%) 100%)",
  },
];

const CaseStudy = ({ onOpenModal }: { onOpenModal?: (orgType?: OrganizationType) => void }) => {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, duration: 35 });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi, onSelect]);

  return (
    <section id="casos" className="ic-section bg-secondary/30" ref={sectionRef}>
      <div className="ic-container max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Casos de <span className="ic-text-gradient">éxito</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative"
        >
          {/* Carousel */}
          <div ref={emblaRef} className="overflow-hidden rounded-2xl border border-border bg-card shadow-[0_2px_20px_-4px_hsl(225_86%_58%/0.06)]">
            <div className="flex">
              {cases.map((c, i) => (
                <div key={i} className="min-w-0 shrink-0 grow-0 basis-full">
                  <CaseCard data={c} onOpenModal={onOpenModal} />
                </div>
              ))}
            </div>
          </div>

          {/* Arrows */}
          <button
            onClick={() => emblaApi?.scrollPrev()}
            disabled={!canPrev}
            className="absolute -left-4 md:-left-5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full border border-border bg-card shadow-sm flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all disabled:opacity-0 disabled:pointer-events-none"
            aria-label="Caso anterior"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => emblaApi?.scrollNext()}
            disabled={!canNext}
            className="absolute -right-4 md:-right-5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full border border-border bg-card shadow-sm flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all disabled:opacity-0 disabled:pointer-events-none"
            aria-label="Siguiente caso"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-5">
            {cases.map((_, i) => (
              <button
                key={i}
                onClick={() => emblaApi?.scrollTo(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === selectedIndex ? "bg-primary w-5" : "bg-border hover:bg-muted-foreground/40"
                }`}
                aria-label={`Ir al caso ${i + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

/* ── Individual Card ─────────────────────────────── */

function CaseCard({ data, onOpenModal }: { data: CaseData; onOpenModal?: (orgType?: OrganizationType) => void }) {
  const c = data;

  return (
    <div className="grid md:grid-cols-2 md:min-h-[480px]">
      {/* Left */}
      <div className="flex flex-col">
        <div className="relative h-36 md:h-44 overflow-hidden shrink-0" style={c.image === c.logo ? { background: c.gradient } : undefined}>
          <img src={c.image} alt={c.imageAlt} className={c.image === c.logo ? "w-full h-full object-contain p-8" : "w-full h-full object-cover"} />
        </div>
        <div className="flex-1 p-5 flex flex-col justify-between" style={{ background: c.gradient }}>
          <div>
            <p className="text-xs font-semibold tracking-widest text-primary-foreground/60 uppercase mb-2">{c.tag}</p>
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-3xl font-extrabold text-primary-foreground tracking-tight">{c.title}</h3>
              {c.logo && c.image !== c.logo && <img src={c.logo} alt={`${c.title} logo`} className="h-10 w-auto object-contain" />}
            </div>
            <p className="text-sm text-primary-foreground/75 leading-relaxed max-w-sm">{c.description}</p>
          </div>

          {c.testimonial && (c.testimonial.quote || c.testimonial.author) && (
            <div className="flex items-start gap-3 mt-5 p-3 rounded-xl bg-primary-foreground/5 border border-primary-foreground/10">
              {c.testimonial.quote && <Quote className="w-4 h-4 text-primary-foreground/50 shrink-0 mt-0.5" />}
              <div>
                {c.testimonial.quote && <p className="text-xs italic text-primary-foreground/70 leading-relaxed mb-1">"{c.testimonial.quote}"</p>}
                <p className="text-[11px] font-semibold text-primary-foreground/50">— {c.testimonial.author}{c.testimonial.role ? `, ${c.testimonial.role}` : ""}</p>
              </div>
            </div>
          )}

          <div className="flex items-end gap-5 mt-6 pt-4 border-t border-primary-foreground/10 flex-wrap">
            {c.stats.map((s, i) => (
              <div key={i}>
                <p className="text-2xl font-bold text-primary-foreground">{s.value}</p>
                <p className="text-xs text-primary-foreground/50">{s.label}</p>
              </div>
            ))}
            {c.stats.length > 1 && c.link && <div className="h-8 w-px bg-primary-foreground/15" />}
            {c.link && (
              <a
                href={c.link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
              >
                {c.link.label}
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="p-5 md:p-6 flex flex-col justify-center">
        <span className="inline-block text-[11px] font-semibold tracking-widest text-primary uppercase mb-4 px-3 py-1 rounded-full bg-accent w-fit">
          {c.badge}
        </span>
        <h3 className="text-xl md:text-2xl font-bold text-foreground leading-snug mb-3">{c.heading}</h3>
        <p className="text-xs text-muted-foreground leading-relaxed mb-5">{c.body}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-5">
          {c.benefits.map((b) => (
            <div key={b.text} className="flex items-start gap-2.5 rounded-xl bg-secondary/60 border border-border/60 p-3">
              <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center shrink-0 mt-0.5">
                <b.icon className="w-4 h-4 text-primary" />
              </div>
              <p className="text-xs text-foreground/80 leading-snug">{b.text}</p>
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
  );
}

export default CaseStudy;
