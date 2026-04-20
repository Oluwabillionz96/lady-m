"use client";

import { useState } from "react";
import { toast } from "sonner";
import { deleteGalleryPhoto, updateGalleryPhoto } from "@/lib/actions/gallery";
import { GalleryPhoto } from "@/types";
import { GalleryPhotoForm } from "./gallery-photo-form";
import { ConfirmDialog } from "./confirm-dialog";
import Lightbox from "@/components/gallery/Lightbox";
import Image from "next/image";
import { Edit, Trash2 } from "lucide-react";

interface GalleryGridProps {
  photos: GalleryPhoto[];
}

export function GalleryGrid({ photos }: GalleryGridProps) {
  const [editingPhoto, setEditingPhoto] = useState<GalleryPhoto | null>(null);
  const [deletingPhoto, setDeletingPhoto] = useState<GalleryPhoto | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const handleDeleteClick = (photo: GalleryPhoto) => {
    setDeletingPhoto(photo);
  };

  const handleDeleteConfirm = async () => {
    if (!deletingPhoto) return;

    setIsDeleting(true);

    try {
      const result = await deleteGalleryPhoto(deletingPhoto.id);

      if (result.success) {
        toast.success("Photo deleted successfully");
        setLightboxIndex(null);
        setDeletingPhoto(null);
      } else {
        toast.error(result.error);
      }
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEdit = (photo: GalleryPhoto) => {
    setEditingPhoto(photo);
  };

  const handleUpdate = async (
    id: string,
    data: { title: string; category: string },
  ) => {
    try {
      const result = await updateGalleryPhoto(id, data);

      if (result.success) {
        toast.success("Photo updated successfully");
        setEditingPhoto(null);
      } else {
        toast.error(result.error);
      }
    } finally {
      // Error is already handled
    }
  };

  // Convert GalleryPhoto to GalleryItem format for lightbox
  const lightboxImages = photos.map((photo) => ({
    id: photo.id,
    imageUrl: photo.image_url,
    alt: photo.title,
    title: photo.title,
    category: photo.category,
  }));

  const handleNext = () => {
    if (lightboxIndex !== null && lightboxIndex < photos.length - 1) {
      setLightboxIndex(lightboxIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (lightboxIndex !== null && lightboxIndex > 0) {
      setLightboxIndex(lightboxIndex - 1);
    }
  };

  if (photos.length === 0) {
    return null;
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {photos.map((photo, index) => (
          <div
            key={photo.id}
            className="bg-luxury-light rounded-lg overflow-hidden border border-luxury-accent/20 hover:border-luxury-accent/40 transition-all group"
          >
            {/* Image */}
            <div
              className="aspect-square relative overflow-hidden cursor-pointer"
              onClick={() => setLightboxIndex(index)}
            >
              <Image
                src={photo.image_url}
                alt={photo.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Info */}
            <div className="p-4">
              <h3
                className="font-medium text-luxury-text truncate cursor-pointer hover:text-luxury-accent transition-colors"
                title={photo.title}
                onClick={() => setLightboxIndex(index)}
              >
                {photo.title}
              </h3>
              <div className="flex items-center justify-between mt-2 mb-3">
                <span className="text-sm text-luxury-text-muted capitalize">
                  {photo.category}
                </span>
                <span className="text-xs text-luxury-text-muted">
                  {new Date(photo.created_at).toLocaleDateString()}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(photo)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 sm:py-2 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 rounded-lg transition-colors text-sm sm:text-xs font-medium"
                  title="Edit photo"
                >
                  <Edit className="w-5 h-5 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">Edit</span>
                </button>
                <button
                  onClick={() => handleDeleteClick(photo)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 sm:py-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors text-sm sm:text-xs font-medium"
                  title="Delete photo"
                >
                  <Trash2 className="w-5 h-5 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">Delete</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Reusable Lightbox with Admin Actions */}
      <Lightbox
        images={lightboxImages}
        currentIndex={lightboxIndex ?? 0}
        isOpen={lightboxIndex !== null}
        onClose={() => setLightboxIndex(null)}
        onNext={handleNext}
        onPrevious={handlePrevious}
        adminActions={{
          onEdit: (image) => {
            const photo = photos.find((p) => p.id === image.id);
            if (photo) handleEdit(photo);
          },
          onDelete: (image) => {
            const photo = photos.find((p) => p.id === image.id);
            if (photo) handleDeleteClick(photo);
          },
          isDeleting: isDeleting,
        }}
      />

      {/* Confirmation Dialog */}
      <ConfirmDialog
        isOpen={deletingPhoto !== null}
        title="Delete Photo"
        message={`Are you sure you want to delete "${deletingPhoto?.title}"? This action cannot be undone and the photo will be permanently removed from your gallery.`}
        confirmLabel="Delete Photo"
        cancelLabel="Cancel"
        variant="danger"
        isLoading={isDeleting}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeletingPhoto(null)}
      />

      {/* Edit Modal */}
      {editingPhoto && (
        <GalleryPhotoForm
          photo={editingPhoto}
          onSave={handleUpdate}
          onCancel={() => setEditingPhoto(null)}
        />
      )}
    </>
  );
}
