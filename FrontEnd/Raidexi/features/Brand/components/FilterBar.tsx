"use client";
import React from "react";
import { FilterBarProps, FilterType } from "../types";
import { Bot } from "lucide-react";
import { Router } from "next/router";

const FilterBar: React.FC<FilterBarProps> = ({
  activeFilter,
  onFilterChange,
  searchQuery,
  onSearchChange,
  counts,
}) => {
  const getButtonStyles = (filter: FilterType) => {
    return activeFilter === filter
      ? "bg-primary text-black border-primary shadow-md"
      : "bg-surface-dark text-text-muted border-border-sepia hover:border-primary hover:text-white";
  };
  const filters = [
    { type: FilterType.ALL, label: "All Brands", count: counts.all },
    { type: FilterType.International, label: "International", count: counts.international },
    { type: FilterType.VietNam, label: "Vietnam", count: counts.VietNam }
  ];
  
  return (
    <section className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

      {/* SEARCH */}
      <div className="relative w-full lg:w-[380px] group">
        <span className="absolute transition -translate-y-1/2 left-3 top-1/2 material-symbols-outlined text-text-muted group-focus-within:text-primary">
          search
        </span>

        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search brand or id_ref..."
          className="w-full py-3 pl-10 pr-4 text-sm transition border rounded-lg bg-surface-dark border-border-sepia text-text-paper focus:border-primary focus:outline-none"
        />
      </div>

      {/* FILTERS */}
      <div className="flex flex-wrap items-center gap-3">

        <span className="font-mono text-xs tracking-wider uppercase text-text-muted">
          Filter
        </span>

        {filters.map((filter) => (
          <button
            key={filter.label}
            onClick={() => onFilterChange(filter.type)}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-mono uppercase tracking-wide border rounded-full transition ${getButtonStyles(filter.type)}`}
          >
            {filter.label}
            <span className="text-[10px] opacity-70">
              ({filter.count})
            </span>
          </button>
        ))}
        <div className="px-3 py-2 ml-2 text-xs border rounded-md bg-surface-dark border-border-sepia text-text-muted max-w-[320px] flex flex-row items-center">
          <h1>
            Don't see your brand? Use <span className="font-semibold text-primary">Raidexi AI</span> to estimate the size.
          </h1>
          <a href="/AIAnalyzeImage" className="px-3 py-1 mt-2 font-mono text-xs tracking-wide text-black uppercase transition border rounded-full bg-primary border-primary hover:bg-primary/90">
          <Bot  size={16} />
          </a>
        </div>

      </div>
    </section>
  );
};

export default FilterBar;