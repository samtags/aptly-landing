import type { Metadata } from "next";
import "./globals.css";
import { Inter, InterBold, Satoshi } from "@/lib/utils/customFont";

export const metadata: Metadata = {
  title: "Aptly Landing",
  description: "Welcome to Aptly",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${Satoshi.variable} ${Inter.variable} ${InterBold.variable}`}
    >
      <body className="">{children}</body>
    </html>
  );
}
