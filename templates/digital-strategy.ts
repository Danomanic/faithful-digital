import type { DocTemplate } from "./types.ts";

export const digitalStrategy: DocTemplate = {
  slug: "digital-strategy",
  title: "Digital strategy one-pager",
  summary: "A single page that sets out why your church uses digital tools, your priorities for the year and who is responsible.",
  howToUse: [
    "Fill this in with your leaders, ideally in a single meeting. Keep it to one page.",
    "Agree it at a trustee meeting, and review it once a year.",
  ],
  relatedGuidance: ["why-digital-matters", "roles-and-responsibilities"],
  lastReviewed: "18 November 2026",
  sections: [
    {
      heading: "About this strategy",
      blocks: [
        { type: "field", label: "Church name" },
        { type: "field", label: "Agreed by the trustees on", hint: "Date" },
        { type: "field", label: "Next review date" },
      ],
    },
    {
      heading: "Why we use digital tools",
      blocks: [
        { type: "note", text: "In 2 or 3 sentences, say how digital tools serve your church's mission. For example, helping newcomers find you, keeping people connected between Sundays, or reducing the load on volunteers." },
        { type: "field", label: "Our purpose", lines: 3 },
      ],
    },
    {
      heading: "Our principles",
      blocks: [
        { type: "note", text: "Keep, change or remove these to suit your church." },
        {
          type: "list",
          items: [
            "We use digital tools to serve people, not to replace being together.",
            "We look after people's personal information as carefully as we look after the people themselves.",
            "No one should be shut out because of age, disability or confidence with technology.",
            "The church, not any individual, owns and controls its accounts and data.",
            "We choose tools that are affordable now and in future years.",
          ],
        },
      ],
    },
    {
      heading: "Our priorities for this year",
      blocks: [
        { type: "note", text: "Choose no more than 3. The roadmap on the Faithful Digital website suggests a sensible order." },
        { type: "table", columns: ["Priority", "Why it matters", "Who leads", "Done by"], blankRows: 3 },
      ],
    },
    {
      heading: "Who is responsible",
      blocks: [
        {
          type: "table",
          columns: ["Role", "Name", "Cover if they're unavailable"],
          rows: [
            ["Lead trustee for digital", "", ""],
            ["Digital coordinator", "", ""],
            ["Data protection lead", "", ""],
            ["Safeguarding lead", "", ""],
          ],
        },
      ],
    },
    {
      heading: "Budget",
      blocks: [{ type: "field", label: "What we expect to spend on digital tools this year", hint: "Include charity discounts and any costs volunteers currently pay personally" }],
    },
  ],
};
