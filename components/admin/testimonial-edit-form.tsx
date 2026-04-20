"use client";

import { useState, useRef } from "react";
import { X, Loader2, Upload } from "lucide-react";
import { toast } from "sonner";
import { Testimonial, updateTestimonial } from "@/lib/actions/testimonials";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { testimonialSchema, TestimonialFormData } from "@/lib/schemas";

interface TestimonialEditFormProps {
  testimonial: Testimonial;
  onClose: () => void;
}

export function TestimonialEditForm({
  testimonial,
  onClose,
}: TestimonialEditFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string>(
    testimonial.photo_url || ""
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TestimonialFormData>({
    resolver: zodResolver(testimonialSchema),
    defaultValues: {
      name: testimonial.name,
      role: testimonial.role || "",
      text: testimonial.text,
    },
  });

  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be less than 5MB");
      return;
    }

    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const removePhoto = () => {
    if (photoPreview && photoPreview.startsWith("blob:")) {
      URL.revokeObjectURL(photoPreview);
    }
    setPhotoFile(null);
    setPhotoPreview("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const onSubmit = async (data: TestimonialFormData) => {
    setIsSubmitting(true);
    try {
      let photoUrl = photoPreview;

      // Upload new photo if provided
      if (photoFile) {
        const uploadFormData = new FormData();
        uploadFormData.append("files", photoFile);

        const uploadResponse = await fetch("/api/upload", {
          method: "POST",
          body: uploadFormData,
        });

        if (!uploadResponse.ok) {
          throw new Error("Failed to upload photo");
        }

        const uploadResult = await uploadResponse.json();
        if (!uploadResult.success) {
          throw new Error(uploadResult.error || "Failed to upload photo");
        }

        photoUrl = uploadResult.data[0].secure_url;
      }

      const result = await updateTestimonial(testimonial.id, {
        name: data.name.trim(),
        role: data.role?.trim(),
        text: data.text.trim(),
        photo_url: photoUrl,
      });

      if (result.success) {
        toast.success("Testimonial updated successfully");
        onClose();
      } else {
        toast.error(result.error || "Failed to update testimonial");
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to update testimonial"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center z-50">
      <div className="bg-luxury-light w-full sm:w-[95vw] sm:max-w-2xl h-[95vh] sm:h-auto sm:max-h-[90vh] sm:rounded-xl overflow-hidden shadow-2xl border-t sm:border border-luxury-accent/20 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-luxury-accent/20 bg-luxury-dark/30 shrink-0">
          <h2 className="text-lg sm:text-xl font-semibold text-luxury-text">
            Edit Testimonial
          </h2>
          <button
            onClick={onClose}
            className="text-luxury-text-muted hover:text-luxury-text p-2 -mr-2"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex-1 overflow-y-auto p-4 sm:p-6"
        >
          <div className="space-y-4">
            {/* Photo Upload */}
            <div>
              <label className="block text-sm font-medium text-luxury-text mb-2">
                Client Photo (Optional)
              </label>
              {photoPreview ? (
                <div className="relative w-24 h-24 rounded-full overflow-hidden bg-luxury-dark border-2 border-luxury-accent/20 mx-auto">
                  <Image
                    src={photoPreview}
                    alt="Preview"
                    fill
                    className="object-cover"
                  />
                  <button
                    type="button"
                    onClick={removePhoto}
                    className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
                  >
                    <X className="w-6 h-6 text-white" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-24 h-24 rounded-full bg-luxury-dark border-2 border-dashed border-luxury-accent/30 hover:border-luxury-accent/50 flex flex-col items-center justify-center gap-1 mx-auto transition-all"
                >
                  <Upload className="w-5 h-5 text-luxury-accent" />
                  <span className="text-xs text-luxury-text-muted">Upload</span>
                </button>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoSelect}
                className="hidden"
              />
              <p className="text-xs text-luxury-text-muted text-center mt-2">
                Square photos work best (e.g., 200x200px)
              </p>
            </div>

            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-luxury-text mb-2">
                Client Name *
              </label>
              <input
                type="text"
                {...register("name")}
                className={`w-full px-4 py-2.5 bg-luxury-dark border rounded-lg text-luxury-text focus:outline-none focus:ring-2 transition-all ${
                  errors.name
                    ? "border-red-500 focus:ring-red-500"
                    : "border-luxury-accent/30 focus:ring-luxury-accent"
                }`}
                placeholder="e.g., Sophia Martinez"
              />
              {errors.name && (
                <p className="text-red-400 text-xs mt-1.5">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-medium text-luxury-text mb-2">
                Role / Title (Optional)
              </label>
              <input
                type="text"
                {...register("role")}
                className={`w-full px-4 py-2.5 bg-luxury-dark border rounded-lg text-luxury-text focus:outline-none focus:ring-2 transition-all ${
                  errors.role
                    ? "border-red-500 focus:ring-red-500"
                    : "border-luxury-accent/30 focus:ring-luxury-accent"
                }`}
                placeholder="e.g., CEO, Fashion Blogger, or leave blank"
              />
              {errors.role && (
                <p className="text-red-400 text-xs mt-1.5">
                  {errors.role.message}
                </p>
              )}
            </div>

            {/* Testimonial Text */}
            <div>
              <label className="block text-sm font-medium text-luxury-text mb-2">
                Testimonial *
              </label>
              <textarea
                {...register("text")}
                rows={6}
                className={`w-full px-4 py-2.5 bg-luxury-dark border rounded-lg text-luxury-text focus:outline-none focus:ring-2 transition-all resize-none ${
                  errors.text
                    ? "border-red-500 focus:ring-red-500"
                    : "border-luxury-accent/30 focus:ring-luxury-accent"
                }`}
                placeholder="Enter the client's testimonial..."
              />
              {errors.text && (
                <p className="text-red-400 text-xs mt-1.5">
                  {errors.text.message}
                </p>
              )}
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-4 sm:px-6 py-3 sm:py-4 border-t border-luxury-accent/20 bg-luxury-dark/30 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-luxury-text-muted hover:text-luxury-text transition-colors font-medium text-sm"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-luxury-accent text-luxury-dark rounded-lg hover:bg-luxury-accent-light transition-colors font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
