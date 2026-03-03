import logo from "@/assets/logo-blanco-negativo.png";
import logoFeder from "@/assets/logo-feder.png";
import logoUE from "@/assets/logo-cofinanciado-ue.png";
import logoNeotec from "@/assets/logo-neotec-cdti.jpg";
import logoCdti from "@/assets/logo-cdti.jpg";
import logoEnisa from "@/assets/logo-enisa.jpg";

type FooterLink = string | { label: string; href?: string; external?: boolean };

const footerColumns: { title: string; links: FooterLink[] }[] = [
  {
    title: "Product",
    links: ["Platform", "SDK & API", "Verifier", "Documentation"],
  },
  {
    title: "Use cases",
    links: ["KYC", "Age verification", "Anti-fraud", "MiCA"],
  },
  {
    title: "Security",
    links: ["Architecture", "Compliance", "GDPR", "Technical details"],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog" },
      { label: "Whitepaper" },
      { label: "Guides" },
      { label: "Token Icom", href: "https://www.icommunity.io/icom/", external: true },
    ],
  },
  {
    title: "Company",
    links: ["About us", "Partnerships", "Contact", "Careers"],
  },
  {
    title: "Legal",
    links: ["Legal notice", "Privacy", "Cookies", "Terms"],
  },
];

const Footer = ({ onOpenModal }: { onOpenModal?: () => void }) => {
  return (
    <footer id="company" className="relative overflow-hidden" style={{ background: "linear-gradient(180deg, hsl(225 30% 6%) 0%, hsl(225 35% 4%) 100%)" }}>
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(hsl(225 80% 60%) 1px, transparent 1px), linear-gradient(90deg, hsl(225 80% 60%) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative ic-container pt-14 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-16">
          {footerColumns.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-white/70 mb-4">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => {
                  const label = typeof link === "string" ? link : link.label;
                  const href = typeof link === "string" ? "#" : (link.href ?? "#");
                  const external = typeof link === "string" ? false : !!link.external;
                  return (
                    <li key={label}>
                      <a
                        href={href}
                        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="text-sm text-white/30 hover:text-white/60 transition-colors"
                      >
                        {label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/[0.06] pt-8 pb-8">
          <p className="text-[10px] text-white/25 uppercase tracking-widest text-center mb-5">Co-funded projects</p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            <img src={logoCdti} alt="CDTI – Ministry of Science and Innovation" className="h-10 md:h-14 rounded bg-white/90 px-3 py-1.5" />
            <img src={logoNeotec} alt="CDTI Neotec" className="h-10 md:h-14 rounded" />
            <img src={logoEnisa} alt="ENISA" className="h-10 md:h-14 rounded bg-white/90 px-3 py-1.5" />
            <img src={logoFeder} alt="European Regional Development Fund (ERDF)" className="h-10 md:h-14 rounded bg-white/90 px-3 py-1.5" />
            <img src={logoUE} alt="Co-funded by the European Union" className="h-10 md:h-14 rounded bg-white/90 px-3 py-1.5" />
          </div>
        </div>

        <div className="border-t border-white/[0.06] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center">
            <img src={logo} alt="iCommunity" className="h-6 opacity-60" />
          </div>
          <p className="text-xs text-white/20">
            © {new Date().getFullYear()} iCommunity Labs S.L. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
