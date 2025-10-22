import { LiaAtSolid } from "react-icons/lia";
import { HiArrowRight } from "react-icons/hi";
import Link from "next/link";
import { RiGithubFill } from "react-icons/ri";
import { FaSquareXTwitter } from "react-icons/fa6";

export default function Footer() {
  const today = new Date();
  const currentYear = today.getFullYear();

  return (
    <footer className="rounded-[52px] bg-[#f9fafb] m-6 lg:pt-12 p-6">
      <div className="max-w-6xl mx-auto ">
        <div className="flex flex-col lg:grid grid-cols-1 md:grid-cols-4 gap-[40px]">
          <div className="col-span-4 max-w-[320px]">
            <div className="mb-4">
              <div className="text-black font-Satoshi font-bold text-xl">
                Aptly
              </div>
            </div>
            <p className="text-[#555a68] font-Inter text-[14px]">
              Power your app with real-time updates at any scale — fully
              managed, zero maintenance, always live.
            </p>
          </div>

          <ul className="space-y-3">
            <li className="font-medium text-[#0f1115] text-[14px] mb-5">
              Company
            </li>
            <li className="text-[#555a68] text-[14px]">
              <Link href="/#features">Features</Link>
            </li>
            <li className="text-[#555a68] text-[14px]">
              <Link href="/#pricing">Pricing</Link>
            </li>
            <li className="text-[#555a68] text-[14px]">
              {" "}
              <Link href="/#faqs">FAQs</Link>
            </li>

            <li className="text-[#555a68] text-[14px]">
              <Link target="_blank" href="https://docs.aptly.cloud">
                Resources
              </Link>
            </li>
          </ul>
          <ul className="space-y-2">
            <li className="font-medium text-[#0f1115] text-[14px] mb-5">
              Socials
            </li>
            <li className="text-[#555a68] text-[14px]">Github</li>
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
        <div className="flex justify-between lg:items-center items-end pt-8 lg:py-8 text-[#333842]">
          <ul className="flex flex-col lg:flex-row gap-2 text-[12px]">
            <li>© {currentYear} Aptly</li>
            <li className="hidden lg:block">•</li>
            <li>All rights reserved</li>
            <li className="hidden lg:block">•</li>
            <li>Design by Rabii Mhamdi</li>
            <li className="hidden lg:block">•</li>
            <li>Built using Next</li>
          </ul>

          <div className="flex">
            <ul className="flex gap-2 text-[12px] items-center">
              <li className="text-[#adafb3] text-xl">
                <RiGithubFill />
              </li>
              <li className="text-[#adafb3] text-xl">
                <FaSquareXTwitter />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
