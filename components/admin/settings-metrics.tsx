"use client";

import { Metric } from "@/lib/actions/metrics";
import { MetricCard } from "./metric-card";

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
          <MetricCard
            key={metric.id}
            metric={metric}
            onEdit={onEditClick}
          />
        ))}
      </div>
    </div>
  );
}
