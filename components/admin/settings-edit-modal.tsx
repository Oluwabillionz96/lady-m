"use client";

import { useState } from "react";
import { SettingKey } from "./settings-form";
import BaseModal from "@/components/ui/base-modal";
import Button from "@/components/ui/button";
import { FormInput } from "@/components/ui/form-input";
import { FormTextarea } from "@/components/ui/form-textarea";

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
    <BaseModal
      isOpen={true}
      onClose={onClose}
      title={`Edit ${label}`}
      isSubmitting={isSubmitting}
      footer={
        <>
          <Button variant="ghost" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave} loading={isSubmitting}>
            Save
          </Button>
        </>
      }
    >
      {type === "textarea" ? (
        <FormTextarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          rows={8}
          placeholder={placeholder}
          disabled={isSubmitting}
        />
      ) : (
        <FormInput
          type={type}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={placeholder}
          disabled={isSubmitting}
        />
      )}
    </BaseModal>
  );
}
