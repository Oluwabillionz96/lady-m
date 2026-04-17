"use client";

import { useState } from "react";
import { toast } from "sonner";
import { batchUploadPhotos } from "@/lib/actions/gallery";
import { UploadedFile } from "@/types";
import CreateButton from "./create-button";
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
      const result = await batchUploadPhotos([
        {
          file: fileData.file,
          title: fileData.title.trim(),
          category: fileData.category,
        },
      ]);

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
    // Validate all files first
    const filesToUpload = [];
    let hasErrors = false;

    for (let i = 0; i < files.length; i++) {
      if (files[i].uploaded || files[i].uploading) continue;

      const fileData = files[i];

      // Validate
      if (!fileData.title.trim()) {
        updateFile(i, { error: "Title is required" });
        hasErrors = true;
        continue;
      }
      if (fileData.title.trim().length < 3) {
        updateFile(i, { error: "Title must be at least 3 characters" });
        hasErrors = true;
        continue;
      }
      if (!fileData.category) {
        updateFile(i, { error: "Category is required" });
        hasErrors = true;
        continue;
      }

      filesToUpload.push({
        file: fileData.file,
        title: fileData.title.trim(),
        category: fileData.category,
        index: i,
      });
    }

    if (hasErrors) {
      toast.error("Please fix validation errors before uploading");
      return;
    }

    if (filesToUpload.length === 0) {
      toast.info("No photos to upload");
      return;
    }

    // Mark all as uploading
    filesToUpload.forEach(({ index }) => {
      updateFile(index, { uploading: true, error: undefined });
    });

    try {
      const result = await batchUploadPhotos(
        filesToUpload.map(({ file, title, category }) => ({
          file,
          title,
          category,
        })),
      );

      if (!result.success) throw new Error(result.error);

      // Mark all as uploaded
      filesToUpload.forEach(({ index }) => {
        updateFile(index, { uploading: false, uploaded: true });
      });

      toast.success(`${filesToUpload.length} photos uploaded successfully`);
    } catch (error) {
      // Mark all as failed
      filesToUpload.forEach(({ index }) => {
        updateFile(index, {
          uploading: false,
          error: error instanceof Error ? error.message : "Upload failed",
        });
      });
      toast.error("Batch upload failed");
    }
  };

  return (
    <>
      <CreateButton setIsOpen={setIsOpen} />

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
