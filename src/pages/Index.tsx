import { useState } from "react";
import Navbar from "@/components/home/Navbar";
import Hero from "@/components/home/Hero";
import TrustBar from "@/components/home/TrustBar";
import HowItWorks from "@/components/home/HowItWorks";
import TrustArchitecture from "@/components/home/TrustArchitecture";
import Segments from "@/components/home/Segments";
import Integrations from "@/components/home/Integrations";
import Security from "@/components/home/Security";
import WhyICommunity from "@/components/home/WhyICommunity";
import LeadMagnet from "@/components/home/LeadMagnet";
import FinalCta from "@/components/home/FinalCta";
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
        <HowItWorks />
        <TrustArchitecture />
        <Segments />
        <Integrations />
        <Security />
        <WhyICommunity />
        <LeadMagnet />
        <FinalCta onOpenModal={openModal} />
      </main>
      <Footer />
      <ContactModal open={modalOpen} onOpenChange={setModalOpen} defaultOrgType={selectedOrg} />
    </div>
  );
};

export default Index;
