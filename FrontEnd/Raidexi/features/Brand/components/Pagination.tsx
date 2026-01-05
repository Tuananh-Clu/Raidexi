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
    <div className="flex items-center justify-between pt-6 font-mono text-xs border-t border-border-sepia text-text-muted">
      <div className="flex items-center gap-4">
        <span>
          SHOWING {totalItems > 0 ? start : 0}-{end} OF {totalItems} BRANDS
        </span>
        <span className="hidden md:inline-block">|</span>
        <span className="hidden md:inline-block">
          PAGE {currentPage} OF {totalPages || 1}
        </span>
      </div>
      <div className="flex gap-1">
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="flex items-center justify-center border size-8 border-border-sepia hover:border-primary hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-border-sepia disabled:hover:text-text-muted"
        >
          <span className="material-symbols-outlined !text-[16px]">
            chevron_left
          </span>
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`size-8 flex items-center justify-center border ${
              currentPage === page
                ? "border-primary bg-primary text-background-dark font-bold"
                : "border-border-sepia hover:border-primary hover:text-primary"
            }`}
          >
            {page}
          </button>
        ))}

        <button
          disabled={currentPage === totalPages || totalPages === 0}
          onClick={() => onPageChange(currentPage + 1)}
          className="flex items-center justify-center border size-8 border-border-sepia hover:border-primary hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-border-sepia disabled:hover:text-text-muted"
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
