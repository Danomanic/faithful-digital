import { describe, expect, it } from "vitest";
import { recommend, toolFinderQuestions } from "./tool-finder";
import type { Answers } from "./journey";

const base: Answers = {
  needs: ["church-management", "accounting", "giving", "websites", "email-newsletters"],
  size: "small",
  budget: "any",
  denomination: "other",
  office: "no",
};

function ids(answers: Answers, category: string): string[] {
  return recommend(answers).find((result) => result.category.slug === category)?.suggested.map((entry) => entry.tool.id) ?? [];
}

describe("tool finder questions", () => {
  it("offers every comparison category", () => {
    expect(toolFinderQuestions[0]?.options.map((option) => option.value)).toEqual([
      "church-management",
      "accounting",
      "giving",
      "websites",
      "email-newsletters",
    ]);
  });
});

describe("recommend", () => {
  it("only returns the categories the church needs", () => {
    expect(recommend({ ...base, needs: ["giving"] }).map((result) => result.category.slug)).toEqual(["giving"]);
  });

  it("never suggests a tool we haven't checked", () => {
    for (const result of recommend(base)) {
      for (const { tool } of result.suggested) expect(tool.lastChecked, tool.name).not.toBeNull();
      for (const tool of result.costUnknown) expect(tool.lastChecked, tool.name).not.toBeNull();
    }
  });

  it("only suggests free options when there's no budget", () => {
    const free = recommend({ ...base, budget: "free" });
    for (const result of free) {
      for (const { tool } of result.suggested) expect(tool.costBands?.small, tool.name).toBe("free");
    }
    expect(ids({ ...base, budget: "free" }, "church-management")).toEqual(["planning-center"]);
  });

  it("only suggests A Church Near You to Church of England churches", () => {
    expect(ids(base, "websites")).not.toContain("a-church-near-you");
    expect(ids({ ...base, denomination: "church-of-england" }, "websites")).toContain("a-church-near-you");
  });

  it("only suggests spreadsheets to churches that already have Microsoft 365 or Google Workspace", () => {
    expect(ids(base, "accounting")).not.toContain("accounts-spreadsheet");
    expect(ids({ ...base, office: "yes" }, "accounting")).toContain("accounts-spreadsheet");
  });

  it("uses the cost for the church's size", () => {
    // ChurchDesk is up to £1,000 a year for a small church, but more for a larger one.
    expect(ids({ ...base, budget: "medium" }, "church-management")).toContain("churchdesk");
    expect(ids({ ...base, budget: "medium", size: "medium" }, "church-management")).not.toContain("churchdesk");
  });

  it("lists cheaper options first, and explains each suggestion", () => {
    const result = recommend({ ...base, office: "yes" }).find((entry) => entry.category.slug === "church-management");
    expect(result?.suggested[0]?.tool.costBands?.small).toBe("free");
    for (const entry of result?.suggested ?? []) expect(entry.reasons.length, entry.tool.name).toBeGreaterThan(0);
  });

  it("says when a tool is priced in US dollars", () => {
    const result = recommend(base).find((entry) => entry.category.slug === "church-management");
    const chMeetings = result?.suggested.find((entry) => entry.tool.id === "chmeetings");
    expect(chMeetings?.reasons).toContain("Priced in US dollars, so the cost in pounds will vary");
  });

  it("keeps tools with an unconfirmed cost separate", () => {
    const accounting = recommend(base).find((entry) => entry.category.slug === "accounting");
    expect(accounting?.costUnknown.map((tool) => tool.id)).toContain("quickbooks");
  });
});
