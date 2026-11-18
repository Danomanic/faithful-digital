import Link from "next/link";
import type { ReactNode } from "react";

/**
 * The 12-month roadmap, shared by the roadmap page and the printable blueprint.
 * `to` turns a guidance page slug into a link, so the printable version can link within itself.
 */
export function roadmapSteps(to: (slug: string) => string = (slug) => `/guidance/${slug}/`): { title: string; body: ReactNode }[] {
  return [
    {
      title: "Start with people and purpose",
      body: (
        <>
          <p className="fd-muted">First 30 days</p>
          <p>Pray together and talk with your leaders about what your church most needs.</p>
          <ul>
            <li>read <Link href={to("why-digital-matters")}>why digital matters for the local church</Link></li>
            <li>ask a trustee to lead this work, and find 1 or 2 people to <Link href={to("roles-and-responsibilities")}>share it</Link></li>
            <li>agree your top 3 priorities</li>
          </ul>
        </>
      ),
    },
    {
      title: "Secure what you already have",
      body: (
        <>
          <p className="fd-muted">First 30 days</p>
          <p>Protect your existing accounts before you change or add anything.</p>
          <ul>
            <li><Link href={to("accounts-and-logins")}>list your accounts and secure your logins</Link></li>
            <li>make sure the church controls its domain name, email and website</li>
            <li>agree simple rules for <Link href={to("writing-an-ai-policy")}>using AI well</Link></li>
          </ul>
        </>
      ),
    },
    {
      title: "Choose your core systems",
      body: (
        <>
          <p className="fd-muted">Months 2 to 3</p>
          <p>Look at the tools you use for email and documents, people and rotas, and money. Keep what works, and only change what you need to.</p>
          <ul>
            <li>check what <Link href={to("choosing-systems")}>charity discounts</Link> your church can get</li>
            <li><Link href={to("bringing-people-along")}>present your recommendation to your trustees</Link></li>
            <li>check your <Link href={to("data-protection")}>data protection records</Link></li>
          </ul>
        </>
      ),
    },
    {
      title: "Move across carefully",
      body: (
        <>
          <p className="fd-muted">Months 4 to 6</p>
          <p>Change one system at a time, and avoid your busiest seasons.</p>
          <ul>
            <li>try each new system with a small group first</li>
            <li>move only the data you still need</li>
            <li>offer help to anyone who is less confident with technology</li>
          </ul>
        </>
      ),
    },
    {
      title: "Improve how you welcome and communicate",
      body: (
        <>
          <p className="fd-muted">Months 7 to 9</p>
          <p>Look at your church from the point of view of someone who is new.</p>
          <ul>
            <li>make sure <Link href={to("church-website")}>your website</Link> answers a newcomer&apos;s questions</li>
            <li>check that your website and communications are <Link href={to("accessibility")}>accessible</Link></li>
            <li><Link href={to("communications")}>simplify how you share news</Link></li>
          </ul>
        </>
      ),
    },
    {
      title: "Review and give thanks",
      body: (
        <>
          <p className="fd-muted">Months 10 to 12</p>
          <p>Look back at what has changed, thank those who made it happen, and decide what comes next.</p>
          <ul>
            <li>ask people what has helped, and what hasn&apos;t</li>
            <li>review your costs, access lists and AI rules</li>
            <li>set your priorities for next year</li>
          </ul>
        </>
      ),
    },
  ];
}
