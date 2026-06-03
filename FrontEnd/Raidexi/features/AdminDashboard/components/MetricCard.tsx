import type { Metric } from "../constants";
import { toneStyles } from "../constants";

export function MetricCard({ metric }: { metric: Metric }) {
  return (
    <article className="raidexi-shell rounded-[1.8rem] p-1.5">
      <div className="raidexi-core h-full rounded-[calc(1.8rem-0.375rem)] p-5">
        <div className="flex items-start justify-between gap-4">
          <p className="max-w-[10rem] text-sm font-bold leading-5 text-[var(--ink-soft)]">{metric.label}</p>
          <span className={`rounded-full px-2.5 py-1 font-mono text-[10px] font-semibold ${toneStyles[metric.tone]}`}>
            {metric.delta}
          </span>
        </div>
        <p className="mt-8 font-serif text-5xl font-light leading-none text-[var(--ink)]">{metric.value}</p>
      </div>
    </article>
  );
}
