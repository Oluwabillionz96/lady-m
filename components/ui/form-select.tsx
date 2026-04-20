import { ChevronDown } from "lucide-react";
import { FieldError } from "react-hook-form";

interface FormSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: FieldError;
  helperText?: string;
  options: Array<{ value: string; label: string }>;
}

export function FormSelect({
  label,
  error,
  helperText,
  options,
  className,
  ...props
}: FormSelectProps) {
  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-luxury-text mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          className={`w-full px-4 py-2.5 pr-10 bg-luxury-dark border rounded-lg text-luxury-text focus:outline-none focus:ring-2 transition-all appearance-none ${
            error
              ? "border-red-500 focus:ring-red-500"
              : "border-luxury-accent/30 focus:ring-luxury-accent"
          } ${className || ""}`}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <ChevronDown className="w-4 h-4 text-luxury-text-muted" />
        </div>
      </div>
      {error && (
        <p className="text-red-400 text-xs mt-1.5">{error.message}</p>
      )}
      {helperText && !error && (
        <p className="text-luxury-text-muted text-xs mt-1.5">{helperText}</p>
      )}
    </div>
  );
}
