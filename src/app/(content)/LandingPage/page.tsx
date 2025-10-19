import { Hero } from "./_components/Hero";
import { Faq } from "./_components/Faq";
import { Benefits } from "./_components/Benefits";
import { Pricing } from "./_components/Pricing";
import Footer from "./_components/Footer";
import Header from "./_components/Header";
import { Blur } from "./_components/Blur";
import Patterns from "./_components/Patterns";
import PageClient from "./_components/Page.client";

export default function LandingPage() {
  return (
    <div className="min-h-screen relative">
      <PageClient />
      <Blur />
      <Patterns />
      <Header />
      <Hero />
      <Benefits />
      <Pricing />
      <Faq />
      <Footer />
    </div>
  );
}
