"use client";

import { SectionBadge } from "./SectionBadge";
import { PiGlobe } from "react-icons/pi";
import { BsCheck2 } from "react-icons/bs";
import { RiArrowRightLine } from "react-icons/ri";
import { cn } from "@/lib/utils/cn";
import { ReactNode } from "react";
import { IconType } from "react-icons";
import { PiBuildingDuotone } from "react-icons/pi";
import { PiSketchLogoDuotone } from "react-icons/pi";
import { PiCodeDuotone } from "react-icons/pi";

export function Pricing() {
  return (
    <section id="pricing" className="py-12 md:py-16 lg:py-20 px-4 bg-white">
      <div data-aos="fade-up">
        <div className="flex justify-center mb-6">
          <SectionBadge strokeWidth={2} Icon={PiGlobe} title="Pricing" />
        </div>
        <div className="max-w-4xl mx-auto">
          <div className="text-center items-center mb-10 md:mb-14 lg:mb-16">
            <h2 className="font-Satoshi font-semibold text-[#8b8f98] mb-4">
              <span className="text-[#8b8f98] text-[28px] sm:text-[34px] lg:text-[40px] leading-[34px] sm:leading-[40px] lg:leading-[48px] tracking-[-1.5px] lg:tracking-[-2px] block">
                Flexible pricing
              </span>
              <span className="text-[#0f1115] text-[28px] sm:text-[34px] lg:text-[40px] leading-[34px] sm:leading-[40px] lg:leading-[48px] tracking-[-1.5px] lg:tracking-[-2px] block mt-1">
                Pay for What You Use
              </span>
            </h2>
            <p className="font-InterLight text-[14px] sm:text-[15px] lg:text-[16px] text-[#555a68] mx-auto px-4 sm:px-0">
              Start free, scale as your app grows
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
        <div data-aos="fade-up" data-aos-delay="250">
          <PriceCard
            plan="Starter"
            description="Perfect for trying out features, testing ideas, prototyping, or building hobby projects."
            price="$0"
            smallPrice={<span className="line-through">$3/month</span>}
            inclusions={[
              "500K messages / month",
              "100 concurrent connections",
              "Shared global infrastructure",
              "Developer dashboard access",
              "Free forever",
            ]}
            bestFor={["Experimentation", "Hobby projects", "Proofs of concept"]}
            Icon={PiCodeDuotone}
          />
        </div>
        <div data-aos="fade-up" data-aos-delay="500">
          <PriceCard
            plan="Flexible"
            description="Pay only for what you use. Ideal for growing apps that need reliable, scalable real-time updates without fixed costs."
            highlight
            badge="Popular"
            price="$2"
            smallPrice="/ per million messages"
            inclusions={[
              "Unlimited message scale",
              "Up to 10K concurrent connections",
              "Global edge delivery",
              "Auto-scaling infrastructure",
              "Pay as you go",
            ]}
            bestFor={[
              "Growing applications",
              "Startup launches",
              "Dynamic workloads",
            ]}
            Icon={PiSketchLogoDuotone}
          />
        </div>
        <div data-aos="fade-up" data-aos-delay="750">
          <PriceCard
            plan="Pro"
            description="For production teams and high-traffic apps that demand performance, advanced controls, and priority support."
            price="$20"
            smallPrice="/ per month"
            inclusions={[
              "Up to 15M messages / month",
              "Up to 100K concurrent connections",
              "Dedicated performance region",
              "Enhanced reliability (99.99% uptime)",
              "Fixed variable cost",
            ]}
            bestFor={[
              "Production deployments",
              "Mission-critical systems",
              "High-scale platforms",
            ]}
            Icon={PiBuildingDuotone}
          />
        </div>
      </div>

      <p className="text-center text-[12px] text-[#555a68] my-8 md:my-12 font-InterLight px-4">
        Pick the plan that fits your growth <br className="hidden sm:block" />{" "}
        start free, scale seamlessly as your traffic increases.
      </p>
    </section>
  );
}

interface PriceCardProps {
  highlight?: boolean;
  badge?: string;
  plan?: string;
  description?: string;
  price?: ReactNode | string;
  smallPrice?: ReactNode | string;
  inclusions?: string[];
  bestFor?: string[];
  Icon?: IconType;
}

function PriceCard({
  highlight,
  badge,
  plan,
  description,
  price,
  smallPrice,
  inclusions = [],
  bestFor = [],
  Icon,
}: PriceCardProps) {
  const IconComponent = Icon || PiGlobe;

  return (
    <div className={cn("border-[#ebf0f5] border rounded-3xl bg-white p-2")}>
      <div
        className={cn(
          "bg-[#f9fafb] rounded-3xl p-6 relative overflow-hidden",
          highlight ? "bg-white" : "bg-[#3b5beb]",
          highlight && "pricing-shadow"
        )}
      >
        {highlight && <div className="pricing-highlight" />}

        <div className="flex items-start justify-between">
          <div className="bg-white rounded-xl p-1 inline-block mb-6 z-10">
            <div className="pricing-card-box-shadow bg-white w-[44px] h-[44px] justify-center items-center flex border-[#e5eaf0] rounded-xl">
              <IconComponent
                strokeWidth={1}
                className="text-[#133cf0] text-[20px]"
              />
            </div>
          </div>

          {badge && (
            <div className="bg-[#3b5beb] font-Inter text-white px-4 py-1 rounded-full text-[12px]">
              {badge}
            </div>
          )}
        </div>

        <div className="font-Satoshi font-semibold text-[#0f1115] text-[20px]">
          {plan}
        </div>
        <div className="font-InterLight text-[#6d7383] text-[14px] w-[85%] my-2">
          {description}
        </div>
        <div className="flex items-end gap-2 mt-8">
          <div className="font-Satoshi font-semibold text-[#0f1115] text-[28px]">
            {price}
          </div>
          <div className="font-InterLight text-[#6d7383] text-[14px] mb-1">
            {smallPrice}
          </div>
        </div>
      </div>

      <ul className="p-6 space-y-2">
        {inclusions.map((inclusion) => (
          <li
            key={inclusion}
            className="flex gap-2 items-center text-[#333842] text-[14px] font-Inter"
          >
            <BsCheck2
              strokeWidth={0.75}
              className="text-[#133cf0] text-[16px]"
            />
            {inclusion}
          </li>
        ))}
      </ul>

      {bestFor?.length > 0 && (
        <ul className="p-6 pt-0 space-y-2">
          {bestFor.map((bestFor) => (
            <li
              key={bestFor}
              className="flex gap-2 items-center text-[#333842] text-[14px] font-Inter"
            >
              {bestFor}
            </li>
          ))}
        </ul>
      )}

      <div className="px-5 pb-4">
        <button
          className={cn(
            "font-Inter text-[14px] border rounded-full px-6 py-3 w-full transition-all duration-300 flex items-center justify-center gap-2",
            highlight
              ? "bg-[#3b5beb] text-white hover:bg-[#284ae2] border-[#3b5beb] hover:border-[#284ae2]"
              : "hover:bg-[#f9fbfb] border-[#d9dfe8]"
          )}
        >
          Choose {plan}
          <RiArrowRightLine className="text-[16px]" />
        </button>
      </div>
    </div>
  );
}
