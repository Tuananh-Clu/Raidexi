import type { ReactNode } from "react";

export function AdminPill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex rounded-full border border-[rgba(24,23,20,0.1)] bg-[rgba(255,253,247,0.62)] px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--ink-muted)]">
      {children}
    </span>
  );
}
