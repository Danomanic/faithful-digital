import type { Metadata } from "next";

export const metadata: Metadata = { title: "How we built this" };

export default function HowWeBuiltThisPage() {
  return (
    <main className="fd-width fd-main fd-narrow" id="main-content">
      <h1>How we built this</h1>
      <p className="fd-lead">We want this site to be easy for anyone in a church to use, so we follow clear standards for accessible, plain and reliable design.</p>
      <h2>Our standards</h2>
      <ul>
        <li>accessibility: we aim to meet WCAG 2.2 level AA</li>
        <li>plain English: we write clearly for people who are short of time</li>
        <li>resilience: all guidance can be read without JavaScript</li>
        <li>privacy: we don&apos;t use advertising or third-party trackers</li>
        <li>light pages: we keep images and scripts to a minimum</li>
        <li>openness: we show our sources and openly license our work</li>
      </ul>
    </main>
  );
}
