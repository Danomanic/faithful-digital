import type { DocTemplate } from "./types.ts";

export const accountRegister: DocTemplate = {
  slug: "account-register",
  title: "Systems and account ownership register",
  summary: "A register of your church's important accounts and systems, who manages them and who can step in.",
  howToUse: [
    "List every account and system your church relies on. Never write passwords in this register.",
    "Store it in a shared church folder that at least 2 trusted people can open, and review it every 6 months.",
  ],
  relatedGuidance: ["accounts-and-logins", "roles-and-responsibilities", "cyber-security"],
  landscape: true,
  lastReviewed: "18 November 2026",
  sections: [
    {
      heading: "About this register",
      blocks: [
        { type: "field", label: "Church name" },
        { type: "field", label: "Kept by" },
        { type: "field", label: "Last reviewed on", hint: "Date" },
      ],
    },
    {
      heading: "Accounts and systems",
      blocks: [
        { type: "note", text: "Examples are given in the first rows. Replace them with your own. Never record passwords here." },
        {
          type: "table",
          columns: ["Account or system", "What it's for", "Registered to", "Main administrator", "Second administrator", "2-step verification on?", "Renewal date and cost"],
          rows: [
            ["Domain name", "Website and email address", "[Church name]", "", "", "", ""],
            ["Email and documents", "Church email, files and calendar", "", "", "", "", ""],
            ["Website", "Information for newcomers and members", "", "", "", "", ""],
            ["Bank account", "Church finances", "", "", "", "", ""],
            ["Giving platform", "Online and contactless giving", "", "", "", "", ""],
            ["Church management system", "Contacts, rotas and groups", "", "", "", "", ""],
            ["Social media", "News and outreach", "", "", "", "", ""],
          ],
          blankRows: 5,
        },
      ],
    },
    {
      heading: "When someone steps down",
      blocks: [
        {
          type: "checklist",
          items: [
            "Transfer any accounts they administer to another trusted person.",
            "Remove or disable their own accounts.",
            "Remove them from shared files, mailboxes and group chats.",
            "Change the password on any shared login they could access.",
            "Update this register.",
          ],
        },
      ],
    },
  ],
};
