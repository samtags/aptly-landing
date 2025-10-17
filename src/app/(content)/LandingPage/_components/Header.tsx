"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils/cn";

export default function Header() {
  const headerRef = useRef(null);

  const [isSticky, setIsSticky] = useState(false);
  console.log("🚀 ~ Header ~ isSticky:", isSticky);

  useEffect(() => {
    function handleScroll() {
      setIsSticky(window.scrollY > 120);
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      ref={headerRef}
      className={cn(
        "flex justify-center items-center sticky top-4 z-10 mx-auto p-3",
        isSticky && "nav-blur-bg",
        isSticky ? "max-w-4xl" : "max-w-6xl"
      )}
    >
      <div className="absolute left-6">
        <div className="text-[#adafb3] font-Satoshi font-medium text-2xl">
          Logo
        </div>
      </div>

      <ul className="flex items-center text-[#555a68] text-[14px]">
        <li className="hover:text-[#0f1115] transition-all duration-300 px-3 rounded-full py-2 hover:bg-[#2c4a680f] cursor-pointer">
          Benefits
        </li>
        <li className="hover:text-[#0f1115] transition-all duration-300 px-3 rounded-full py-2 hover:bg-[#2c4a680f] cursor-pointer">
          Foundation
        </li>
        <li className="hover:text-[#0f1115] transition-all duration-300 px-3 rounded-full py-2 hover:bg-[#2c4a680f] cursor-pointer">
          Features
        </li>
        <li className="hover:text-[#0f1115] transition-all duration-300 px-3 rounded-full py-2 hover:bg-[#2c4a680f] cursor-pointer">
          Pricing
        </li>
        <li className="hover:text-[#0f1115] transition-all duration-300 px-3 rounded-full py-2 hover:bg-[#2c4a680f] cursor-pointer">
          FAQs
        </li>
      </ul>
      <div className="absolute right-3">
        <button className="bg-[#3b5beb] text-white hover:bg-[#284ae2] transition-all duration-300 px-8 py-3 rounded-full text-[14px] font-medium">
          Sign-In
        </button>
      </div>
    </nav>
  );
}
