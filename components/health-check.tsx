"use client";

import Link from "next/link";
import { QuestionJourney } from "./question-journey";
import { healthCheckQuestions, ratingLabels, scoreHealthCheck, type Rating } from "@/lib/health-check";
import type { Answers } from "@/lib/journey";

const tagClass: Record<Rating, string> = { good: "fd-tag fd-tag--muted", gaps: "fd-tag", attention: "fd-tag fd-tag--warning" };

function HealthCheckResults({ answers }: { answers: Answers }) {
  const results = scoreHealthCheck(answers);
  const priorities = results.filter((result) => result.rating !== "good");
  return (
    <>
      <p className="fd-lead">
        {priorities.length === 0 ? (
          "Your church has good foundations in every area. Keep reviewing them once a year."
        ) : (
          <>
            Start with <strong>{priorities[0]?.area.title}</strong>, then work down the list. The areas that most need
            attention are first.
          </>
        )}
      </p>
      {results.map(({ area, score, max, rating }) => (
        <section className="fd-result" key={area.id} aria-labelledby={`${area.id}-heading`}>
          <h2 id={`${area.id}-heading`}>{area.title}</h2>
          <p>
            <span className={tagClass[rating]}>{ratingLabels[rating]}</span>{" "}
            <span className="fd-muted">
              {score} out of {max} points
            </span>
          </p>
          {rating !== "good" ? (
            <>
              <p>First steps:</p>
              <ul>
                {area.firstSteps.map((step) => (
                  <li key={step.href}><Link href={step.href}>{step.text}</Link></li>
                ))}
              </ul>
            </>
          ) : (
            <p>
              To keep this strong, read <Link href={area.firstSteps[0]?.href ?? "/guidance/"}>{area.firstSteps[0]?.text}</Link>.
            </p>
          )}
        </section>
      ))}
      <p>
        For a suggested order of changes, read the <Link href="/roadmap/">12-month roadmap</Link>.
      </p>
    </>
  );
}

export function HealthCheck() {
  return (
    <QuestionJourney
      name="Digital health check"
      questions={healthCheckQuestions}
      startHref="/health-check/"
      confirmLabel="See your results"
      resultsTitle="Your digital health check results"
      Results={HealthCheckResults}
      noScriptHref="/health-check/print/"
      noScriptLabel="use the printable health check"
    />
  );
}
