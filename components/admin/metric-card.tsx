import { Edit2 } from "lucide-react";
import { Metric } from "@/lib/actions/metrics";

interface MetricCardProps {
  metric: Metric;
  onEdit: (metric: Metric) => void;
}

export function MetricCard({ metric, onEdit }: MetricCardProps) {
  return (
    <div className="bg-luxury-light rounded-lg border border-luxury-accent/20 p-4 hover:border-luxury-accent/40 transition-all">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-xs text-luxury-text-muted mb-2">{metric.label}</p>
          <p className="text-2xl font-bold text-luxury-accent mb-1">
            {metric.value}
          </p>
        </div>
        <button
          onClick={() => onEdit(metric)}
          className="p-2 text-luxury-text-muted hover:text-luxury-accent transition-colors shrink-0"
        >
          <Edit2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
