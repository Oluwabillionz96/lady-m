import { LucideIcon } from "lucide-react";
import { Edit2 } from "lucide-react";
import { IconType } from "react-icons";

interface SettingCardProps {
  icon: LucideIcon | IconType;
  label: string;
  value: string;
  onEdit: () => void;
  isLoading?: boolean;
}

export function SettingCard({
  icon: Icon,
  label,
  value,
  onEdit,
  isLoading = false,
}: SettingCardProps) {
  return (
    <div className="bg-luxury-light rounded-lg border border-luxury-accent/20 p-4 hover:border-luxury-accent/40 transition-all">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <div className="p-2 bg-luxury-dark rounded-lg shrink-0">
            <Icon className="w-4 h-4 text-luxury-accent" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-luxury-text-muted mb-1">{label}</p>
            <p className="text-luxury-text font-medium wrap-break-word whitespace-pre-wrap">
              {value || (
                <span className="text-luxury-text-muted italic">Not set</span>
              )}
            </p>
          </div>
        </div>
        <button
          onClick={onEdit}
          disabled={isLoading}
          className="p-2 text-luxury-text-muted hover:text-luxury-accent transition-colors shrink-0 disabled:opacity-50"
        >
          <Edit2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
