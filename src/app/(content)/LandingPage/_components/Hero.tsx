export function Hero() {
  return (
    <section className="pt-[144px]">
      {" "}
      <div className="flex justify-center mb-6">
        <HeroBadge />
      </div>
      <div className="max-w-4xl mx-auto">
        <div className="text-center items-center mb-10">
          <h2 className="font-Satoshi font-semibold leading-[36px] text-[28px] md:text-[40px] md:leading-[48px] text-[#8b8f98] mb-4">
            <span className="text-[#0f1115] text-[40px] tracking-[-2px]">
              Pub-Sub That Just Works
            </span>
            <br />

            <span className="text-[#8b8f98] text-[40px] tracking-[-2px]">
              Built to Deliver
            </span>
          </h2>
          <p className="font-InterLight text-[18px] text-[#555a68] mx-auto w-[515px]">
            Power your app with real-time updates at any scale — fully managed,
            zero maintenance, always live.
          </p>
        </div>
        <div className="flex gap-2 justify-center">
          <button className="bg-[#3b5beb] text-white hover:bg-[#284ae2] transition-all duration-300 px-8 py-3 rounded-full text-[14px] font-medium">
            Get Started
          </button>
          <button className="bg-white text-[#333842] hover:bg-[#f9fafb] border border-[#d9dfe8] transition-all duration-300 px-6 py-3 rounded-full text-[14px] font-medium">
            Try Live Demo
          </button>
        </div>
        <div className="text-center text-[#555a68] font-InterLight text-[12px] mt-6">
          Connect once — Scale automatically.
        </div>

        <div className="pt-4 text-center text-[#555a68] font-InterLight text-[12px] mt-6 h-[380px] bg-[#f9fafb] rounded-3xl">
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
