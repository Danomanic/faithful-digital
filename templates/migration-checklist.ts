import type { DocTemplate } from "./types.ts";

export const migrationChecklist: DocTemplate = {
  slug: "migration-checklist",
  title: "Migration checklist",
  summary: "A step-by-step checklist for moving from one system to another without losing data or leaving people behind.",
  howToUse: [
    "Use one copy of this checklist for each system you change. Change one system at a time.",
    "Tick each step as you complete it, and agree dates with everyone involved.",
  ],
  relatedGuidance: ["choosing-systems", "bringing-people-along", "data-protection"],
  lastReviewed: "18 November 2026",
  sections: [
    {
      heading: "About this change",
      blocks: [
        { type: "field", label: "Moving from" },
        { type: "field", label: "Moving to" },
        { type: "field", label: "Person leading the change" },
        { type: "field", label: "Planned switch-over date", hint: "Avoid busy seasons, such as Christmas and Easter" },
      ],
    },
    {
      heading: "Before you start",
      blocks: [
        {
          type: "checklist",
          items: [
            "The trustees have agreed the change.",
            "The new account is registered to the church, with at least 2 administrators.",
            "We've applied for any charity discount.",
            "Data protection terms are in place with the new provider.",
            "We've updated our privacy notice, if needed.",
            "We've decided what data to move, and what to delete instead.",
          ],
        },
      ],
    },
    {
      heading: "Try it first",
      blocks: [
        {
          type: "checklist",
          items: [
            "A small group has tried the new system with real tasks.",
            "We've fixed the problems they found.",
            "We've written simple step-by-step instructions.",
          ],
        },
      ],
    },
    {
      heading: "Tell people",
      blocks: [
        {
          type: "checklist",
          items: [
            "We've told everyone affected what's changing, when and why.",
            "We've offered help sessions for anyone less confident.",
            "People who don't use the new system can still take part another way.",
          ],
        },
      ],
    },
    {
      heading: "Switch over",
      blocks: [
        {
          type: "checklist",
          items: [
            "We've taken a full export or backup of the old system.",
            "We've moved the data and checked a sample to make sure it arrived correctly.",
            "Everyone has access to the new system.",
            "Links, forms and website pages point to the new system.",
            "The old system is read-only, so nothing is added to it by mistake.",
          ],
        },
      ],
    },
    {
      heading: "Afterwards",
      blocks: [
        {
          type: "checklist",
          items: [
            "We've asked people how it's going, and made adjustments.",
            "We've closed the old account and cancelled payments.",
            "We've securely deleted data we no longer need, including old exports.",
            "We've updated our systems and account ownership register.",
            "We've thanked everyone who helped.",
          ],
        },
        { type: "field", label: "Notes and lessons for next time", lines: 4 },
      ],
    },
  ],
};
