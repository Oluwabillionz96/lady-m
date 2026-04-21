"use client";

import { ReactNode } from "react";
import { Loader2 } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  children: ReactNode;
}

export default function Button({
  variant = "primary",
  size = "md",
  loading = false,
  disabled,
  children,
  className,
  type="button",
  ...props
}: ButtonProps) {
  const baseClasses =
    "font-medium transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variantClasses = {
    primary:
      "bg-luxury-accent text-luxury-dark hover:bg-luxury-accent-light active:scale-95",
    secondary:
      "bg-luxury-dark border border-luxury-accent/30 text-luxury-text hover:border-luxury-accent/50 active:scale-95",
    danger: "bg-red-500 text-white hover:bg-red-600 active:scale-95",
    ghost: "text-luxury-text-muted hover:text-luxury-text active:scale-95",
  };

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm rounded",
    md: "px-4 py-2 text-sm rounded-lg",
    lg: "px-6 py-3 text-base rounded-lg",
  };

  return (
    <button
      disabled={disabled || loading}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className || ""}`}
      {...props}
      type={type}
    >
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
      {children}
    </button>
  );
}
