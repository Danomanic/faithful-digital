import type { Metadata } from "next";
import Link from "next/link";
import { guidanceByPart } from "@/lib/guidance";
import { Breadcrumbs } from "@/components/navigation";

export const metadata: Metadata = { title: "Guidance" };

export default function GuidanceIndexPage() {
  return (
    <main className="fd-width fd-main" id="main-content">
      <Breadcrumbs items={[{ href: "/", label: "Home" }]} />
      <div className="fd-reading">
        <h1>Guidance</h1>
        <p className="fd-lead">Practical guidance and encouragement for leading your church&apos;s digital work.</p>
        {guidanceByPart().map(({ name, summary, pages }) => (
          <section key={name}>
            <h2>{name}</h2>
            <p>{summary}</p>
            <ul>
              {pages.map((page) => (
                <li key={page.slug}>
                  <Link href={`/guidance/${page.slug}/`}>{page.title}</Link>
                  <br />
                  {page.summary}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </main>
  );
}
