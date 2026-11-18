import type { DocTemplate } from "./types.ts";

export const dataProtectionChecklist: DocTemplate = {
  slug: "data-protection-checklist",
  title: "Data protection checklist",
  summary: "A checklist to review how your church looks after personal data, with space to record actions.",
  howToUse: [
    "Work through the checklist with your data protection lead. Tick each item you've done, and add actions for anything you haven't.",
    "Share the results with your trustees, and repeat the review once a year.",
  ],
  relatedGuidance: ["data-protection", "emails-and-texts", "accounts-and-logins"],
  professionalAdviceNote: true,
  lastReviewed: "18 November 2026",
  sections: [
    {
      heading: "About this review",
      blocks: [
        { type: "field", label: "Church name" },
        { type: "field", label: "Completed by" },
        { type: "field", label: "Date" },
      ],
    },
    {
      heading: "Responsibility",
      blocks: [
        {
          type: "checklist",
          items: [
            "We have a named data protection lead, and the trustees know who it is.",
            "The trustees have discussed data protection in the last 12 months.",
          ],
        },
      ],
    },
    {
      heading: "Knowing what you hold",
      blocks: [
        {
          type: "checklist",
          items: [
            "We have a list of the personal data we hold, why we hold it and where it's kept.",
            "The list includes paper records, spreadsheets and data on personal phones.",
            "We know how long we keep each type of record, and we delete what we no longer need.",
          ],
        },
      ],
    },
    {
      heading: "Lawful reasons and privacy",
      blocks: [
        {
          type: "checklist",
          items: [
            "We've identified a lawful basis for each use of personal data.",
            "We've identified a condition for special category data, such as information revealing religious belief or health.",
            "We have a plain English privacy notice, published on our website.",
            "We give people our privacy notice when we collect their details.",
            "We've checked whether we need to pay the data protection fee to the Information Commissioner's Office (ICO), using its self-assessment tool.",
          ],
        },
      ],
    },
    {
      heading: "Consent and contact",
      blocks: [
        {
          type: "checklist",
          items: [
            "We have consent, or can use the charitable purpose soft opt-in, before sending marketing emails or texts.",
            "Every marketing message includes a simple way to opt out, and we act on opt-outs promptly.",
            "We have written consent before publishing photos of identifiable people, and parental consent for children.",
            "We ask before adding people to group chats.",
          ],
        },
      ],
    },
    {
      heading: "Security",
      blocks: [
        {
          type: "checklist",
          items: [
            "Personal data is kept in church accounts, not personal ones.",
            "People can only see the personal data they need for their role.",
            "Important accounts use 2-step verification or passkeys.",
            "We remove access promptly when someone steps down.",
            "Paper records are locked away and shredded when no longer needed.",
            "Any provider that holds personal data for us has data protection terms in place.",
          ],
        },
      ],
    },
    {
      heading: "Rights, complaints and breaches",
      blocks: [
        {
          type: "checklist",
          items: [
            "We know how to respond to a request for a copy of someone's data within 1 month.",
            "Our privacy notice tells people how to complain to us about how we use their data.",
            "We acknowledge data protection complaints within 30 days.",
            "Everyone knows who to tell if personal data is lost, stolen or sent to the wrong person.",
            "We know we must report serious breaches to the ICO within 72 hours.",
            "We keep a record of every breach, even if we don't report it.",
          ],
        },
      ],
    },
    {
      heading: "Actions",
      blocks: [{ type: "table", columns: ["Action", "Who", "By when", "Done"], blankRows: 6 }],
    },
  ],
};
