import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import logoMadrid from "@/assets/logo-ayto-madrid-3.png";
import logoAenor from "@/assets/logo-aenor.png";
import logoEstrella from "@/assets/logo-estrella.png";
import logoLidl from "@/assets/logo-lidl.png";
import logoLogalty from "@/assets/logo-logalty.png";
import logoCertifika from "@/assets/logo-certifika.png";
import logoComforce from "@/assets/logo-comforce.png";
import logoGobe from "@/assets/logo-gobe.png";
import logoPatterson from "@/assets/logo-patterson.png";
import logoAsac from "@/assets/logo-asac.png";
import logoSmile from "@/assets/logo-smile.png";
import { useLanguage } from "@/i18n/LanguageContext";

const texts = {
  en: {
    badge: "Infrastructure deployed in production",
    sub: "Public administrations, certification bodies, and regulated platforms use iCommunity in real-world processes.",
    madridAlt: "Madrid City Council",
  },
  es: {
    badge: "Infraestructura desplegada en producción",
    sub: "Administraciones públicas, organismos de certificación y plataformas reguladas utilizan iCommunity en procesos reales.",
    madridAlt: "Ayuntamiento de Madrid",
  },
};

const TrustBar = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const { lang } = useLanguage();
  const t = texts[lang];

  const bottomLogos = [
    { src: logoMadrid, alt: t.madridAlt },
    { src: logoAenor, alt: "AENOR" },
    { src: logoLogalty, alt: "Logalty" },
    { src: logoCertifika, alt: "Certifika" },
    { src: logoEstrella, alt: "Estrella Galicia" },
    { src: logoLidl, alt: "Lidl" },
    { src: logoComforce, alt: "Comforce" },
    { src: logoGobe, alt: "Gobe" },
    { src: logoPatterson, alt: "Patterson Travel" },
    { src: logoAsac, alt: "ASAC" },
    { src: logoSmile, alt: "Smile" },
  ];

  return (
    <section className="trust-bar relative py-10 md:py-14" ref={ref}>
      <div className="ic-container">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-6">
          <p className="text-xs font-medium tracking-widest text-muted-foreground/60 uppercase mb-1.5">{t.badge}</p>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto">{t.sub}</p>
        </motion.div>
        <div className="flex items-center justify-center gap-10 md:gap-16 flex-wrap">
          {bottomLogos.map((logo, i) => (
            <motion.img key={logo.alt} src={logo.src} alt={logo.alt} initial={{ opacity: 0, y: 8 }} animate={inView ? { opacity: 0.7, y: 0 } : { opacity: 0 }} transition={{ duration: 0.4, delay: 0.15 + i * 0.08 }} className={`object-contain grayscale ${logo.alt === t.madridAlt ? "h-16 md:h-20" : "h-8 md:h-10"}`} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBar;
