"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils/cn";
import Link from "next/link";
import { RiCloseFill } from "react-icons/ri";
import { RiMenuLine } from "react-icons/ri";
export default function Header() {
  const headerRef = useRef(null);

  const [isReady, setIsReady] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  function handleClickHome() {
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  useEffect(() => {
    setIsSticky(window.scrollY > 120);

    function handleScroll() {
      setIsSticky(window.scrollY > 120);
    }

    window.addEventListener("scroll", handleScroll);

    setIsReady(true);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isMobileMenuOpen) {
    return (
      <div>
        <div className="z-50 fixed top-0 p-4 w-full">
          <div className="pl-4 md:pl-6 pr-2 pt-2 pb-4 nav-blur-bg-mobile">
            <div className="flex justify-between items-center">
              <div className="text-black font-Satoshi font-bold text-xl select-none cursor-pointer">
                <Link onClick={handleClickHome} href="/#">
                  Aptly
                </Link>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-[#555a68] bg-white rounded-full text-xl p-2"
              >
                <RiCloseFill strokeWidth={0.75} />
              </button>
            </div>

            <ul className="flex flex-col text-[#555a68] text-[14px] mt-4">
              <li className="py-3 cursor-pointer">
                <Link
                  onClick={() => setIsMobileMenuOpen(false)}
                  href="#features"
                >
                  Features
                </Link>
              </li>
              <li className="py-3 cursor-pointer">
                <Link
                  onClick={() => setIsMobileMenuOpen(false)}
                  href="#pricing"
                >
                  Pricing
                </Link>
              </li>
              <li className="py-3 cursor-pointer">
                <Link onClick={() => setIsMobileMenuOpen(false)} href="#faqs">
                  FAQs
                </Link>
              </li>
              <li className="py-3 cursor-pointer">
                <Link
                  onClick={() => setIsMobileMenuOpen(false)}
                  target="_blank"
                  href="https://docs.aptly.cloud"
                >
                  Resources
                </Link>
              </li>
            </ul>
            <Link
              className="ml-[-6px] mr-2 mt-2 block"
              href="https://console.aptly.cloud/sign-in"
              target="_blank"
            >
              <button className="w-full bg-[#3b5beb] text-white hover:bg-[#284ae2] transition-all duration-300 px-6 py-3 rounded-full text-[14px] font-medium">
                Sign-In
              </button>
            </Link>
          </div>
        </div>

        <div className="nav-container-blur" />
      </div>
    );
  }

  return (
    <>
      <nav
        ref={headerRef}
        className={cn(
          "flex justify-between md:justify-center items-center sticky top-4 z-10 mx-4 lg:mx-auto p-3 px-4 md:px-3 md:py-6 lg:py-3",
          !isMobileMenuOpen && isSticky && "nav-blur-bg",
          isSticky ? "lg:max-w-4xl" : "lg:max-w-6xl",
          isReady ? "opacity-100" : "opacity-0"
          // isMobileMenuOpen && "bg-white"
        )}
      >
        <div className="md:absolute md:left-6">
          <div className="text-black font-Satoshi font-bold text-xl select-none cursor-pointer">
            <Link onClick={handleClickHome} href="/#">
              Aptly
            </Link>
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
        <div className="hidden lg:block lg:absolute lg:right-3">
          <Link target="_blank" href="https://console.aptly.cloud/sign-in">
            <button className="bg-[#3b5beb] text-white hover:bg-[#284ae2] transition-all duration-300 px-6 md:px-8 py-2.5 md:py-3 rounded-full text-[13px] md:text-[14px] font-medium">
              Sign-In
            </button>
          </Link>
        </div>

        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden text-[#555a68] bg-white rounded-full text-xl p-2 right-2 absolute"
        >
          <RiMenuLine strokeWidth={0.75} />
        </button>
      </nav>
    </>
  );
}
