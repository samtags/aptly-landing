import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
