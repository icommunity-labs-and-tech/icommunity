import logo from "@/assets/logo-blanco-negativo.png";

type FooterLink = string | { label: string; href?: string; external?: boolean };

const footerColumns: { title: string; links: FooterLink[] }[] = [
  {
    title: "Producto",
    links: ["Plataforma", "SDK & API", "Verificador", "Documentación"],
  },
  {
    title: "Casos de uso",
    links: ["KYC", "Verificación de edad", "Anti-fraude", "MiCA"],
  },
  {
    title: "Seguridad",
    links: ["Arquitectura", "Compliance", "RGPD", "Detalles técnicos"],
  },
  {
    title: "Recursos",
    links: [
      { label: "Blog" },
      { label: "Whitepaper" },
      { label: "Guías" },
      { label: "Token Icom", href: "https://www.icommunity.io/icom/", external: true },
    ],
  },
  {
    title: "Empresa",
    links: ["Sobre nosotros", "Partnerships", "Contacto", "Empleo"],
  },
  {
    title: "Legal",
    links: ["Aviso legal", "Privacidad", "Cookies", "Términos"],
  },
];

const Footer = ({ onOpenModal }: { onOpenModal?: () => void }) => {
  return (
    <footer id="empresa" className="relative overflow-hidden" style={{ background: "linear-gradient(180deg, hsl(225 30% 6%) 0%, hsl(225 35% 4%) 100%)" }}>
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(hsl(225 80% 60%) 1px, transparent 1px), linear-gradient(90deg, hsl(225 80% 60%) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Institutional claim */}
      <div className="relative ic-container pt-24 pb-16 md:pt-32 md:pb-20 text-center border-b border-white/[0.06]">
        <p className="font-mono text-[11px] tracking-widest text-white/30 uppercase mb-6">
          Trust Infrastructure
        </p>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight max-w-3xl mx-auto mb-4">
          La capa de confianza que tus sistemas necesitan
        </h2>
        <p className="text-white/40 text-lg max-w-xl mx-auto mb-10">
          Infraestructura criptográfica independiente para entornos regulados
        </p>
        <button
          onClick={onOpenModal}
          className="inline-flex items-center justify-center rounded-lg ic-gradient-cta px-8 py-3.5 text-sm font-semibold text-white hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
        >
          Solicitar demo técnica
        </button>
      </div>

      {/* Links grid */}
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

        <div className="border-t border-white/[0.06] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center">
            <img src={logo} alt="iCommunity" className="h-6 opacity-60" />
          </div>
          <p className="text-xs text-white/20">
            © {new Date().getFullYear()} iCommunity Labs S.L. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
