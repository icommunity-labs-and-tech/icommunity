import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo-blanco-negativo.png";
const navLinks = [
  { label: "Casos de uso", href: "#segmentos" },
  { label: "Soluciones", href: "#integraciones" },
  { label: "Seguridad & Compliance", href: "#seguridad" },
  { label: "Recursos", href: "#recursos" },
  { label: "Noticias", href: "#empresa" },
];

const Navbar = ({ onOpenModal }: { onOpenModal?: () => void }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[rgba(20,25,60,0.65)] backdrop-blur-[12px] border-b border-primary-foreground/10 shadow-lg shadow-black/10"
          : "bg-transparent border-b border-transparent"
      }`}
      role="navigation"
      aria-label="Navegación principal"
    >
      <div className="ic-container flex items-center justify-between h-16">
        {/* Logo */}
        <a href="#" className="flex items-center">
          <img src={logo} alt="iCommunity" className="h-7" />
        </a>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTAs */}
        <div className="hidden lg:flex items-center gap-3">
          <a href="#token-icom" className="text-sm font-medium text-primary-foreground/80 hover:text-primary-foreground transition-colors">
            Token Icom
          </a>
          <button onClick={onOpenModal} className="inline-flex items-center justify-center rounded-lg ic-gradient-cta px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity">
            Solicitar demo
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden p-2 text-primary-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menú"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#1b253b]/95 backdrop-blur-md overflow-hidden"
          >
            <div className="ic-container py-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm text-primary-foreground/70 hover:text-primary-foreground py-2"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <button onClick={() => { setMobileOpen(false); onOpenModal?.(); }} className="inline-flex items-center justify-center rounded-lg ic-gradient-cta px-4 py-2.5 text-sm font-medium text-primary-foreground mt-2 w-full">
                Solicitar demo
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
