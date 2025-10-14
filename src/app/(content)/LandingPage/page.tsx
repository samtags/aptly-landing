import { Hero } from "./_components/Hero";
import { Faq } from "./_components/Faq";
import { Benefits } from "./_components/Benefits";

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* <Hero /> */}
      <Benefits />
      <Faq />
    </div>
  );
}
