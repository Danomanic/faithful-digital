import type { MDXComponents } from "mdx/types";
import { Children, isValidElement, type ReactNode } from "react";
import { InsetText, WarningText, Details } from "@/components/content";
import { TableWrapper } from "@/components/table";
import { Tabs } from "@/components/tabs";

function textOf(node: ReactNode): string {
  return Children.toArray(node)
    .map((child) => {
      if (typeof child === "string" || typeof child === "number") return String(child);
      if (isValidElement<{ children?: ReactNode }>(child)) return textOf(child.props.children);
      return "";
    })
    .join("");
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function headerCells(node: ReactNode): string[] {
  return Children.toArray(node).flatMap((child) => {
    if (!isValidElement<{ children?: ReactNode }>(child)) return [];
    if (child.type === "th") return [textOf(child.props.children)];
    if (child.type === "tbody") return [];
    return headerCells(child.props.children);
  });
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    h2: ({ children, ...props }) => (
      <h2 id={slugify(textOf(children))} {...props}>
        {children}
      </h2>
    ),
    table: (props) => (
      <TableWrapper label={`Table: ${headerCells(props.children).join(", ")}`}>
        <table className="fd-table" {...props} />
      </TableWrapper>
    ),
    InsetText,
    WarningText,
    Details,
    Tabs,
  };
}
