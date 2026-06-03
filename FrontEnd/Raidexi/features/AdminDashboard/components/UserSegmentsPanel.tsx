import { UserRound } from "lucide-react";
import { userSegments } from "../constants";
import { AdminPill } from "./AdminPill";

export function UserSegmentsPanel() {
  return (
    <section className="raidexi-shell rounded-[2rem] p-1.5 lg:col-span-2">
      <div className="raidexi-core rounded-[calc(2rem-0.375rem)] p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <AdminPill>Phân khúc người dùng</AdminPill>
            <h2 className="mt-4 font-serif text-4xl font-light leading-none text-[var(--ink)]">Hành trình đo và chọn size</h2>
          </div>
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[rgba(93,116,101,0.12)] text-[var(--signal-blue)]">
            <UserRound size={18} strokeWidth={1.15} />
          </span>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {userSegments.map((segment) => (
            <article key={segment.label} className="rounded-[1.5rem] border border-[rgba(24,23,20,0.08)] bg-[rgba(255,253,247,0.58)] p-5">
              <p className="text-sm font-extrabold text-[var(--ink)]">{segment.label}</p>
              <p className="mt-4 font-serif text-5xl font-light leading-none text-[var(--signal-blue)]">{segment.value}</p>
              <p className="mt-3 min-h-10 text-xs leading-5 text-[var(--ink-muted)]">{segment.detail}</p>
              <div className="mt-5 rounded-full bg-[rgba(24,23,20,0.08)] p-1">
                <div className="h-1.5 rounded-full bg-[var(--brass)]" style={{ width: `${segment.progress}%` }} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
