import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <main className="fd-width fd-main fd-narrow" id="main-content">
      <h1>Page not found</h1>
      <p>If you typed the web address, check it&apos;s correct. If you followed a link, the page may have moved.</p>
      <p><Link href="/guidance/">Go to the guidance</Link></p>
    </main>
  );
}
