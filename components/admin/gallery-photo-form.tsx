"use client";

import { ChevronDown } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GalleryPhoto } from "@/types";
import Image from "next/image";
import BaseModal from "@/components/ui/base-modal";
import Button from "@/components/ui/button";
import { galleryPhotoSchema, GalleryPhotoFormData } from "@/lib/schemas";
import { CONFIG } from "@/config/app";

interface GalleryPhotoFormProps {
  photo: GalleryPhoto;
  onSave: (
    id: string,
    data: { title: string; category: string },
  ) => Promise<void>;
  onCancel: () => void;
}

export function GalleryPhotoForm({
  photo,
  onSave,
  onCancel,
}: GalleryPhotoFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<GalleryPhotoFormData>({
    resolver: zodResolver(galleryPhotoSchema),
    defaultValues: {
      title: photo.title,
      category: photo.category,
    },
  });

  const onSubmit = async (data: GalleryPhotoFormData) => {
    await onSave(photo.id, { title: data.title, category: data.category });
  };

  return (
    <BaseModal
      isOpen={true}
      title="Edit Photo"
      onClose={onCancel}
      size="md"
      isSubmitting={isSubmitting}
      footer={
        <div className="flex justify-end gap-3">
          <Button variant="ghost" onClick={onCancel} disabled={isSubmitting}>
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
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex gap-6">
          {/* Preview */}
          <div className="shrink-0">
            <div className="relative w-32 h-32 rounded-lg overflow-hidden border border-luxury-accent/20">
              <Image
                src={photo.image_url}
                alt={photo.title}
                fill
                className="object-cover"
                sizes="128px"
              />
            </div>
          </div>

          {/* Form Fields */}
          <div className="flex-1 space-y-4">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-luxury-text mb-2"
              >
                Title *
              </label>
              <input
                id="title"
                type="text"
                {...register("title")}
                className={`w-full px-4 py-3 bg-luxury-dark border rounded-lg text-luxury-text placeholder-luxury-text-muted focus:outline-none focus:ring-2 transition-all ${
                  errors.title
                    ? "border-red-500 focus:ring-red-500"
                    : "border-luxury-accent/30 focus:ring-luxury-accent"
                }`}
                placeholder="Enter photo title"
                disabled={isSubmitting}
              />
              {errors.title && (
                <p className="text-red-400 text-xs mt-1.5">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-luxury-text mb-2"
              >
                Category *
              </label>
              <div className="relative">
                <select
                  id="category"
                  {...register("category")}
                  className={`w-full px-4 py-3 pr-10 bg-luxury-dark border rounded-lg text-luxury-text focus:outline-none focus:ring-2 transition-all appearance-none ${
                    errors.category
                      ? "border-red-500 focus:ring-red-500"
                      : "border-luxury-accent/30 focus:ring-luxury-accent"
                  }`}
                  disabled={isSubmitting}
                >
                  <option value="">Select a category</option>
                  {CONFIG.gallery.categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <ChevronDown />
                </div>
              </div>
              {errors.category && (
                <p className="text-red-400 text-xs mt-1.5">
                  {errors.category.message}
                </p>
              )}
            </div>
          </div>
        </div>
      </form>
    </BaseModal>
  );
}
