"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Upload, X, Plus, Loader2, Check, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { createGalleryPhoto } from "@/lib/actions/gallery";
import Image from "next/image";

// Zod validation schema
const photoUploadSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must be less than 100 characters"),
  category: z.enum(
    ["portfolio", "bridal", "casual", "formal", "alterations"],
    "Please select a valid category",
  ),
});

type PhotoUploadFormData = z.infer<typeof photoUploadSchema>;

interface UploadedFile {
  file: File;
  preview: string;
  uploading: boolean;
  uploaded: boolean;
  error?: string;
  formData?: PhotoUploadFormData;
}

function validateImageFile(file: File): { valid: boolean; error?: string } {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: "Invalid file type. Use JPEG, PNG, or WebP.",
    };
  }

  const maxSize = 10 * 1024 * 1024;
  if (file.size > maxSize) {
    return { valid: false, error: "File too large. Maximum size is 10MB." };
  }

  return { valid: true };
}

export function UploadWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (selectedFiles: FileList) => {
    const newFiles: UploadedFile[] = [];

    Array.from(selectedFiles).forEach((file) => {
      const validation = validateImageFile(file);
      if (!validation.valid) {
        toast.error(`${file.name}: ${validation.error}`);
        return;
      }

      newFiles.push({
        file,
        preview: URL.createObjectURL(file),
        uploading: false,
        uploaded: false,
        formData: {
          title: "",
          category: "portfolio",
        },
      });
    });

    setFiles((prev) => [...prev, ...newFiles]);
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

  const uploadFile = async (index: number) => {
    const fileData = files[index];

    // Validate form data with Zod
    const validationResult = photoUploadSchema.safeParse(fileData.formData);
    if (!validationResult.success) {
      // Get the first error message
      const firstError =
        JSON.parse(validationResult.error?.message)[0].message ||
        "Validation failed";
      updateFile(index, { error: firstError });
      toast.error(firstError);
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
        title: validationResult.data.title,
        category: validationResult.data.category,
      });

      if (!result.success) throw new Error(result.error);

      updateFile(index, { uploading: false, uploaded: true });
      toast.success("Photo uploaded successfully");
    } catch (error) {
      updateFile(index, {
        uploading: false,
        error: error instanceof Error ? error.message : "Upload failed",
      });
      toast.error("Upload failed");
    }
  };

  const uploadAll = async () => {
    for (let i = 0; i < files.length; i++) {
      if (!files[i].uploaded && !files[i].uploading) {
        await uploadFile(i);
      }
    }
  };

  const closeModal = () => {
    files.forEach((file) => URL.revokeObjectURL(file.preview));
    setFiles([]);
    setIsOpen(false);
  };

  const uploadedCount = files.filter((f) => f.uploaded).length;
  const hasUnuploaded = files.some((f) => !f.uploaded && !f.uploading);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 w-full md:w-fit justify-center bg-luxury-accent text-luxury-dark px-4 md:py-2 py-4 rounded-lg hover:bg-luxury-accent-light transition-colors font-medium text-sm sm:text-base"
      >
        <Plus className="w-4 h-4" />
        <span className="hidden sm:inline">Upload Photos</span>
        <span className="sm:hidden">Upload</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center z-50">
          <div className="bg-luxury-light w-full sm:w-[95vw] sm:max-w-4xl h-[95vh] sm:h-auto sm:max-h-[90vh] sm:rounded-xl overflow-hidden shadow-2xl border-t sm:border border-luxury-accent/20 flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-luxury-accent/20 bg-luxury-dark/30 shrink-0">
              <div>
                <h2 className="text-lg sm:text-xl font-semibold text-luxury-text">
                  Upload Photos
                </h2>
                <p className="text-xs sm:text-sm text-luxury-text-muted mt-0.5">
                  {files.length === 0
                    ? "Select photos to upload"
                    : `${files.length} selected`}
                </p>
              </div>
              <button
                onClick={closeModal}
                className="text-luxury-text-muted hover:text-luxury-text p-2 -mr-2"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            {/* Content */}
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
                    onChange={(e) =>
                      e.target.files && handleFileSelect(e.target.files)
                    }
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
                    <Plus className="w-4 h-4" />
                    Add More
                  </button>

                  {/* Photos */}
                  {files.map((fileData, index) => (
                    <PhotoUploadForm
                      key={index}
                      fileData={fileData}
                      index={index}
                      onUpdate={updateFile}
                      onRemove={removeFile}
                      onUpload={uploadFile}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {files.length > 0 && (
              <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-t border-luxury-accent/20 bg-luxury-dark/30 shrink-0">
                <div className="text-xs sm:text-sm text-luxury-text-muted">
                  {uploadedCount} of {files.length} uploaded
                </div>
                <div className="flex gap-2 sm:gap-3">
                  <button
                    onClick={closeModal}
                    className="px-3 sm:px-4 py-2 text-luxury-text-muted hover:text-luxury-text transition-colors font-medium text-sm"
                  >
                    {uploadedCount === files.length ? "Done" : "Cancel"}
                  </button>
                  {hasUnuploaded && (
                    <button
                      onClick={uploadAll}
                      className="px-3 sm:px-4 py-2 bg-luxury-accent text-luxury-dark rounded-lg hover:bg-luxury-accent-light transition-colors font-medium text-sm"
                    >
                      Upload All
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

// Separate component for individual photo form with validation
function PhotoUploadForm({
  fileData,
  index,
  onUpdate,
  onRemove,
  onUpload,
}: {
  fileData: UploadedFile;
  index: number;
  onUpdate: (index: number, updates: Partial<UploadedFile>) => void;
  onRemove: (index: number) => void;
  onUpload: (index: number) => void;
}) {
  const {
    register,
    formState: { errors },
    watch,
    getValues,
  } = useForm<PhotoUploadFormData>({
    resolver: zodResolver(photoUploadSchema),
    defaultValues: fileData.formData,
    mode: "onChange",
  });

  const title = watch("title");
  watch("category");

  // Update parent state when form values change
  const handleFormChange = () => {
    const values = getValues();
    onUpdate(index, { formData: values });
  };

  return (
    <div
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
              {...register("title")}
              onChange={(e) => {
                register("title").onChange?.(e);
                handleFormChange();
              }}
              className={`
                w-full px-3 py-2 text-sm bg-luxury-dark border rounded-lg text-luxury-text 
                focus:outline-none focus:ring-2 transition-all
                ${
                  errors.title
                    ? "border-red-500/50 focus:ring-red-500/50"
                    : "border-luxury-accent/30 focus:ring-luxury-accent"
                }
              `}
              placeholder="Photo title"
              disabled={fileData.uploading || fileData.uploaded}
            />
            {errors.title && (
              <p className="text-xs text-red-400 mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-medium text-luxury-text mb-1.5">
              Category *
            </label>
            <div className="relative">
              <select
                {...register("category")}
                onChange={(e) => {
                  register("category").onChange?.(e);
                  handleFormChange();
                }}
                className={`
                  w-full px-3 py-2 pr-10 text-sm bg-luxury-dark border rounded-lg text-luxury-text 
                  focus:outline-none focus:ring-2 transition-all appearance-none
                  bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2724%27 height=%2724%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%23D4AF37%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3e%3cpolyline points=%276 9 12 15 18 9%27%3e%3c/polyline%3e%3c/svg%3e')] 
                  bg-size-[20px] bg-position-[right_0.5rem_center] bg-no-repeat
                  ${
                    errors.category
                      ? "border-red-500/50 focus:ring-red-500/50"
                      : "border-luxury-accent/30 focus:ring-luxury-accent"
                  }
                `}
                disabled={fileData.uploading || fileData.uploaded}
              >
                <option value="portfolio">Portfolio</option>
                <option value="bridal">Bridal</option>
                <option value="casual">Casual</option>
                <option value="formal">Formal</option>
                <option value="alterations">Alterations</option>
              </select>
            </div>
            {errors.category && (
              <p className="text-xs text-red-400 mt-1">
                {errors.category.message}
              </p>
            )}
          </div>
        </div>

        {/* Status Messages */}
        {fileData.error && (
          <div className="flex items-start gap-2 p-2.5 bg-red-500/10 border border-red-500/20 rounded-lg">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-red-400">
                Validation Error
              </p>
              <p className="text-xs text-red-400/80 mt-0.5">{fileData.error}</p>
            </div>
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
                onClick={() => onUpload(index)}
                className="flex-1 px-4 py-2.5 bg-luxury-accent text-luxury-dark rounded-lg hover:bg-luxury-accent-light transition-colors font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!title || Object.keys(errors).length > 0}
              >
                Upload
              </button>
              <button
                onClick={() => onRemove(index)}
                className="px-4 py-2.5 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors font-medium text-sm"
              >
                Remove
              </button>
            </>
          )}
          {fileData.uploaded && (
            <button
              onClick={() => onRemove(index)}
              className="w-full px-4 py-2.5 bg-luxury-dark/50 text-luxury-text-muted rounded-lg hover:bg-luxury-dark transition-colors text-sm"
            >
              Remove
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
