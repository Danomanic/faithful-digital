import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy" };

export default function PrivacyPage() {
  return (
    <main className="fd-width fd-main fd-narrow" id="main-content">
      <h1>Privacy</h1>
      <p className="fd-lead">This draft sets out how we intend to handle your information. We&apos;ll finalise it before launch, once hosting is confirmed.</p>
      <ul>
        <li>we don&apos;t use advertising or third-party trackers</li>
        <li>we don&apos;t set cookies</li>
        <li>we host our own fonts, so no font company receives your details</li>
        <li>answers you give in our interactive tools stay in your browser, and we don&apos;t receive or store them</li>
      </ul>
      <p>Our hosting provider may keep basic server logs to keep the site secure. We&apos;ll explain the details here once a provider has been chosen.</p>
    </main>
  );
}
