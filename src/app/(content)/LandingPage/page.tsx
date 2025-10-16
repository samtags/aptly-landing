import { Hero } from "./_components/Hero";
import { Faq } from "./_components/Faq";
import { Benefits } from "./_components/Benefits";
import { Pricing } from "./_components/Pricing";
import Footer from "./_components/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Benefits />
      <Pricing />
      <Faq />
      <Footer />
    </div>
  );
}
