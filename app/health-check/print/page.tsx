import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/navigation";
import { TableWrapper } from "@/components/table";
import { areas, healthCheckQuestions, MAX_POINTS, questionsIn, ratingLabels, ratingRanges, type Rating } from "@/lib/health-check";

export const metadata: Metadata = {
  title: "Printable digital health check",
  description: "A paper version of the digital health check, with the scoring and first steps.",
};

const ratings: Rating[] = ["good", "gaps", "attention"];

function range([low, high]: [number, number]): string {
  return low === high ? `${low}` : `${low} to ${high}`;
}

export default function PrintableHealthCheckPage() {
  return (
    <main className="fd-width fd-main" id="main-content">
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { href: "/health-check/", label: "Digital health check" }]} />
      <div className="fd-reading">
        <h1>Printable digital health check</h1>
        <p className="fd-lead">Print this page and fill it in by hand. The scoring is at the end.</p>
        <p className="fd-no-print">
          To print, use your browser&apos;s print option, or press Ctrl and P (Cmd and P on a Mac).
        </p>

        <h2>Questions</h2>
        <p>Tick one answer for each question. The points for each answer are shown in brackets.</p>
        {areas.map((area) => (
          <section className="fd-print-area" key={area.id}>
            <h3>{area.title}</h3>
            {questionsIn(area.id).map((question) => {
              const number = healthCheckQuestions.indexOf(question) + 1;
              return (
                <div className="fd-print-question" key={question.id}>
                  <p>
                    <strong>
                      {number}. {question.title}
                    </strong>
                  </p>
                  <ul className="fd-template__checklist">
                    {question.options.map((option) => (
                      <li key={option.value}>
                        {option.label} ({question.points[option.value] ?? 0}{" "}
                        {(question.points[option.value] ?? 0) === 1 ? "point" : "points"})
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </section>
        ))}

        <h2>Work out your results</h2>
        <p>Add up your points for each area, then find your rating.</p>
        <TableWrapper label="Table: ratings for each area">
          <table className="fd-table">
            <caption className="fd-visually-hidden">Ratings for each area</caption>
            <thead>
              <tr>
                <th scope="col">Area</th>
                <th scope="col">Your points</th>
                {ratings.map((rating) => <th scope="col" key={rating}>{ratingLabels[rating]}</th>)}
              </tr>
            </thead>
            <tbody>
              {areas.map((area) => {
                const ranges = ratingRanges(questionsIn(area.id).length * MAX_POINTS);
                return (
                  <tr key={area.id}>
                    <th scope="row">{area.title}</th>
                    <td>&nbsp;</td>
                    {ratings.map((rating) => <td key={rating}>{range(ranges[rating])}</td>)}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </TableWrapper>

        <h2>First steps</h2>
        <p>Start with the areas rated &quot;{ratingLabels.attention}&quot;, then those with &quot;{ratingLabels.gaps}&quot;.</p>
        {areas.map((area) => (
          <section key={area.id}>
            <h3>{area.title}</h3>
            <ul>
              {area.firstSteps.map((step) => (
                <li key={step.href}>
                  <Link href={step.href}>{step.text}</Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </main>
  );
}
