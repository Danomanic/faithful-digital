// Builds an editable Word document from a template.
import {
  AlignmentType,
  BorderStyle,
  Document,
  Footer,
  HeadingLevel,
  LevelFormat,
  Packer,
  PageNumber,
  PageOrientation,
  Paragraph,
  Table,
  TableCell,
  TableLayoutType,
  TableRow,
  TextRun,
  WidthType,
} from "docx";
import type { Block, DocTemplate } from "./types.ts";

const FONT = "Arial";
const INK = "1C1B1A";
const MUTED = "55524E";
const PRIMARY = "0B4F4A";
const RULE = "8A8782";
const MARGIN = 1000;
/** Usable width of an A4 page, in twentieths of a point, so tables fill the page in every word processor. */
const contentWidth = (landscape?: boolean) => (landscape ? 16838 : 11906) - 2 * MARGIN;

const light = { style: BorderStyle.SINGLE, size: 4, color: RULE };

function text(value: string, options: { bold?: boolean; italics?: boolean; color?: string; size?: number } = {}) {
  return new TextRun({ text: value, font: FONT, ...options });
}

/** A light box to write an answer in, as bordered paragraphs so it spans the page in every word processor. */
function answerBox(lines: number): Paragraph[] {
  const border = { top: light, bottom: light, left: light, right: light };
  return Array.from({ length: lines }, (_, index) =>
    new Paragraph({
      children: [text("\u00A0")],
      border,
      spacing: { before: 0, after: index === lines - 1 ? 200 : 0, line: 400 },
      indent: { left: 100, right: 100 },
    }),
  );
}

function cell(value: string, width: number, header = false) {
  return new TableCell({
    width: { size: width, type: WidthType.DXA },
    children: [new Paragraph({ children: [text(value, { bold: header })] })],
    shading: header ? { fill: "E8F2F0" } : undefined,
    margins: { top: 80, bottom: 80, left: 100, right: 100 },
  });
}

function renderBlock(block: Block, width: number): (Paragraph | Table)[] {
  switch (block.type) {
    case "paragraph":
      return [new Paragraph({ children: [text(block.text)] })];
    case "note":
      return [
        new Paragraph({
          children: [text("Note: ", { bold: true, italics: true, color: MUTED }), text(block.text, { italics: true, color: MUTED })],
          border: { left: { style: BorderStyle.SINGLE, size: 18, color: "B7DDD6", space: 8 } },
          indent: { left: 200 },
        }),
      ];
    case "list":
      return block.items.map(
        (item) =>
          new Paragraph({
            children: [text(item)],
            numbering: block.ordered ? { reference: "numbers", level: 0 } : undefined,
            bullet: block.ordered ? undefined : { level: 0 },
          }),
      );
    case "checklist":
      return block.items.map(
        (item) =>
          new Paragraph({
            children: [text("☐  ", { color: PRIMARY }), text(item)],
            indent: { left: 360, hanging: 360 },
            spacing: { after: 120 },
          }),
      );
    case "field": {
      const label = new Paragraph({
        children: [text(block.label, { bold: true }), ...(block.hint ? [text(`  ${block.hint}`, { color: MUTED })] : [])],
        spacing: { before: 200, after: 80 },
        keepNext: true,
      });
      return [label, ...answerBox(block.lines ?? 1)];
    }
    case "table": {
      const columns = block.columns.length;
      const columnWidth = Math.floor(width / columns);
      const rows = [
        new TableRow({ tableHeader: true, children: block.columns.map((column) => cell(column, columnWidth, true)) }),
        ...(block.rows ?? []).map((row) => new TableRow({ children: row.map((value) => cell(value, columnWidth)) })),
        ...Array.from({ length: block.blankRows ?? 0 }, () => new TableRow({ children: Array.from({ length: columns }, () => cell("", columnWidth)) })),
      ];
      return [
        new Table({
          rows,
          width: { size: columnWidth * columns, type: WidthType.DXA },
          layout: TableLayoutType.FIXED,
          columnWidths: Array.from({ length: columns }, () => columnWidth),
        }),
        new Paragraph({ children: [] }),
      ];
    }
  }
}

export function buildDocument(template: DocTemplate): Document {
  const intro: Paragraph[] = [
    new Paragraph({ heading: HeadingLevel.TITLE, children: [text(template.title)] }),
    new Paragraph({ children: [text(template.summary, { color: MUTED })], spacing: { after: 240 } }),
    new Paragraph({ heading: HeadingLevel.HEADING_2, children: [text("How to use this template")] }),
    ...template.howToUse.map((line) => new Paragraph({ children: [text(line, { italics: true })] })),
    new Paragraph({
      children: [text("Replace text in [square brackets] and delete the notes in italics before you use this document.", { italics: true })],
    }),
  ];
  if (template.professionalAdviceNote) {
    intro.push(
      new Paragraph({
        children: [
          text(
            "This template gives general information, not legal or professional advice. Have it checked by your denomination or network, or a qualified adviser, before you adopt it.",
            { italics: true, bold: true },
          ),
        ],
      }),
    );
  }

  const body = template.sections.flatMap((section) => [
    new Paragraph({ heading: HeadingLevel.HEADING_1, children: [text(section.heading)] }),
    ...section.blocks.flatMap((block) => renderBlock(block, contentWidth(template.landscape))),
  ]);

  return new Document({
    creator: "Faithful Digital",
    title: template.title,
    description: template.summary,
    styles: {
      default: {
        document: { run: { font: FONT, size: 24, color: INK }, paragraph: { spacing: { after: 160, line: 300 } } },
        title: { run: { font: FONT, size: 48, bold: true, color: INK } },
        heading1: { run: { font: FONT, size: 32, bold: true, color: PRIMARY }, paragraph: { spacing: { before: 360, after: 120 }, keepNext: true } },
        heading2: { run: { font: FONT, size: 26, bold: true, color: INK }, paragraph: { spacing: { before: 240, after: 80 }, keepNext: true } },
      },
    },
    numbering: {
      config: [
        { reference: "numbers", levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.START }] },
      ],
    },
    sections: [
      {
        properties: {
          page: {
            size: { orientation: template.landscape ? PageOrientation.LANDSCAPE : PageOrientation.PORTRAIT },
            margin: { top: MARGIN, bottom: MARGIN, left: MARGIN, right: MARGIN },
          },
        },
        footers: {
          default: new Footer({
            children: [
              new Paragraph({
                children: [
                  text("Based on a template from Faithful Digital, used under Creative Commons Attribution 4.0. Last reviewed " + template.lastReviewed + ". Page ", { color: MUTED, size: 18 }),
                  new TextRun({ children: [PageNumber.CURRENT], font: FONT, color: MUTED, size: 18 }),
                ],
              }),
            ],
          }),
        },
        children: [...intro, ...body],
      },
    ],
  });
}

export function buildDocx(template: DocTemplate): Promise<Buffer> {
  return Packer.toBuffer(buildDocument(template));
}
