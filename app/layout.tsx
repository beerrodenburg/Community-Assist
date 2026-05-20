import type { Metadata } from "next";
import "./globals.css";
import { LenisProvider } from "@/lib/LenisProvider";
import { Background } from "@/components/background/Background";

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
    <html lang="en" className="antialiased">
      <body className="min-h-screen">
        <Background />
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
