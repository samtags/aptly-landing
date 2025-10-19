import { LiaAtSolid } from "react-icons/lia";
import { HiArrowRight } from "react-icons/hi";

export default function Footer() {
  return (
    <footer className="rounded-[32px] sm:rounded-[42px] lg:rounded-[52px] bg-[#f9fafb] m-4 sm:m-6 pt-8 sm:pt-10 lg:pt-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-8 gap-8 lg:gap-4">
          <div className="sm:col-span-2 lg:col-span-4 max-w-[320px]">
            <div className="text-[#adafb3] font-Satoshi font-medium text-xl sm:text-2xl mb-4">
              Logo area
            </div>
            <p className="text-[#555a68] font-Inter text-[14px]">
              The most Powerful Figma Ui Kit & Design System for designers.
            </p>
          </div>

          <ul className="space-y-3">
            <li className="font-medium text-[#0f1115] text-[14px] mb-5">
              Company
            </li>
            <li className="text-[#555a68] text-[14px] hover:text-[#0f1115] cursor-pointer transition-colors">Pricing</li>
            <li className="text-[#555a68] text-[14px] hover:text-[#0f1115] cursor-pointer transition-colors">Contact us</li>
            <li className="text-[#555a68] text-[14px] hover:text-[#0f1115] cursor-pointer transition-colors">Become an Affiliate</li>
            <li className="text-[#555a68] text-[14px] hover:text-[#0f1115] cursor-pointer transition-colors">Projects</li>
          </ul>

          <ul className="space-y-2">
            <li className="font-medium text-[#0f1115] text-[14px] mb-5">
              Socials
            </li>
            <li className="text-[#555a68] text-[14px] hover:text-[#0f1115] cursor-pointer transition-colors">Behance</li>
            <li className="text-[#555a68] text-[14px] hover:text-[#0f1115] cursor-pointer transition-colors">Dribble</li>
            <li className="text-[#555a68] text-[14px] hover:text-[#0f1115] cursor-pointer transition-colors">Twitter/X</li>
          </ul>

          <div className="w-full space-y-2 sm:col-span-2 lg:col-span-2">
            <div className="font-medium text-[#0f1115] text-[14px]">
              Newsletter
            </div>
            <div className="max-w-[260px] text-[#555a68] text-[14px] mb-8 pt-0 pb-4">
              Receive product updates news, exclusive discounts and early
              access.
            </div>

            <div className="bg-white rounded-full flex items-center gap-2 p-3 sm:p-4 w-full max-w-full sm:max-w-[320px] relative">
              <span>
                <LiaAtSolid className="text-[#8b8f98] text-[14px] w-4 h-4 flex-shrink-0" />
              </span>
              <input
                className="w-full outline-none text-[13px] sm:text-[14px] font-Inter text-[#333842] pr-12 sm:pr-14"
                placeholder="Enter your email"
              />
              <div className="absolute right-2">
                <button className="bg-[#3b5beb] hover:bg-[#284ae2] text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-full text-[14px] font-Inter font-medium transition-colors">
                  <HiArrowRight className="text-white text-[16px]" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 py-6 sm:py-8 text-[#333842] border-t border-[#e5eaf0] mt-8">
          <ul className="flex flex-wrap gap-2 text-[12px]">
            <li>© 2025 Envision</li>
            <li className="hidden sm:inline">•</li>
            <li>All rights reserved</li>
            <li className="hidden sm:inline">•</li>
            <li>Made by Rabii Mhamdi</li>
          </ul>

          <div className="flex">
            <ul className="flex flex-wrap gap-2 text-[12px]">
              <li>Built in Framer</li>
              <li className="text-[#adafb3] hidden sm:inline">Icons (1)</li>
              <li className="text-[#adafb3] hidden sm:inline">Icon (2)</li>
              <li className="text-[#adafb3] hidden sm:inline">Icon (3)</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
