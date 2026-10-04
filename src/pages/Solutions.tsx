import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import PageSEO from "@/components/PageSEO";
import { webPage, breadcrumbs, productList } from "@/lib/structuredData";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import ContactModal, { type OrganizationType } from "@/components/home/ContactModal";

const solutions = [
  {
    name: "CertyPass",
    description: "Digital Product Passport based on verifiable evidence compliant with European ESPR regulation.",
    url: "https://certypass.com/",
    cta: "Visit CertyPass",
    guides: [
      { label: "Digital Product Passport (ESPR) guide", to: "/recursos/pasaporte-digital-de-producto-dpp" },
      { label: "Implementing the DPP", to: "/recursos/desafios-implementacion-dpp" },
    ],
  },
  {
    name: "Privaro",
    description: "Compliance and data anonymization gateway for regulated AI systems.",
    url: "https://privaro.ai",
    cta: "Visit Privaro",
    guides: [{ label: "AI Act and personal data in LLMs", to: "/recursos/ai-act-datos-personales-llm" }],
  },
  {
    name: "MusicDibs",
    description: "Digital rights and copyright verification platform for the music industry.",
    url: "https://musicdibs.com/",
    cta: "Visit MusicDibs",
    guides: [] as { label: string; to: string }[],
  },
];

const Solutions = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { lang } = useLanguage();
  const seo =
    lang === "es"
      ? {
          title: "Soluciones: CertyPass, Privaro y MusicDibs",
          description:
            "Pasaporte digital de producto, anonimización de datos para IA y registro de derechos musicales sobre la infraestructura de evidencia verificable de iCommunity.",
        }
      : {
          title: "Solutions: CertyPass, Privaro and MusicDibs",
          description:
            "Digital product passport, data anonymization for AI and music rights registration, built on iCommunity's verifiable evidence infrastructure.",
        };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PageSEO
        title={seo.title}
        description={seo.description}
        path="/soluciones"
        lang={lang}
        jsonLd={[
          webPage({ path: "/soluciones", name: seo.title, description: seo.description, lang, type: "CollectionPage" }),
          productList(
            solutions.map((s) => ({
              name: s.name,
              description: s.description,
              url: s.url,
              category:
                s.name === "CertyPass" ? "Digital Product Passport" : s.name === "Privaro" ? "AI data compliance" : "Copyright registration",
            })),
          ),
          breadcrumbs([
            { name: lang === "es" ? "Inicio" : "Home", path: "/" },
            { name: lang === "es" ? "Soluciones" : "Solutions", path: "/soluciones" },
          ]),
        ]}
      />
      <Navbar onOpenModal={() => setModalOpen(true)} />

      <main className="flex-1 pt-28 pb-20">
        <div className="ic-container">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-3">
            Solutions on iCommunity infrastructure
          </h1>
          <p className="text-muted-foreground max-w-2xl mb-14">
            Products built on the iCommunity infrastructure layer, designed to address regulatory and digital trust needs.
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-3xl">
            {solutions.map((s) => (
              <div key={s.name} className="ic-card flex flex-col justify-between gap-6">
                <div>
                  <h2 className="text-xl font-semibold text-foreground mb-2">{s.name}</h2>
                  <p className="text-muted-foreground text-sm leading-relaxed">{s.description}</p>
                  {s.guides.length > 0 && (
                    <ul className="mt-4 space-y-1.5">
                      {s.guides.map((g) => (
                        <li key={g.to}>
                          <Link to={g.to} className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground transition-colors">
                            {g.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
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

          <section className="mt-16 max-w-3xl">
            <h2 className="text-xl font-semibold text-foreground mb-3">Verifiable evidence for any process</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              All products share the same infrastructure: cryptographic fingerprints, qualified timestamps and distributed-ledger anchoring. Learn how it applies to{" "}
              <Link to="/recursos/trazabilidad-documental" className="underline underline-offset-4 hover:text-foreground">document traceability</Link> and{" "}
              <Link to="/recursos/verifactu-blockchain" className="underline underline-offset-4 hover:text-foreground">Verifactu invoicing records</Link>.
            </p>
          </section>

          <Link to="/" className="inline-block mt-14 text-sm text-muted-foreground hover:text-foreground transition-colors">
            ← Back to homepage
          </Link>
        </div>
      </main>

      <Footer />
      <ContactModal open={modalOpen} onOpenChange={setModalOpen} />
    </div>
  );
};

export default Solutions;
