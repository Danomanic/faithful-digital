import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/navigation";
import { IndependenceNote, ToolDetails, ToolTable, UncheckedTools } from "@/components/tool-comparison";
import { getCategory, staleTools, toolCategories, toolsIn } from "@/lib/tools";

interface Props {
  params: Promise<{ category: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  // Warn at build time about entries that need checking again.
  const stale = staleTools(new Date());
  if (stale.length > 0) {
    console.warn(
      `Tool data needs checking (not checked yet, or more than 6 months old): ${stale.map((tool) => tool.name).join(", ")}`,
    );
  }
  return toolCategories.map(({ slug }) => ({ category: slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = getCategory((await params).category);
  return category ? { title: `Compare ${category.title.toLowerCase()}`, description: category.summary } : {};
}

export default async function ComparePage({ params }: Props) {
  const category = getCategory((await params).category);
  if (!category) notFound();
  const tools = toolsIn(category.slug);
  const checked = tools.filter((tool) => tool.lastChecked);
  const unchecked = tools.filter((tool) => !tool.lastChecked);
  const today = new Date();
  return (
    <main className="fd-width fd-main" id="main-content">
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { href: "/compare/", label: "Compare tools" }]} />
      <div className="fd-reading">
        <h1>Compare {category.title.toLowerCase()}</h1>
        <p className="fd-lead">{category.summary}</p>
        <IndependenceNote category={category} />
        <h2>At a glance</h2>
        <ToolTable tools={checked} category={category} />
        {checked.map((tool) => (
          <ToolDetails key={tool.id} tool={tool} today={today} />
        ))}
        <UncheckedTools tools={unchecked} />
      </div>
    </main>
  );
}
