"use client";

import { useState } from "react";
import { LiaAtSolid } from "react-icons/lia";
import { HiArrowRight } from "react-icons/hi";
import Link from "next/link";
import { RiGithubFill } from "react-icons/ri";
import { FaSquareXTwitter } from "react-icons/fa6";
import { toast } from "sonner";

/**
 * Footer component with waitlist signup functionality.
 *
 * @returns {JSX.Element} The footer component
 */
export default function Footer() {
  const today = new Date();
  const currentYear = today.getFullYear();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Handles waitlist form submission.
   * Sends email to API and displays appropriate toast messages.
   *
   * @param {React.FormEvent<HTMLFormElement>} e - Form submit event
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Basic email validation
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Successfully joined the waitlist!");
        setEmail(""); // Clear input on success
      } else {
        toast.error(
          data.error ||
            "Unable to join the waitlist for the moment. Please try again later."
        );
      }
    } catch (error) {
      console.error("Waitlist submission error:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

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

            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-full flex items-center gap-2 p-4 w-full relative"
            >
              <span>
                <LiaAtSolid className="text-[#8b8f98] text-[14px] w-4 h-4" />
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full outline-none text-[14px] font-Inter text-[#333842] max-w-[80%] disabled:bg-transparent"
                placeholder="Enter your email"
                disabled={isSubmitting}
                required
              />
              <div className="absolute right-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#3b5beb] text-white px-6 py-3 rounded-full text-[14px] font-Inter font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
                >
                  <HiArrowRight className="text-white text-[16px]" />
                </button>
              </div>
            </form>
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
