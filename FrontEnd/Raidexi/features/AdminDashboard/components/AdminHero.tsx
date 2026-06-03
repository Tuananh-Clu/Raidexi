import { Bell, Search, ShieldCheck } from "lucide-react";
import type { AdminTabKey } from "../constants";
import { tabCopy } from "../constants";
import { AdminPill } from "./AdminPill";

export function AdminHero({ activeTab }: { activeTab: AdminTabKey }) {
  const copy = tabCopy[activeTab];

  return (
    <header className="raidexi-shell rounded-[2.4rem] p-1.5">
      <div className="raidexi-core rounded-[calc(2.4rem-0.375rem)] p-6 md:p-8">
        <div className="flex min-w-0 flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div className="min-w-0">
            <div className="flex flex-wrap gap-2">
              <AdminPill>{copy.pill}</AdminPill>
              <span className="inline-flex items-center gap-2 rounded-full bg-[rgba(93,116,101,0.12)] px-3 py-1 text-xs font-bold text-[var(--signal-blue)]">
                <ShieldCheck size={13} strokeWidth={1.15} />
                Hệ thống ổn định
              </span>
            </div>
            <h1 className="mt-5 max-w-4xl font-serif text-[clamp(3.2rem,7vw,6.8rem)] font-light leading-[0.86] text-[var(--ink)]">
              {copy.title}
              <span className="block italic text-[var(--signal-blue)]">{copy.accent}</span>
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-[var(--ink-soft)]">{copy.description}</p>
          </div>

          <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto lg:flex-col">
            <label className="flex min-h-12 w-full items-center gap-3 rounded-full border border-[rgba(24,23,20,0.1)] bg-[rgba(255,253,247,0.66)] px-4 text-sm text-[var(--ink-muted)] sm:min-w-80 lg:w-80">
              <Search size={15} strokeWidth={1.15} />
              <input
                className="w-full bg-transparent outline-none placeholder:text-[var(--ink-muted)]"
                placeholder="Tìm người dùng hoặc thương hiệu..."
              />
            </label>
            <button
              className="flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[var(--ink)] px-5 text-sm font-bold text-[var(--surface-paper)] transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98]"
              type="button"
            >
              <Bell size={15} strokeWidth={1.15} />
              12 cảnh báo
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
