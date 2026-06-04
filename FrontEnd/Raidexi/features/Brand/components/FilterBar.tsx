"use client";

import React from "react";
import Link from "next/link";
import { Bot, PenLine, Search, SlidersHorizontal } from "lucide-react";
import { FilterBarProps, FilterType } from "../types";

const FilterBar: React.FC<FilterBarProps> = ({
  activeFilter,
  onFilterChange,
  searchQuery,
  onSearchChange,
  onOpenCustomizer,
  counts,
}) => {
  const filters = [
    { type: FilterType.ALL, label: "Tất cả", count: counts.all },
    { type: FilterType.International, label: "Quốc tế", count: counts.international },
    { type: FilterType.VietNam, label: "Việt Nam", count: counts.VietNam },
  ];

  return (
    <section className="rx-shell">
      <div className="rx-core grid gap-4 p-4 xl:grid-cols-[minmax(17rem,1fr)_auto_minmax(18rem,0.86fr)_minmax(13rem,0.54fr)] xl:items-center">
        <label className="relative min-h-14">
          <span className="sr-only">Tìm thương hiệu</span>
          <Search size={17} strokeWidth={1.35} className="absolute left-5 top-1/2 -translate-y-1/2 text-[var(--ink-muted)]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Tìm thương hiệu hoặc mã ref"
            className="h-14 w-full rounded-full border border-[rgba(24,23,20,0.1)] bg-[rgba(255,253,247,0.68)] pl-12 pr-5 text-sm font-semibold text-[var(--ink)] outline-none transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] placeholder:text-[var(--ink-muted)] hover:bg-[rgba(255,253,247,0.86)] focus:border-[rgba(93,116,101,0.38)] focus:ring-4 focus:ring-[rgba(93,116,101,0.11)]"
          />
        </label>

        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex h-10 items-center gap-2 rounded-full px-2 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--ink-muted)]">
            <SlidersHorizontal size={13} strokeWidth={1.35} />
            Bộ lọc
          </span>
          {filters.map((filter) => {
            const isActive = activeFilter === filter.type;

            return (
              <button
                key={filter.label}
                onClick={() => onFilterChange(filter.type)}
                className={`inline-flex min-h-11 items-center gap-2 rounded-full px-5 text-sm font-bold transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                  isActive
                    ? "bg-[var(--ink)] text-[var(--surface-paper)] shadow-[0_16px_42px_-32px_rgba(24,23,20,0.9)]"
                    : "border border-[rgba(24,23,20,0.1)] bg-[rgba(255,253,247,0.62)] text-[var(--ink)] hover:bg-[rgba(24,23,20,0.055)]"
                }`}
                type="button"
              >
                {filter.label}
                <span className="font-mono text-[10px] opacity-70">{filter.count}</span>
              </button>
            );
          })}
        </div>

        <button
          onClick={onOpenCustomizer}
          className="group flex min-h-16 items-center justify-between gap-4 rounded-[1.45rem] border border-[rgba(93,116,101,0.2)] bg-[linear-gradient(135deg,rgba(93,116,101,0.12),rgba(255,253,247,0.72))] px-5 text-left transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5 hover:border-[rgba(93,116,101,0.36)]"
          type="button"
        >
          <span>
            <span className="block text-sm font-extrabold text-[var(--ink)]">Customize số đo thương hiệu</span>
            <span className="mt-1 block text-xs leading-5 text-[var(--ink-muted)]">Tạo brand profile mới để admin duyệt.</span>
          </span>
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--signal-blue)] text-white transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1">
            <PenLine size={16} strokeWidth={1.35} />
          </span>
        </button>

        <Link
          href="/AIAnalyzeImage"
          className="group flex min-h-16 items-center justify-between gap-4 rounded-[1.45rem] border border-[rgba(154,116,71,0.24)] bg-[linear-gradient(135deg,rgba(154,116,71,0.16),rgba(255,253,247,0.8))] px-5 text-left text-[var(--ink)] transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5 hover:border-[rgba(154,116,71,0.42)]"
          aria-label="Mở Raidexi AI"
        >
          <span>
            <span className="block text-sm font-extrabold text-[var(--ink)]">Raidexi AI</span>
            <span className="mt-1 block text-xs leading-5 text-[var(--ink-muted)]">Ước lượng size từ ảnh số đo khách hàng</span>
          </span>
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--brass)] text-white transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1">
            <Bot size={17} strokeWidth={1.35} />
          </span>
        </Link>
      </div>
    </section>
  );
};

export default FilterBar;
