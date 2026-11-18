import { unzipSync, strFromU8 } from "fflate";
import { describe, expect, it } from "vitest";
import { buildDocx } from "../templates/docx.ts";
import { templates } from "../templates/index.ts";
import { getGuidancePage } from "./guidance";

function escapeXml(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}

async function documentXml(slug: string): Promise<{ body: string; files: string[] }> {
  const template = templates.find((entry) => entry.slug === slug);
  if (!template) throw new Error(slug);
  const zip = unzipSync(new Uint8Array(await buildDocx(template)));
  const body = zip["word/document.xml"];
  if (!body) throw new Error(`${slug}: no word/document.xml`);
  return { body: strFromU8(body), files: Object.keys(zip) };
}

describe("templates", () => {
  it("has 6 templates with unique slugs", () => {
    expect(templates).toHaveLength(6);
    expect(new Set(templates.map((template) => template.slug)).size).toBe(6);
  });

  it("links only to guidance pages that exist", () => {
    for (const template of templates) {
      for (const slug of template.relatedGuidance) {
        expect(getGuidancePage(slug), `${template.slug} → ${slug}`).toBeDefined();
      }
    }
  });

  for (const template of templates) {
    it(`builds a Word document for "${template.title}" with every heading and item`, async () => {
      const { body, files } = await documentXml(template.slug);
      expect(files).toEqual(expect.arrayContaining(["[Content_Types].xml", "word/document.xml", "word/styles.xml"]));
      expect(body).toContain(escapeXml(template.title));
      // Real headings, so the document works with screen readers and the navigation pane.
      expect(body).toContain('w:val="Heading1"');
      for (const section of template.sections) {
        expect(body, section.heading).toContain(escapeXml(section.heading));
        for (const block of section.blocks) {
          if (block.type === "checklist" || block.type === "list") {
            for (const item of block.items) expect(body, item).toContain(escapeXml(item));
          }
          if (block.type === "table") {
            // Header rows repeat on each page.
            expect(body).toContain("<w:tblHeader");
          }
        }
      }
    });
  }

  it("includes the licence and page number in the footer", async () => {
    const template = templates[0];
    if (!template) throw new Error("no templates");
    const zip = unzipSync(new Uint8Array(await buildDocx(template)));
    const footer = Object.entries(zip).find(([name]) => /^word\/footer\d*\.xml$/.test(name));
    expect(footer).toBeDefined();
    const xml = strFromU8(footer?.[1] ?? new Uint8Array());
    expect(xml).toContain("Creative Commons Attribution 4.0");
    expect(xml).toContain("PAGE");
  });
});
