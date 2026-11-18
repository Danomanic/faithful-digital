import type { DocTemplate } from "./types.ts";
import { digitalStrategy } from "./digital-strategy.ts";
import { aiPolicy } from "./ai-policy.ts";
import { dataProtectionChecklist } from "./data-protection-checklist.ts";
import { decisionPaper } from "./decision-paper.ts";
import { accountRegister } from "./account-register.ts";
import { migrationChecklist } from "./migration-checklist.ts";

export type { Block, DocTemplate, TemplateSection } from "./types.ts";

export const templates: DocTemplate[] = [
  digitalStrategy,
  aiPolicy,
  dataProtectionChecklist,
  decisionPaper,
  accountRegister,
  migrationChecklist,
];

export function getTemplate(slug: string): DocTemplate | undefined {
  return templates.find((template) => template.slug === slug);
}

export function docxPath(template: DocTemplate): string {
  return `/templates/${template.slug}.docx`;
}
