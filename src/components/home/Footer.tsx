import { Link } from "react-router-dom";
import logo from "@/assets/logo-blanco-negativo.png";
import logoFeder from "@/assets/logo-feder.png";
import logoUE from "@/assets/logo-cofinanciado-ue.png";
import logoNeotec from "@/assets/logo-neotec-cdti.jpg";
import logoCdti from "@/assets/logo-cdti.jpg";
import logoEnisa from "@/assets/logo-enisa.jpg";
import { useLanguage } from "@/i18n/LanguageContext";

type FooterLink = string | { label: string; href?: string; external?: boolean; route?: string };

const texts = {
  en: {
    columns: [
      { title: "Product", links: ["Platform", "SDK & API", "Verifier", "Documentation"] as FooterLink[] },
      { title: "Use cases", links: ["KYC", "Age verification", "Anti-fraud", "MiCA"] as FooterLink[] },
      { title: "Security", links: ["Architecture", "Compliance", "GDPR", "Technical details"] as FooterLink[] },
      { title: "Resources", links: [{ label: "Blog" }, { label: "Whitepaper" }, { label: "Guides" }, { label: "Token Icom", href: "https://www.icommunity.io/icom/", external: true }] as FooterLink[] },
      { title: "Legal", links: [{ label: "Legal notice", route: "/legal" }, { label: "Privacy", route: "/legal" }, { label: "Cookies", route: "/legal#cookies" }, { label: "Terms", route: "/legal" }] as FooterLink[] },
    ],
    coFunded: "Co-funded projects",
    cdtiAlt: "CDTI – Ministry of Science and Innovation",
    federAlt: "European Regional Development Fund (ERDF)",
    ueAlt: "Co-funded by the European Union",
    rights: "All rights reserved.",
  },
  es: {
    columns: [
      { title: "Producto", links: ["Plataforma", "SDK & API", "Verificador", "Documentación"] as FooterLink[] },
      { title: "Casos de uso", links: ["KYC", "Verificación de edad", "Anti-fraude", "MiCA"] as FooterLink[] },
      { title: "Seguridad", links: ["Arquitectura", "Cumplimiento", "GDPR", "Detalles técnicos"] as FooterLink[] },
      { title: "Recursos", links: [{ label: "Blog" }, { label: "Whitepaper" }, { label: "Guías" }, { label: "Token Icom", href: "https://www.icommunity.io/icom/", external: true }] as FooterLink[] },
      { title: "Legal", links: [{ label: "Aviso legal", route: "/legal" }, { label: "Privacidad", route: "/legal" }, { label: "Cookies", route: "/legal#cookies" }, { label: "Términos", route: "/legal" }] as FooterLink[] },
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

  return (
    <footer id="company" className="relative overflow-hidden" style={{ background: "linear-gradient(180deg, hsl(225 30% 6%) 0%, hsl(225 35% 4%) 100%)" }}>
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(hsl(225 80% 60%) 1px, transparent 1px), linear-gradient(90deg, hsl(225 80% 60%) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
      <div className="relative ic-container pt-14 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-16">
          {t.columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-white/70 mb-4">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => {
                  const label = typeof link === "string" ? link : link.label;
                  const href = typeof link === "string" ? "#" : (link.href ?? "#");
                  const external = typeof link === "string" ? false : !!link.external;
                  const route = typeof link === "string" ? undefined : link.route;
                  return (
                    <li key={label}>
                      {route ? (
                        <Link to={route} className="text-sm text-white/30 hover:text-white/60 transition-colors">{label}</Link>
                      ) : (
                        <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="text-sm text-white/30 hover:text-white/60 transition-colors">{label}</a>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-white/[0.06] pt-8 pb-8">
          <p className="text-[10px] text-white/25 uppercase tracking-widest text-center mb-5">{t.coFunded}</p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            <img src={logoCdti} alt={t.cdtiAlt} className="h-10 md:h-14 rounded bg-white/90 px-3 py-1.5" />
            <img src={logoNeotec} alt="CDTI Neotec" className="h-10 md:h-14 rounded" />
            <img src={logoEnisa} alt="ENISA" className="h-10 md:h-14 rounded bg-white/90 px-3 py-1.5" />
            <img src={logoFeder} alt={t.federAlt} className="h-10 md:h-14 rounded bg-white/90 px-3 py-1.5" />
            <img src={logoUE} alt={t.ueAlt} className="h-10 md:h-14 rounded bg-white/90 px-3 py-1.5" />
          </div>
        </div>
        <div className="border-t border-white/[0.06] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center"><img src={logo} alt="iCommunity" className="h-6 opacity-60" /></div>
          <p className="text-xs text-white/20">© {new Date().getFullYear()} iCommunity Labs S.L. {t.rights}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
