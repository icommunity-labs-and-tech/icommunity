import Navbar from "@/components/home/Navbar";
import Hero from "@/components/home/Hero";
import ProblemSection from "@/components/home/ProblemSection";
import WhatWeDo from "@/components/home/WhatWeDo";
import HowItWorks from "@/components/home/HowItWorks";
import Segments from "@/components/home/Segments";
import Integrations from "@/components/home/Integrations";
import Security from "@/components/home/Security";
import LeadMagnet from "@/components/home/LeadMagnet";
import FinalCta from "@/components/home/FinalCta";
import Footer from "@/components/home/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <ProblemSection />
        <WhatWeDo />
        <HowItWorks />
        <Segments />
        <Integrations />
        <Security />
        <LeadMagnet />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
