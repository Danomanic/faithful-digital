import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/navigation";
import { toolCategories, toolsIn } from "@/lib/tools";

export const metadata: Metadata = {
  title: "Compare tools",
  description: "Independent comparisons of affordable tools for UK churches, including charity offers.",
};

export default function CompareIndexPage() {
  return (
    <main className="fd-width fd-main" id="main-content">
      <Breadcrumbs items={[{ href: "/", label: "Home" }]} />
      <div className="fd-reading">
        <h1>Compare tools</h1>
        <p className="fd-lead">
          Independent comparisons of tools that UK churches use, with prices and charity offers taken from each
          provider&apos;s own website.
        </p>
        <p>
          Not sure where to start? Use the <Link href="/tool-finder/">tool finder</Link> to see which tools could suit your
          church.
        </p>
        <p>
          We don&apos;t accept payment, affiliate fees or free accounts from any provider. Each comparison includes a free
          or low-cost option, so you can see the cheapest way to get started.
        </p>
        <ul className="fd-card-grid fd-card-grid--single">
          {toolCategories.map((category) => (
            <li key={category.slug}>
              <h2><Link href={`/compare/${category.slug}/`}>{category.title}</Link></h2>
              <p>{category.summary}</p>
              <p className="fd-muted fd-small">{toolsIn(category.slug).length} options compared</p>
            </li>
          ))}
        </ul>
        <p>
          For email, documents and calendars, read our guidance on{" "}
          <Link href="/guidance/email-and-documents/">Microsoft 365 and Google Workspace</Link>.
        </p>
      </div>
    </main>
  );
}
