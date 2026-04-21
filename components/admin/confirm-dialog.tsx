"use client";

import { AlertTriangle, X } from "lucide-react";
import { useEffect, useRef } from "react";

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  variant?: "danger" | "warning" | "info";
  isLoading?: boolean;
}

export function ConfirmDialog({
  isOpen,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
  variant = "danger",
  isLoading = false,
}: ConfirmDialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const cancelButtonRef = useRef<HTMLButtonElement>(null);

  // Focus management
  useEffect(() => {
    if (!isOpen) return;

    const previousActiveElement = document.activeElement as HTMLElement;

    // Focus cancel button (safer default for destructive dialogs)
    setTimeout(() => {
      cancelButtonRef.current?.focus();
    }, 0);

    // Handle escape key
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isLoading) {
        onCancel();
      }
    };

    // Trap focus within dialog
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      const focusableElements = dialogRef.current?.querySelectorAll(
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled])'
      );

      if (!focusableElements || focusableElements.length === 0) return;

      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
      const activeElement = document.activeElement;

      if (e.shiftKey) {
        if (activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("keydown", handleKeyDown);
      previousActiveElement?.focus();
    };
  }, [isOpen, onCancel, isLoading]);

  if (!isOpen) return null;

  const variantStyles = {
    danger: {
      icon: "text-red-400",
      iconBg: "bg-red-500/10",
      button: "bg-red-500 hover:bg-red-600",
    },
    warning: {
      icon: "text-yellow-400",
      iconBg: "bg-yellow-500/10",
      button: "bg-yellow-500 hover:bg-yellow-600",
    },
    info: {
      icon: "text-blue-400",
      iconBg: "bg-blue-500/10",
      button: "bg-blue-500 hover:bg-blue-600",
    },
  };

  const styles = variantStyles[variant];
  const dialogId = "confirm-dialog-title";
  const messageId = "confirm-dialog-message";

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-60 p-4" aria-hidden="true">
      <div
        ref={dialogRef}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby={dialogId}
        aria-describedby={messageId}
        className="bg-luxury-light rounded-xl w-full max-w-md shadow-2xl border border-luxury-accent/20"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 pb-4">
          <div className="flex items-start gap-4">
            <div
              className={`w-12 h-12 rounded-full ${styles.iconBg} flex items-center justify-center shrink-0`}
              aria-hidden="true"
            >
              <AlertTriangle className={`w-6 h-6 ${styles.icon}`} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 id={dialogId} className="text-lg font-semibold text-luxury-text mb-2">
                {title}
              </h3>
              <p id={messageId} className="text-sm text-luxury-text-muted leading-relaxed">
                {message}
              </p>
            </div>
          </div>
          <button
            onClick={onCancel}
            aria-label="Close dialog"
            className="text-luxury-text-muted hover:text-luxury-text transition-colors p-1 -mr-1 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-luxury-accent rounded"
            disabled={isLoading}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-luxury-accent/20">
          <button
            ref={cancelButtonRef}
            onClick={onCancel}
            disabled={isLoading}
            className="px-4 py-2 text-luxury-text-muted hover:text-luxury-text transition-colors font-medium disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-luxury-accent rounded"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className={`px-6 py-2 ${styles.button} text-white rounded-lg transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-luxury-light`}
          >
            {isLoading ? "Processing..." : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
