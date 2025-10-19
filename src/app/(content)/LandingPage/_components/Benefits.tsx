"use client";

import { HiOutlineShieldCheck } from "react-icons/hi";
import { SectionBadge } from "./SectionBadge";
import {
  PiLightningDuotone,
  PiCalendarSlashDuotone,
  PiPuzzlePieceDuotone,
  PiLightbulbDuotone,
  PiAlignBottomDuotone,
  PiPresentationChartDuotone,
} from "react-icons/pi";
import { cn } from "@/lib/utils/cn";

export function Benefits() {
  return (
    <section className="py-12 md:py-16 lg:py-20 px-4 bg-white max-w-5xl mx-auto">
      <div className="flex justify-center mb-6">
        <SectionBadge
          strokeWidth={2}
          Icon={HiOutlineShieldCheck}
          title="Benefits"
        />
      </div>
      <div className="max-w-4xl mx-auto">
        <div className="text-center items-center mb-10 md:mb-14 lg:mb-16">
          <h2 className="font-Satoshi font-semibold text-[#8b8f98] mb-4">
            <span className="text-[#8b8f98] text-[28px] sm:text-[34px] lg:text-[40px] leading-[34px] sm:leading-[40px] lg:leading-[48px] tracking-[-1.5px] lg:tracking-[-2px] block">
              Your current workflow is
            </span>
            <span className="text-[#0f1115] text-[28px] sm:text-[34px] lg:text-[40px] leading-[34px] sm:leading-[40px] lg:leading-[48px] tracking-[-1.5px] lg:tracking-[-2px] block mt-1">
              Slowing you down!
            </span>
          </h2>
          <p className="font-InterLight text-[14px] sm:text-[15px] lg:text-[16px] text-[#555a68] mx-auto px-4 sm:px-0">
            Here is why you need a design system
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2">
        <Benefit
          Icon={PiLightningDuotone}
          title="Build Faster"
          description="SquareUi helps you skip the setup and jump straight into design. All components are ready to use and well-organized."
          borderRight
          borderBottom
        />

        <Benefit
          Icon={PiCalendarSlashDuotone}
          title="Stay Consistent"
          description="Using a design system with unified styles, grids, and variables keeps Everything working together, no guessing or manual tweaks."
          borderBottom
        />

        <Benefit
          Icon={PiPuzzlePieceDuotone}
          title="Stop Rebuilding the Basics"
          description="You don't need to remake buttons, forms, or cards from scratch on every project. SquareUI gives you everything upfront."
          borderRight
          borderBottom
        />

        <Benefit
          Icon={PiLightbulbDuotone}
          showBall
          title="Work Smarter, Not Harder"
          description="A design system saves hours on every project. Spend more time on product thinking, not pushing pixels."
          borderBottom
        />

        <Benefit
          Icon={PiAlignBottomDuotone}
          title="Scale Without the Mess"
          description="As your project grows, so does the design complexity. SquareUI keeps things organized so it doesn't fall apart."
          borderRight
        />

        <Benefit
          showBall
          Icon={PiPresentationChartDuotone}
          title="Get Everyone on the Same Page"
          description="Designers and devs use the same components and rules, That means fewer mistakes, faster delivery, and less back-and-forth."
        />
      </div>
    </section>
  );
}

interface BenefitProps {
  Icon: React.ElementType;
  title: string;
  description: string;
  borderRight?: boolean;
  showBall?: boolean;
  borderBottom?: boolean;
}

function Benefit({
  Icon,
  title,
  description,
  borderRight = false,
  showBall = false,
  borderBottom = false,
}: BenefitProps) {
  return (
    <li
      className={cn(
        "flex flex-col sm:flex-row gap-4 p-6 sm:p-8 lg:p-10 border-dashed border-[#ebf0f5] relative",
        borderRight && "border-0 lg:border-r",
        borderBottom ? "border-b" : "border-b lg:border-0"
      )}
    >
      {showBall && (
        <div className="absolute top-[-12px] left-[-12px] hidden lg:block">
          <Ball />
        </div>
      )}
      <Icon className="text-[#133cf0] text-[22px] sm:text-[24px] mt-0 sm:mt-1 flex-shrink-0" />
      <div className="max-w-[420px] space-y-2">
        <header className="font-Satoshi font-semibold text-[#0f1115] text-[18px] sm:text-[19px] lg:text-[20px]">
          {title}
        </header>
        <p className="font-InterLight text-[#555a68] text-[14px] max-w-full sm:max-w-[320px]">
          {description}
        </p>
      </div>
    </li>
  );
}

function Ball() {
  return (
    <div className="w-[24px] h-[24px] rounded-full bg-white flex items-center justify-center">
      <div className="w-[12px] h-[12px] rounded-full bg-[#f9fafb] border-[#e5eaf0] border" />
    </div>
  );
}
