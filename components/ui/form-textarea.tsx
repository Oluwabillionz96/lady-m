import { FieldError } from "react-hook-form";
import { useId } from "react";

interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: FieldError;
  helperText?: string;
}

export function FormTextarea({
  label,
  error,
  helperText,
  className,
  id,
  ...props
}: FormTextareaProps) {
  // Generate a unique ID if not provided
  const generatedId = useId();
  const textareaId = id || generatedId;
  const errorId = `${textareaId}-error`;
  const helperId = `${textareaId}-helper`;

  // Build aria-describedby string
  const ariaDescribedBy = [error ? errorId : null, helperText ? helperId : null]
    .filter(Boolean)
    .join(" ");

  return (
    <div>
      {label && (
        <label
          htmlFor={textareaId}
          className="block text-sm font-medium text-luxury-text mb-2"
        >
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={ariaDescribedBy || undefined}
        className={`w-full px-4 py-2.5 bg-luxury-dark border rounded-lg text-luxury-text focus:outline-none focus:ring-2 transition-all resize-none ${
          error
            ? "border-red-500 focus:ring-red-500"
            : "border-luxury-accent/30 focus:ring-luxury-accent"
        } ${className || ""}`}
        {...props}
      />
      {error && <p id={errorId} className="text-red-400 text-xs mt-1.5">{error.message}</p>}
      {helperText && !error && (
        <p id={helperId} className="text-luxury-text-muted text-xs mt-1.5">{helperText}</p>
      )}
    </div>
  );
}
