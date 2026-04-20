"use client";

import { Loader2, X } from "lucide-react";
import { useState } from "react";
import { Metric, updateMetric } from "@/lib/actions/metrics";
import { toast } from "sonner";

interface MetricsEditModalProps {
  metric: Metric | null;
  onClose: () => void;
  onSuccess: (metric: Metric) => void;
}

export default function MetricsEditModal({
  metric,
  onClose,
  onSuccess,
}: MetricsEditModalProps) {
  const [inputValue, setInputValue] = useState(metric?.value || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!metric) return null;

  const handleSave = async () => {
    if (!inputValue.trim()) {
      toast.error("Value cannot be empty");
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await updateMetric(metric.id, inputValue);
      console.log({ result });

      if (result.success) {
        toast.success("Metric updated successfully");
        onSuccess(result.data);
        onClose();
      } else {
        toast.error(result.error || "Failed to update metric");
      }
    } catch (error) {
      toast.error("An error occurred while updating the metric");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center z-50">
      <div className="bg-luxury-light w-full sm:w-[95vw] sm:max-w-lg sm:rounded-xl overflow-hidden shadow-2xl border-t sm:border border-luxury-accent/20">
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-luxury-accent/20 bg-luxury-dark/30">
          <h2 className="text-lg sm:text-xl font-semibold text-luxury-text">
            Edit {metric.label}
          </h2>
          <button
            onClick={onClose}
            className="text-luxury-text-muted hover:text-luxury-text p-2 -mr-2"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6">
          <div className="mb-4">
            <label className="block text-sm text-luxury-text-muted mb-2">
              Value
            </label>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full px-4 py-2.5 bg-luxury-dark border border-luxury-accent/30 rounded-lg text-luxury-text focus:outline-none focus:ring-2 focus:ring-luxury-accent transition-all"
              placeholder="e.g., 500+, 10+, 1000+"
            />
          </div>
          <p className="text-xs text-luxury-text-muted">
            Examples: 500+, 10+, 1000+, 100%
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-4 sm:px-6 py-3 sm:py-4 border-t border-luxury-accent/20 bg-luxury-dark/30">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-luxury-text-muted hover:text-luxury-text transition-colors font-medium text-sm"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={isSubmitting}
            className="px-4 py-2 bg-luxury-accent text-luxury-dark rounded-lg hover:bg-luxury-accent-light transition-colors font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
