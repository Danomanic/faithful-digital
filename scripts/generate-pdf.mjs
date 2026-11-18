// Generates the PDF blueprint from the /paper/ print route in the static export.
// Run after `npm run build`. Writes out/faithful-digital-blueprint.pdf.
import { spawn } from "node:child_process";
import { readFile, writeFile } from "node:fs/promises";
import { chromium } from "@playwright/test";

const port = 4399;
const output = "out/faithful-digital-blueprint.pdf";
const manifest = JSON.parse(await readFile("package.json", "utf8"));

function countPages(pdf) {
  return (pdf.toString("latin1").match(/\/Type\s*\/Page(?![s\w])/g) ?? []).length;
}

const server = spawn(process.execPath, ["scripts/serve-out.mjs", String(port)], { stdio: ["ignore", "pipe", "inherit"] });
await new Promise((resolve, reject) => {
  server.stdout.once("data", resolve);
  server.once("error", reject);
});

const browser = await chromium.launch();
try {
  const page = await browser.newPage();
  await page.goto(`http://localhost:${port}/paper/`, { waitUntil: "networkidle" });
  await page.emulateMedia({ media: "print" });

  const published = await page.$eval("[data-published]", (element) => element.getAttribute("data-published"));
  const pdfOptions = {
    format: "A4",
    printBackground: true,
    preferCSSPageSize: true,
    displayHeaderFooter: true,
    headerTemplate: "<span></span>",
    footerTemplate: `<div style="font: 8pt sans-serif; width: 100%; margin: 0 18mm; display: flex; justify-content: space-between; color: #55524e;">
      <span>Faithful Digital · Version ${manifest.version} · ${published}</span>
      <span>Page <span class="pageNumber"></span> of <span class="totalPages"></span></span>
    </div>`,
  };

  const sections = await page.$$eval("[data-paper-section]", (elements) => elements.map((element) => element.dataset.paperSection));

  // Find where each section starts: render the sections before it, plus only the first line of that
  // section. The last page of that render is the section's first page.
  async function pagesFor(visible, stub) {
    await page.evaluate(([show, stubbed]) => {
      for (const element of document.querySelectorAll("[data-paper-section]")) {
        const name = element.dataset.paperSection;
        element.style.display = show.includes(name) || name === stubbed ? "" : "none";
        [...element.children].forEach((child, index) => {
          child.style.display = name === stubbed && index > 0 ? "none" : "";
        });
      }
    }, [visible, stub]);
    return countPages(await page.pdf(pdfOptions));
  }

  const starts = {};
  for (const [index, section] of sections.entries()) {
    if (section === "cover" || section === "contents") continue;
    starts[section] = await pagesFor(sections.slice(0, index), section);
  }
  const expected = await pagesFor(sections);

  await page.evaluate((numbers) => {
    for (const element of document.querySelectorAll("[data-paper-section], [data-paper-section] > *")) element.style.display = "";
    for (const [slug, number] of Object.entries(numbers)) {
      const target = document.querySelector(`[data-page-for="${slug}"]`);
      if (target) target.textContent = String(number);
    }
  }, starts);

  const pdf = await page.pdf(pdfOptions);
  const total = countPages(pdf);
  if (total !== expected) {
    throw new Error(`Contents page numbers may be wrong: expected ${expected} pages but the PDF has ${total}.`);
  }
  await writeFile(output, pdf);
  console.log(`Wrote ${output} (${total} pages).`);
} finally {
  await browser.close();
  server.kill();
}
