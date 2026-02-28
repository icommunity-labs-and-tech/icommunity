import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";

const NewsletterBanner = () => {
  const ref = useRef(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (videoRef.current) videoRef.current.playbackRate = 0.5;
  }, []);

  return (
    <section ref={ref} className="ic-section pb-0">
      <div className="ic-container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-2xl"
        >
          {/* Video background */}
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-0"
          >
            <source src="/hero-bg.mp4" type="video/mp4" />
          </video>
          {/* Overlay */}
          <div className="absolute inset-0 z-[1] bg-black/20" />

          {/* Content */}
          <div className="relative z-[2] flex flex-col md:flex-row items-center justify-between gap-6 px-8 py-10 md:px-12 md:py-12">
            <h3 className="text-2xl md:text-3xl font-bold text-primary-foreground leading-tight max-w-xs">
              Forma parte del ecosistema iCommunity
            </h3>
            <p className="text-primary-foreground/80 text-sm md:text-base max-w-md leading-relaxed">
              Descubre cómo organizaciones reguladas están transformando procesos digitales en evidencia verificable.
            </p>
            <a
              href="https://icommunity.io"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-primary-foreground/20 backdrop-blur-sm border border-primary-foreground/30 px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary-foreground/30 transition-colors flex-shrink-0"
            >
              Suscribirme newsletter <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterBanner;
