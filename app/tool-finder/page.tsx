import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/navigation";
import { toolFinderQuestions } from "@/lib/tool-finder";

export const metadata: Metadata = {
  title: "Tool finder",
  description: "Answer a few questions to see which tools could suit your church, and why.",
};

export default function ToolFinderStartPage() {
  return (
    <main className="fd-width fd-main" id="main-content">
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { href: "/compare/", label: "Compare tools" }]} />
      <div className="fd-reading">
        <h1>Find tools for your church</h1>
        <p className="fd-lead">
          Answer {toolFinderQuestions.length} questions to see which tools could suit your church&apos;s size, budget and
          needs, and why we suggest them.
        </p>
        <p>
          Suggestions come from our <Link href="/compare/">independent tool comparisons</Link>. We only suggest tools whose
          details we&apos;ve checked on their own websites, and we don&apos;t accept payment from any provider.
        </p>
        <Link className="fd-button fd-button--start" href="/tool-finder/questions/">Start now</Link>
        <h2>Your answers are private</h2>
        <p>
          Your answers stay on your device. We don&apos;t store them or send them anywhere, and they&apos;re deleted when you
          close the page.
        </p>
      </div>
    </main>
  );
}
