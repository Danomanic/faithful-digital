import type { ReactNode } from "react";
import { GuidanceSideNav, Breadcrumbs, Pagination } from "./navigation";
import { getAdjacentPages, type GuidancePage } from "@/lib/guidance";

export function GuidanceTemplate({ page, children }: { page: GuidancePage; children: ReactNode }) {
  const { previous, next } = getAdjacentPages(page.slug);
  return (
    <>
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { href: "/guidance/", label: "Guidance" }]} />
      <div className="fd-with-nav">
        <div className="fd-reading">
          <article>
            <p className="fd-muted" style={{ marginBottom: "var(--fd-space-1)" }}>{page.part}</p>
            <h1>{page.title}</h1>
            <p className="fd-lead">{page.summary}</p>
            {children}
          </article>
          <aside className="fd-meta" aria-label="About this page">
            {page.professionalAdviceNote && (
              <p>
                This page gives general information. It isn&apos;t legal or professional advice. Get advice from a
                qualified adviser, or your denomination or network, if you&apos;re unsure about your situation.
              </p>
            )}
            <p><strong>Last reviewed:</strong> {page.lastReviewed}</p>
            <h2 style={{ fontSize: "1.1rem", marginTop: 0 }}>Sources</h2>
            <ul>
              {page.sources.map((source) => (
                <li key={source.title}>{source.url ? <a href={source.url}>{source.title}</a> : source.title}</li>
              ))}
            </ul>
          </aside>
          <Pagination
            previous={previous && { href: `/guidance/${previous.slug}/`, title: previous.title }}
            next={next && { href: `/guidance/${next.slug}/`, title: next.title }}
          />
        </div>
        <GuidanceSideNav current={page.slug} />
      </div>
    </>
  );
}
