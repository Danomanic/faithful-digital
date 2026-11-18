// Generates an editable Word document for each template into public/templates/,
// so the static build serves them. Run before `next build`.
import { mkdir, writeFile } from "node:fs/promises";
import { templates } from "../templates/index.ts";
import { buildDocx } from "../templates/docx.ts";

const directory = "public/templates";
await mkdir(directory, { recursive: true });
for (const template of templates) {
  const file = `${directory}/${template.slug}.docx`;
  await writeFile(file, await buildDocx(template));
  console.log(`Wrote ${file}`);
}
