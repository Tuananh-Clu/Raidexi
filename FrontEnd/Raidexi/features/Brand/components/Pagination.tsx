import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PaginationProps } from "../types";

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, totalItems, itemsPerPage, onPageChange }) => {
  const start = (currentPage - 1) * itemsPerPage + 1;
  const end = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <nav className="flex flex-col gap-4 border-t border-[rgba(24,23,20,0.1)] pt-6 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--ink-muted)] md:flex-row md:items-center md:justify-between" aria-label="Phân trang thương hiệu">
      <div className="flex flex-wrap items-center gap-3">
        <span>{totalItems > 0 ? `${start}-${end}` : "0"} / {totalItems} thương hiệu</span>
        <span className="hidden text-[var(--brass)] md:inline">|</span>
        <span>Trang {currentPage} / {totalPages || 1}</span>
      </div>

      <div className="flex gap-2">
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className={`rx-icon-btn ${currentPage === 1 ? "rx-btn-disabled" : ""}`}
          aria-label="Trang trước"
          type="button"
        >
          <ChevronLeft size={16} strokeWidth={1.35} />
        </button>

        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`flex h-9 w-9 items-center justify-center rounded-full text-xs transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--signal-blue)] ${
              currentPage === page
                ? "bg-[var(--ink)] text-[var(--surface-paper)]"
                : "bg-[rgba(24,23,20,0.06)] text-[var(--ink)] hover:bg-[rgba(24,23,20,0.1)]"
            }`}
            aria-current={currentPage === page ? "page" : undefined}
            type="button"
          >
            {page}
          </button>
        ))}

        <button
          disabled={currentPage === totalPages || totalPages === 0}
          onClick={() => onPageChange(currentPage + 1)}
          className={`rx-icon-btn ${currentPage === totalPages || totalPages === 0 ? "rx-btn-disabled" : ""}`}
          aria-label="Trang sau"
          type="button"
        >
          <ChevronRight size={16} strokeWidth={1.35} />
        </button>
      </div>
    </nav>
  );
};

export default Pagination;
