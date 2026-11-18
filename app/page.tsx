import Link from "next/link";
import { guidanceByPart } from "@/lib/guidance";

export default function HomePage() {
  return (
    <main id="main-content">
      <div className="fd-hero">
        <div className="fd-width">
          <div className="fd-reading">
            <h1>A digital blueprint for UK churches</h1>
            <p className="fd-lead">
              Free, independent guidance to help church leaders set a digital strategy, choose affordable systems and use
              AI well. Take what&apos;s useful and adapt it for your church.
            </p>
            <Link className="fd-button fd-button--start" href="/roadmap/">Start with the roadmap</Link>
          </div>
        </div>
      </div>
      <div className="fd-width fd-main">
        <div className="fd-reading">
          <h2 style={{ marginTop: 0 }}>Why this exists</h2>
          <p>
            Every church is entrusted with people, gifts and resources to care for. Digital tools are now part of that
            trust, but many churches depend on a few willing volunteers and have little money to spare.
          </p>
          <p>
            Faithful Digital offers a blueprint, not a rulebook. It&apos;s written mainly for small to mid-sized churches,
            and you decide what fits your church.
          </p>
        </div>
        <h2>The blueprint</h2>
        <ul className="fd-card-grid">
          {guidanceByPart().map(({ name, summary, pages }) => (
            <li key={name}>
              <h3><Link href={`/guidance/${pages[0]?.slug}/`}>{name}</Link></h3>
              <p>{summary}</p>
              <p className="fd-muted fd-small">{pages.length} {pages.length === 1 ? "page" : "pages"}</p>
            </li>
          ))}
        </ul>
        <div className="fd-reading">
          <p>
            You can also <Link href="/guidance/">see all guidance pages</Link>,{" "}
            <Link href="/compare/">compare affordable tools</Link>,{" "}
            <Link href="/templates/">download templates</Link>, or read the{" "}
            <Link href="/paper/">whole blueprint on one page</Link> to print it or{" "}
            <a href="/faithful-digital-blueprint.pdf">download it as a PDF</a>.
          </p>
          <h2>Tools to help you</h2>
          <ul>
            <li>
              <Link href="/health-check/">Check your church&apos;s digital health</Link>: see where you&apos;re strong and
              what to do first
            </li>
            <li>
              <Link href="/tool-finder/">Find tools for your church</Link>: get suggestions based on your size, budget and
              needs
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
