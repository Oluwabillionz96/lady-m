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
    <nav aria-label="Pagination" className="flex items-center justify-center gap-2 mt-8">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={!canGoPrevious || isLoading}
        aria-label={`Go to previous page (page ${currentPage - 1})`}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-luxury-light border border-luxury-accent/20 text-luxury-text hover:border-luxury-accent/40 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-luxury-accent"
      >
        <ChevronLeft className="w-4 h-4" aria-hidden="true" />
        <span className="hidden sm:inline">Previous</span>
      </button>

      <div className="flex items-center gap-2" role="status" aria-live="polite" aria-atomic="true">
        <span className="text-sm text-luxury-text-muted">
          Page <span className="font-medium text-luxury-text">{currentPage}</span> of{" "}
          <span className="font-medium text-luxury-text">{totalPages}</span>
        </span>
      </div>

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={!canGoNext || isLoading}
        aria-label={`Go to next page (page ${currentPage + 1})`}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-luxury-light border border-luxury-accent/20 text-luxury-text hover:border-luxury-accent/40 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-luxury-accent"
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight className="w-4 h-4" aria-hidden="true" />
      </button>
    </nav>
  );
}
