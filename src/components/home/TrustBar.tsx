import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import logoMadrid from "@/assets/logo-ayto-madrid-3.png";
import logoAenor from "@/assets/logo-aenor.png";
import logoEstrella from "@/assets/logo-estrella.png";
import logoLidl from "@/assets/logo-lidl.png";
import logoLogalty from "@/assets/logo-logalty.png";
import logoCertifika from "@/assets/logo-certifika.png";

const bottomLogos = [
  { src: logoMadrid, alt: "Madrid City Council" },
  { src: logoAenor, alt: "AENOR" },
  { src: logoLogalty, alt: "Logalty" },
  { src: logoCertifika, alt: "Certifika" },
  { src: logoEstrella, alt: "Estrella Galicia" },
  { src: logoLidl, alt: "Lidl" },
];

const TrustBar = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="trust-bar relative py-10 md:py-14" ref={ref}>
      <div className="ic-container">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-6"
        >
          <p className="text-xs font-medium tracking-widest text-muted-foreground/60 uppercase mb-1.5">
            Infrastructure deployed in production
          </p>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto">
            Public administrations, certification bodies, and regulated platforms use iCommunity in real-world processes.
          </p>
        </motion.div>

        <div className="flex items-center justify-center gap-10 md:gap-16 flex-wrap">
          {bottomLogos.map((logo, i) => (
            <motion.img
              key={logo.alt}
              src={logo.src}
              alt={logo.alt}
              initial={{ opacity: 0, y: 8 }}
              animate={inView ? { opacity: 0.7, y: 0 } : { opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.15 + i * 0.08 }}
              className={`object-contain ${logo.alt === "Madrid City Council" ? "h-16 md:h-20" : "h-8 md:h-10"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBar;
