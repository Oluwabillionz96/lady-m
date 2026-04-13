/**
 * Metrics Data Configuration
 *
 * This file contains all statistics and metrics displayed on the Home page.
 * These dummy numbers showcase Lady M's credibility and experience.
 * All values can be easily updated as the business grows.
 */

import { Metric } from "@/types";

export const metrics: Metric[] = [
  {
    id: "1",
    value: "500+",
    label: "Happy Clients",
  },
  {
    id: "2",
    value: "10+",
    label: "Years Experience",
  },
  {
    id: "3",
    value: "1000+",
    label: "Custom Pieces",
  },
  {
    id: "4",
    value: "100%",
    label: "Satisfaction Rate",
  },
];

/**
 * Get metric by ID
 * @param id - Metric ID
 * @returns Metric or undefined if not found
 */
export function getMetricById(id: string): Metric | undefined {
  return metrics.find((metric) => metric.id === id);
}

/**
 * Get a subset of metrics
 * @param maxItems - Maximum number of metrics to return
 * @returns Array of metrics
 */
export function getFeaturedMetrics(maxItems: number = 4): Metric[] {
  return metrics.slice(0, maxItems);
}
