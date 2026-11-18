"use client";

import Link from "next/link";
import { QuestionJourney } from "./question-journey";
import { recommend, toolFinderQuestions } from "@/lib/tool-finder";
import type { Answers } from "@/lib/journey";

function ToolFinderResults({ answers }: { answers: Answers }) {
  const results = recommend(answers);
  return (
    <>
      <p className="fd-lead">
        These tools fit your answers. Read each comparison before you decide, and try a free trial with real tasks.
      </p>
      {results.map(({ category, suggested, costUnknown }) => (
        <section className="fd-result" key={category.slug} aria-labelledby={`${category.slug}-heading`}>
          <h2 id={`${category.slug}-heading`}>{category.title}</h2>
          {suggested.length === 0 ? (
            <p>We didn&apos;t find a tool that fits your budget. Read the comparison to see all the options.</p>
          ) : (
            <ul className="fd-result__tools">
              {suggested.map(({ tool, reasons }) => (
                <li key={tool.id}>
                  <h3>
                    <Link href={`/compare/${category.slug}/#${tool.id}`}>{tool.name}</Link>
                  </h3>
                  <p>{tool.goodFor}.</p>
                  <ul>
                    {reasons.map((reason) => <li key={reason}>{reason}</li>)}
                  </ul>
                </li>
              ))}
            </ul>
          )}
          {costUnknown.length > 0 && (
            <p className="fd-small">
              We couldn&apos;t confirm the cost of {costUnknown.map((tool) => tool.name).join(" or ")}, so check{" "}
              {costUnknown.length === 1 ? "its" : "their"} website.
            </p>
          )}
          <p>
            <Link href={`/compare/${category.slug}/`}>Compare all {category.title.toLowerCase()}</Link>
          </p>
        </section>
      ))}
      <p className="fd-small">
        We&apos;re independent and don&apos;t accept payment from any provider. Suggestions are based on prices from each
        provider&apos;s website, which can change.
      </p>
    </>
  );
}

export function ToolFinder() {
  return (
    <QuestionJourney
      name="Tool finder"
      questions={toolFinderQuestions}
      startHref="/tool-finder/"
      confirmLabel="See suggested tools"
      resultsTitle="Tools that could suit your church"
      Results={ToolFinderResults}
      noScriptHref="/compare/"
      noScriptLabel="compare tools yourself"
    />
  );
}
