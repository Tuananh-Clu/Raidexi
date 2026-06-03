import { timeline } from "../constants";
import { AdminPill } from "./AdminPill";

export function TimelinePanel() {
  return (
    <section className="raidexi-shell rounded-[2rem] p-1.5">
      <div className="raidexi-core rounded-[calc(2rem-0.375rem)] p-6">
        <AdminPill>Nhật ký</AdminPill>
        <div className="mt-7 space-y-5">
          {timeline.map((item) => (
            <article key={item.time} className="grid grid-cols-[3.2rem_1fr] gap-4">
              <span className="font-mono text-[10px] font-semibold text-[var(--ink-muted)]">{item.time}</span>
              <span className="border-l border-[rgba(24,23,20,0.12)] pl-4">
                <span className="block text-sm font-extrabold text-[var(--ink)]">{item.title}</span>
                <span className="mt-1 block text-xs leading-5 text-[var(--ink-muted)]">{item.copy}</span>
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
