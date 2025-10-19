import Link from "next/link";

export function Hero() {
  return (
    <section id="hero" className="pt-24 md:pt-32 lg:pt-[144px] px-4">
      <div className="flex justify-center mb-6">
        <HeroBadge />
      </div>
      <div className="max-w-4xl mx-auto">
        <div className="text-center items-center mb-10">
          <h2 className="font-Satoshi font-semibold text-[#8b8f98] mb-4">
            <span className="text-[#0f1115] text-[32px] sm:text-[40px] lg:text-[48px] leading-[38px] sm:leading-[46px] lg:leading-[56px] tracking-[-1.5px] lg:tracking-[-2px] block">
              Pub-Sub That Just Works
            </span>
            <span className="text-[#8b8f98] text-[32px] sm:text-[40px] lg:text-[48px] leading-[38px] sm:leading-[46px] lg:leading-[56px] tracking-[-1.5px] lg:tracking-[-2px] block mt-2">
              Built to Deliver
            </span>
          </h2>
          <p className="font-InterLight text-[16px] sm:text-[17px] lg:text-[18px] text-[#555a68] mx-auto max-w-[90%] sm:max-w-[515px] px-4 sm:px-0">
            Power your app with real-time updates at any scale — fully managed,
            zero maintenance, always live.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-2 justify-center px-4 sm:px-0">
          <Link target="_blank" href="https://docs.aptly.cloud">
            <button className="bg-[#3b5beb] text-white hover:bg-[#284ae2] transition-all duration-300 px-8 py-3 rounded-full text-[14px] font-medium w-full sm:w-auto">
              Get Started
            </button>
          </Link>
          <Link target="_blank" href="https://demo.aptly.cloud">
            <button className="bg-white text-[#333842] hover:bg-[#f9fafb] border border-[#d9dfe8] transition-all duration-300 px-6 py-3 rounded-full text-[14px] font-medium w-full sm:w-auto">
              Try Live Demo
            </button>
          </Link>
        </div>
        <div className="text-center text-[#555a68] font-InterLight text-[12px] mt-6">
          Connect once — Scale automatically.
        </div>

        <div className="pt-4 text-center text-[#555a68] font-InterLight text-[12px] mt-6 h-[280px] sm:h-[340px] lg:h-[380px] bg-[#f9fafb] rounded-2xl sm:rounded-3xl mx-4 sm:mx-0">
          Show case area (real-time mini-app)
        </div>
      </div>
    </section>
  );
}

export function HeroBadge() {
  return (
    <div className="bg-[#1d357514] text-[#333842] font-InterMedium text-[12px] border-[#e5eaf0] border rounded-full pt-[4px] pl-[4px] pb-[4px] pr-[16px] flex items-center gap-2">
      <span className="text-[#333842] rounded-full bg-white px-3 py-1">
        New
      </span>
      Aptly 1.0 is here
    </div>
  );
}
