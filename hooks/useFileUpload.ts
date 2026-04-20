import { useState, useRef } from "react";
import { toast } from "sonner";

interface UseFileUploadOptions {
  maxSize?: number; // in bytes
  acceptedTypes?: string[];
}

interface UseFileUploadReturn {
  file: File | null;
  preview: string;
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removeFile: () => void;
  reset: () => void;
}

/**
 * Hook for managing file uploads with validation and preview
 * Handles file selection, validation, and cleanup
 */
export function useFileUpload(
  options: UseFileUploadOptions = {}
): UseFileUploadReturn {
  const {
    maxSize = 5 * 1024 * 1024, // 5MB default
    acceptedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"],
  } = options;

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    // Validate file type
    if (!acceptedTypes.includes(selectedFile.type)) {
      toast.error("Please select a valid image file");
      return;
    }

    // Validate file size
    if (selectedFile.size > maxSize) {
      const maxSizeMB = Math.round(maxSize / (1024 * 1024));
      toast.error(`Image must be less than ${maxSizeMB}MB`);
      return;
    }

    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const removeFile = () => {
    if (preview && preview.startsWith("blob:")) {
      URL.revokeObjectURL(preview);
    }
    setFile(null);
    setPreview("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const reset = () => {
    removeFile();
  };

  return {
    file,
    preview,
    fileInputRef,
    handleFileSelect,
    removeFile,
    reset,
  };
}
