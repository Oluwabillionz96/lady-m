import { ChevronDown } from "lucide-react";
import { FieldError } from "react-hook-form";
import { useId } from "react";

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
  id,
  ...props
}: FormSelectProps) {
  // Generate a unique ID if not provided
  const generatedId = useId();
  const selectId = id || generatedId;
  const errorId = `${selectId}-error`;
  const helperId = `${selectId}-helper`;

  // Build aria-describedby string
  const ariaDescribedBy = [error ? errorId : null, helperText ? helperId : null]
    .filter(Boolean)
    .join(" ");

  return (
    <div>
      {label && (
        <label htmlFor={selectId} className="block text-sm font-medium text-luxury-text mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id={selectId}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={ariaDescribedBy || undefined}
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
          <ChevronDown className="w-4 h-4 text-luxury-text-muted" aria-hidden="true" />
        </div>
      </div>
      {error && (
        <p id={errorId} className="text-red-400 text-xs mt-1.5">{error.message}</p>
      )}
      {helperText && !error && (
        <p id={helperId} className="text-luxury-text-muted text-xs mt-1.5">{helperText}</p>
      )}
    </div>
  );
}
