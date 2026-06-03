"use client";

import React from "react";
import Link from "next/link";
import { Bot, Search } from "lucide-react";
import { FilterBarProps, FilterType } from "../types";

const FilterBar: React.FC<FilterBarProps> = ({ activeFilter, onFilterChange, searchQuery, onSearchChange, counts }) => {
  const filters = [
    { type: FilterType.ALL, label: "Tất cả", count: counts.all },
    { type: FilterType.International, label: "Quốc tế", count: counts.international },
    { type: FilterType.VietNam, label: "Việt Nam", count: counts.VietNam },
  ];

  return (
    <section className="rx-shell">
      <div className="rx-core flex flex-col gap-5 p-4 lg:flex-row lg:items-center lg:justify-between">
        <label className="relative w-full lg:max-w-[420px]">
          <span className="sr-only">Tìm thương hiệu</span>
          <Search size={16} strokeWidth={1.35} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--ink-muted)]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Tìm thương hiệu hoặc mã ref"
            className="rx-input pl-11"
          />
        </label>

        <div className="flex flex-wrap items-center gap-2">
          <span className="rx-label mr-1">Bộ lọc</span>
          {filters.map((filter) => (
            <button
              key={filter.label}
              onClick={() => onFilterChange(filter.type)}
              className={`rx-btn ${activeFilter === filter.type ? "rx-btn-primary" : "rx-btn-secondary"}`}
              type="button"
            >
              {filter.label}
              <span className="font-mono text-[10px] opacity-70">{filter.count}</span>
            </button>
          ))}
        </div>

        <div className="flex max-w-sm items-center gap-3 rounded-[1.2rem] bg-[rgba(93,116,101,0.08)] p-3 ring-1 ring-[rgba(93,116,101,0.16)]">
          <p className="text-xs leading-relaxed text-[var(--ink-soft)]">
            Không thấy thương hiệu? Dùng Raidexi AI để ước lượng size từ ảnh sản phẩm.
          </p>
          <Link href="/AIAnalyzeImage" className="rx-icon-btn shrink-0" aria-label="Mở Raidexi AI">
            <Bot size={15} strokeWidth={1.35} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FilterBar;
