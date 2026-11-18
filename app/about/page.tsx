import type { Metadata } from "next";
import Link from "next/link";
import { NotificationBanner } from "@/components/content";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <main className="fd-width fd-main fd-narrow" id="main-content">
      <h1>About Faithful Digital</h1>
      <NotificationBanner title="To be completed before launch">
        <p>The publisher&apos;s name and a way to report errors will be added here before this site launches.</p>
      </NotificationBanner>
      <p className="fd-lead">Faithful Digital is a free blueprint to help UK church leaders with digital strategy, systems and AI.</p>
      <h2>Who it&apos;s for</h2>
      <p>We write mainly for leaders and trustees of small to mid-sized churches, where volunteers do much of the work. We write from a broadly evangelical and charismatic position, and we hope that churches from other traditions find it useful too.</p>
      <h2>How to use it</h2>
      <p>This is a blueprint, not a rulebook. Take what&apos;s useful, adapt it and leave the rest. Your church decides what fits.</p>
      <h2>Our independence</h2>
      <p>We don&apos;t accept sponsorship, affiliate payments or payments from software companies. Any recommendation we make is based on what we believe will help churches.</p>
      <p>We&apos;re not connected to any denomination or network.</p>
      <h2>Using our content</h2>
      <p>You can copy and adapt our content, including for your own church, under the <a href="https://creativecommons.org/licenses/by/4.0/">Creative Commons Attribution 4.0</a> licence. You just need to credit Faithful Digital.</p>
      <p>Read <Link href="/how-we-built-this/">how we built this site</Link>.</p>
    </main>
  );
}
