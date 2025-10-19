"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils/cn";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import Link from "next/link";

export default function Header() {
  const headerRef = useRef(null);

  const [isReady, setIsReady] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsSticky(window.scrollY > 120);

    function handleScroll() {
      setIsSticky(window.scrollY > 120);
    }

    window.addEventListener("scroll", handleScroll);

    setIsReady(true);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        ref={headerRef}
        className={cn(
          "flex justify-between md:justify-center items-center sticky top-4 z-10 mx-auto p-3 px-4 md:px-3",
          isSticky && "nav-blur-bg",
          isSticky ? "max-w-4xl" : "max-w-6xl",
          isReady ? "opacity-100" : "opacity-0"
        )}
      >
        <div className="md:absolute md:left-6">
          <div className="text-black font-Satoshi font-black text-xl">
            Aptly
          </div>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex items-center text-[#555a68] text-[14px]">
          <li className="hover:text-[#0f1115] transition-all duration-300 px-3 rounded-full py-2 hover:bg-[#2c4a680f] cursor-pointer">
            <Link href="#features">Features</Link>
          </li>
          <li className="hover:text-[#0f1115] transition-all duration-300 px-3 rounded-full py-2 hover:bg-[#2c4a680f] cursor-pointer">
            <Link href="#pricing">Pricing</Link>
          </li>
          <li className="hover:text-[#0f1115] transition-all duration-300 px-3 rounded-full py-2 hover:bg-[#2c4a680f] cursor-pointer">
            <Link href="#faqs">FAQs</Link>
          </li>
          <li className="hover:text-[#0f1115] transition-all duration-300 px-3 rounded-full py-2 hover:bg-[#2c4a680f] cursor-pointer">
            <Link target="_blank" href="https://docs.aptly.cloud">
              Resources
            </Link>
          </li>
        </ul>

        {/* Desktop CTA */}
        <div className="hidden md:block md:absolute md:right-3">
          <Link target="_blank" href="https://console.aptly.cloud/sign-in">
            <button className="bg-[#3b5beb] text-white hover:bg-[#284ae2] transition-all duration-300 px-6 md:px-8 py-2.5 md:py-3 rounded-full text-[13px] md:text-[14px] font-medium">
              Sign-In
            </button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden text-[#555a68] text-2xl"
        >
          {isMobileMenuOpen ? <HiX /> : <HiMenuAlt3 />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed top-[80px] left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-b border-[#e5eaf0] shadow-lg mx-4 rounded-2xl">
          <ul className="flex flex-col text-[#555a68] text-[14px] p-4">
            <li className="hover:text-[#0f1115] transition-all duration-300 px-4 py-3 rounded-xl hover:bg-[#2c4a680f] cursor-pointer">
              <Link href="#features">Features</Link>
            </li>
            <li className="hover:text-[#0f1115] transition-all duration-300 px-4 py-3 rounded-xl hover:bg-[#2c4a680f] cursor-pointer">
              <Link href="#pricing">Pricing</Link>
            </li>
            <li className="hover:text-[#0f1115] transition-all duration-300 px-4 py-3 rounded-xl hover:bg-[#2c4a680f] cursor-pointer">
              <Link href="#faqs">FAQs</Link>
            </li>
            <li className="hover:text-[#0f1115] transition-all duration-300 px-4 py-3 rounded-xl hover:bg-[#2c4a680f] cursor-pointer">
              <Link target="_blank" href="https://docs.aptly.cloud">
                Resources
              </Link>
            </li>

            <li className="mt-2 px-4">
              <Link target="_blank" href="https://console.aptly.cloud/sign-in">
                <button className="w-full bg-[#3b5beb] text-white hover:bg-[#284ae2] transition-all duration-300 px-6 py-3 rounded-full text-[14px] font-medium">
                  Sign-In
                </button>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
