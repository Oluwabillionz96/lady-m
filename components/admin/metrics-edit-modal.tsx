"use client";

import { useState } from "react";
import { Metric, updateMetric } from "@/lib/actions/metrics";
import { toast } from "sonner";
import BaseModal from "@/components/ui/base-modal";
import Button from "@/components/ui/button";

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
    <BaseModal
      isOpen={true}
      onClose={onClose}
      title={`Edit ${metric.label}`}
      isSubmitting={isSubmitting}
      footer={
        <>
          <Button variant="ghost" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleSave}
            loading={isSubmitting}
          >
            Save
          </Button>
        </>
      }
    >
      <div className="space-y-3">
        <label className="block text-sm text-luxury-text-muted">Value</label>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-full px-4 py-2.5 bg-luxury-dark border border-luxury-accent/30 rounded-lg text-luxury-text focus:outline-none focus:ring-2 focus:ring-luxury-accent transition-all"
          placeholder="e.g., 500+, 10+, 1000+"
        />
        <p className="text-xs text-luxury-text-muted">
          Examples: 500+, 10+, 1000+, 100%
        </p>
      </div>
    </BaseModal>
  );
}
