import logoMadrid from "@/assets/logo-ayto-madrid.png";
import logoAenor from "@/assets/logo-aenor.png";
import logoEstrella from "@/assets/logo-estrella.png";
import logoLidl from "@/assets/logo-lidl.png";
import logoLogalty from "@/assets/logo-logalty.png";
import logoCertifika from "@/assets/logo-certifika.png";

const bottomLogos = [
  { src: logoAenor, alt: "AENOR" },
  { src: logoLogalty, alt: "Logalty" },
  { src: logoCertifika, alt: "Certifika" },
  { src: logoEstrella, alt: "Estrella Galicia" },
  { src: logoLidl, alt: "Lidl" },
];

const TrustBar = () => {
  return (
    <section className="trust-bar relative py-16 md:py-20">
      <div className="ic-container">
        {/* Eyebrow */}
        <p className="text-center text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground mb-6">
          Confianza institucional
        </p>

        {/* Main statement + Madrid logo */}
        <div className="flex items-center justify-center gap-5 mb-14">
          <p className="text-base md:text-lg font-semibold text-foreground/80 text-center">
            Infraestructura blockchain oficial del Ayuntamiento de Madrid
          </p>
          <img
            src={logoMadrid}
            alt="Ayuntamiento de Madrid"
            className="h-10 md:h-12 opacity-70 flex-shrink-0"
          />
        </div>

        {/* Logo row */}
        <div className="flex items-center justify-center gap-10 md:gap-16 flex-wrap">
          {bottomLogos.map((logo) => (
            <img
              key={logo.alt}
              src={logo.src}
              alt={logo.alt}
              className="h-8 md:h-10 opacity-70 object-contain"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBar;
