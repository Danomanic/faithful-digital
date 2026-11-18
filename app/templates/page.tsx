import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/navigation";
import { templates } from "@/templates/index.ts";

export const metadata: Metadata = {
  title: "Templates",
  description: "Free templates you can download, edit and adapt for your church.",
};

export default function TemplatesIndexPage() {
  return (
    <main className="fd-width fd-main" id="main-content">
      <Breadcrumbs items={[{ href: "/", label: "Home" }]} />
      <div className="fd-reading">
        <h1>Templates</h1>
        <p className="fd-lead">Free templates you can download as Word documents, then edit and adapt for your church.</p>
        <ul className="fd-card-grid fd-card-grid--single">
          {templates.map((template) => (
            <li key={template.slug}>
              <h2><Link href={`/templates/${template.slug}/`}>{template.title}</Link></h2>
              <p>{template.summary}</p>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
