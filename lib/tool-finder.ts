// The tool finder: questions and recommendation rules. Pure functions over the shared tool data,
// so recommendations always match the comparison pages.
import { asList, type Answers, type Question } from "./journey";
import { toolCategories, toolsIn, type ChurchSize, type CostBand, type ToolCategory, type ToolRecord } from "./tools";

export const toolFinderQuestions: Question[] = [
  {
    id: "needs",
    type: "checkbox",
    title: "What do you need tools for?",
    shortTitle: "Needs",
    hint: "Select all that apply.",
    errorMessage: "Select what you need tools for",
    options: toolCategories.map((category) => ({ value: category.slug, label: category.title, hint: category.summary })),
  },
  {
    id: "size",
    type: "radio",
    title: "How many people are connected with your church?",
    shortTitle: "Size",
    hint: "Include adults who attend regularly, volunteers and people on your contact lists. Don't include children.",
    errorMessage: "Select how many people are connected with your church",
    options: [
      { value: "small", label: "Fewer than 100" },
      { value: "medium", label: "100 to 199" },
      { value: "large", label: "200 or more" },
    ],
  },
  {
    id: "budget",
    type: "radio",
    title: "How much could you spend on each tool in a year?",
    shortTitle: "Budget for each tool",
    errorMessage: "Select how much you could spend on each tool",
    options: [
      { value: "free", label: "Nothing, we need free options" },
      { value: "low", label: "Up to £250 a year" },
      { value: "medium", label: "Up to £1,000 a year" },
      { value: "any", label: "More than £1,000, or we're not sure yet" },
    ],
  },
  {
    id: "denomination",
    type: "radio",
    title: "Is your church part of the Church of England?",
    shortTitle: "Church of England",
    hint: "Some tools are only available to Church of England churches.",
    errorMessage: "Select whether your church is part of the Church of England",
    options: [
      { value: "church-of-england", label: "Yes" },
      { value: "other", label: "No" },
    ],
  },
  {
    id: "office",
    type: "radio",
    title: "Does your church already use Microsoft 365 or Google Workspace?",
    shortTitle: "Microsoft 365 or Google Workspace",
    errorMessage: "Select whether your church uses Microsoft 365 or Google Workspace",
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" },
      { value: "not-sure", label: "Not sure" },
    ],
  },
];

const bandOrder: Record<CostBand, number> = { free: 0, low: 1, medium: 2, high: 3 };
const budgetLimit: Record<string, number> = { free: 0, low: 1, medium: 2, any: 3 };

export const bandLabels: Record<CostBand, string> = {
  free: "Free option available",
  low: "Up to £250 a year",
  medium: "Up to £1,000 a year",
  high: "More than £1,000 a year",
};

export interface Recommendation {
  tool: ToolRecord;
  reasons: string[];
}

export interface CategoryResult {
  category: ToolCategory;
  /** Tools that fit the church's answers, cheapest first. */
  suggested: Recommendation[];
  /** Tools that fit apart from the cost, which we couldn't confirm. */
  costUnknown: ToolRecord[];
}

function isSize(value: unknown): value is ChurchSize {
  return value === "small" || value === "medium" || value === "large";
}

export function recommend(answers: Answers): CategoryResult[] {
  const size = isSize(answers.size) ? answers.size : "small";
  const limit = budgetLimit[typeof answers.budget === "string" ? answers.budget : "any"] ?? 3;
  const churchOfEngland = answers.denomination === "church-of-england";
  const hasOfficeSuite = answers.office === "yes";
  const needs = asList(answers.needs);

  return toolCategories
    .filter((category) => needs.includes(category.slug))
    .map((category) => {
      const eligible = toolsIn(category.slug).filter(
        (tool) =>
          // Only suggest tools whose facts we've checked.
          tool.lastChecked !== null &&
          (!tool.onlyFor || (tool.onlyFor === "church-of-england" && churchOfEngland)) &&
          (!tool.needsOfficeSuite || hasOfficeSuite),
      );
      const suggested: Recommendation[] = [];
      const costUnknown: ToolRecord[] = [];
      for (const tool of eligible) {
        const band = tool.costBands?.[size];
        if (!band) {
          costUnknown.push(tool);
          continue;
        }
        if (bandOrder[band] > limit) continue;
        const reasons = [
          band === "free"
            ? "There's a free option for a church your size"
            : `Likely cost for a church your size: ${bandLabels[band].toLowerCase()}`,
        ];
        if (tool.onlyFor === "church-of-england") reasons.push("Available to Church of England churches");
        if (tool.needsOfficeSuite) reasons.push("Uses the Microsoft 365 or Google Workspace you already have");
        if (tool.availability && !tool.onlyFor) reasons.push(tool.availability);
        if (tool.vat?.includes("US dollars")) reasons.push("Priced in US dollars, so the cost in pounds will vary");
        suggested.push({ tool, reasons });
      }
      suggested.sort(
        (a, b) => bandOrder[a.tool.costBands?.[size] ?? "high"] - bandOrder[b.tool.costBands?.[size] ?? "high"],
      );
      return { category, suggested, costUnknown };
    });
}
