import { LiaAtSolid } from "react-icons/lia";
import { HiArrowRight } from "react-icons/hi";

export default function Footer() {
  const today = new Date();
  const currentYear = today.getFullYear();

  return (
    <footer className="rounded-[52px] bg-[#f9fafb] m-6 pt-12">
      <div className="max-w-6xl mx-auto ">
        <div className="footer-grid">
          <div className="col-span-4 max-w-[320px]">
            <div className="mb-4">
              <div className="text-black font-Satoshi font-bold text-xl font-Satoshi">
                Aptly
              </div>
            </div>
            <p className="text-[#555a68] font-Inter text-[14px]">
              The most Powerful Figma Ui Kit & Design System for designers.
            </p>
          </div>

          <ul className="space-y-3">
            <li className="font-medium text-[#0f1115] text-[14px] mb-5">
              Company
            </li>
            <li className="text-[#555a68] text-[14px]">Pricing</li>
            <li className="text-[#555a68] text-[14px]">Contact us</li>
            <li className="text-[#555a68] text-[14px]">Become an Affiliate</li>
            <li className="text-[#555a68] text-[14px]">Projects</li>
          </ul>
          <ul className="space-y-2">
            <li className="font-medium text-[#0f1115] text-[14px] mb-5">
              Socials
            </li>
            <li className="text-[#555a68] text-[14px]">Behance</li>
            <li className="text-[#555a68] text-[14px]">Dribble</li>
            <li className="text-[#555a68] text-[14px]">Twitter/X</li>
          </ul>

          <div className="w-full space-y-2 col-span-2">
            <div className="font-medium text-[#0f1115] text-[14px]">
              Newsletter
            </div>
            <div className="max-w-[260px] text-[#555a68] text-[14px] mb-8 pt-0 pb-4">
              Receive product updates news, exclusive discounts and early
              access.
            </div>

            <div className="bg-white rounded-full flex items-center gap-2 p-4 w-full relative">
              <span>
                <LiaAtSolid className="text-[#8b8f98] text-[14px] w-4 h-4" />
              </span>
              <input
                className="w-full outline-none text-[14px] font-Inter text-[#333842] max-w-[80%]"
                placeholder="Enter your email"
              />
              <div className="absolute right-2">
                <button className="bg-[#3b5beb] text-white px-6 py-3 rounded-full text-[14px] font-Inter font-medium  ">
                  <HiArrowRight className="text-white text-[16px]" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center py-8 text-[#333842]">
          <ul className="flex gap-2 text-[12px]">
            <li>© {currentYear} Aptly</li>
            <li>All rights reserved</li>
            <li>Design by Rabii Mhamdi</li>
          </ul>

          <div className="flex">
            <ul className="flex gap-2 text-[12px]">
              <li>
                Built using <strong>Next</strong>
              </li>
              <li className="text-[#adafb3]">Icons (1)</li>
              <li className="text-[#adafb3]">Icon (2)</li>
              <li className="text-[#adafb3]">Icon (3)</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
