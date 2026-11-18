import type { Metadata } from "next";
import { ToolFinder } from "@/components/tool-finder";

export const metadata: Metadata = { title: "Tool finder questions" };

export default function ToolFinderQuestionsPage() {
  return (
    <main className="fd-width fd-main" id="main-content">
      <div className="fd-reading">
        <ToolFinder />
      </div>
    </main>
  );
}
