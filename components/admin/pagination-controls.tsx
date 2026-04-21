"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  isLoading?: boolean;
}

export function PaginationControls({
  currentPage,
  totalPages,
  isLoading = false,
}: PaginationControlsProps) {
  const router = useRouter();
  const canGoPrevious = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  const handlePageChange = (newPage: number) => {
    router.push(`?page=${newPage}`);
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={!canGoPrevious || isLoading}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-luxury-light border border-luxury-accent/20 text-luxury-text hover:border-luxury-accent/40 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        aria-label="Previous page"
      >
        <ChevronLeft className="w-4 h-4" />
        <span className="hidden sm:inline">Previous</span>
      </button>

      <div className="flex items-center gap-2">
        <span className="text-sm text-luxury-text-muted">
          Page <span className="font-medium text-luxury-text">{currentPage}</span> of{" "}
          <span className="font-medium text-luxury-text">{totalPages}</span>
        </span>
      </div>

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={!canGoNext || isLoading}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-luxury-light border border-luxury-accent/20 text-luxury-text hover:border-luxury-accent/40 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        aria-label="Next page"
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
