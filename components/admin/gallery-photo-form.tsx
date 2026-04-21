"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GalleryPhoto } from "@/types";
import Image from "next/image";
import BaseModal from "@/components/ui/base-modal";
import Button from "@/components/ui/button";
import { galleryPhotoSchema, GalleryPhotoFormData } from "@/lib/schemas";
import { CONFIG } from "@/config/app";
import { FormInput } from "@/components/ui/form-input";
import { FormSelect } from "@/components/ui/form-select";

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

  const categoryOptions = CONFIG.gallery.categories.map((cat) => ({
    value: cat,
    label: cat.charAt(0).toUpperCase() + cat.slice(1),
  }));

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
            <FormInput
              id="photo-title"
              type="text"
              label="Title *"
              placeholder="Enter photo title"
              disabled={isSubmitting}
              error={errors.title}
              {...register("title")}
            />

            <FormSelect
              id="photo-category"
              label="Category *"
              options={[{ value: "", label: "Select a category" }, ...categoryOptions]}
              disabled={isSubmitting}
              error={errors.category}
              {...register("category")}
            />
          </div>
        </div>
      </form>
    </BaseModal>
  );
}
