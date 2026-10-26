import type { Metadata, Viewport } from "next";
import { Inter, Syne } from "next/font/google";
import type { ReactNode } from "react";
import { InquiryProvider } from "@/components/InquiryForm";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Rising Star Manpower | Drivers, Security & Facility Staff",
  description:
    "Premier manpower desk for corporate drivers, armed and unarmed security, and facility crews. Police-verified personnel, ESI/PF compliant engagements, and a 24/7 replacement guarantee. Principal: Mr. Bhoumik.",
};

export const viewport: Viewport = {
  themeColor: "#0B0F17",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-ink font-sans text-paper">
        <InquiryProvider>{children}</InquiryProvider>
      </body>
    </html>
  );
}
