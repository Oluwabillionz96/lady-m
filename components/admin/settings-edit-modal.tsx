"use client";

import { Loader2, X } from "lucide-react";
import { useState } from "react";
import { SettingKey } from "./SettingsForm";



interface EditModalProps {
  settingKey: SettingKey;
  label: string;
  value?: string;
  onClose: () => void;
  onSave: (key: SettingKey, value: string) => Promise<void>;
  type?: "text" | "email" | "tel" | "url" | "textarea";
  placeholder?: string;
}

export default function EditModal({
  settingKey,
  label,
  value,
  onClose,
  onSave,
  type = "text",
  placeholder,
}: EditModalProps) {
  const [inputValue, setInputValue] = useState(value);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSave = async () => {
    setIsSubmitting(true);
    try {
      await onSave(settingKey, inputValue ?? "");
      onClose();
    } catch {
      // Error handled in parent
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center z-50">
      <div className="bg-luxury-light w-full sm:w-[95vw] sm:max-w-lg sm:rounded-xl overflow-hidden shadow-2xl border-t sm:border border-luxury-accent/20">
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-luxury-accent/20 bg-luxury-dark/30">
          <h2 className="text-lg sm:text-xl font-semibold text-luxury-text">
            Edit {label}
          </h2>
          <button
            onClick={onClose}
            className="text-luxury-text-muted hover:text-luxury-text p-2 -mr-2"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6">
          {type === "textarea" ? (
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              rows={8}
              className="w-full px-4 py-2.5 bg-luxury-dark border border-luxury-accent/30 rounded-lg text-luxury-text focus:outline-none focus:ring-2 focus:ring-luxury-accent transition-all resize-none"
              placeholder={placeholder}
            />
          ) : (
            <input
              type={type}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full px-4 py-2.5 bg-luxury-dark border border-luxury-accent/30 rounded-lg text-luxury-text focus:outline-none focus:ring-2 focus:ring-luxury-accent transition-all"
              placeholder={placeholder}
            />
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-4 sm:px-6 py-3 sm:py-4 border-t border-luxury-accent/20 bg-luxury-dark/30">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-luxury-text-muted hover:text-luxury-text transition-colors font-medium text-sm"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={isSubmitting}
            className="px-4 py-2 bg-luxury-accent text-luxury-dark rounded-lg hover:bg-luxury-accent-light transition-colors font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
