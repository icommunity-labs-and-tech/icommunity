import { motion, useInView } from "framer-motion";
import { useRef, useState, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import {
  LayoutGrid,
  Leaf,
  BrainCircuit,
  ShieldCheck,
  ArrowRight,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  FileCheck,
  ClipboardCheck,
  Eye,
  ShieldAlert,
  Quote,
  Landmark,
  Scale,
  SearchCheck,
  BookCheck,
  BadgeCheck,
  ScanSearch,
  Lock,
  FileBadge,
  UserCheck,
  Database,
  ClipboardList,
  FileText,
  Link2,
  Handshake,
  ShieldPlus,
  Cpu,
  Radio,
  Waypoints,
} from "lucide-react";
import caseDataImage from "@/assets/case-datia.jpg";
import caseEstrellaImage from "@/assets/case-estrella.jpg";
import logoEstrellaGalicia from "@/assets/logo-estrella-galicia.png";
import caseAytoMadridImage from "@/assets/case-ayto-madrid.jpg";
import logoAytoMadrid from "@/assets/logo-ayto-madrid.png";
import caseAenorImage from "@/assets/case-aenor.jpg";
import logoAenor from "@/assets/logo-aenor.png";
import caseSalusCoopImage from "@/assets/case-saluscoop.jpg";
import logoSalusCoop from "@/assets/logo-saluscoop.png";
import logoDatia from "@/assets/logo-datia.png";
import caseLogaltyImage from "@/assets/case-logalty.jpg";
import logoLogalty from "@/assets/logo-logalty.png";
import caseAirtraceImage from "@/assets/case-airtrace.jpg";
import logoAirtrace from "@/assets/logo-airtrace.png";
import type { OrganizationType } from "./ContactModal";
import { useLanguage } from "@/i18n/LanguageContext";

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
  logoClass?: string;
  gradient: string;
}

const casesEn: CaseData[] = [
  {
    tag: "Certification Case",
    title: "AENOR",
    logo: logoAenor,
    logoClass: "h-6 md:h-7",
    description: "Certifications turned into verifiable evidence ready for oversight.",
    stats: [
      { value: "✓", label: "Real-time independent verification" },
      { value: "✓", label: "Digital evidence linked to each certification" },
    ],
    image: caseAenorImage,
    imageAlt: "AENOR corporate headquarters",
    badge: "Success story",
    heading: "Certifications ready for immediate verification",
    body: "AENOR integrated iCommunity as infrastructure to generate verifiable evidence associated with its certification processes. Each issuance, validation, or update is recorded as independent proof, available for immediate verification and ready for regulatory oversight from the origin.",
    benefits: [
      { icon: FileBadge, text: "Digital evidence linked to each certification" },
      { icon: ScanSearch, text: "Immediate verification by third parties" },
      { icon: Lock, text: "Guaranteed evidentiary integrity" },
      { icon: BadgeCheck, text: "Audit-ready from issuance" },
    ],
    gradient: "linear-gradient(135deg, hsl(200, 40%, 12%) 0%, hsl(205, 50%, 24%) 100%)",
  },
  {
    tag: "Institutional Case",
    title: "MADRID CITY COUNCIL",
    logo: logoAytoMadrid,
    description: "Verifiable evidence infrastructure in public procurement processes.",
    stats: [
      { value: "✓", label: "Certified document traceability" },
      { value: "✓", label: "Audit-ready evidence" },
    ],
    image: caseAytoMadridImage,
    imageAlt: "Madrid City Council",
    badge: "Success story",
    heading: "Public procurement with verifiable evidence from the origin",
    body: "iCommunity was implemented as an infrastructure layer to generate independent evidence in public procurement processes. Each document, validation, and administrative event is recorded as verifiable proof, available for audit and regulatory oversight without relying on the system operator.",
    benefits: [
      { icon: Landmark, text: "Verifiable record of each administrative milestone" },
      { icon: Scale, text: "Independent evidence before oversight bodies" },
      { icon: SearchCheck, text: "Immediate audit without post-hoc reconstruction" },
      { icon: BookCheck, text: "Public oversight ready from the origin" },
    ],
    gradient: "linear-gradient(135deg, hsl(215, 35%, 14%) 0%, hsl(218, 40%, 26%) 100%)",
  },
  {
    tag: "European Project",
    title: "DATIA",
    description: "Next-generation sustainable data centers with digital twin, AI, and verifiable traceability.",
    stats: [
      { value: "€5.7M", label: "Budget" },
      { value: "11", label: "Partners" },
    ],
    link: { url: "https://datiaproject.es", label: "datiaproject.es" },
    image: caseDataImage,
    logo: logoDatia,
    imageAlt: "Technician at DATIA data center",
    badge: "Success story",
    heading: "Digital Passport for all data center components",
    body: "CertyPass has been selected as the traceability infrastructure for the DATIA project. Every data center component — from servers to cooling systems — will have a digital passport that guarantees its origin, energy efficiency, and complete lifecycle.",
    benefits: [
      { icon: LayoutGrid, text: "Traceability of each data center component" },
      { icon: Leaf, text: "Certified eco-design and energy efficiency" },
      { icon: BrainCircuit, text: "Integrated digital twin and predictive AI" },
      { icon: ShieldCheck, text: "Verifiable certification infrastructure" },
    ],
    gradient: "linear-gradient(135deg, hsl(222, 47%, 10%) 0%, hsl(225, 60%, 28%) 100%)",
  },
  {
    tag: "Legal Evidence Case",
    title: "LOGALTY",
    logo: logoLogalty,
    logoClass: "h-6 md:h-7",
    description: "Electronic evidence ready for legal and regulatory environments.",
    stats: [
      { value: "✓", label: "Verifiable evidence of contractual events" },
      { value: "✓", label: "Ready for third-party validation" },
    ],
    image: caseLogaltyImage,
    imageAlt: "Logalty corporate office",
    badge: "Success story",
    heading: "Contractual processes turned into verifiable evidence",
    body: "Logalty integrated iCommunity as an additional layer of verifiable evidence in its contracting and electronic notification processes. Each contractual event is recorded as independent proof, strengthening traceability and preparing information for audit or regulatory oversight from the origin.",
    benefits: [
      { icon: FileText, text: "Verifiable evidence of contractual events" },
      { icon: Link2, text: "Provider-independent traceability" },
      { icon: Handshake, text: "Ready for third-party validation" },
      { icon: ShieldPlus, text: "Reinforced evidentiary support" },
    ],
    gradient: "linear-gradient(135deg, hsl(230, 35%, 14%) 0%, hsl(235, 45%, 26%) 100%)",
  },
  {
    tag: "Healthcare Case",
    title: "SALUS COOP",
    logo: logoSalusCoop,
    description: "Sensitive data protection with verifiable evidence from the origin.",
    stats: [
      { value: "✓", label: "Verifiable evidence of data usage" },
      { value: "✓", label: "Ready for regulatory oversight" },
    ],
    image: caseSalusCoopImage,
    imageAlt: "Medical research laboratory",
    badge: "Success story",
    heading: "Medical studies with protected identity and verifiable evidence",
    body: "Salus Coop integrated iCommunity as infrastructure to generate verifiable evidence on data usage in medical studies. Each access, treatment, or validation is recorded as independent proof, ensuring anonymity, integrity, and availability for audit or regulatory oversight.",
    benefits: [
      { icon: UserCheck, text: "Pseudonymized identity from the origin" },
      { icon: Database, text: "Verifiable evidence of data usage" },
      { icon: ClipboardList, text: "Independent record of access and validations" },
      { icon: BadgeCheck, text: "Audit-ready compliance" },
    ],
    gradient: "linear-gradient(135deg, hsl(190, 40%, 12%) 0%, hsl(195, 50%, 24%) 100%)",
  },
  {
    tag: "IoT / Technical Integrity Case",
    title: "AIRTRACE",
    logo: logoAirtrace,
    description: "Verifiable integrity of devices and data captured at the source.",
    stats: [
      { value: "✓", label: "Certified firmware evidence" },
      { value: "✓", label: "Verifiable record of IoT readings" },
    ],
    image: caseAirtraceImage,
    imageAlt: "AirTrace IoT devices in technical lab",
    badge: "Success story",
    heading: "IoT devices with verifiable integrity from the origin",
    body: "AirTrace integrated iCommunity as infrastructure to generate verifiable evidence on the integrity of its IoT devices and field-captured readings. Each firmware validation and recorded data point is associated with independent proof, ready for technical audit or regulatory oversight from the origin.",
    benefits: [
      { icon: Cpu, text: "Verifiable firmware certification" },
      { icon: Radio, text: "Independent evidence of IoT readings" },
      { icon: Waypoints, text: "Technical traceability from the device" },
      { icon: BadgeCheck, text: "Ready for audit and external validation" },
    ],
    gradient: "linear-gradient(135deg, hsl(210, 40%, 12%) 0%, hsl(215, 50%, 24%) 100%)",
  },
  {
    tag: "Industrial Case",
    title: "ESTRELLA GALICIA",
    logo: logoEstrellaGalicia,
    description: "Transformation of logistics processes into verifiable evidence ready for audit.",
    stats: [
      { value: "✓", label: "Verifiable distribution" },
      { value: "✓", label: "Loss reduction" },
    ],
    image: caseEstrellaImage,
    imageAlt: "Estrella Galicia logistics facilities",
    badge: "Success story",
    heading: "Supply chain ready for audit",
    body: "Estrella Galicia implemented iCommunity as an infrastructure layer to generate verifiable evidence in its supply chain. Each critical event — from production to distribution — is recorded as independent proof, ready for audit and regulatory oversight from the origin.",
    benefits: [
      { icon: FileCheck, text: "Independent evidence at each chain stage" },
      { icon: ClipboardCheck, text: "Verifiable record of critical events" },
      { icon: Eye, text: "Immediate audit without operator dependency" },
      { icon: ShieldAlert, text: "External verification ready for third parties" },
    ],
    gradient: "linear-gradient(135deg, hsl(20, 50%, 12%) 0%, hsl(25, 55%, 25%) 100%)",
  },
];

const casesEs: CaseData[] = [
  {
    tag: "Caso de Certificación",
    title: "AENOR",
    logo: logoAenor,
    logoClass: "h-6 md:h-7",
    description: "Certificaciones convertidas en evidencia verificable lista para supervisión.",
    stats: [
      { value: "✓", label: "Verificación independiente en tiempo real" },
      { value: "✓", label: "Evidencia digital vinculada a cada certificación" },
    ],
    image: caseAenorImage,
    imageAlt: "Sede corporativa de AENOR",
    badge: "Caso de éxito",
    heading: "Certificaciones listas para verificación inmediata",
    body: "AENOR integró iCommunity como infraestructura para generar evidencia verificable asociada a sus procesos de certificación. Cada emisión, validación o actualización se registra como prueba independiente, disponible para verificación inmediata y lista para supervisión regulatoria desde el origen.",
    benefits: [
      { icon: FileBadge, text: "Evidencia digital vinculada a cada certificación" },
      { icon: ScanSearch, text: "Verificación inmediata por terceros" },
      { icon: Lock, text: "Integridad probatoria garantizada" },
      { icon: BadgeCheck, text: "Lista para auditoría desde la emisión" },
    ],
    gradient: "linear-gradient(135deg, hsl(200, 40%, 12%) 0%, hsl(205, 50%, 24%) 100%)",
  },
  {
    tag: "Caso Institucional",
    title: "AYUNTAMIENTO DE MADRID",
    logo: logoAytoMadrid,
    description: "Infraestructura de evidencia verificable en procesos de contratación pública.",
    stats: [
      { value: "✓", label: "Trazabilidad documental certificada" },
      { value: "✓", label: "Evidencia lista para auditoría" },
    ],
    image: caseAytoMadridImage,
    imageAlt: "Ayuntamiento de Madrid",
    badge: "Caso de éxito",
    heading: "Contratación pública con evidencia verificable desde el origen",
    body: "iCommunity se implementó como capa de infraestructura para generar evidencia independiente en procesos de contratación pública. Cada documento, validación y evento administrativo se registra como prueba verificable, disponible para auditoría y supervisión regulatoria sin depender del operador del sistema.",
    benefits: [
      { icon: Landmark, text: "Registro verificable de cada hito administrativo" },
      { icon: Scale, text: "Evidencia independiente ante organismos de supervisión" },
      { icon: SearchCheck, text: "Auditoría inmediata sin reconstrucción posterior" },
      { icon: BookCheck, text: "Supervisión pública lista desde el origen" },
    ],
    gradient: "linear-gradient(135deg, hsl(215, 35%, 14%) 0%, hsl(218, 40%, 26%) 100%)",
  },
  {
    tag: "Caso Sostenibilidad",
    title: "DATIA",
    description: "Centros de datos sostenibles de nueva generación con gemelo digital, IA y trazabilidad verificable.",
    stats: [
      { value: "€5,7M", label: "Presupuesto" },
      { value: "11", label: "Socios" },
    ],
    link: { url: "https://datiaproject.es", label: "datiaproject.es" },
    image: caseDataImage,
    logo: logoDatia,
    imageAlt: "Técnico en centro de datos DATIA",
    badge: "Caso de éxito",
    heading: "Pasaporte Digital para todos los componentes del data center",
    body: "CertyPass ha sido seleccionado como infraestructura de trazabilidad para el proyecto DATIA. Cada componente del data center —desde servidores hasta sistemas de refrigeración— dispondrá de un pasaporte digital que garantiza su origen, eficiencia energética y ciclo de vida completo.",
    benefits: [
      { icon: LayoutGrid, text: "Trazabilidad de cada componente del data center" },
      { icon: Leaf, text: "Ecodiseño y eficiencia energética certificados" },
      { icon: BrainCircuit, text: "Gemelo digital e IA predictiva integrados" },
      { icon: ShieldCheck, text: "Infraestructura de certificación verificable" },
    ],
    gradient: "linear-gradient(135deg, hsl(222, 47%, 10%) 0%, hsl(225, 60%, 28%) 100%)",
  },
  {
    tag: "Caso de Evidencia Legal",
    title: "LOGALTY",
    logo: logoLogalty,
    logoClass: "h-6 md:h-7",
    description: "Evidencia electrónica lista para entornos legales y regulatorios.",
    stats: [
      { value: "✓", label: "Evidencia verificable de eventos contractuales" },
      { value: "✓", label: "Lista para validación por terceros" },
    ],
    image: caseLogaltyImage,
    imageAlt: "Oficina corporativa de Logalty",
    badge: "Caso de éxito",
    heading: "Procesos contractuales convertidos en evidencia verificable",
    body: "Logalty integró iCommunity como capa adicional de evidencia verificable en sus procesos de contratación y notificación electrónica. Cada evento contractual se registra como prueba independiente, reforzando la trazabilidad y preparando la información para auditoría o supervisión regulatoria desde el origen.",
    benefits: [
      { icon: FileText, text: "Evidencia verificable de eventos contractuales" },
      { icon: Link2, text: "Trazabilidad independiente del proveedor" },
      { icon: Handshake, text: "Lista para validación por terceros" },
      { icon: ShieldPlus, text: "Soporte probatorio reforzado" },
    ],
    gradient: "linear-gradient(135deg, hsl(230, 35%, 14%) 0%, hsl(235, 45%, 26%) 100%)",
  },
  {
    tag: "Caso Sanitario",
    title: "SALUS COOP",
    logo: logoSalusCoop,
    description: "Protección de datos sensibles con evidencia verificable desde el origen.",
    stats: [
      { value: "✓", label: "Evidencia verificable de uso de datos" },
      { value: "✓", label: "Lista para supervisión regulatoria" },
    ],
    image: caseSalusCoopImage,
    imageAlt: "Laboratorio de investigación médica",
    badge: "Caso de éxito",
    heading: "Estudios médicos con identidad protegida y evidencia verificable",
    body: "Salus Coop integró iCommunity como infraestructura para generar evidencia verificable sobre el uso de datos en estudios médicos. Cada acceso, tratamiento o validación se registra como prueba independiente, garantizando anonimato, integridad y disponibilidad para auditoría o supervisión regulatoria.",
    benefits: [
      { icon: UserCheck, text: "Identidad seudonimizada desde el origen" },
      { icon: Database, text: "Evidencia verificable de uso de datos" },
      { icon: ClipboardList, text: "Registro independiente de accesos y validaciones" },
      { icon: BadgeCheck, text: "Cumplimiento listo para auditoría" },
    ],
    gradient: "linear-gradient(135deg, hsl(190, 40%, 12%) 0%, hsl(195, 50%, 24%) 100%)",
  },
  {
    tag: "Caso IoT / Integridad Técnica",
    title: "AIRTRACE",
    logo: logoAirtrace,
    description: "Integridad verificable de dispositivos y datos capturados en origen.",
    stats: [
      { value: "✓", label: "Evidencia de firmware certificada" },
      { value: "✓", label: "Registro verificable de lecturas IoT" },
    ],
    image: caseAirtraceImage,
    imageAlt: "Dispositivos IoT AirTrace en laboratorio",
    badge: "Caso de éxito",
    heading: "Dispositivos IoT con integridad verificable desde el origen",
    body: "AirTrace integró iCommunity como infraestructura para generar evidencia verificable sobre la integridad de sus dispositivos IoT y las lecturas capturadas en campo. Cada validación de firmware y punto de datos registrado se asocia con prueba independiente, lista para auditoría técnica o supervisión regulatoria desde el origen.",
    benefits: [
      { icon: Cpu, text: "Certificación de firmware verificable" },
      { icon: Radio, text: "Evidencia independiente de lecturas IoT" },
      { icon: Waypoints, text: "Trazabilidad técnica desde el dispositivo" },
      { icon: BadgeCheck, text: "Lista para auditoría y validación externa" },
    ],
    gradient: "linear-gradient(135deg, hsl(210, 40%, 12%) 0%, hsl(215, 50%, 24%) 100%)",
  },
  {
    tag: "Caso Industrial",
    title: "ESTRELLA GALICIA",
    logo: logoEstrellaGalicia,
    description: "Transformación de procesos logísticos en evidencia verificable lista para auditoría.",
    stats: [
      { value: "✓", label: "Distribución verificable" },
      { value: "✓", label: "Reducción de mermas" },
    ],
    image: caseEstrellaImage,
    imageAlt: "Instalaciones logísticas de Estrella Galicia",
    badge: "Caso de éxito",
    heading: "Cadena de suministro lista para auditoría",
    body: "Estrella Galicia implementó iCommunity como capa de infraestructura para generar evidencia verificable en su cadena de suministro. Cada evento crítico —desde producción hasta distribución— se registra como prueba independiente, lista para auditoría y supervisión regulatoria desde el origen.",
    benefits: [
      { icon: FileCheck, text: "Evidencia independiente en cada etapa de la cadena" },
      { icon: ClipboardCheck, text: "Registro verificable de eventos críticos" },
      { icon: Eye, text: "Auditoría inmediata sin dependencia del operador" },
      { icon: ShieldAlert, text: "Verificación externa lista para terceros" },
    ],
    gradient: "linear-gradient(135deg, hsl(20, 50%, 12%) 0%, hsl(25, 55%, 25%) 100%)",
  },
];

const textsUI = {
  en: {
    title: "Success <span>Stories</span>",
    prevLabel: "Previous case",
    nextLabel: "Next case",
    cta: "Request a similar demo",
  },
  es: {
    title: "Casos de <span>Éxito</span>",
    prevLabel: "Caso anterior",
    nextLabel: "Siguiente caso",
    cta: "Solicitar una demo similar",
  },
};

const CaseStudy = ({ onOpenModal }: { onOpenModal?: (orgType?: OrganizationType) => void }) => {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 35 });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { lang } = useLanguage();
  const cases = lang === "en" ? casesEn : casesEs;
  const t = textsUI[lang];

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
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);
  useEffect(() => {
    if (!emblaApi) return;
    let timer: ReturnType<typeof setTimeout>;
    const scheduleNext = () => {
      timer = setTimeout(() => {
        emblaApi.scrollNext();
        scheduleNext();
      }, 8000);
    };
    const stopAutoplay = () => clearTimeout(timer);
    const restartAutoplay = () => {
      stopAutoplay();
      scheduleNext();
    };
    const rootNode = emblaApi.rootNode();
    rootNode.addEventListener("mouseenter", stopAutoplay);
    rootNode.addEventListener("mouseleave", restartAutoplay);
    emblaApi.on("select", restartAutoplay);
    scheduleNext();
    return () => {
      stopAutoplay();
      rootNode.removeEventListener("mouseenter", stopAutoplay);
      rootNode.removeEventListener("mouseleave", restartAutoplay);
      emblaApi.off("select", restartAutoplay);
    };
  }, [emblaApi]);

  return (
    <section id="cases" className="ic-section bg-secondary/30" ref={sectionRef}>
      <div className="ic-container max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2
            className="text-4xl md:text-5xl font-bold text-foreground"
            dangerouslySetInnerHTML={{
              __html: t.title.replace("<span>", '<span class="ic-text-gradient">').replace("</span>", "</span>"),
            }}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative"
        >
          <div
            ref={emblaRef}
            className="overflow-hidden rounded-2xl border border-border bg-card shadow-[0_2px_20px_-4px_hsl(225_86%_58%/0.06)]"
          >
            <div className="flex">
              {cases.map((c, i) => (
                <div key={i} className="min-w-0 shrink-0 grow-0 basis-full">
                  <CaseCard data={c} onOpenModal={onOpenModal} ctaText={t.cta} />
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={() => emblaApi?.scrollPrev()}
            className="absolute -left-5 md:-left-7 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-border bg-card shadow-md flex items-center justify-center text-foreground hover:bg-accent hover:border-primary/40 transition-all"
            aria-label={t.prevLabel}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => emblaApi?.scrollNext()}
            className="absolute -right-5 md:-right-7 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-border bg-card shadow-md flex items-center justify-center text-foreground hover:bg-accent hover:border-primary/40 transition-all"
            aria-label={t.nextLabel}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          <div className="flex justify-center gap-2 mt-5">
            {cases.map((_, i) => (
              <button
                key={i}
                onClick={() => emblaApi?.scrollTo(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${i === selectedIndex ? "bg-primary w-5" : "bg-border hover:bg-muted-foreground/40"}`}
                aria-label={`${i + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

function CaseCard({
  data,
  onOpenModal,
  ctaText,
}: {
  data: CaseData;
  onOpenModal?: (orgType?: OrganizationType) => void;
  ctaText: string;
}) {
  const c = data;
  return (
    <div className="grid md:grid-cols-2 md:min-h-[480px]">
      <div className="flex flex-col">
        <div className="relative h-36 md:h-44 overflow-hidden shrink-0">
          <img src={c.image} alt={c.imageAlt} className="w-full h-full object-cover" />
          {c.logo && (
            <div className="absolute top-3 left-3">
              <img
                src={c.logo}
                alt={`${c.title} logo`}
                className={`${c.logoClass || "h-8 md:h-10"} w-auto object-contain drop-shadow-lg`}
              />
            </div>
          )}
        </div>
        <div className="flex-1 p-5 flex flex-col justify-between" style={{ background: c.gradient }}>
          <div>
            <p className="text-xs font-semibold tracking-widest text-primary-foreground/60 uppercase mb-2">{c.tag}</p>
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-3xl font-extrabold text-primary-foreground tracking-tight">{c.title}</h3>
            </div>
            <p className="text-sm text-primary-foreground/75 leading-relaxed max-w-sm">{c.description}</p>
          </div>
          {c.testimonial && (c.testimonial.quote || c.testimonial.author) && (
            <div className="flex items-start gap-3 mt-5 p-3 rounded-xl bg-primary-foreground/5 border border-primary-foreground/10">
              {c.testimonial.quote && <Quote className="w-4 h-4 text-primary-foreground/50 shrink-0 mt-0.5" />}
              <div>
                {c.testimonial.quote && (
                  <p className="text-xs italic text-primary-foreground/70 leading-relaxed mb-1">
                    "{c.testimonial.quote}"
                  </p>
                )}
                <p className="text-[12px] font-semibold text-primary-foreground/50">
                  — {c.testimonial.author}
                  {c.testimonial.role ? `, ${c.testimonial.role}` : ""}
                </p>
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
      <div className="p-5 md:p-6 flex flex-col justify-center">
        <span className="inline-block text-[12px] font-semibold tracking-widest text-primary uppercase mb-4 px-3 py-1 rounded-full bg-accent w-fit">
          {c.badge}
        </span>
        <h3 className="text-xl md:text-2xl font-bold text-foreground leading-snug mb-3">{c.heading}</h3>
        <p className="text-xs text-muted-foreground leading-relaxed mb-5">{c.body}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-5">
          {c.benefits.map((b) => (
            <div
              key={b.text}
              className="flex items-start gap-2.5 rounded-xl bg-secondary/60 border border-border/60 p-3"
            >
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
          {ctaText}
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export default CaseStudy;
