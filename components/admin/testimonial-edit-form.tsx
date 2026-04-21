"use client";

import { Upload, X } from "lucide-react";
import { toast } from "sonner";
import { Testimonial, updateTestimonial } from "@/lib/actions/testimonials";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { testimonialSchema, TestimonialFormData } from "@/lib/schemas";
import BaseModal from "@/components/ui/base-modal";
import Button from "@/components/ui/button";
import { useState } from "react";
import { useFileUpload } from "@/hooks/useFileUpload";
import { FormInput } from "@/components/ui/form-input";
import { FormTextarea } from "@/components/ui/form-textarea";

interface TestimonialEditFormProps {
  testimonial: Testimonial;
  onClose: () => void;
}

export function TestimonialEditForm({
  testimonial,
  onClose,
}: TestimonialEditFormProps) {
  const { file: photoFile, preview: photoPreview, fileInputRef, handleFileSelect, removeFile } = useFileUpload({ maxSize: 5 * 1024 * 1024 });
  const [initialPhotoUrl] = useState(testimonial.photo_url || "");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TestimonialFormData>({
    resolver: zodResolver(testimonialSchema),
    defaultValues: {
      name: testimonial.name,
      role: testimonial.role || "",
      text: testimonial.text,
    },
  });

  const onSubmit = async (data: TestimonialFormData) => {
    try {
      let photoUrl = photoPreview || initialPhotoUrl;

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
    }
  };

  return (
    <BaseModal
      isOpen={true}
      title="Edit Testimonial"
      onClose={onClose}
      size="md"
      isSubmitting={isSubmitting}
      footer={
        <div className="flex justify-end gap-3">
          <Button variant="ghost" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting}
            loading={isSubmitting}
          >
            Save Changes
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
                onClick={removeFile}
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
            onChange={handleFileSelect}
            className="hidden"
          />
          <p className="text-xs text-luxury-text-muted text-center mt-2">
            Square photos work best (e.g., 200x200px)
          </p>
        </div>

        {/* Name */}
        <FormInput
          id="edit-testimonial-name"
          type="text"
          label="Client Name *"
          placeholder="e.g., Sophia Martinez"
          disabled={isSubmitting}
          error={errors.name}
          {...register("name")}
        />

        {/* Role */}
        <FormInput
          id="edit-testimonial-role"
          type="text"
          label="Role / Title (Optional)"
          placeholder="e.g., CEO, Fashion Blogger, or leave blank"
          disabled={isSubmitting}
          error={errors.role}
          {...register("role")}
        />

        {/* Testimonial Text */}
        <FormTextarea
          id="edit-testimonial-text"
          label="Testimonial *"
          placeholder="Enter the client's testimonial..."
          rows={6}
          disabled={isSubmitting}
          error={errors.text}
          {...register("text")}
        />
      </form>
    </BaseModal>
  );
}
