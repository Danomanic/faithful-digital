import Link from "next/link";
import { Tag } from "./content";

const primaryNav = [
  { href: "/guidance/", label: "Guidance" },
  { href: "/roadmap/", label: "Roadmap" },
  { href: "/compare/", label: "Compare tools" },
  { href: "/templates/", label: "Templates" },
  { href: "/health-check/", label: "Health check" },
  { href: "/about/", label: "About" },
];

export function SkipLink() {
  return (
    <a className="fd-skip-link" href="#main-content">
      Skip to main content
    </a>
  );
}

export function Header() {
  return (
    <header className="fd-header">
      <div className="fd-width fd-header__inner">
        <Link className="fd-header__brand" href="/">
          Faithful Digital
        </Link>
        <nav className="fd-header__nav" aria-label="Main">
          <ul>
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export function PhaseBanner() {
  return (
    <div className="fd-phase" role="region" aria-label="Site status">
      <p className="fd-width" style={{ marginBlock: 0 }}>
        <Tag>Draft</Tag>
        This site is being developed. Its content is still under review, so don&apos;t rely on it yet.
      </p>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="fd-footer">
      <div className="fd-width">
        <h2 className="fd-visually-hidden">Support links</h2>
        <ul>
          <li><Link href="/about/">About</Link></li>
          <li><Link href="/how-we-built-this/">How we built this</Link></li>
          <li><Link href="/accessibility/">Accessibility</Link></li>
          <li><Link href="/privacy/">Privacy</Link></li>
        </ul>
        <p>
          Faithful Digital is independent. It doesn&apos;t accept sponsorship or affiliate payments.
        </p>
        <p style={{ marginBottom: 0 }}>
          Content is available under{" "}
          <a href="https://creativecommons.org/licenses/by/4.0/" rel="license">
            Creative Commons Attribution 4.0
          </a>
          . Code is available under the MIT License.
        </p>
      </div>
    </footer>
  );
}
