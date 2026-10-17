import type { ReactNode } from "react";

export function Badge({ children }: { children: ReactNode }) {
  return <span className="status-badge">{children}</span>;
}
