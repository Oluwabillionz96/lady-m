"use client";
import Card from "@/components/ui/Card";
import { formatMetricValue } from "@/lib/utils";

import { Metric } from "@/types";

interface MetricsSectionProps {
  metrics: Metric[];
}

export default function MetricsSection({ metrics }: MetricsSectionProps) {
  return (
    <section className="py-16 md:py-24 bg-luxury-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {metrics.map((metric) => (
            <Card key={metric.id} variant="elevated">
              <div className="text-center">
                {/* Metric Value */}
                <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-luxury-accent mb-2 font-family-heading">
                  {formatMetricValue(metric)}
                </div>

                {/* Metric Label */}
                <div className="text-luxury-text-muted text-sm md:text-base font-medium">
                  {metric.label}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
