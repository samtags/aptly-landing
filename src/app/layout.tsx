import type { Metadata } from "next";
import "./globals.css";
import { Inter, InterBold, Satoshi } from "@/lib/utils/customFont";
import Providers from "./providers";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Aptly - Built to deliver",
  description:
    "Realtime that just works. Built to scale, engineered for reliability, and low latency.",
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
      <body>
        <Providers>{children}</Providers>
        <Toaster position="bottom-center" />
      </body>
    </html>
  );
}
