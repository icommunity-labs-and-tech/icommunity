import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import logo from "@/assets/logo-blanco-negativo.png";

const solutionsLinks = [
  { label: "CertyPass", href: "https://certypass.com", external: true },
  { label: "Privaura", href: "https://privaura.lovable.app", external: true },
];

const navLinks = [
  { label: "Casos de uso", href: "#segmentos" },
  { label: "Seguridad & Compliance", href: "#seguridad" },
  { label: "Recursos", href: "#recursos" },
  { label: "Noticias", href: "#empresa" },
];

const Navbar = ({ onOpenModal }: { onOpenModal?: () => void }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setSolutionsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
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

          {/* Soluciones dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setSolutionsOpen(!solutionsOpen)}
              className="flex items-center gap-1 text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
            >
              Soluciones
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${solutionsOpen ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {solutionsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full mt-2 left-0 min-w-[160px] rounded-lg border border-primary-foreground/10 bg-[rgba(20,25,60,0.9)] backdrop-blur-md shadow-xl overflow-hidden"
                >
                  {solutionsLinks.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-4 py-2.5 text-sm text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/5 transition-colors"
                      onClick={() => setSolutionsOpen(false)}
                    >
                      {s.label}
                    </a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* CTAs */}
        <div className="hidden lg:flex items-center gap-3">
          <a href="https://www.icommunity.io/icom/" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-primary-foreground/80 hover:text-primary-foreground transition-colors">
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
              {/* Mobile Soluciones */}
              <div className="text-xs font-medium text-primary-foreground/40 uppercase tracking-wide pt-2">Soluciones</div>
              {solutionsLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary-foreground/70 hover:text-primary-foreground py-2 pl-2"
                  onClick={() => setMobileOpen(false)}
                >
                  {s.label}
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
