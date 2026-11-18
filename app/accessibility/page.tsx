import type { Metadata } from "next";

export const metadata: Metadata = { title: "Accessibility" };

export default function AccessibilityPage() {
  return (
    <main className="fd-width fd-main fd-narrow" id="main-content">
      <h1>Accessibility</h1>
      <p className="fd-lead">We want as many people as possible to be able to use this website.</p>
      <p>We aim to meet level AA of the Web Content Accessibility Guidelines (WCAG) 2.2. You should be able to:</p>
      <ul>
        <li>navigate using just a keyboard</li>
        <li>use a screen reader</li>
        <li>zoom in up to 400% without text spilling off the screen</li>
        <li>change colours and fonts using your browser or device settings</li>
      </ul>
      <h2>How we&apos;ve tested this site</h2>
      <p>This site is still being developed. We test each page with automated accessibility tools, but these can only find some kinds of problem.</p>
      <p>We haven&apos;t yet completed manual testing with screen readers or testing with disabled users, so we can&apos;t yet say that the site fully meets the standard. We&apos;ll update this statement when we have.</p>
      <h2>Reporting a problem</h2>
      <p>We&apos;ll add a way to contact us about accessibility before this site launches.</p>
    </main>
  );
}
