"use client";

import { ReactNode, useEffect, useRef } from "react";
import { X } from "lucide-react";

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
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Focus management and trap
  useEffect(() => {
    if (!isOpen) return;

    // Store the element that had focus before modal opened
    const previousActiveElement = document.activeElement as HTMLElement;

    // Focus the close button when modal opens
    setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 0);

    // Handle escape key
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isSubmitting) {
        onClose();
      }
    };

    // Trap focus within modal
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      const focusableElements = modalRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
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
      // Restore focus to previous element
      previousActiveElement?.focus();
    };
  }, [isOpen, onClose, isSubmitting]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: "sm:max-w-sm",
    md: "sm:max-w-lg",
    lg: "sm:max-w-2xl",
  };

  const modalId = "modal-title";

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center z-50"
      aria-hidden="true"
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={modalId}
        className={`bg-luxury-light w-full ${sizeClasses[size]} sm:rounded-xl overflow-hidden shadow-2xl border-t sm:border border-luxury-accent/20`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-luxury-accent/20 bg-luxury-dark/30">
          <h2 id={modalId} className="text-lg sm:text-xl font-semibold text-luxury-text">
            {title}
          </h2>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            disabled={isSubmitting}
            aria-label="Close dialog"
            className="text-luxury-text-muted hover:text-luxury-text p-2 -mr-2 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-luxury-accent rounded"
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
