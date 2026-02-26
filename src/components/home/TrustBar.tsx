import logoMadrid from "@/assets/logo-ayto-madrid-3.png";
import logoAenor from "@/assets/logo-aenor.png";
import logoEstrella from "@/assets/logo-estrella.png";
import logoLidl from "@/assets/logo-lidl.png";
import logoLogalty from "@/assets/logo-logalty.png";
import logoCertifika from "@/assets/logo-certifika.png";

const bottomLogos = [
  { src: logoMadrid, alt: "Ayuntamiento de Madrid" },
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
        {/* Logo row */}
        <div className="flex items-center justify-center gap-10 md:gap-16 flex-wrap">
        {bottomLogos.map((logo) => (
            <img
              key={logo.alt}
              src={logo.src}
              alt={logo.alt}
              className={`opacity-70 object-contain ${logo.alt === "Ayuntamiento de Madrid" ? "h-16 md:h-20" : "h-8 md:h-10"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBar;
