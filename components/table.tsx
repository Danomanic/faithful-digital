import type { ReactNode } from "react";

/** Lets wide tables scroll inside their own focusable region on small screens. */
export function TableWrapper({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="fd-table-wrapper" role="region" aria-label={label} tabIndex={0}>
      {children}
    </div>
  );
}
