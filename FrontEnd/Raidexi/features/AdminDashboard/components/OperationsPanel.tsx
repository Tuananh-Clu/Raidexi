import { Activity } from "lucide-react";
import { operations } from "../constants";
import { AdminPill } from "./AdminPill";

export function OperationsPanel() {
  return (
    <section className="raidexi-shell rounded-[2rem] p-1.5">
      <div className="raidexi-core rounded-[calc(2rem-0.375rem)] p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <AdminPill>Trạng thái vận hành</AdminPill>
            <h2 className="mt-4 font-serif text-4xl font-light leading-none text-[var(--ink)]">Control room</h2>
          </div>
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[rgba(93,116,101,0.12)] text-[var(--signal-blue)]">
            <Activity size={18} strokeWidth={1.15} />
          </span>
        </div>

        <div className="mt-7 space-y-3">
          {operations.map(({ name, state, value, icon: Icon }) => (
            <div
              key={name}
              className="grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded-[1.25rem] border border-[rgba(24,23,20,0.08)] bg-[rgba(255,253,247,0.58)] p-3"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[rgba(24,23,20,0.055)] text-[var(--ink)]">
                <Icon size={16} strokeWidth={1.15} />
              </span>
              <span>
                <span className="block text-sm font-bold text-[var(--ink)]">{name}</span>
                <span className="block text-xs font-semibold text-[var(--ink-muted)]">{state}</span>
              </span>
              <span className="font-serif text-2xl text-[var(--signal-blue)]">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
