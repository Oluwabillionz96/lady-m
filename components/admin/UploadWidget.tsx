"use client";

import { useState } from "react";
import { toast } from "sonner";
import { createGalleryPhoto } from "@/lib/actions/gallery";
import { UploadedFile } from "@/types";
import UploadButton from "./upload-button";
import UploadWidgetHeader from "./upload-widget-header";
import UploadWidgetBody from "./upload-widget-body";
import UploadWidgetFooter from "./upload-widget-footer";

export function UploadWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [files, setFiles] = useState<UploadedFile[]>([]);

  const updateFile = (index: number, updates: Partial<UploadedFile>) => {
    setFiles((prev) =>
      prev.map((file, i) => (i === index ? { ...file, ...updates } : file)),
    );
  };

  const uploadFile = async (index: number) => {
    const fileData = files[index];

    // Validate
    if (!fileData.title.trim()) {
      updateFile(index, { error: "Title is required" });
      return;
    }
    if (fileData.title.trim().length < 3) {
      updateFile(index, { error: "Title must be at least 3 characters" });
      return;
    }
    if (!fileData.category) {
      updateFile(index, { error: "Category is required" });
      return;
    }

    updateFile(index, { uploading: true, error: undefined });

    try {
      const formData = new FormData();
      formData.append("files", fileData.file);

      const uploadResponse = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!uploadResponse.ok) throw new Error("Upload failed");

      const uploadResult = await uploadResponse.json();
      if (!uploadResult.success)
        throw new Error(uploadResult.error || "Upload failed");

      const result = await createGalleryPhoto({
        image_url: uploadResult.data[0].secure_url,
        title: fileData.title.trim(),
        category: fileData.category,
      });

      if (!result.success) throw new Error(result.error);

      updateFile(index, { uploading: false, uploaded: true });
      toast.success("Photo uploaded");
    } catch (error) {
      updateFile(index, {
        uploading: false,
        error: error instanceof Error ? error.message : "Upload failed",
      });
      toast.error("Upload failed");
    }
  };

  const closeModal = () => {
    files.forEach((file) => URL.revokeObjectURL(file.preview));
    setFiles([]);
    setIsOpen(false);
  };

  const uploadAll = async () => {
    for (let i = 0; i < files.length; i++) {
      if (!files[i].uploaded && !files[i].uploading) {
        await uploadFile(i);
      }
    }
  };

  return (
    <>
      <UploadButton setIsOpen={setIsOpen} />

      {isOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center z-50">
          <div className="bg-luxury-light w-full sm:w-[95vw] sm:max-w-4xl h-[95vh] sm:h-auto sm:max-h-[90vh] sm:rounded-xl overflow-hidden shadow-2xl border-t sm:border border-luxury-accent/20 flex flex-col">
            {/* Header */}
            <UploadWidgetHeader files={files} closeModal={closeModal} />

            {/* Content */}
            <UploadWidgetBody
              files={files}
              setFiles={setFiles}
              uploadFile={uploadFile}
            />

            {/* Footer */}
            {files.length > 0 && (
              <UploadWidgetFooter
                files={files}
                uploadAll={uploadAll}
                closeModal={closeModal}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}
