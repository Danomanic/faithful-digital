// Confirms the build aligns with GOV.UK patterns without using GOV.UK's code or brand.
import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";

const banned = [
  { pattern: /govuk-[a-z]/i, label: "GOV.UK Frontend class or package name" },
  { pattern: /GDS Transport|GOV\.UK Transport|nta,\s*arial/i, label: "GOV.UK typeface" },
  { pattern: /govuk-crest|govuk-logotype|crown-copyright-logo|govuk-opengraph/i, label: "GOV.UK brand asset" },
];

async function* walk(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) yield* walk(path);
    else yield path;
  }
}

const failures = [];

const manifest = JSON.parse(await readFile("package.json", "utf8"));
const dependencies = { ...manifest.dependencies, ...manifest.devDependencies };
if (Object.keys(dependencies).some((name) => /govuk/i.test(name))) {
  failures.push("package.json: lists a GOV.UK package");
}

let checked = 0;
for await (const file of walk("out")) {
  if (!/\.(html|css|js|txt)$/.test(file)) continue;
  checked += 1;
  const text = await readFile(file, "utf8");
  for (const { pattern, label } of banned) {
    if (pattern.test(text)) failures.push(`${file}: ${label}`);
  }
}

if (failures.length > 0) {
  console.error(`Design alignment check failed:\n${failures.join("\n")}`);
  process.exit(1);
}
console.log(`Design alignment check passed: ${checked} files, no GOV.UK code or brand found.`);
