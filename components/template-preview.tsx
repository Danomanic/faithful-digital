import { statSync } from "node:fs";
import { join } from "node:path";
import type { Block, DocTemplate } from "@/templates/index.ts";
import { docxPath } from "@/templates/index.ts";
import { TableWrapper } from "./table";

function PreviewBlock({ block }: { block: Block }) {
  switch (block.type) {
    case "paragraph":
      return <p>{block.text}</p>;
    case "note":
      return (
        <p className="fd-template__note">
          <strong>Note:</strong> {block.text}
        </p>
      );
    case "list": {
      const List = block.ordered ? "ol" : "ul";
      return <List>{block.items.map((item) => <li key={item}>{item}</li>)}</List>;
    }
    case "checklist":
      return (
        <ul className="fd-template__checklist">
          {block.items.map((item) => <li key={item}>{item}</li>)}
        </ul>
      );
    case "field":
      return (
        <div className="fd-template__field">
          <strong>{block.label}</strong>
          {block.hint && <span className="fd-muted"> {block.hint}</span>}
        </div>
      );
    case "table":
      return (
        <>
          <TableWrapper label={`Table: ${block.columns.join(", ")}`}>
            <table className="fd-table">
              <thead>
                <tr>{block.columns.map((column) => <th scope="col" key={column}>{column}</th>)}</tr>
              </thead>
              {block.rows && block.rows.length > 0 && (
                <tbody>
                  {block.rows.map((row, rowIndex) => (
                    <tr key={rowIndex}>{row.map((value, index) => <td key={index}>{value}</td>)}</tr>
                  ))}
                </tbody>
              )}
            </table>
          </TableWrapper>
          {block.blankRows ? <p className="fd-small fd-muted">The Word document has {block.blankRows} blank rows for you to fill in.</p> : null}
        </>
      );
  }
}

export function TemplatePreview({ template }: { template: DocTemplate }) {
  return (
    <div className="fd-template">
      {template.sections.map((section) => (
        <section key={section.heading}>
          <h3>{section.heading}</h3>
          {section.blocks.map((block, index) => <PreviewBlock key={index} block={block} />)}
        </section>
      ))}
    </div>
  );
}

/** The size of the generated Word document, for the download link. Run `npm run templates` first. */
export function docxSize(template: DocTemplate): string {
  const bytes = statSync(join(process.cwd(), "public", docxPath(template))).size;
  return `${Math.max(1, Math.round(bytes / 1024))} KB`;
}
