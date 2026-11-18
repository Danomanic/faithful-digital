import type { Metadata } from "next";
import type { ComponentType, ReactNode } from "react";
import type { MDXComponents } from "mdx/types";
import { Steps } from "@/components/content";
import { roadmapSteps } from "@/components/roadmap";
import { guidanceByPart, type GuidancePage } from "@/lib/guidance";
import { slugify } from "@/mdx-components";
import manifest from "@/package.json";

export const metadata: Metadata = {
  title: "Printable blueprint",
  description: "The whole Faithful Digital blueprint on one page, for printing or saving as a PDF.",
};

const published = new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

/** Print versions of interactive components, so every word appears on paper. */
const printComponents: MDXComponents = {
  h2: ({ children }) => <h3>{children}</h3>,
  h3: ({ children }) => <h4>{children}</h4>,
  // Links to other guidance pages point to that section of this document.
  a: ({ href = "", children, ...props }) => {
    const match = /^\/guidance\/([a-z0-9-]+)\//.exec(href);
    const target = match ? `#${match[1]}` : href === "/roadmap/" ? "#roadmap" : href;
    return <a href={target} {...props}>{children}</a>;
  },
  Details: ({ summary, children }: { summary: string; children: ReactNode }) => (
    <div className="fd-paper__details">
      <p><strong>{summary}</strong></p>
      {children}
    </div>
  ),
  Tabs: ({ label, items }: { label: string; items: { title: string; body: ReactNode }[] }) => (
    <div className="fd-paper__tabs" aria-label={label} role="group">
      {items.map((item) => (
        <section key={item.title}>
          <h4>{item.title}</h4>
          {item.body}
        </section>
      ))}
    </div>
  ),
};

async function loadContent(slug: string): Promise<ComponentType<{ components?: MDXComponents }>> {
  return (await import(`@/content/guidance/${slug}.mdx`)).default;
}

function PageMeta({ page }: { page: GuidancePage }) {
  return (
    <div className="fd-meta">
      {page.professionalAdviceNote && (
        <p>
          This section gives general information. It isn&apos;t legal or professional advice. Get advice from a qualified
          adviser, or your denomination or network, if you&apos;re unsure about your situation.
        </p>
      )}
      <p><strong>Last reviewed:</strong> {page.lastReviewed}</p>
      <p><strong>Sources:</strong></p>
      <ul>
        {page.sources.map((source) => (
          <li key={source.title}>
            {source.title}
            {source.url && <> ({source.url})</>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default async function PaperPage() {
  const parts = await Promise.all(
    guidanceByPart().map(async (part) => ({
      ...part,
      pages: await Promise.all(part.pages.map(async (page) => ({ page, Content: await loadContent(page.slug) }))),
    })),
  );

  return (
    <main className="fd-width fd-main fd-paper" id="main-content">
      <section className="fd-paper__cover" data-paper-section="cover">
        <p className="fd-paper__brand">Faithful Digital</p>
        <h1>A digital blueprint for UK churches</h1>
        <p className="fd-lead">
          Free, independent guidance to help church leaders set a digital strategy, choose affordable systems and use AI
          well.
        </p>
        <p>
          Version {manifest.version}
          <br />
          <span data-published={published}>Published {published}</span>
        </p>
        <p className="fd-no-print">
          <a href="/faithful-digital-blueprint.pdf">Download the blueprint as a PDF</a>
        </p>
        <p className="fd-small">
          This is a draft. Its content is still under review. Faithful Digital is independent, and doesn&apos;t accept
          sponsorship or affiliate payments. This work is available under Creative Commons Attribution 4.0, so you can
          adapt and share it with credit.
        </p>
      </section>

      <nav className="fd-paper__contents" aria-labelledby="contents-heading" data-paper-section="contents">
        <h2 id="contents-heading">Contents</h2>
        {parts.map((part) => (
          <div key={part.name}>
            <h3>{part.name}</h3>
            <ol>
              {part.pages.map(({ page }) => (
                <li key={page.slug}>
                  <a href={`#${page.slug}`}>{page.title}</a>
                  <span className="fd-paper__page-number" data-page-for={page.slug} />
                </li>
              ))}
              {part.name === "Part 5: Implementation" && (
                <li>
                  <a href="#roadmap">A 12-month digital roadmap</a>
                  <span className="fd-paper__page-number" data-page-for="roadmap" />
                </li>
              )}
            </ol>
          </div>
        ))}
      </nav>

      {parts.map((part) =>
        part.pages.map(({ page, Content }, index) => (
          <article className="fd-paper__section" id={page.slug} key={page.slug} data-paper-section={page.slug}>
            {index === 0 && (
              <div className="fd-paper__part" id={slugify(part.name)}>
                <p className="fd-paper__part-name">{part.name}</p>
                <p>{part.summary}</p>
              </div>
            )}
            {index > 0 && <p className="fd-muted fd-small">{part.name}</p>}
            <h2>{page.title}</h2>
            <p className="fd-lead">{page.summary}</p>
            <Content components={printComponents} />
            <PageMeta page={page} />
          </article>
        )),
      )}

      <article className="fd-paper__section" id="roadmap" data-paper-section="roadmap">
        <p className="fd-muted fd-small">Part 5: Implementation</p>
        <h2>A 12-month digital roadmap</h2>
        <p className="fd-lead">A suggested order for improving your church&apos;s digital work, one manageable step at a time.</p>
        <p>This is a guide, not a timetable. Go at the speed that suits your church, and skip what you&apos;ve already done.</p>
        <Steps steps={roadmapSteps((slug) => `#${slug}`)} headingLevel={3} />
      </article>
    </main>
  );
}
