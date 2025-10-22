"use client";

import { ReactNode, useState } from "react";
import { BiPlus, BiMinus } from "react-icons/bi";
import { GrSend } from "react-icons/gr";
import { LiaQuestionCircleSolid } from "react-icons/lia";
import { SectionBadge } from "./SectionBadge";
import Link from "next/link";

export function Faq() {
  const [_, setOpenIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<Category>("General");

  return (
    <section id="faqs" className="py-12 md:py-16 lg:py-20 px-4 bg-white">
      <div data-aos="fade-up">
        <div className="flex justify-center mb-6">
          <SectionBadge Icon={LiaQuestionCircleSolid} title="FAQs" />
        </div>
      </div>
      <div className="max-w-4xl mx-auto">
        <div
          data-aos="fade-up"
          data-aos-delay="250"
          className="text-center items-center mb-10 md:mb-14 lg:mb-16"
        >
          <h2 className="font-Satoshi font-semibold text-[#8b8f98] mb-4">
            <span className="text-[#8b8f98] text-[28px] sm:text-[34px] lg:text-[40px] leading-[34px] sm:leading-[40px] lg:leading-[48px] tracking-[-1.5px] lg:tracking-[-2px] block">
              Have questions?
            </span>
            <span className="text-[#0f1115] text-[28px] sm:text-[34px] lg:text-[40px] leading-[34px] sm:leading-[40px] lg:leading-[48px] tracking-[-1.5px] lg:tracking-[-2px] block mt-1">
              We got answers.
            </span>
          </h2>
          <p className="font-InterLight text-[14px] sm:text-[15px] lg:text-[16px] text-[#555a68] mx-auto px-4 sm:px-0">
            We compiled a list of answers to address your{" "}
            <br className="hidden sm:block" /> most pressing questions.
          </p>
        </div>

        {/* <div className="flex justify-center mb-8 overflow-x-auto">
          <div className="inline-flex bg-gray-100 rounded-full p-1 gap-1 min-w-fit">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setActiveCategory(category);
                  setOpenIndex(null);
                }}
                className={`px-4 sm:px-6 py-2.5 rounded-full text-[13px] sm:text-[14px] transition-all duration-500 whitespace-nowrap ${
                  activeCategory === category
                    ? "font-InterMedium text-[#0f1115] bg-white shadow-md"
                    : "text-gray-500 hover:text-[#0f1115]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div> */}

        <div className="w-full max-w-[700px] mx-auto space-y-4">
          <QuestionCard
            question="Do you offer a free trial?"
            answer="Our Starter plan is free forever. The Flexible plan is Pay as you go. You will only be charge on the usage of your app."
          />

          <QuestionCard
            question="What if I exceed my quota / limit?"
            answer="In Started, we will throttle or limit further publishes. In Flexible, you'll be charged on your usage. We also offer alerting so you'll be notified before you hit your set budget."
          />

          <QuestionCard
            question="What SDKs or languages are supported?"
            answer="We provide official SDKs for JavaScript / TypeScript, Python, Java, Go, and mobile (iOS/Android). You can also use raw WebSocket if you prefer."
          />

          <QuestionCard
            question="How is billing handled?"
            answer="You'll be billed monthly based on usage (message sent, bandwidth). We accept major credit cards, invoicing, or enterprise payment methods depending on your plan."
          />
        </div>

        <div className="w-full max-w-[700px] mx-auto mt-8 md:mt-12">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-center bg-[#f9fafb] rounded-2xl p-6 md:p-8">
            <div className="text-left w-full sm:w-auto">
              <header className="font-Satoshi text-[#0f1115] text-[18px] sm:text-[20px] font-semibold">
                Can{"'"}t find your answer?
              </header>
              <p className="text-[#555a68] text-[14px] font-InterLight">
                Get in touch with us we are happy to assist you!
              </p>
            </div>
            <Link target="_blank" href="https://aptly.featurebase.app/">
              <button className="flex items-center justify-center gap-2 bg-[#3b5beb] hover:bg-[#284ae2] text-[#ffffff] px-6 py-3 rounded-full transition-colors font-Inter text-[14px] w-full sm:w-auto whitespace-nowrap">
                <GrSend />
                Ask a Question
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

interface QuestionCardProps {
  question: ReactNode | string;
  answer: ReactNode | string;
}

function QuestionCard({ question, answer }: QuestionCardProps) {
  const [isOpen, setIsOpen] = useState(true);

  const Icon = isOpen ? BiMinus : BiPlus;

  return (
    <div className="border-[#ebf0f5] border rounded-2xl text-[14px] bg-[#f9fafb]">
      <button className="w-full rounded-2xl" onClick={() => setIsOpen(!isOpen)}>
        <header
          className={`font-InterMedium text-[#0f1115] px-6 py-4 bg-[#ffffff] rounded-2xl border-[#ebf0f5] flex items-center justify-between ${
            isOpen ? "faq-active-box-shadow" : ""
          }`}
        >
          {question}
          <div className="bg-[#f0f2f5] w-[20px] h-[20px] rounded-full flex items-center justify-center ml-4">
            <Icon strokeWidth={1} />
          </div>
        </header>
      </button>
      {isOpen && (
        <div className="p-4 px-6 font-InterLight text-[#555a68]">{answer}</div>
      )}
    </div>
  );
}

type Category = "General" | "Payments" | "Licensing" | "Support";

const categories: Category[] = ["General", "Payments", "Licensing", "Support"];
