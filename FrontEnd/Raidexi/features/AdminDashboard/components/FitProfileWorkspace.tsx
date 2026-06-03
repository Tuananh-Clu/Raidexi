"use client";

import { Check, ClipboardCheck, Eye, SlidersHorizontal, X } from "lucide-react";
import { useState } from "react";
import { fitProfileRows } from "../constants";
import { AdminPill } from "./AdminPill";

export function FitProfileWorkspace() {
  const [selectedId, setSelectedId] = useState(fitProfileRows[0].id);
  const selected = fitProfileRows.find((row) => row.id === selectedId) || fitProfileRows[0];

  return (
    <section className="grid gap-5 xl:grid-cols-[1fr_23rem]">
      <div className="raidexi-shell rounded-[2rem] p-1.5">
        <div className="raidexi-core rounded-[calc(2rem-0.375rem)] p-6">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
            <div>
              <AdminPill>Review queue</AdminPill>
              <h2 className="mt-4 font-serif text-4xl font-light leading-none text-[var(--ink)]">Duyệt hồ sơ cơ thể số</h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--ink-soft)]">
                Mỗi hồ sơ được kiểm theo độ đầy đủ landmark, độ tin cậy số đo và tín hiệu bất thường trước khi đưa vào gợi ý.
              </p>
            </div>
            <button
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[var(--ink)] px-5 text-sm font-bold text-[var(--surface-paper)]"
              type="button"
            >
              <SlidersHorizontal size={16} strokeWidth={1.15} />
              Bộ lọc kiểm duyệt
            </button>
          </div>

          <div className="mt-8 grid gap-3">
            {fitProfileRows.map((row) => {
              const isActive = row.id === selectedId;

              return (
                <button
                  key={row.id}
                  className={`grid gap-4 rounded-[1.5rem] border p-4 text-left transition-all md:grid-cols-[0.8fr_1fr_0.5fr_0.7fr_auto] md:items-center ${
                    isActive
                      ? "border-[rgba(93,116,101,0.34)] bg-[rgba(93,116,101,0.12)]"
                      : "border-[rgba(24,23,20,0.08)] bg-[rgba(255,253,247,0.5)] hover:bg-[rgba(24,23,20,0.04)]"
                  }`}
                  onClick={() => setSelectedId(row.id)}
                  type="button"
                >
                  <span className="font-mono text-xs font-semibold text-[var(--ink-muted)]">{row.id}</span>
                  <span>
                    <span className="block text-sm font-extrabold text-[var(--ink)]">{row.name}</span>
                    <span className="mt-1 block text-xs text-[var(--ink-muted)]">{row.lastScan}</span>
                  </span>
                  <span className="font-serif text-3xl font-light text-[var(--signal-blue)]">{row.quality}</span>
                  <span className="rounded-full bg-[rgba(255,253,247,0.7)] px-3 py-1 text-center text-xs font-bold text-[var(--ink-soft)]">
                    {row.signal}
                  </span>
                  <Eye size={17} strokeWidth={1.15} className="text-[var(--ink-muted)]" />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <aside className="raidexi-shell rounded-[2rem] p-1.5">
        <div className="raidexi-core rounded-[calc(2rem-0.375rem)] p-6">
          <ClipboardCheck size={22} strokeWidth={1.15} className="text-[var(--signal-blue)]" />
          <h3 className="mt-5 font-serif text-4xl font-light leading-none text-[var(--ink)]">{selected.name}</h3>
          <p className="mt-2 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[var(--ink-muted)]">{selected.id}</p>
          <div className="mt-6 space-y-3">
            {["Chiều cao", "Vòng ngực", "Vòng eo", "Vòng hông", "Vai"].map((item, index) => (
              <div key={item} className="flex items-center justify-between rounded-full bg-[rgba(24,23,20,0.045)] px-4 py-3">
                <span className="text-xs font-bold text-[var(--ink-soft)]">{item}</span>
                <span className="font-mono text-xs font-semibold text-[var(--ink)]">{index === 4 ? selected.signal : "Đã xác thực"}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 grid grid-cols-2 gap-2">
            <button className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[var(--signal-blue)] px-4 text-xs font-bold text-white" type="button">
              <Check size={15} strokeWidth={1.15} />
              Duyệt
            </button>
            <button className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[rgba(24,23,20,0.12)] px-4 text-xs font-bold text-[var(--ink)]" type="button">
              <X size={15} strokeWidth={1.15} />
              Trả lại
            </button>
          </div>
        </div>
      </aside>
    </section>
  );
}
