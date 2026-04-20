"use client";

import { ReactNode } from "react";
import { X, Loader2 } from "lucide-react";

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
  isSubmitting?: boolean;
  size?: "sm" | "md" | "lg";
}

export default function BaseModal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  isSubmitting = false,
  size = "md",
}: BaseModalProps) {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: "sm:max-w-sm",
    md: "sm:max-w-lg",
    lg: "sm:max-w-2xl",
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center z-50">
      <div
        className={`bg-luxury-light w-full ${sizeClasses[size]} sm:rounded-xl overflow-hidden shadow-2xl border-t sm:border border-luxury-accent/20`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-luxury-accent/20 bg-luxury-dark/30">
          <h2 className="text-lg sm:text-xl font-semibold text-luxury-text">
            {title}
          </h2>
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="text-luxury-text-muted hover:text-luxury-text p-2 -mr-2 disabled:opacity-50"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6">{children}</div>

        {/* Footer */}
        {footer && (
          <div className="flex items-center justify-end gap-3 px-4 sm:px-6 py-3 sm:py-4 border-t border-luxury-accent/20 bg-luxury-dark/30">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
