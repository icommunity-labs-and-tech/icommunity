import logo from "@/assets/logo-blanco-negativo.png";

const footerColumns = [
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
    links: ["Blog", "Whitepaper", "Guías", "Changelog"],
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

const Footer = () => {
  return (
    <footer id="empresa" className="bg-ic-navy pt-20 pb-10">
      <div className="ic-container">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-16">
          {footerColumns.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-primary-foreground mb-4">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-primary-foreground/40 hover:text-primary-foreground/70 transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-primary-foreground/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center">
            <img src={logo} alt="iCommunity" className="h-6" />
          </div>
          <p className="text-xs text-primary-foreground/30">
            © {new Date().getFullYear()} iCommunity Labs S.L. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
