"use client";

import { AlertTriangle, BrainCircuit, CheckCircle2, Pause, Play, RadioTower } from "lucide-react";
import { useState } from "react";
import { aiMonitors } from "../constants";
import { AdminPill } from "./AdminPill";

const pipeline = [
  { step: "Camera intake", status: "Live", load: 92 },
  { step: "Landmark extraction", status: "Live", load: 88 },
  { step: "Body profile synthesis", status: "Learning", load: 74 },
  { step: "Size recommendation", status: "Live", load: 96 },
];

export function AiControlWorkspace() {
  const [paused, setPaused] = useState(false);

  return (
    <section className="grid gap-5 xl:grid-cols-[1fr_22rem]">
      <div className="raidexi-shell rounded-[2rem] p-1.5">
        <div className="raidexi-core rounded-[calc(2rem-0.375rem)] p-6">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-start">
            <div>
              <AdminPill>AI control center</AdminPill>
              <h2 className="mt-4 font-serif text-4xl font-light leading-none text-[var(--ink)]">Pipeline đo lường thông minh</h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--ink-soft)]">
                Giám sát từng lớp xử lý từ camera đến gợi ý size, có thể tạm dừng recommendation khi phát hiện độ lệch.
              </p>
            </div>
            <button
              className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-bold ${
                paused ? "bg-[var(--signal-blue)] text-white" : "bg-[var(--ink)] text-[var(--surface-paper)]"
              }`}
              onClick={() => setPaused((value) => !value)}
              type="button"
            >
              {paused ? <Play size={16} strokeWidth={1.15} /> : <Pause size={16} strokeWidth={1.15} />}
              {paused ? "Chạy lại AI" : "Tạm dừng gợi ý"}
            </button>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {pipeline.map((item, index) => (
              <article key={item.step} className="rounded-[1.5rem] border border-[rgba(24,23,20,0.08)] bg-[rgba(255,253,247,0.54)] p-5">
                <div className="flex items-start justify-between gap-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[rgba(93,116,101,0.12)] text-[var(--signal-blue)]">
                    {index === 2 ? <BrainCircuit size={17} strokeWidth={1.15} /> : <RadioTower size={17} strokeWidth={1.15} />}
                  </span>
                  <span className="rounded-full bg-[rgba(24,23,20,0.06)] px-3 py-1 text-xs font-bold text-[var(--ink-soft)]">{item.status}</span>
                </div>
                <h3 className="mt-5 text-base font-extrabold text-[var(--ink)]">{item.step}</h3>
                <div className="mt-5 rounded-full bg-[rgba(24,23,20,0.08)] p-1">
                  <div className="h-2 rounded-full bg-[var(--signal-blue)]" style={{ width: `${paused ? item.load - 18 : item.load}%` }} />
                </div>
                <p className="mt-3 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--ink-muted)]">
                  {paused ? "Paused review mode" : `${item.load}% system load`}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>

      <aside className="space-y-5">
        <section className="raidexi-shell rounded-[2rem] p-1.5">
          <div className="raidexi-core rounded-[calc(2rem-0.375rem)] p-5">
            <AdminPill>Monitor</AdminPill>
            <div className="mt-5 space-y-3">
              {aiMonitors.map((item) => (
                <div key={item.label} className="rounded-[1.2rem] border border-[rgba(24,23,20,0.08)] bg-[rgba(255,253,247,0.52)] p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-xs font-extrabold text-[var(--ink)]">{item.label}</p>
                    <CheckCircle2 size={15} strokeWidth={1.15} className="text-[var(--signal-blue)]" />
                  </div>
                  <p className="mt-3 font-serif text-3xl font-light text-[var(--signal-blue)]">{item.value}</p>
                  <p className="mt-1 text-xs text-[var(--ink-muted)]">{item.status}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="raidexi-shell rounded-[2rem] p-1.5">
          <div className="raidexi-core rounded-[calc(2rem-0.375rem)] p-5">
            <AlertTriangle size={20} strokeWidth={1.15} className="text-[var(--tailor-red)]" />
            <h3 className="mt-4 font-serif text-3xl font-light leading-none text-[var(--ink)]">Cảnh báo chất lượng</h3>
            <p className="mt-3 text-xs leading-5 text-[var(--ink-muted)]">
              Denim đang có độ lệch cao hơn chuẩn 3.2%. Nên kiểm tra lại rule waist comfort và bảng size mới upload.
            </p>
            <button className="mt-5 w-full rounded-full bg-[rgba(159,74,61,0.1)] px-4 py-3 text-xs font-bold text-[var(--tailor-red)]" type="button">
              Mở incident
            </button>
          </div>
        </section>
      </aside>
    </section>
  );
}
