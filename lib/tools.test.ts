import { describe, expect, it } from "vitest";
import { isStale, staleTools, toolCategories, tools, toolsIn, type ToolRecord } from "./tools";

const base: ToolRecord = {
  id: "example",
  name: "Example",
  category: "accounting",
  cost: null,
  vat: null,
  freePlan: null,
  charityOffer: null,
  ukFit: null,
  dataProtection: null,
  security: null,
  accessibility: null,
  leaving: null,
  goodFor: "",
  drawbacks: "",
  sources: [],
  lastChecked: "2026-01-31",
};

describe("isStale", () => {
  it("treats an entry that has never been checked as stale", () => {
    expect(isStale({ ...base, lastChecked: null }, new Date("2026-02-01"))).toBe(true);
  });
  it("is fresh up to 6 months after it was checked", () => {
    expect(isStale(base, new Date("2026-07-31T00:00:00Z"))).toBe(false);
  });
  it("is stale more than 6 months after it was checked", () => {
    expect(isStale(base, new Date("2026-08-01T00:00:00Z"))).toBe(true);
  });
});

describe("tool data", () => {
  it("has unique ids", () => {
    const ids = tools.map((tool) => tool.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("includes a free or low-cost option and at least 4 options in every category", () => {
    for (const category of toolCategories) {
      const options = toolsIn(category.slug);
      expect(options.length, category.slug).toBeGreaterThanOrEqual(4);
      expect(options.some((tool) => tool.freePlan?.startsWith("Yes")), `${category.slug} has a free option`).toBe(true);
    }
  });

  it("links every vendor's entry to the vendor's own website", () => {
    for (const tool of tools.filter((entry) => entry.url)) {
      const host = new URL(tool.url as string).hostname.replace(/^www\./, "");
      for (const source of tool.sources) {
        expect(source.url, `${tool.name}: ${source.title}`).toBeDefined();
        expect(new URL(source.url as string).hostname.replace(/^www\./, ""), `${tool.name}: ${source.title}`).toBe(host);
      }
    }
  });

  it("uses valid ISO dates, not in the future", () => {
    for (const tool of tools.filter((entry) => entry.lastChecked)) {
      expect(tool.lastChecked, tool.name).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(new Date(`${tool.lastChecked}T00:00:00Z`).getTime(), tool.name).toBeLessThanOrEqual(Date.now());
    }
  });

  it("gives short at-a-glance answers for every checked tool, and only those", () => {
    for (const tool of tools) {
      expect(Boolean(tool.glance), tool.name).toBe(Boolean(tool.lastChecked));
      for (const value of Object.values(tool.glance ?? {})) {
        expect(value.length, `${tool.name}: "${value}"`).toBeLessThanOrEqual(55);
      }
    }
  });

  it("says who can use denomination-specific tools", () => {
    for (const id of ["a-church-near-you", "parish-giving-scheme"]) {
      expect(tools.find((tool) => tool.id === id)?.availability, id).toBeTruthy();
    }
  });

  it("lists entries that haven't been checked as stale", () => {
    const unchecked = tools.filter((tool) => !tool.lastChecked);
    expect(staleTools(new Date())).toEqual(expect.arrayContaining(unchecked));
  });
});
