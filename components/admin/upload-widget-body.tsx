"use client";

import { validateImageFile } from "@/lib/utils";
import { UploadedFile } from "@/types";
import { AlertCircle, Check, Loader2, Upload } from "lucide-react";
import Image from "next/image";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { toast } from "sonner";

const UploadWidgetBody = ({
  files,
  setFiles,
  uploadFile,
}: {
  files: UploadedFile[];
  setFiles: Dispatch<SetStateAction<UploadedFile[]>>;
  uploadFile: (index: number) => void;
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (selectedFiles: FileList) => {
    const MAX_PHOTOS = 10;
    const newFiles: UploadedFile[] = [];
    let duplicateCount = 0;
    let exceededCount = 0;

    Array.from(selectedFiles).forEach((file) => {
      const validation = validateImageFile(file);
      if (!validation.valid) {
        toast.error(`${file.name}: ${validation.error}`);
        return;
      }

      // Check if file already exists in the list (by name and size)
      const isDuplicate = files.some(
        (existingFile) =>
          existingFile.file.name === file.name &&
          existingFile.file.size === file.size,
      );

      if (isDuplicate) {
        duplicateCount++;
        return;
      }

      // Check if we've reached the limit
      if (files.length + newFiles.length >= MAX_PHOTOS) {
        exceededCount++;
        return;
      }

      newFiles.push({
        file,
        preview: URL.createObjectURL(file),
        title: "",
        category: "portfolio",
        uploading: false,
        uploaded: false,
      });
    });

    if (duplicateCount > 0) {
      toast.info(
        duplicateCount === 1
          ? "1 duplicate omitted"
          : `${duplicateCount} duplicates omitted`,
      );
    }

    if (exceededCount > 0) {
      toast.error(
        `Maximum ${MAX_PHOTOS} photos per upload. ${exceededCount} photo${exceededCount > 1 ? "s" : ""} not added.`,
      );
    }

    setFiles((prev) => [...prev, ...newFiles]);

    // Reset file input so same file can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files.length > 0) {
      handleFileSelect(e.dataTransfer.files);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => {
      const newFiles = [...prev];
      URL.revokeObjectURL(newFiles[index].preview);
      newFiles.splice(index, 1);
      return newFiles;
    });
  };

  const updateFile = (index: number, updates: Partial<UploadedFile>) => {
    setFiles((prev) =>
      prev.map((file, i) => (i === index ? { ...file, ...updates } : file)),
    );
  };
  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6">
      {/* Empty State - Drop Zone */}
      {files.length === 0 && (
        <div
          onDrop={handleDrop}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={(e) => {
            e.preventDefault();
            setIsDragging(false);
          }}
          onClick={() => fileInputRef.current?.click()}
          className={`
                    border-2 border-dashed rounded-xl p-8 sm:p-12 text-center cursor-pointer transition-all
                    ${
                      isDragging
                        ? "border-luxury-accent bg-luxury-accent/10"
                        : "border-luxury-accent/30 hover:border-luxury-accent/50"
                    }
                  `}
        >
          <div className="flex flex-col items-center gap-3 sm:gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-luxury-accent/10 flex items-center justify-center">
              <Upload className="w-8 h-8 sm:w-10 sm:h-10 text-luxury-accent" />
            </div>
            <div>
              <p className="text-luxury-text font-medium text-base sm:text-lg mb-1">
                Tap to select photos
              </p>
              <p className="text-luxury-text-muted text-xs sm:text-sm">
                JPEG, PNG, WebP • Max 10MB
              </p>
            </div>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/jpeg,image/jpg,image/png,image/webp"
            onChange={(e) => e.target.files && handleFileSelect(e.target.files)}
            className="hidden"
          />
        </div>
      )}

      {/* File List */}
      {files.length > 0 && (
        <div className="space-y-4">
          {/* Add More Button */}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full border-2 border-dashed border-luxury-accent/30 rounded-lg p-4 hover:border-luxury-accent/50 transition-all text-luxury-text-muted hover:text-luxury-text flex items-center justify-center gap-2 text-sm"
          >
            <Upload className="w-4 h-4" />
            Add More Photos
          </button>

          {/* Hidden file input for "Add More" */}
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/jpeg,image/jpg,image/png,image/webp"
            onChange={(e) => e.target.files && handleFileSelect(e.target.files)}
            className="hidden"
          />

          {/* Photos */}
          {files.map((fileData, index) => (
            <div
              key={index}
              className={`
                        rounded-lg border p-3 sm:p-4 transition-all
                        ${
                          fileData.uploaded
                            ? "border-green-500/30 bg-green-500/5"
                            : fileData.error
                              ? "border-red-500/30 bg-red-500/5"
                              : "border-luxury-accent/20 bg-luxury-dark/30"
                        }
                      `}
            >
              <div className="space-y-3">
                {/* Image Preview */}
                <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-luxury-dark border border-luxury-accent/20">
                  <Image
                    src={fileData.preview}
                    alt="Preview"
                    fill
                    className="object-cover"
                  />
                  {fileData.uploaded && (
                    <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                        <Check className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  )}
                  {fileData.uploading && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <Loader2 className="w-8 h-8 text-luxury-accent animate-spin" />
                    </div>
                  )}
                </div>

                {/* Form Fields */}
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-luxury-text mb-1.5">
                      Title *
                    </label>
                    <input
                      type="text"
                      value={fileData.title}
                      onChange={(e) =>
                        updateFile(index, {
                          title: e.target.value,
                          error: undefined,
                        })
                      }
                      className={`w-full px-3 py-2 text-sm bg-luxury-dark border rounded-lg text-luxury-text focus:outline-none focus:ring-2 transition-all ${
                        fileData.error?.includes("Title")
                          ? "border-red-500 focus:ring-red-500"
                          : "border-luxury-accent/30 focus:ring-luxury-accent"
                      }`}
                      placeholder="Photo title"
                      disabled={fileData.uploading || fileData.uploaded}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-luxury-text mb-1.5">
                      Category *
                    </label>
                    <select
                      value={fileData.category}
                      onChange={(e) =>
                        updateFile(index, {
                          category: e.target.value,
                          error: undefined,
                        })
                      }
                      className={`w-full px-3 py-2 pr-10 text-sm bg-luxury-dark border rounded-lg text-luxury-text focus:outline-none focus:ring-2 transition-all appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2724%27 height=%2724%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%23D4AF37%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3e%3cpolyline points=%276 9 12 15 18 9%27%3e%3c/polyline%3e%3c/svg%3e')] bg-size-[20px] bg-position-[right_0.5rem_center] bg-no-repeat ${
                        fileData.error?.includes("Category")
                          ? "border-red-500 focus:ring-red-500"
                          : "border-luxury-accent/30 focus:ring-luxury-accent"
                      }`}
                      disabled={fileData.uploading || fileData.uploaded}
                    >
                      <option value="portfolio">Portfolio</option>
                      <option value="bridal">Bridal</option>
                      <option value="casual">Casual</option>
                      <option value="formal">Formal</option>
                      <option value="alterations">Alterations</option>
                    </select>
                  </div>
                </div>

                {/* Error Message */}
                {fileData.error && (
                  <div className="flex items-start gap-2 p-2.5 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    <p className="text-xs text-red-400">{fileData.error}</p>
                  </div>
                )}

                {fileData.uploaded && (
                  <div className="flex items-center gap-2 p-2.5 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <Check className="w-4 h-4 text-green-400" />
                    <p className="text-xs font-medium text-green-400">
                      Uploaded successfully
                    </p>
                  </div>
                )}

                {fileData.uploading && (
                  <div className="flex items-center gap-2 p-2.5 bg-luxury-accent/10 border border-luxury-accent/20 rounded-lg">
                    <Loader2 className="w-4 h-4 text-luxury-accent animate-spin" />
                    <p className="text-xs font-medium text-luxury-accent">
                      Uploading...
                    </p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2">
                  {!fileData.uploaded && !fileData.uploading && (
                    <>
                      <button
                        onClick={() => uploadFile(index)}
                        className="flex-1 px-4 py-2.5 bg-luxury-accent text-luxury-dark rounded-lg hover:bg-luxury-accent-light transition-colors font-medium text-sm"
                      >
                        Upload
                      </button>
                      <button
                        onClick={() => removeFile(index)}
                        className="px-4 py-2.5 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors font-medium text-sm"
                      >
                        Remove
                      </button>
                    </>
                  )}
                  {fileData.uploaded && (
                    <button
                      onClick={() => removeFile(index)}
                      className="w-full px-4 py-2.5 bg-luxury-dark/50 text-luxury-text-muted rounded-lg hover:bg-luxury-dark transition-colors text-sm"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UploadWidgetBody;
