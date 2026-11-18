import type { Metadata } from "next";
import type { ReactNode } from "react";
import "@fontsource-variable/source-sans-3";
import "@/styles/tokens.css";
import "@/styles/base.css";
import "@/styles/components.css";
import { Footer, Header, PhaseBanner, SkipLink } from "@/components/layout";

export const metadata: Metadata = {
  title: { default: "Faithful Digital: a digital blueprint for UK churches", template: "%s – Faithful Digital" },
  description: "Free, independent guidance to help UK church leaders set a digital strategy, choose affordable systems and use AI well.",
};

export const viewport = { themeColor: "#0b4f4a" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-GB">
      <body>
        <SkipLink />
        <Header />
        <PhaseBanner />
        {children}
        <Footer />
      </body>
    </html>
  );
}
