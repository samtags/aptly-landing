import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
    fontFamily: {
      Satoshi: ["var(--font-Satoshi)"],
      Inter: ["var(--font-Inter)"],
      InterBold: ["var(--font-InterBold)"],
    },
  },
  plugins: [],
} satisfies Config;
