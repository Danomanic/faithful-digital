import Link from "next/link";
import { Details, InsetText, SummaryList, Tag, WarningText } from "./content";
import { formatDate, isStale, STALE_AFTER_MONTHS, type ToolCategory, type ToolRecord } from "@/lib/tools";

type FactKey = "cost" | "vat" | "freePlan" | "charityOffer" | "ukFit" | "dataProtection" | "security" | "accessibility" | "leaving";

const costFacts: { key: FactKey; label: string }[] = [
  { key: "cost", label: "Cost" },
  { key: "vat", label: "VAT" },
  { key: "freePlan", label: "Free plan" },
  { key: "charityOffer", label: "Charity offer" },
];

const moreFacts: { key: FactKey; label: string }[] = [
  { key: "ukFit", label: "UK fit" },
  { key: "dataProtection", label: "Data protection" },
  { key: "security", label: "Security" },
  { key: "accessibility", label: "Accessibility" },
  { key: "leaving", label: "Leaving" },
];

function confirmedRows(tool: ToolRecord, facts: { key: FactKey; label: string }[]) {
  return facts.flatMap(({ key, label }) => (tool[key] ? [{ key: label, value: tool[key] }] : []));
}

function unconfirmed(tool: ToolRecord, facts: { key: FactKey; label: string }[]): string[] {
  return facts.filter(({ key }) => !tool[key]).map(({ label }) => label.toLowerCase());
}

export function ToolTable({ tools, category }: { tools: ToolRecord[]; category: ToolCategory }) {
  const columns = [category.glanceCost, "Free plan", "Charity offer"];
  // Explicit roles keep table semantics when small screens restyle rows as stacked cards.
  return (
    <table className="fd-table fd-table--glance" role="table">
      <caption className="fd-visually-hidden">{category.title} at a glance</caption>
      <colgroup>
        <col className="fd-col-tool" />
        <col className="fd-col-cost" />
        <col className="fd-col-free" />
        <col className="fd-col-charity" />
      </colgroup>
      <thead role="rowgroup">
        <tr role="row">
          <th scope="col" role="columnheader">Tool</th>
          {columns.map((column) => (
            <th scope="col" role="columnheader" key={column}>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody role="rowgroup">
        {tools.map((tool) => (
          <tr role="row" key={tool.id}>
            <th scope="row" role="rowheader">
              <a href={`#${tool.id}`}>{tool.name}</a>
              {tool.availability && <span className="fd-table__note">{tool.availability}</span>}
            </th>
            {[tool.glance?.cost, tool.glance?.freePlan, tool.glance?.charityOffer].map((value, index) => (
              <td role="cell" data-label={columns[index]} key={columns[index]}>{value}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function ToolDetails({ tool, today }: { tool: ToolRecord; today: Date }) {
  const missing = [...unconfirmed(tool, costFacts), ...unconfirmed(tool, moreFacts)];
  const more = confirmedRows(tool, moreFacts);
  return (
    <section className="fd-tool" id={tool.id} aria-labelledby={`${tool.id}-heading`}>
      <h2 id={`${tool.id}-heading`}>{tool.name}</h2>
      <p className="fd-muted fd-small">Last checked {tool.lastChecked && formatDate(tool.lastChecked)}</p>
      {tool.availability && (
        <p>
          <Tag>Limited availability</Tag> {tool.availability}
        </p>
      )}
      {isStale(tool, today) && (
        <WarningText>
          <p>This information was last checked more than {STALE_AFTER_MONTHS} months ago, so it may be out of date.</p>
        </WarningText>
      )}
      <h3>Good for</h3>
      <p>{tool.goodFor}</p>
      <h3>Watch out for</h3>
      <p>{tool.drawbacks}</p>
      <SummaryList rows={confirmedRows(tool, costFacts)} />
      {missing.length > 0 && <p className="fd-small">We couldn&apos;t confirm its {listOf(missing)}.</p>}
      {(more.length > 0 || tool.url || tool.sources.length > 0) && (
        <Details summary={`More about ${tool.name}`}>
          {more.length > 0 && <SummaryList rows={more} />}
          {(tool.url || tool.sources.length > 0) && (
            <>
              <h4>Sources</h4>
              <ul>
                {tool.url && <li><a href={tool.url}>{tool.name} website</a></li>}
                {tool.sources.map((source) => (
                  <li key={source.title}>{source.url ? <a href={source.url}>{source.title}</a> : source.title}</li>
                ))}
              </ul>
            </>
          )}
        </Details>
      )}
    </section>
  );
}

export function UncheckedTools({ tools }: { tools: ToolRecord[] }) {
  if (tools.length === 0) return null;
  return (
    <section className="fd-tool" aria-labelledby="not-checked-heading">
      <h2 id="not-checked-heading">Not checked yet</h2>
      <p>
        We plan to include these tools, but haven&apos;t been able to check their details on their websites yet. Check
        each website before you decide.
      </p>
      <ul>
        {tools.map((tool) => (
          <li key={tool.id}>
            {tool.url ? <a href={tool.url}>{tool.name}</a> : tool.name}: {tool.goodFor.charAt(0).toLowerCase()}
            {tool.goodFor.slice(1)}
          </li>
        ))}
      </ul>
    </section>
  );
}

function listOf(items: string[]): string {
  return items.length === 1 ? (items[0] as string) : `${items.slice(0, -1).join(", ")} or ${items.at(-1)}`;
}

export function IndependenceNote({ category }: { category: ToolCategory }) {
  return (
    <InsetText>
      <p>
        We&apos;re independent, and don&apos;t accept payment from any provider. Prices come from each provider&apos;s own
        website and change often, so check before you buy. We don&apos;t give overall scores, because the right choice
        depends on your church.
      </p>
      <p>
        Read <Link href={`/guidance/${category.guidance}/`}>our guidance</Link> for what to look for.
      </p>
    </InsetText>
  );
}
