"use client";
import React from "react";
import { FilterBarProps, FilterType } from "../types";
import { Bot } from "lucide-react";

const FilterBar: React.FC<FilterBarProps> = ({
  activeFilter,
  onFilterChange,
  searchQuery,
  onSearchChange,
  counts,
}) => {
  const filters = [
    { type: FilterType.ALL, label: "All Brands", count: counts.all },
    { type: FilterType.International, label: "International", count: counts.international },
    { type: FilterType.VietNam, label: "Vietnam", count: counts.VietNam },
  ];

  return (
    <section className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between font-sans">
      {/* SEARCH */}
      <div className="relative w-full lg:w-[380px] group">
        <span className="absolute transition -translate-y-1/2 left-3 top-1/2 material-symbols-outlined text-text-dim group-focus-within:text-primary">
          search
        </span>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search brand or id_ref..."
          className="w-full py-2.5 pl-10 pr-4 text-sm font-medium transition border rounded-xl bg-surface-dark border-border-subtle text-text-secondary placeholder:text-text-dim/50 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none shadow-sm"
        />
      </div>

      {/* FILTERS */}
      <div className="flex flex-wrap items-center gap-3">
        <span className="font-mono text-[10px] font-bold tracking-wider uppercase text-text-dim">
          Filter
        </span>
        {filters.map((filter) => (
          <button
            key={filter.label}
            onClick={() => onFilterChange(filter.type)}
            className={`flex items-center gap-2 px-4 py-2 text-[11px] font-bold uppercase tracking-wide border rounded-full transition-all outline-none focus-visible:ring-2 focus-visible:ring-primary ${
              activeFilter === filter.type
                ? "bg-primary text-background-dark border-primary shadow-md"
                : "bg-surface-dark text-text-muted border-border-subtle hover:border-primary/40 hover:text-primary hover:bg-primary/5"
            }`}
          >
            {filter.label}
            <span className="text-[10px] opacity-80 font-medium">
              ({filter.count})
            </span>
          </button>
        ))}
        <div className="px-3 py-2 ml-2 text-xs border rounded-lg bg-surface-dark border-border-subtle text-text-muted max-w-[320px] flex flex-row items-center gap-3 shadow-sm">
          <p className="leading-tight">
            Không tìm thấy thương hiệu? Dùng <span className="font-bold text-primary">Raidexi AI</span> để ước lượng size.
          </p>
          <a href="/AIAnalyzeImage" className="p-2 transition border rounded-lg bg-primary border-primary text-background-dark hover:bg-primary-dark shadow-sm shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-primary">
            <Bot size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default FilterBar;