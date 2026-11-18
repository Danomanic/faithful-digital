import type { ReactNode } from "react";

export function Tag({ children, muted = false }: { children: ReactNode; muted?: boolean }) {
  return <span className={muted ? "fd-tag fd-tag--muted" : "fd-tag"}>{children}</span>;
}

export function InsetText({ children }: { children: ReactNode }) {
  return <div className="fd-inset">{children}</div>;
}

export function Reflection({ children }: { children: ReactNode }) {
  return <div className="fd-reflection">{children}</div>;
}

export function WarningText({ children }: { children: ReactNode }) {
  return (
    <div className="fd-warning">
      <span className="fd-warning__icon" aria-hidden="true">!</span>
      <div>
        <span className="fd-visually-hidden">Warning: </span>
        {children}
      </div>
    </div>
  );
}

export function NotificationBanner({
  title,
  variant = "information",
  children,
}: {
  title: string;
  variant?: "information" | "success";
  children: ReactNode;
}) {
  const className = variant === "success" ? "fd-banner fd-banner--success" : "fd-banner";
  return (
    <div className={className} role={variant === "success" ? "alert" : "region"} aria-label={title}>
      <p className="fd-banner__title">{title}</p>
      <div className="fd-banner__body">{children}</div>
    </div>
  );
}

export function Details({ summary, children }: { summary: string; children: ReactNode }) {
  return (
    <details className="fd-details">
      <summary>{summary}</summary>
      <div className="fd-details__body">{children}</div>
    </details>
  );
}

export function Accordion({ items }: { items: { title: string; body: ReactNode }[] }) {
  return (
    <div className="fd-accordion">
      {items.map((item) => (
        <details key={item.title}>
          <summary>{item.title}</summary>
          <div className="fd-accordion__body">{item.body}</div>
        </details>
      ))}
    </div>
  );
}

export function SummaryList({ rows }: { rows: { key: string; value: ReactNode; action?: ReactNode }[] }) {
  return (
    <dl className={rows.some((row) => row.action) ? "fd-summary" : "fd-summary fd-summary--no-actions"}>
      {rows.map((row) => (
        <div className="fd-summary__row" key={row.key}>
          <dt>{row.key}</dt>
          <dd>{row.value}</dd>
          {row.action ? <dd>{row.action}</dd> : null}
        </div>
      ))}
    </dl>
  );
}

export function Steps({ steps, headingLevel = 2 }: { steps: { title: string; body: ReactNode }[]; headingLevel?: 2 | 3 }) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  return (
    <ol className="fd-steps">
      {steps.map((step) => (
        <li className="fd-steps__step" key={step.title}>
          <Heading>{step.title}</Heading>
          {step.body}
        </li>
      ))}
    </ol>
  );
}
