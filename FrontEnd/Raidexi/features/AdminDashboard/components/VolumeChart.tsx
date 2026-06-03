import { chartBars } from "../constants";
import { AdminPill } from "./AdminPill";

export function VolumeChart() {
  const max = Math.max(...chartBars);

  return (
    <section className="raidexi-shell rounded-[2rem] p-1.5 lg:col-span-2">
      <div className="raidexi-core rounded-[calc(2rem-0.375rem)] p-6">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
          <div>
            <AdminPill>Tín hiệu nhu cầu</AdminPill>
            <h2 className="mt-4 font-serif text-4xl font-light leading-none text-[var(--ink)]">Lượt đo theo tháng</h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-[var(--ink-soft)]">
              Theo dõi nhịp tăng trưởng hồ sơ fit để cân bằng năng lực xử lý AI, dữ liệu thương hiệu và hỗ trợ người dùng.
            </p>
          </div>
          <div className="rounded-full bg-[var(--ink)] px-4 py-2 text-xs font-bold text-[var(--surface-paper)]">
            +28% quý này
          </div>
        </div>

        <div className="mt-10 flex h-64 items-end gap-3 rounded-[1.5rem] border border-[rgba(24,23,20,0.08)] bg-[rgba(255,253,247,0.52)] p-4">
          {chartBars.map((value, index) => (
            <div key={`${value}-${index}`} className="flex h-full flex-1 flex-col justify-end gap-2">
              <div
                className="rounded-t-full bg-[linear-gradient(180deg,var(--signal-blue),rgba(93,116,101,0.34))] transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1"
                style={{ height: `${Math.max(10, (value / max) * 100)}%` }}
              />
              <span className="text-center font-mono text-[9px] font-semibold text-[var(--ink-muted)]">{index + 1}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
