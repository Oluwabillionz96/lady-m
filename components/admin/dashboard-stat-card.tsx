import { LucideIcon } from "lucide-react";

interface DashboardStatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  isLoading?: boolean;
}

export default function DashboardStatCard({
  label,
  value,
  icon: Icon,
  isLoading = false,
}: DashboardStatCardProps) {
  return (
    <div className="bg-luxury-light rounded-lg p-6 border border-luxury-accent/20">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-luxury-text-muted text-sm">{label}</p>
          <p className="text-2xl font-bold text-luxury-text">
            {isLoading ? "--" : value}
          </p>
        </div>
        <Icon className="w-8 h-8 text-luxury-accent" />
      </div>
    </div>
  );
}
