import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { InsetText } from "@/components/content";
import { Breadcrumbs } from "@/components/navigation";
import { docxSize, TemplatePreview } from "@/components/template-preview";
import { getGuidancePage } from "@/lib/guidance";
import { docxPath, getTemplate, templates } from "@/templates/index.ts";

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return templates.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const template = getTemplate((await params).slug);
  return template ? { title: `${template.title} template`, description: template.summary } : {};
}

export default async function TemplatePage({ params }: Props) {
  const template = getTemplate((await params).slug);
  if (!template) notFound();
  const related = template.relatedGuidance.flatMap((slug) => getGuidancePage(slug) ?? []);
  return (
    <main className="fd-width fd-main" id="main-content">
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { href: "/templates/", label: "Templates" }]} />
      <div className="fd-reading">
        <h1>{template.title}</h1>
        <p className="fd-lead">{template.summary}</p>

        <p className="fd-download">
          <a href={docxPath(template)} download>
            Download the {template.title.toLowerCase()} template
          </a>
          <span className="fd-muted fd-small"> (Word document, {docxSize(template)})</span>
        </p>
        <p className="fd-small">It also opens in Google Docs, LibreOffice and Pages.</p>

        <h2>How to use this template</h2>
        <ul>
          {template.howToUse.map((line) => <li key={line}>{line}</li>)}
        </ul>
        {template.professionalAdviceNote && (
          <InsetText>
            <p>
              This template gives general information, not legal or professional advice. Have it checked by your
              denomination or network, or a qualified adviser, before you adopt it.
            </p>
          </InsetText>
        )}

        <h2>What&apos;s in the template</h2>
        <TemplatePreview template={template} />

        <h2>Related guidance</h2>
        <ul>
          {related.map((page) => (
            <li key={page.slug}><Link href={`/guidance/${page.slug}/`}>{page.title}</Link></li>
          ))}
        </ul>
        <p className="fd-small fd-muted">
          Last reviewed {template.lastReviewed}. You can adapt and share this template under Creative Commons Attribution
          4.0.
        </p>
      </div>
    </main>
  );
}
