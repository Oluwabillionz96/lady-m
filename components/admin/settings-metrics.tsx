"use client";

import { Metric } from "@/lib/actions/metrics";
import { Edit2 } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

interface MetricsEditState {
  metricId: string | null;
  value: string;
}

interface SettingsMetricsProps {
  metrics: Metric[];
  onEditClick: (metric: Metric) => void;
}

export default function SettingsMetrics({
  metrics,
  onEditClick,
}: SettingsMetricsProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-luxury-text mb-4">
        Metrics
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {metrics.map((metric) => (
          <div
            key={metric.id}
            className="bg-luxury-light rounded-lg border border-luxury-accent/20 p-4 hover:border-luxury-accent/40 transition-all"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <p className="text-xs text-luxury-text-muted mb-2">
                  {metric.label}
                </p>
                <p className="text-2xl font-bold text-luxury-accent mb-1">
                  {metric.value}
                </p>
              </div>
              <button
                onClick={() => onEditClick(metric)}
                className="p-2 text-luxury-text-muted hover:text-luxury-accent transition-colors shrink-0"
              >
                <Edit2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
