import type { Metadata } from "next";
import { InsetText, Steps } from "@/components/content";
import { Breadcrumbs } from "@/components/navigation";
import { roadmapSteps } from "@/components/roadmap";

export const metadata: Metadata = {
  title: "Roadmap",
  description: "A suggested order for improving your church's digital work over 12 months.",
};

export default function RoadmapPage() {
  return (
    <main className="fd-width fd-main" id="main-content">
      <Breadcrumbs items={[{ href: "/", label: "Home" }]} />
      <div className="fd-reading">
        <h1>A 12-month digital roadmap</h1>
        <p className="fd-lead">A suggested order for improving your church&apos;s digital work, one manageable step at a time.</p>
        <InsetText>
          <p>This is a guide, not a timetable. Go at the speed that suits your church, and skip what you&apos;ve already done.</p>
        </InsetText>
        <Steps steps={roadmapSteps()} />
      </div>
    </main>
  );
}
