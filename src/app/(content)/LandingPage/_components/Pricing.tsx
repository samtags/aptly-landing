"use client";

import { SectionBadge } from "./SectionBadge";
import { PiGlobe } from "react-icons/pi";
import { BsCheck2 } from "react-icons/bs";
import { BiCopyright, BiUserCircle } from "react-icons/bi";
import { MdUpdate } from "react-icons/md";
import { RiArrowRightLine } from "react-icons/ri";
import { cn } from "@/lib/utils/cn";

export function Pricing() {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="flex justify-center mb-6">
        <SectionBadge strokeWidth={2} Icon={PiGlobe} title="Pricing" />
      </div>
      <div className="max-w-4xl mx-auto">
        <div className="text-center items-center mb-16">
          <h2 className="font-Satoshi font-semibold leading-[36px] text-[28px] md:text-[40px] md:leading-[48px] text-[#8b8f98] mb-4">
            <span className="text-[#8b8f98] text-[40px] tracking-[-2px]">
              Flexible pricing
            </span>
            <br />
            <span className="text-[#0f1115] text-[40px] tracking-[-2px]">
              Built to fit your needs
            </span>
          </h2>
          <p className="font-InterLight text-[#555a68] mx-auto">
            Choose from tailored licenses that fits your business goals and
            timeline.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
        <PriceCard />
        <PriceCard highlight badge="Popular" />
        <PriceCard />
      </div>

      <p className="text-center text-[12px] text-[#555a68] my-12 font-InterLight">
        Please choose an option based on the number of users <br /> you want to
        access the figma file.
      </p>
    </section>
  );
}

interface PriceCardProps {
  highlight?: boolean;
  badge?: string;
}

function PriceCard({ highlight, badge }: PriceCardProps) {
  return (
    <div className={cn("border-[#ebf0f5] border rounded-3xl bg-white p-2")}>
      <div
        className={cn(
          "bg-[#f9fafb] p-2 rounded-3xl p-6 relative overflow-hidden",
          highlight ? "bg-white" : "bg-[#3b5beb]",
          highlight && "pricing-shadow"
        )}
      >
        {highlight && <div className="pricing-highlight" />}

        <div className="flex items-start justify-between">
          <div className="bg-white rounded-xl p-1 inline-block mb-6 z-10">
            <div className="pricing-card-box-shadow bg-white w-[44px] h-[44px] justify-center items-center flex border-[#e5eaf0] rounded-xl">
              <PiGlobe strokeWidth={1} className="text-[#133cf0] text-[20px]" />
            </div>
          </div>

          {badge && (
            <div className="bg-[#3b5beb] font-Inter text-white px-4 py-1 rounded-full text-[12px]">
              {badge}
            </div>
          )}
        </div>

        <div className="font-Satoshi font-semibold text-[#0f1115] text-[20px]">
          Standard
        </div>
        <div className="font-InterLight text-[#6d7383] text-[14px] w-[85%] my-2">
          A single license, perfect for designers, freelancers and students.
        </div>
        <div className="flex items-end gap-2 mt-8">
          <div className="font-Satoshi font-semibold text-[#0f1115] text-[28px]">
            $119
          </div>
          <div className="font-InterLight text-[#6d7383] text-[14px] mb-1">
            One time
          </div>
        </div>
      </div>

      <ul className="p-6 space-y-2">
        <li className="flex gap-2 items-center text-[#333842] text-[14px] font-Inter">
          <BsCheck2 strokeWidth={0.75} className="text-[#133cf0] text-[16px]" />
          Figma Variable
        </li>
        <li className="flex gap-2 items-center text-[#333842] text-[14px] font-Inter">
          <BsCheck2 strokeWidth={0.75} className="text-[#133cf0] text-[16px]" />
          10,000+ components & variants
        </li>
        <li className="flex gap-2 items-center text-[#333842] text-[14px] font-Inter">
          <BsCheck2 strokeWidth={0.75} className="text-[#133cf0] text-[16px]" />
          4000+ icons & assets
        </li>
        <li className="flex gap-2 items-center text-[#333842] text-[14px] font-Inter">
          <BsCheck2 strokeWidth={0.75} className="text-[#133cf0] text-[16px]" />
          300+ sections & page examples
        </li>
        <li className="flex gap-2 items-center text-[#333842] text-[14px] font-Inter">
          <BsCheck2 strokeWidth={0.75} className="text-[#133cf0] text-[16px]" />
          Variable modes
        </li>
        <li className="flex gap-2 items-center text-[#333842] text-[14px] font-Inter border-b border-[#d9dfe8] border-dashed pb-6">
          <BsCheck2 strokeWidth={0.75} className="text-[#133cf0] text-[16px]" />
          Auto layout 5.0
        </li>
      </ul>

      <ul className="p-6 pt-0 space-y-2">
        <li className="flex gap-2 items-center text-[#333842] text-[14px] font-Inter">
          <BiUserCircle className="text-[#8b8f98] text-[16px]" />
          Single user license
        </li>
        <li className="flex gap-2 items-center text-[#333842] text-[14px] font-Inter">
          <BiCopyright className="text-[#8b8f98] text-[16px]" />
          Commercial license
        </li>
        <li className="flex gap-2 items-center text-[#333842] text-[14px] font-Inter">
          <MdUpdate className="text-[#8b8f98] text-[16px]" />
          Free lifetime updates
        </li>
      </ul>

      <div className="px-5 pb-4">
        <button
          className={cn(
            "font-Inter text-[14px] border rounded-full px-6 py-3 w-full transition-all duration-300 flex items-center justify-center gap-2",
            highlight
              ? "bg-[#3b5beb] text-white hover:bg-[#284ae2] border-[#3b5beb] hover:border-[#284ae2]"
              : "hover:bg-[#f9fbfb] border-[#d9dfe8]"
          )}
        >
          Choose Standard
          <RiArrowRightLine className="text-[16px]" />
        </button>
      </div>
    </div>
  );
}
