import { useState } from "react";
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

const Index = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState<OrganizationType | undefined>();

  const openModal = (orgType?: OrganizationType) => {
    setSelectedOrg(orgType);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
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
        <Security />
        <WhyICommunity />
        
        {/* <NewsletterBanner /> */}
        <CaseStudy onOpenModal={openModal} />
        <FinalCta onOpenModal={openModal} />
      </main>
      <Footer onOpenModal={() => openModal()} />
      <ContactModal open={modalOpen} onOpenChange={setModalOpen} defaultOrgType={selectedOrg} />
    </div>
  );
};

export default Index;
