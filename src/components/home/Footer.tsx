import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ChevronDown, Linkedin } from "lucide-react";
import logo from "@/assets/logo-blanco-negativo.png";
import logoFeder from "@/assets/logo-feder.png";
import logoUE from "@/assets/logo-cofinanciado-ue.png";
import logoCdti from "@/assets/logo-cdti.jpg";
import logoEnisa from "@/assets/logo-enisa.jpg";
import { useLanguage } from "@/i18n/LanguageContext";

const solutionsLinks = [
  { label: "CertyPass", href: "https://certypass.com" },
  { label: "Privaro", href: "https://privaro.ai" },
  { label: "MusicDibs", href: "https://musicdibs.com" },
  { label: "CertyFile", href: "https://certyfile.com" },
];

type FooterLink = { label: string; href?: string; external?: boolean; route?: string; anchor?: string; isSolutionsDropdown?: boolean };

const texts = {
  en: {
    columns: [
      { title: "Company", links: [
        { label: "About us", route: "/empresa" },
        { label: "Partners", route: "/partners" },
        { label: "Success stories", anchor: "cases" },
        { label: "Resources", route: "/recursos" },
        { label: "Blog", route: "/blog" },
        { label: "Solutions", isSolutionsDropdown: true },
      ] as FooterLink[] },
      { title: "Guides", links: [
        { label: "Digital Product Passport", route: "/recursos/pasaporte-digital-de-producto-dpp" },
        { label: "AI Act & personal data", route: "/recursos/ai-act-datos-personales-llm" },
        { label: "Document traceability", route: "/recursos/trazabilidad-documental" },
        { label: "Verifactu", route: "/recursos/verifactu-blockchain" },
      ] as FooterLink[] },
      { title: "Token ICOM", links: [{ label: "Web ICOM", href: "https://icom.icommunity.io/", external: true }] as FooterLink[] },
      { title: "Legal", links: [{ label: "Legal notice", route: "/legal" }, { label: "Privacy", route: "/legal" }, { label: "Cookies", route: "/legal#cookies" }, { label: "Terms of service", route: "/terms" }, { label: "Refund policy", route: "/refunds" }, { label: "Funding", route: "/financiacion" }] as FooterLink[] },
    ],
    coFunded: "Co-funded projects",
    cdtiAlt: "CDTI – Ministry of Science and Innovation",
    federAlt: "European Regional Development Fund (ERDF)",
    ueAlt: "Co-funded by the European Union",
    rights: "All rights reserved.",
  },
  es: {
    columns: [
      { title: "Empresa", links: [
        { label: "Quiénes somos", route: "/empresa" },
        { label: "Partners", route: "/partners" },
        { label: "Casos de éxito", anchor: "cases" },
        { label: "Recursos", route: "/recursos" },
        { label: "Blog", route: "/blog" },
        { label: "Soluciones", isSolutionsDropdown: true },
      ] as FooterLink[] },
      { title: "Guías", links: [
        { label: "Pasaporte Digital de Producto", route: "/recursos/pasaporte-digital-de-producto-dpp" },
        { label: "AI Act y datos personales", route: "/recursos/ai-act-datos-personales-llm" },
        { label: "Trazabilidad documental", route: "/recursos/trazabilidad-documental" },
        { label: "Verifactu", route: "/recursos/verifactu-blockchain" },
      ] as FooterLink[] },
      { title: "Token ICOM", links: [{ label: "Web ICOM", href: "https://icom.icommunity.io/", external: true }] as FooterLink[] },
      { title: "Legal", links: [{ label: "Aviso legal", route: "/legal" }, { label: "Privacidad", route: "/legal" }, { label: "Cookies", route: "/legal#cookies" }, { label: "Condiciones de servicio", route: "/terminos" }, { label: "Política de reembolsos", route: "/reembolsos" }, { label: "Financiación", route: "/financiacion" }] as FooterLink[] },
    ],
    coFunded: "Proyectos cofinanciados",
    cdtiAlt: "CDTI – Ministerio de Ciencia e Innovación",
    federAlt: "Fondo Europeo de Desarrollo Regional (FEDER)",
    ueAlt: "Cofinanciado por la Unión Europea",
    rights: "Todos los derechos reservados.",
  },
};

const Footer = ({ onOpenModal }: { onOpenModal?: () => void }) => {
  const { lang } = useLanguage();
  const t = texts[lang];
  const navigate = useNavigate();
  const location = useLocation();
  const [solOpen, setSolOpen] = useState(false);

  const handleAnchorClick = (anchor: string) => {
    if (location.pathname === "/") {
      const el = document.getElementById(anchor);
      el?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/#" + anchor);
      setTimeout(() => {
        const el = document.getElementById(anchor);
        el?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }
  };

  return (
    <footer id="company" className="relative overflow-hidden" style={{ background: "linear-gradient(180deg, hsl(225 30% 6%) 0%, hsl(225 35% 4%) 100%)" }}>
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(hsl(225 80% 60%) 1px, transparent 1px), linear-gradient(90deg, hsl(225 80% 60%) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
      <div className="relative ic-container pt-14 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {t.columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-white/70 mb-4">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => {
                  if (link.isSolutionsDropdown) {
                    return (
                      <li key={link.label}>
                        <button
                          onClick={() => setSolOpen(!solOpen)}
                          className="flex items-center gap-1 text-sm text-white/30 hover:text-white/60 transition-colors"
                        >
                          {link.label}
                          <ChevronDown className={`w-3 h-3 transition-transform ${solOpen ? "rotate-180" : ""}`} />
                        </button>
                        {solOpen && (
                          <ul className="mt-1.5 ml-3 space-y-1.5">
                            {solutionsLinks.map((s) => (
                              <li key={s.label}>
                                <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-sm text-white/30 hover:text-white/60 transition-colors">
                                  {s.label}
                                </a>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    );
                  }
                  if (link.anchor) {
                    return (
                      <li key={link.label}>
                        <button
                          onClick={() => handleAnchorClick(link.anchor!)}
                          className="text-sm text-white/30 hover:text-white/60 transition-colors"
                        >
                          {link.label}
                        </button>
                      </li>
                    );
                  }
                  if (link.route) {
                    return (
                      <li key={link.label}>
                        <Link to={link.route} className="text-sm text-white/30 hover:text-white/60 transition-colors">{link.label}</Link>
                      </li>
                    );
                  }
                  return (
                    <li key={link.label}>
                      <a href={link.href ?? "#"} {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="text-sm text-white/30 hover:text-white/60 transition-colors">{link.label}</a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-white/[0.06] pt-8 pb-8">
          <p className="text-[10px] text-white/25 uppercase tracking-widest text-center mb-5">{t.coFunded}</p>
          <div className="flex flex-nowrap items-center justify-center gap-6 md:gap-12 overflow-x-auto">
            <img src={logoCdti} alt={t.cdtiAlt} className="h-10 md:h-14 rounded bg-white/90 px-3 py-1.5" />
            <img src={logoEnisa} alt="ENISA logo" className="h-10 md:h-14 rounded bg-white/90 px-3 py-1.5" />
            <img src={logoFeder} alt={t.federAlt} className="h-10 md:h-14 rounded bg-white/90 px-3 py-1.5" />
            <img src={logoUE} alt={t.ueAlt} className="h-10 md:h-14 rounded bg-white/90 px-3 py-1.5" />
          </div>
        </div>
        <div className="border-t border-white/[0.06] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img src={logo} alt="iCommunity logo" className="h-6 opacity-60" />
            <a
              href="https://es.linkedin.com/company/icommunity-baas"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="iCommunity en LinkedIn"
              className="text-white/30 hover:text-white/60 transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
          <p className="text-xs text-white/20">© {new Date().getFullYear()} iCommunity Labs S.L. {t.rights}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
