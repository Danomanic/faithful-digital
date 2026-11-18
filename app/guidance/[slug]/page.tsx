import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GuidanceTemplate } from "@/components/guidance-template";
import { getGuidancePage, guidancePages } from "@/lib/guidance";

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return guidancePages.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = getGuidancePage((await params).slug);
  return page ? { title: page.title, description: page.summary } : {};
}

export default async function GuidanceRoute({ params }: Props) {
  const { slug } = await params;
  const page = getGuidancePage(slug);
  if (!page) notFound();
  const { default: Content } = await import(`@/content/guidance/${slug}.mdx`);
  return (
    <main className="fd-width fd-main" id="main-content">
      <GuidanceTemplate page={page}>
        <Content />
      </GuidanceTemplate>
    </main>
  );
}
