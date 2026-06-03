import { Radar } from "lucide-react";
import { aiMonitors } from "../constants";
import { AdminPill } from "./AdminPill";

export function AiMonitorPanel() {
  return (
    <section className="raidexi-shell rounded-[2rem] p-1.5 lg:col-span-2">
      <div className="raidexi-core rounded-[calc(2rem-0.375rem)] p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <AdminPill>AI health</AdminPill>
            <h2 className="mt-4 font-serif text-4xl font-light leading-none text-[var(--ink)]">Hệ thống đo lường</h2>
          </div>
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[rgba(93,116,101,0.12)] text-[var(--signal-blue)]">
            <Radar size={18} strokeWidth={1.15} />
          </span>
        </div>

        <div className="mt-8 grid gap-3 md:grid-cols-2">
          {aiMonitors.map((item) => (
            <article
              key={item.label}
              className="grid grid-cols-[1fr_auto] items-center gap-4 rounded-[1.4rem] border border-[rgba(24,23,20,0.08)] bg-[rgba(255,253,247,0.58)] p-4"
            >
              <span>
                <span className="block text-sm font-extrabold text-[var(--ink)]">{item.label}</span>
                <span className="mt-1 block text-xs font-semibold text-[var(--ink-muted)]">{item.status}</span>
              </span>
              <span className="font-serif text-3xl font-light text-[var(--signal-blue)]">{item.value}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
