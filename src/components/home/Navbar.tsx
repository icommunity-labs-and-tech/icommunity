import React, { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "@/assets/logo-blanco-negativo.png";
import { useLanguage } from "@/i18n/LanguageContext";

const solutionsLinks = [
  { label: "CertyPass", href: "https://certypass.com", external: true },
  { label: "Privaro", href: "https://privaura.lovable.app", external: true },
];

const texts = {
  en: {
    navLinks: [
      { label: "How it works", href: "/#trust-architecture" },
      { label: "Use cases", href: "/#segments" },
      { label: "Security", href: "/#security" },
      { label: "Resources", href: "/#resources" },
      { label: "Partners", href: "/partners", isRoute: true },
      { label: "Company", href: "/empresa", isRoute: true },
    ],
    solutions: "Solutions",
    requestDemo: "Request demo",
  },
  es: {
    navLinks: [
      { label: "Cómo funciona", href: "/#trust-architecture" },
      { label: "Casos de uso", href: "/#segments" },
      { label: "Seguridad", href: "/#security" },
      { label: "Recursos", href: "/#resources" },
      { label: "Partners", href: "/partners", isRoute: true },
      { label: "Empresa", href: "/empresa", isRoute: true },
    ],
    solutions: "Soluciones",
    requestDemo: "Solicitar demo",
  },
};

const Navbar = ({ onOpenModal }: { onOpenModal?: () => void }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { lang, setLang } = useLanguage();
  const t = texts[lang];
  const navigate = useNavigate();
  const location = useLocation();

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const [path, hash] = href.split("#");
    const targetPath = path || "/";
    if (location.pathname === targetPath) {
      const el = document.getElementById(hash);
      el?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate(targetPath + "#" + hash);
      setTimeout(() => {
        const el = document.getElementById(hash);
        el?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }
  };

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
      aria-label="Main navigation"
    >
      <div className="ic-container flex items-center justify-between h-16">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="iCommunity" className="h-7" />
        </Link>

        <div className="hidden lg:flex items-center gap-8">
          {t.navLinks.map((link, idx) => (
            <React.Fragment key={link.label}>
              {link.isRoute ? (
                <Link
                  to={link.href}
                  className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  href={link.href}
                  onClick={(e) => handleAnchorClick(e, link.href)}
                  className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  {link.label}
                </a>
              )}
              {idx === 1 && (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setSolutionsOpen(!solutionsOpen)}
                    className="flex items-center gap-1 text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {t.solutions}
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
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-4">
          {/* Language toggle */}
          <div className="flex items-center rounded-full border border-primary-foreground/15 bg-primary-foreground/5 overflow-hidden text-xs font-medium">
            <button
              onClick={() => setLang("en")}
              className={`px-2.5 py-1 transition-colors ${lang === "en" ? "text-primary-foreground bg-primary-foreground/10" : "text-primary-foreground/40 hover:text-primary-foreground/60"}`}
            >
              EN
            </button>
            <button
              onClick={() => setLang("es")}
              className={`px-2.5 py-1 transition-colors ${lang === "es" ? "text-primary-foreground bg-primary-foreground/10" : "text-primary-foreground/40 hover:text-primary-foreground/60"}`}
            >
              ES
            </button>
          </div>
          <button onClick={onOpenModal} className="inline-flex items-center justify-center rounded-lg ic-gradient-cta px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity">
            {t.requestDemo}
          </button>
        </div>

        <button
          className="lg:hidden p-2 text-primary-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#1b253b]/95 backdrop-blur-md overflow-hidden"
          >
            <div className="ic-container py-4 flex flex-col gap-3">
              {/* Mobile language toggle */}
              <div className="flex items-center gap-2 pb-2 border-b border-primary-foreground/10 mb-1">
                <button
                  onClick={() => setLang("en")}
                  className={`text-xs font-medium px-2 py-1 rounded ${lang === "en" ? "text-primary-foreground bg-primary-foreground/10" : "text-primary-foreground/40"}`}
                >
                  EN
                </button>
                <button
                  onClick={() => setLang("es")}
                  className={`text-xs font-medium px-2 py-1 rounded ${lang === "es" ? "text-primary-foreground bg-primary-foreground/10" : "text-primary-foreground/40"}`}
                >
                  ES
                </button>
              </div>
              {t.navLinks.map((link) => (
                link.isRoute ? (
                  <Link
                    key={link.label}
                    to={link.href}
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground py-2"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => { handleAnchorClick(e, link.href); setMobileOpen(false); }}
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground py-2"
                  >
                    {link.label}
                  </a>
                )
              ))}
              <div className="text-xs font-medium text-primary-foreground/40 uppercase tracking-wide pt-2">{t.solutions}</div>
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
                {t.requestDemo}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
