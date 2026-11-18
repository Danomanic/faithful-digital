// Templates are written once here and rendered both as web pages and as editable Word documents.
// Text in [square brackets] is for the church to replace.

export type Block =
  | { type: "paragraph"; text: string }
  /** Guidance for the person filling in the template, to delete before use. */
  | { type: "note"; text: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "checklist"; items: string[] }
  /** A labelled space to write an answer. */
  | { type: "field"; label: string; hint?: string; lines?: number }
  | { type: "table"; columns: string[]; rows?: string[][]; blankRows?: number };

export interface TemplateSection {
  heading: string;
  blocks: Block[];
}

export interface DocTemplate {
  slug: string;
  title: string;
  summary: string;
  /** How to use the template. Shown on the web page, and as a note at the top of the document. */
  howToUse: string[];
  /** Guidance pages that explain the thinking behind the template. */
  relatedGuidance: string[];
  /** Shown when the template touches law, so readers get it checked. */
  professionalAdviceNote?: boolean;
  /** Use landscape pages in Word, for wide tables. */
  landscape?: boolean;
  lastReviewed: string;
  sections: TemplateSection[];
}
