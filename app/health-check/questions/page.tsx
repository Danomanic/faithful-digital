import type { Metadata } from "next";
import { HealthCheck } from "@/components/health-check";

export const metadata: Metadata = { title: "Digital health check questions" };

export default function HealthCheckQuestionsPage() {
  return (
    <main className="fd-width fd-main" id="main-content">
      <div className="fd-reading">
        <HealthCheck />
      </div>
    </main>
  );
}
