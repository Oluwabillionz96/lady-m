"use client";

import { useState, useRef } from "react";
import { Upload, X } from "lucide-react";
import { toast } from "sonner";
import { createTestimonial } from "@/lib/actions/testimonials";
import CreateButton from "./create-button";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { testimonialSchema, TestimonialFormData } from "@/lib/schemas";
import BaseModal from "@/components/ui/base-modal";
import Button from "@/components/ui/button";

export function TestimonialForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TestimonialFormData>({
    resolver: zodResolver(testimonialSchema),
    defaultValues: {
      name: "",
      role: "",
      text: "",
    },
  });

  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be less than 5MB");
      return;
    }

    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const removePhoto = () => {
    if (photoPreview) {
      URL.revokeObjectURL(photoPreview);
    }
    setPhotoFile(null);
    setPhotoPreview("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const onSubmit = async (data: TestimonialFormData) => {
    try {
      let photoUrl = "";

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

      const result = await createTestimonial({
        name: data.name.trim(),
        role: data.role?.trim(),
        text: data.text.trim(),
        photo_url: photoUrl,
      });

      if (result.success) {
        toast.success("Testimonial added successfully");
        reset();
        removePhoto();
        setIsOpen(false);
      } else {
        toast.error(result.error || "Failed to add testimonial");
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to add testimonial"
      );
    }
  };

  const handleClose = () => {
    removePhoto();
    reset();
    setIsOpen(false);
  };

  return (
    <>
      <CreateButton setIsOpen={setIsOpen} />

      <BaseModal
        isOpen={isOpen}
        title="Add Testimonial"
        onClose={handleClose}
        size="md"
        isSubmitting={isSubmitting}
        footer={
          <div className="flex justify-end gap-3">
            <Button variant="ghost" onClick={handleClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleSubmit(onSubmit)}
              disabled={isSubmitting}
              loading={isSubmitting}
            >
              Add Testimonial
            </Button>
          </div>
        }
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
              disabled={isSubmitting}
            />
            {errors.name && (
              <p className="text-red-400 text-xs mt-1.5">{errors.name.message}</p>
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
              disabled={isSubmitting}
            />
            {errors.role && (
              <p className="text-red-400 text-xs mt-1.5">{errors.role.message}</p>
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
              disabled={isSubmitting}
            />
            {errors.text && (
              <p className="text-red-400 text-xs mt-1.5">{errors.text.message}</p>
            )}
          </div>
        </form>
      </BaseModal>
    </>
  );
}
