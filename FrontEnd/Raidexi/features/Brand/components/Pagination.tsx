import React from "react";
import { PaginationProps } from "../types";

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
}) => {
  const start = (currentPage - 1) * itemsPerPage + 1;
  const end = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="flex items-center justify-between pt-6 font-mono text-[11px] font-bold border-t border-border-subtle text-[#94a3b8] tracking-wider">
      <div className="flex items-center gap-4">
        <span>
          SHOWING {totalItems > 0 ? start : 0}-{end} OF {totalItems} BRANDS
        </span>
        <span className="hidden md:inline-block text-border-brass">|</span>
        <span className="hidden md:inline-block">
          PAGE {currentPage} OF {totalPages || 1}
        </span>
      </div>
      <div className="flex gap-1">
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="flex items-center justify-center border rounded-md size-8 border-border-subtle bg-white hover:border-primary/40 hover:text-primary shadow-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-border-subtle disabled:hover:text-[#94a3b8] disabled:shadow-none transition-all"
        >
          <span className="material-symbols-outlined !text-[16px]">
            chevron_left
          </span>
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`size-8 rounded-md flex items-center justify-center border shadow-sm transition-all ${
              currentPage === page
                ? "border-primary bg-primary text-background-dark font-bold"
                : "border-border-subtle bg-white hover:border-primary/40 hover:text-primary"
            }`}
          >
            {page}
          </button>
        ))}

        <button
          disabled={currentPage === totalPages || totalPages === 0}
          onClick={() => onPageChange(currentPage + 1)}
          className="flex items-center justify-center border rounded-md size-8 border-border-subtle bg-white hover:border-primary/40 hover:text-primary shadow-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-border-subtle disabled:hover:text-[#94a3b8] disabled:shadow-none transition-all"
        >
          <span className="material-symbols-outlined !text-[16px]">
            chevron_right
          </span>
        </button>
      </div>
    </div>
  );
};

export default Pagination;
