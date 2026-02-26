import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Plug, ArrowRight } from "lucide-react";

const Integrations = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="integraciones" className="ic-section bg-background" ref={ref}>
      <div className="ic-container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Integra una vez.{" "}
              <span className="ic-text-gradient">Ofrece evidencia a todos tus clientes.</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
              Modelo B2B2B: los proveedores de identidad integran iCommunity una sola vez y ofrecen evidencia
              verificable como valor añadido a cada uno de sus clientes finales.
            </p>
            <div className="rounded-xl bg-secondary p-5 mb-8">
              <div className="text-sm font-semibold text-foreground mb-1">Modelo de licencia</div>
              <p className="text-sm text-muted-foreground">
                Licencia por integración + tarifa por evento certificado. Sin costes ocultos.
              </p>
            </div>
            <a href="#demo" className="inline-flex items-center gap-2 ic-gradient-cta text-primary-foreground px-6 py-3 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity">
              Hablar con Partnerships <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-3 gap-4"
          >
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="ic-card flex items-center justify-center p-6 aspect-square">
                <div className="flex flex-col items-center gap-2">
                  <Plug className="w-6 h-6 text-muted-foreground/40" />
                  <span className="text-[10px] text-muted-foreground/50 text-center font-medium">
                    {["KYC Provider", "ID Verifier", "AML Check", "Age Gate", "Biometric", "eSignature"][i]}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Integrations;
