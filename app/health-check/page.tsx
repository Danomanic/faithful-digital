import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/navigation";
import { areas, healthCheckQuestions } from "@/lib/health-check";

export const metadata: Metadata = {
  title: "Digital health check",
  description: "Answer a few questions to see where your church's digital work is strong and what to do first.",
};

export default function HealthCheckStartPage() {
  return (
    <main className="fd-width fd-main" id="main-content">
      <Breadcrumbs items={[{ href: "/", label: "Home" }]} />
      <div className="fd-reading">
        <h1>Check your church&apos;s digital health</h1>
        <p className="fd-lead">
          Answer {healthCheckQuestions.length} questions to see where your church&apos;s digital work is strong, and what to
          do first.
        </p>
        <p>It takes about 5 minutes. You&apos;ll get a rating for each of these areas, with links to first steps:</p>
        <ul>
          {areas.map((area) => <li key={area.id}>{area.title}</li>)}
        </ul>
        <p>It works best if you answer with another leader or trustee. Choose &quot;Not sure&quot; if you don&apos;t know.</p>
        <Link className="fd-button fd-button--start" href="/health-check/questions/">Start now</Link>
        <h2>Your answers are private</h2>
        <p>
          Your answers stay on your device. We don&apos;t store them or send them anywhere, and they&apos;re deleted when you
          close the page. You can print your results.
        </p>
        <h2>Prefer paper?</h2>
        <p>
          You can <Link href="/health-check/print/">print the health check</Link> and fill it in by hand, for example at a
          trustee meeting.
        </p>
      </div>
    </main>
  );
}
