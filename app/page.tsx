"use client";

// Layout
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// Sections
import Hero from "@/components/sections/Hero";
import SocialProof from "@/components/sections/SocialProof";
import HowItWorks from "@/components/sections/HowItWorks";
import Pricing from "@/components/sections/Pricing";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";

// Features
import DocumentationSuite from "@/components/features/DocumentationSuite";
import FeatureShowcase from "@/components/features/FeatureShowcase";
import DashboardPreview from "@/components/features/DashboardPreview";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <SocialProof />
      <DocumentationSuite />
      <HowItWorks />
      <FeatureShowcase />
      <DashboardPreview />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
