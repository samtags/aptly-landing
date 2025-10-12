"use client";

import { useState } from "react";

interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

type Category = "General" | "Payments" | "Licensing" | "Support";

const faqData: FaqItem[] = [
  {
    category: "General",
    question: "What is Aptly?",
    answer:
      "Aptly is a modern platform designed to help you build amazing products faster. We provide tools and resources that streamline your development workflow and enhance productivity.",
  },
  {
    category: "General",
    question: "How do I get started?",
    answer:
      "Getting started is easy! Simply sign up for an account, choose your preferred plan, and follow our comprehensive onboarding guide. You'll be up and running in minutes.",
  },
  {
    category: "General",
    question: "What features are included?",
    answer:
      "Our platform includes a comprehensive suite of features including project management tools, collaboration features, analytics dashboard, API access, and premium support. Check out our pricing page for detailed feature comparison.",
  },
  {
    category: "Payments",
    question: "Is there a free trial?",
    answer:
      "Yes! We offer a 14-day free trial with full access to all features. No credit card required. You can cancel anytime during the trial period.",
  },
  {
    category: "Payments",
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and wire transfers for enterprise customers. All transactions are securely processed.",
  },
  {
    category: "Licensing",
    question: "How does licensing work?",
    answer:
      "Our licensing is user-based. Each license covers one user account. You can upgrade or downgrade your plan at any time, and licenses can be transferred between team members.",
  },
  {
    category: "Licensing",
    question: "Can I cancel my subscription anytime?",
    answer:
      "Absolutely! You can cancel your subscription at any time from your account settings. There are no cancellation fees, and you'll continue to have access until the end of your billing period.",
  },
  {
    category: "Support",
    question: "How secure is my data?",
    answer:
      "Security is our top priority. We use industry-standard encryption, regular security audits, and comply with GDPR and SOC 2 standards. Your data is stored in secure, redundant servers with automatic backups.",
  },
  {
    category: "Support",
    question: "What support options are available?",
    answer:
      "We offer 24/7 email support for all plans, live chat for Pro and Enterprise plans, and dedicated account managers for Enterprise customers. Our average response time is under 2 hours.",
  },
];

interface FaqItemProps {
  item: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
}

function FaqItem({ item, isOpen, onToggle }: FaqItemProps) {
  return (
    <div className="font-Inter border-b border-gray-200 last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full py-6 px-6 flex items-center justify-between text-left hover:bg-gray-50 transition-colors duration-200 group"
        aria-expanded={isOpen}
      >
        <span className="font-medium  text-[14px] leading-[20px] text-gray-900 pr-8 group-hover:text-blue-600 transition-colors">
          {item.question}
        </span>
        <div className="flex-shrink-0 ml-4">
          <div
            className={`transform transition-transform duration-300 ${
              isOpen ? "rotate-45" : "rotate-0"
            }`}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-black"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </div>
        </div>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className=" font-normal text-[12px] px-6 pb-6 text-gray-600 leading-relaxed">
          {item.answer}
        </div>
      </div>
    </div>
  );
}

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<Category>("General");

  const categories: Category[] = [
    "General",
    "Payments",
    "Licensing",
    "Support",
  ];

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const filteredFaqs = faqData.filter(
    (item) => item.category === activeCategory
  );

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center items-center mb-16">
          <h2 className="font-Satoshi font-bold leading-[36px] text-[28px] md:text-[40px] md:leading-[48px] text-gray-900 mb-4">
            <span className="text-gray-400">Have questions?</span>
            <br />
            <span>We got answers.</span>
          </h2>
          <p className="font-Inter text-[14px] text-gray-600 max-w-2xl mx-auto md:text-[16px] leading-[24px]">
            We compiled a list of answers to address your <br /> most pressing
            questions.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-gray-100 rounded-full p-1 gap-1">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setActiveCategory(category);
                  setOpenIndex(null);
                }}
                className={`font-Inter px-6 py-2.5 rounded-full text-[14px] font-medium transition-all duration-200 ${
                  activeCategory === category
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Items */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          {filteredFaqs.map((item, index) => (
            <FaqItem
              key={index}
              item={item}
              isOpen={openIndex === index}
              onToggle={() => toggleFaq(index)}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">Still have questions?</p>
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
            Contact Support
          </button>
        </div>
      </div>
    </section>
  );
}
