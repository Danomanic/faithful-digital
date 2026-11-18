import type { DocTemplate } from "./types.ts";

export const decisionPaper: DocTemplate = {
  slug: "decision-paper",
  title: "Trustee or PCC decision paper",
  summary: "A short paper to help your trustees make a well-informed decision about a digital change.",
  howToUse: [
    "Use this for any significant digital decision, such as choosing a new system or changing email provider. Keep it to 1 or 2 pages.",
    "Send it to trustees at least a week before the meeting, so they have time to read it and ask questions.",
  ],
  relatedGuidance: ["bringing-people-along", "trustee-responsibilities", "choosing-systems"],
  lastReviewed: "18 November 2026",
  sections: [
    {
      heading: "About this paper",
      blocks: [
        { type: "field", label: "Title of decision", hint: "For example, \"Choosing a church management system\"" },
        { type: "field", label: "Written by" },
        { type: "field", label: "For the meeting on", hint: "Date" },
      ],
    },
    {
      heading: "What we're asking the trustees to decide",
      blocks: [{ type: "field", label: "Decision needed", hint: "One or two sentences", lines: 2 }],
    },
    {
      heading: "The problem",
      blocks: [
        { type: "note", text: "Describe the problem in plain words, and who it affects. For example, \"Rotas take the administrator 4 hours a week, and volunteers often miss changes.\"" },
        { type: "field", label: "The problem", lines: 4 },
      ],
    },
    {
      heading: "Options considered",
      blocks: [
        { type: "note", text: "Always include \"do nothing\" as an option. Costs should cover this year and the next 2 years, including set-up fees and VAT." },
        {
          type: "table",
          columns: ["Option", "Cost over 3 years", "Benefits", "Drawbacks and risks"],
          rows: [["Do nothing", "", "", ""]],
          blankRows: 3,
        },
      ],
    },
    {
      heading: "Personal data and safeguarding",
      blocks: [
        { type: "field", label: "What personal data is involved, and how will it be protected?", lines: 3 },
        { type: "field", label: "Are there any safeguarding implications?", lines: 2 },
      ],
    },
    {
      heading: "If we want to leave later",
      blocks: [{ type: "field", label: "Can we get our data out, and what notice is needed?", lines: 2 }],
    },
    {
      heading: "People and training",
      blocks: [{ type: "field", label: "Who will be affected, and how will we help them?", lines: 3 }],
    },
    {
      heading: "Recommendation",
      blocks: [{ type: "field", label: "We recommend", hint: "Say which option and why", lines: 4 }],
    },
    {
      heading: "Decision",
      blocks: [
        { type: "note", text: "Complete this section at the meeting." },
        { type: "field", label: "Decision made" },
        { type: "field", label: "Date" },
        { type: "field", label: "Who will carry it out" },
        { type: "field", label: "Date to review how it went" },
      ],
    },
  ],
};
