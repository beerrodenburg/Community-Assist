import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/lib/LenisProvider";
import { Background } from "@/components/background/Background";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz", "SOFT"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Community Assist — Bali",
  description:
    "Community Assist is a Bali-based initiative funding scholarships, youth outreach, and community gatherings through Ragam Foundation and Green School Foundation. Founded by PNNY & Indosole.",
  metadataBase: new URL("https://communityassist.id"),
  openGraph: {
    title: "Community Assist — Bali",
    description:
      "Scholarships, youth outreach, and community gatherings in Bali. Scroll the story; donate or partner.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${manrope.variable} antialiased`}
    >
      <body className="min-h-screen">
        <Background />
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
