import { Hero } from "./_components/Hero";
import { Faq } from "./_components/Faq";
import { Benefits } from "./_components/Benefits";
import { Pricing } from "./_components/Pricing";

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* <Hero /> */}
      <Pricing />
      <Benefits />
      <Faq />
    </div>
  );
}
