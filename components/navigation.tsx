import Link from "next/link";
import { guidanceByPart } from "@/lib/guidance";

export interface Crumb {
  href: string;
  label: string;
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav className="fd-breadcrumbs" aria-label="Breadcrumb">
      <ol>
        {items.map((item) => (
          <li key={item.href}>
            <Link href={item.href}>{item.label}</Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function GuidanceSideNav({ current }: { current?: string }) {
  return (
    <nav className="fd-side-nav" aria-label="Guidance">
      {guidanceByPart().map(({ name, pages }) => (
        <div key={name}>
          <h2>{name}</h2>
          <ul>
            {pages.map((page) => (
              <li key={page.slug}>
                <Link href={`/guidance/${page.slug}/`} aria-current={page.slug === current ? "page" : undefined}>
                  {page.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}

interface PaginationLink {
  href: string;
  title: string;
}

export function Pagination({ previous, next }: { previous?: PaginationLink; next?: PaginationLink }) {
  if (!previous && !next) return null;
  return (
    <nav className="fd-pagination" aria-label="Previous and next pages">
      {previous && (
        <Link href={previous.href} rel="prev">
          <span className="fd-pagination__label">‹ Previous</span>
          {previous.title}
        </Link>
      )}
      {next && (
        <Link className="fd-pagination__next" href={next.href} rel="next">
          <span className="fd-pagination__label">Next ›</span>
          {next.title}
        </Link>
      )}
    </nav>
  );
}
