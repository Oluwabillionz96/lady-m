import { FieldError } from "react-hook-form";
import { useId } from "react";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: FieldError;
  helperText?: string;
}

export function FormInput({
  label,
  error,
  helperText,
  className,
  id,
  ...props
}: FormInputProps) {
  // Generate a unique ID if not provided
  const generatedId = useId();
  const inputId = id || generatedId;
  const errorId = `${inputId}-error`;
  const helperId = `${inputId}-helper`;

  // Build aria-describedby string
  const ariaDescribedBy = [error ? errorId : null, helperText ? helperId : null]
    .filter(Boolean)
    .join(" ");

  return (
    <div>
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-luxury-text mb-2"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={ariaDescribedBy || undefined}
        className={`w-full px-4 py-2.5 bg-luxury-dark border rounded-lg text-luxury-text focus:outline-none focus:ring-2 transition-all ${
          error
            ? "border-red-500 focus:ring-red-500"
            : "border-luxury-accent/30 focus:ring-luxury-accent"
        } ${className || ""}`}
        {...props}
      />
      {error && <p className="text-red-400 text-xs mt-1.5">{error.message}</p>}
      {helperText && !error && (
        <p className="text-luxury-text-muted text-xs mt-1.5">{helperText}</p>
      )}
    </div>
  );
}
