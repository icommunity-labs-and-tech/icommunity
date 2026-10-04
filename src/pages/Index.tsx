import { useState } from "react";
import PageSEO from "@/components/PageSEO";
import Navbar from "@/components/home/Navbar";
import Hero from "@/components/home/Hero";
import TrustBar from "@/components/home/TrustBar";
import Ecosystem from "@/components/home/Ecosystem";
import StructuralProblem from "@/components/home/StructuralProblem";
import Segments from "@/components/home/Segments";
import Integrations from "@/components/home/Integrations";
import TrustArchitecture from "@/components/home/TrustArchitecture";
import TrustLifecycle from "@/components/home/TrustLifecycle";
import TrustStatement from "@/components/home/TrustStatement";
import Security from "@/components/home/Security";
import WhyICommunity from "@/components/home/WhyICommunity";
import LeadMagnet from "@/components/home/LeadMagnet";
import CaseStudy from "@/components/home/CaseStudy";
import FinalCta from "@/components/home/FinalCta";
import NewsletterBanner from "@/components/home/NewsletterBanner";
import Footer from "@/components/home/Footer";
import ContactModal, { type OrganizationType } from "@/components/home/ContactModal";
import { useLanguage } from "@/i18n/LanguageContext";

const Index = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { lang } = useLanguage();
  const [selectedOrg, setSelectedOrg] = useState<OrganizationType | undefined>();

  const openModal = (orgType?: OrganizationType) => {
    setSelectedOrg(orgType);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <PageSEO
        title={
          lang === "es"
            ? "iCommunity | Evidencia verificable para auditorías"
            : "iCommunity | Verifiable Evidence for Audits"
        }
        description={
          lang === "es"
            ? "Demuestra el cumplimiento con evidencia trazable y sellado de tiempo con validez legal. Infraestructura de confianza para sectores regulados. Solicita una demo."
            : "Prove compliance with traceable, timestamped evidence that stands up to audits. Trust infrastructure for regulated industries. Request a demo."
        }
        path="/"
        lang={lang}
      />
      <Navbar onOpenModal={() => openModal()} />
      <main>
        <Hero onOpenModal={() => openModal()} />
        <TrustBar />
        <StructuralProblem />
        <TrustStatement />
        <TrustArchitecture />
        <TrustLifecycle />
        <Segments />
        <Ecosystem />
        <CaseStudy onOpenModal={openModal} />
        <WhyICommunity />
        <Security />
        
        {/* <NewsletterBanner /> */}
        <FinalCta onOpenModal={openModal} />
      </main>
      <Footer onOpenModal={() => openModal()} />
      <ContactModal open={modalOpen} onOpenChange={setModalOpen} defaultOrgType={selectedOrg} />
    </div>
  );
};

export default Index;
