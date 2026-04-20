"use client";

import { useState } from "react";
import { Metric, updateMetric } from "@/lib/actions/metrics";
import BaseModal from "@/components/ui/base-modal";
import Button from "@/components/ui/button";
import { toast } from "sonner";
import { FormInput } from "@/components/ui/form-input";

interface MetricsEditModalProps {
  metric: Metric;
  onClose: () => void;
  onSuccess: (metric: Metric) => void;
}

export default function MetricsEditModal({
  metric,
  onClose,
  onSuccess,
}: MetricsEditModalProps) {
  const [value, setValue] = useState(metric.value);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSave = async () => {
    setIsSubmitting(true);
    try {
      const result = await updateMetric(metric.id, value);
      if (result.success) {
        toast.success("Metric updated successfully");
        onSuccess(result.data);
        onClose();
      } else {
        toast.error(result.error || "Failed to update metric");
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to update metric",
      );
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
          <Button variant="primary" onClick={handleSave} loading={isSubmitting}>
            Save
          </Button>
        </>
      }
    >
      <FormInput
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="e.g., 500, 10, 1000"
        disabled={isSubmitting}
      />
    </BaseModal>
  );
}
