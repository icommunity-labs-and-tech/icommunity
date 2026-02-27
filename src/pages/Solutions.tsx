import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import { useState } from "react";
import ContactModal, { type OrganizationType } from "@/components/home/ContactModal";

const solutions = [
  {
    name: "CertyPass",
    description:
      "Pasaporte Digital de Producto basado en evidencia verificable conforme regulación europea ESPR.",
    url: "https://certypass.com/",
    cta: "Visitar CertyPass",
  },
  {
    name: "Privaura",
    description:
      "Gateway de cumplimiento y anonimización de datos para sistemas de IA regulados.",
    url: "https://privaura.lovable.app/",
    cta: "Visitar Privaura",
  },
];

const Solutions = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar onOpenModal={() => setModalOpen(true)} />

      <main className="flex-1 pt-28 pb-20">
        <div className="ic-container">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-3">
            Soluciones sobre infraestructura iCommunity
          </h1>
          <p className="text-muted-foreground max-w-2xl mb-14">
            Productos construidos sobre la capa de infraestructura iCommunity, diseñados para resolver necesidades regulatorias y de confianza digital.
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-3xl">
            {solutions.map((s) => (
              <div
                key={s.name}
                className="ic-card flex flex-col justify-between gap-6"
              >
                <div>
                  <h2 className="text-xl font-semibold text-foreground mb-2">
                    {s.name}
                  </h2>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {s.description}
                  </p>
                </div>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium ic-text-gradient hover:opacity-80 transition-opacity w-fit"
                >
                  {s.cta}
                  <ArrowUpRight className="w-4 h-4 text-primary" />
                </a>
              </div>
            ))}
          </div>

          <Link
            to="/"
            className="inline-block mt-14 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Volver a la página principal
          </Link>
        </div>
      </main>

      <Footer />
      <ContactModal open={modalOpen} onOpenChange={setModalOpen} />
    </div>
  );
};

export default Solutions;
