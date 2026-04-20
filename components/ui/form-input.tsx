import { ReactNode } from "react";
import { FieldError } from "react-hook-form";

interface FormInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: FieldError;
  helperText?: string;
}

export function FormInput({
  label,
  error,
  helperText,
  className,
  ...props
}: FormInputProps) {
  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-luxury-text mb-2">
          {label}
        </label>
      )}
      <input
        className={`w-full px-4 py-2.5 bg-luxury-dark border rounded-lg text-luxury-text focus:outline-none focus:ring-2 transition-all ${
          error
            ? "border-red-500 focus:ring-red-500"
            : "border-luxury-accent/30 focus:ring-luxury-accent"
        } ${className || ""}`}
        {...props}
      />
      {error && (
        <p className="text-red-400 text-xs mt-1.5">{error.message}</p>
      )}
      {helperText && !error && (
        <p className="text-luxury-text-muted text-xs mt-1.5">{helperText}</p>
      )}
    </div>
  );
}
