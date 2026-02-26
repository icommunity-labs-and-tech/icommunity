import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Producto", href: "#producto" },
  { label: "Casos de uso", href: "#segmentos" },
  { label: "Integraciones", href: "#integraciones" },
  { label: "Seguridad & Compliance", href: "#seguridad" },
  { label: "Recursos", href: "#recursos" },
  { label: "Empresa", href: "#empresa" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 ic-glass" role="navigation" aria-label="Navegación principal">
      <div className="ic-container flex items-center justify-between h-16">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 font-bold text-xl tracking-tight text-foreground">
          <div className="w-8 h-8 rounded-lg ic-gradient-cta flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">iC</span>
          </div>
          <span>iCommunity</span>
        </a>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTAs */}
        <div className="hidden lg:flex items-center gap-3">
          <a href="#como-funciona" className="text-sm font-medium text-primary hover:text-primary-dark transition-colors">
            Ver cómo funciona
          </a>
          <a href="#demo" className="inline-flex items-center justify-center rounded-lg ic-gradient-cta px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity">
            Solicitar demo
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden p-2 text-foreground"
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
            className="lg:hidden ic-glass border-t border-border overflow-hidden"
          >
            <div className="ic-container py-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground py-2"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a href="#demo" className="inline-flex items-center justify-center rounded-lg ic-gradient-cta px-4 py-2.5 text-sm font-medium text-primary-foreground mt-2">
                Solicitar demo
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
