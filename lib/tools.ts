import type { Source } from "./guidance";
import { churchManagementTools } from "../data/tools/church-management";
import { accountingTools } from "../data/tools/accounting";
import { givingTools } from "../data/tools/giving";
import { websiteTools } from "../data/tools/websites";
import { newsletterTools } from "../data/tools/email-newsletters";

export type ToolCategorySlug = "church-management" | "accounting" | "giving" | "websites" | "email-newsletters";

export interface ToolCategory {
  slug: ToolCategorySlug;
  title: string;
  summary: string;
  /** The guidance page that explains how to choose this kind of tool. */
  guidance: string;
  /** The heading for the cost column in the at-a-glance table. */
  glanceCost: string;
}

export type ChurchSize = "small" | "medium" | "large";
/** free: £0 is possible. low: up to £250 a year. medium: up to £1,000 a year. high: more than £1,000 a year. */
export type CostBand = "free" | "low" | "medium" | "high";

/** A fact we couldn't confirm on the vendor's own website is `null`, and is shown as "Not confirmed". */
type Fact = string | null;

export interface ToolRecord {
  id: string;
  name: string;
  category: ToolCategorySlug;
  /** The vendor's website. Free options, such as a spreadsheet, have none. */
  url?: string;
  /** Who can use it, when it's limited to a denomination or group. */
  availability?: string;
  cost: Fact;
  vat: Fact;
  freePlan: Fact;
  charityOffer: Fact;
  ukFit: Fact;
  dataProtection: Fact;
  security: Fact;
  accessibility: Fact;
  leaving: Fact;
  /**
   * Yearly cost band of the cheapest sensible plan for a church with fewer than 100 people (small),
   * 100 to 199 (medium) or 200 or more (large). Missing means we couldn't confirm the cost. Used by the tool finder.
   */
  costBands?: Partial<Record<ChurchSize, CostBand>>;
  /** The tool finder only suggests this to churches in this denomination. */
  onlyFor?: "church-of-england";
  /** The tool finder only suggests this if the church already uses Microsoft 365 or Google Workspace. */
  needsOfficeSuite?: boolean;
  /** Short answers for the at-a-glance table. Only tools we've checked have them. */
  glance?: { cost: string; freePlan: string; charityOffer: string };
  goodFor: string;
  drawbacks: string;
  sources: Source[];
  /** ISO date when the facts were last checked against the vendor's website, or null if not yet checked. */
  lastChecked: string | null;
}

export const toolCategories: ToolCategory[] = [
  {
    slug: "church-management",
    glanceCost: "Typical cost",
    title: "Church management systems",
    summary: "Tools for contact details, rotas, groups and church communications.",
    guidance: "church-management-systems",
  },
  {
    slug: "accounting",
    glanceCost: "Typical cost",
    title: "Accounting",
    summary: "Tools for keeping your church's financial records.",
    guidance: "accounting",
  },
  {
    slug: "giving",
    glanceCost: "Cost",
    title: "Giving",
    summary: "Ways to receive regular, online and contactless gifts.",
    guidance: "giving-and-gift-aid",
  },
  {
    slug: "websites",
    glanceCost: "Cost with your own domain",
    title: "Websites",
    summary: "Ways to build and run a church website.",
    guidance: "church-website",
  },
  {
    slug: "email-newsletters",
    glanceCost: "Cost",
    title: "Email newsletters",
    summary: "Tools for sending a regular email to people who've asked to hear from you.",
    guidance: "emails-and-texts",
  },
];

export const tools: ToolRecord[] = [
  ...churchManagementTools,
  ...accountingTools,
  ...givingTools,
  ...websiteTools,
  ...newsletterTools,
];

export function getCategory(slug: string): ToolCategory | undefined {
  return toolCategories.find((category) => category.slug === slug);
}

export function toolsIn(category: ToolCategorySlug): ToolRecord[] {
  return tools.filter((tool) => tool.category === category);
}

/** Entries are stale once they're more than 6 months old. */
export const STALE_AFTER_MONTHS = 6;

export function isStale(tool: ToolRecord, today: Date): boolean {
  if (!tool.lastChecked) return true;
  const limit = new Date(`${tool.lastChecked}T00:00:00Z`);
  limit.setUTCMonth(limit.getUTCMonth() + STALE_AFTER_MONTHS);
  return today > limit;
}

export function staleTools(today: Date): ToolRecord[] {
  return tools.filter((tool) => isStale(tool, today));
}

export function formatDate(isoDate: string): string {
  return new Date(`${isoDate}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
