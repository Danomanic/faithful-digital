import type { DocTemplate } from "./types.ts";

export const aiPolicy: DocTemplate = {
  slug: "ai-policy",
  title: "AI use policy",
  summary: "A short policy setting out how people may use AI tools for church work, what stays human and what must never be entered.",
  howToUse: [
    "Adapt this policy to your church, and remove anything that doesn't apply. Delete the notes in italics before you use it.",
    "Agree it at a trustee meeting and share it with everyone who does church work, including volunteers.",
    "Review it at least once a year, because AI tools change quickly.",
  ],
  relatedGuidance: ["using-ai-well", "choosing-ai-tools", "writing-an-ai-policy"],
  professionalAdviceNote: true,
  lastReviewed: "18 November 2026",
  sections: [
    {
      heading: "About this policy",
      blocks: [
        { type: "paragraph", text: "This policy applies to everyone who does work for [church name], including staff, trustees and volunteers, when they use artificial intelligence (AI) tools for church work." },
        { type: "field", label: "Agreed by the trustees on", hint: "Date" },
        { type: "field", label: "Next review date" },
        { type: "field", label: "Person to ask about this policy", hint: "Name and contact details" },
      ],
    },
    {
      heading: "Why we have this policy",
      blocks: [
        { type: "paragraph", text: "We believe every person is made in the image of God, and that care, prayer and spiritual guidance belong in human relationships. AI tools can save time and help us include more people. They can also make mistakes, and can put people's personal information at risk." },
        { type: "paragraph", text: "This policy helps us use AI in ways that are honest, safe and caring." },
      ],
    },
    {
      heading: "Approved tools",
      blocks: [
        { type: "note", text: "List the tools people may use, and which accounts to use them with. Prefer church accounts with suitable data protection terms. See the Faithful Digital guidance on choosing AI tools." },
        {
          type: "table",
          columns: ["Tool", "Account to use", "Approved for"],
          rows: [["[Tool name]", "[For example, church Microsoft 365 account]", "[For example, drafting and summarising public information]"]],
          blankRows: 2,
        },
        { type: "paragraph", text: "Ask [person or role] before using any other AI tool for church work." },
      ],
    },
    {
      heading: "Where AI can help",
      blocks: [
        { type: "paragraph", text: "You may use approved AI tools for tasks like these, as long as no personal information is entered:" },
        {
          type: "list",
          items: [
            "first drafts of notices, newsletters and routine letters",
            "summarising or simplifying public documents",
            "translating public information, with a fluent speaker checking anything important",
            "improving accessibility, such as drafting captions or image descriptions for checking",
            "ideas for events, teaching or worship",
            "routine admin, such as help with spreadsheets",
          ],
        },
      ],
    },
    {
      heading: "What stays human",
      blocks: [
        { type: "paragraph", text: "We don't use AI to:" },
        {
          type: "list",
          items: [
            "give pastoral care or spiritual direction, or respond to someone in distress",
            "make decisions about safeguarding, employment or people's roles",
            "answer pastoral questions through an automated chatbot",
            "replace prayer, study and discernment in preparing to teach or preach",
          ],
        },
        { type: "note", text: "Agree together how your church views using AI in sermon preparation, for example as a research aid. Write your decision here." },
      ],
    },
    {
      heading: "Information you must never enter",
      blocks: [
        { type: "paragraph", text: "Never enter the following into an AI tool, unless the trustees have approved that tool for that specific purpose:" },
        {
          type: "list",
          items: [
            "names, contact details or other personal details of anyone connected with the church",
            "safeguarding information or concerns",
            "pastoral conversations or prayer requests",
            "health, employment or financial information about any person",
            "confidential church business, such as trustee discussions",
          ],
        },
        { type: "paragraph", text: "If you wouldn't share it with a stranger, don't put it into AI." },
      ],
    },
    {
      heading: "Checking and responsibility",
      blocks: [
        {
          type: "list",
          items: [
            "You remain responsible for anything you produce with AI's help.",
            "Check facts, names, dates, quotations and scripture references before using AI-assisted work.",
            "Check that the tone suits our church and that nothing is unfair or excludes people.",
            "[Person or role] checks AI-assisted work before it's published in the church's name.",
          ],
        },
      ],
    },
    {
      heading: "Being open",
      blocks: [
        {
          type: "list",
          items: [
            "Say when AI has made a significant contribution to a report, policy, public communication or material used in worship.",
            "Label AI-generated images.",
            "Never use AI to make something appear real when it isn't.",
          ],
        },
      ],
    },
    {
      heading: "Mistakes and concerns",
      blocks: [
        { type: "paragraph", text: "If you think personal information has been entered into an AI tool by mistake, tell [data protection lead] straight away. We may need to treat it as a data breach." },
        { type: "paragraph", text: "Raise any other questions or concerns with [person or role]." },
      ],
    },
  ],
};
