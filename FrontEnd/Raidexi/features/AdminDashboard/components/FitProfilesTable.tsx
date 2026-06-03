import { BadgeCheck } from "lucide-react";
import { fitProfileRows } from "../constants";
import { AdminPill } from "./AdminPill";

export function FitProfilesTable() {
  return (
    <section className="raidexi-shell rounded-[2rem] p-1.5 lg:col-span-2">
      <div className="raidexi-core overflow-hidden rounded-[calc(2rem-0.375rem)]">
        <header className="flex flex-col justify-between gap-4 border-b border-[rgba(24,23,20,0.1)] p-6 md:flex-row md:items-center">
          <div>
            <AdminPill>Hồ sơ fit</AdminPill>
            <h2 className="mt-4 font-serif text-4xl font-light leading-none text-[var(--ink)]">Hàng đợi kiểm duyệt</h2>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full bg-[rgba(93,116,101,0.12)] px-4 py-2 text-xs font-bold text-[var(--signal-blue)]">
            <BadgeCheck size={14} strokeWidth={1.15} />
            4 hồ sơ mới
          </span>
        </header>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[680px] border-collapse text-left">
            <thead>
              <tr className="border-b border-[rgba(24,23,20,0.08)] bg-[rgba(24,23,20,0.045)]">
                {["Mã hồ sơ", "Người dùng", "Chất lượng", "Tín hiệu", "Cập nhật"].map((col) => (
                  <th
                    key={col}
                    className="px-6 py-4 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--ink-muted)]"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {fitProfileRows.map((row) => (
                <tr key={row.id} className="border-b border-[rgba(24,23,20,0.08)] last:border-b-0">
                  <td className="px-6 py-4 font-mono text-xs font-semibold text-[var(--ink-muted)]">{row.id}</td>
                  <td className="px-6 py-4 text-sm font-extrabold text-[var(--ink)]">{row.name}</td>
                  <td className="px-6 py-4 font-serif text-2xl text-[var(--signal-blue)]">{row.quality}</td>
                  <td className="px-6 py-4">
                    <span className="rounded-full border border-[rgba(24,23,20,0.1)] bg-[rgba(255,253,247,0.62)] px-3 py-1 text-xs font-bold text-[var(--ink-soft)]">
                      {row.signal}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-[var(--ink-soft)]">{row.lastScan}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
