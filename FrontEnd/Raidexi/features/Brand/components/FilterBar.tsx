import React from 'react';
import { FilterBarProps, FilterType } from '../types';



const FilterBar: React.FC<FilterBarProps> = ({ 
  activeFilter, 
  onFilterChange, 
  searchQuery, 
  onSearchChange,
  counts 
}) => {
  
  const getButtonStyles = (filter: FilterType) => {
    if (activeFilter === filter) {
      return "bg-primary text-background-dark font-bold border-primary";
    }
    return "bg-transparent text-text-muted hover:text-white hover:border-text-muted border-border-sepia";
  };

  return (
    <section className="grid grid-cols-1 gap-6 lg:grid-cols-12">
      {/* Search */}
      <div className="relative lg:col-span-4 group">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <span className="transition-colors material-symbols-outlined text-text-muted group-focus-within:text-primary">search</span>
        </div>
        <input 
          type="text" 
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full bg-surface-dark border border-border-sepia text-text-paper pl-10 pr-4 py-3 font-mono text-sm retro-input focus:ring-0 placeholder:text-[#5a5446]" 
          placeholder="SEARCH BRANDS OR ID_REF..." 
        />
      </div>

      {/* Filter Chips */}
      <div className="flex flex-wrap items-center gap-2 lg:col-span-8">
        <span className="mr-2 font-mono text-xs tracking-wide uppercase text-text-muted">Filter:</span>
        
        <button 
          onClick={() => onFilterChange(FilterType.ALL)}
          className={`h-10 px-4 font-mono text-xs uppercase tracking-wider flex items-center border transition-all ${getButtonStyles(FilterType.ALL)}`}
        >
          All Brands [{counts.all}]
        </button>
        
        <button 
          onClick={() => onFilterChange(FilterType.OPTIMIZED)}
          className={`h-10 px-4 font-mono text-xs uppercase tracking-wider flex items-center border transition-all ${getButtonStyles(FilterType.OPTIMIZED)}`}
        >
          Optimized [{counts.optimized}]
        </button>
        
        <button 
          onClick={() => onFilterChange(FilterType.PENDING)}
          className={`h-10 px-4 font-mono text-xs uppercase tracking-wider flex items-center border transition-all ${getButtonStyles(FilterType.PENDING)}`}
        >
          Pending Input [{counts.pending}]
        </button>
        
        <button 
          onClick={() => onFilterChange(FilterType.RECALIBRATE)}
          className={`h-10 px-4 font-mono text-xs uppercase tracking-wider flex items-center border transition-all ${getButtonStyles(FilterType.RECALIBRATE)}`}
        >
          Recalibration [{counts.recalibrate}]
        </button>
      </div>
    </section>
  );
};

export default FilterBar;