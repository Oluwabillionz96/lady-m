"use client";

import { useState } from "react";
import { Edit, Trash2, Eye } from "lucide-react";
import { toast } from "sonner";
import { deleteGalleryPhoto, updateGalleryPhoto } from "@/lib/actions/gallery";
import { GalleryPhoto } from "@/types";
import { GalleryPhotoForm } from "./GalleryPhotoForm";
import Image from "next/image";

interface GalleryGridProps {
  photos: GalleryPhoto[];
}

export function GalleryGrid({ photos }: GalleryGridProps) {
  const [editingPhoto, setEditingPhoto] = useState<GalleryPhoto | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (photo: GalleryPhoto) => {
    if (
      !confirm(
        `Are you sure you want to delete "${photo.title}"? This action cannot be undone.`,
      )
    ) {
      return;
    }

    setDeletingId(photo.id);

    try {
      const result = await deleteGalleryPhoto(photo.id);

      if (result.success) {
        toast.success("Photo deleted successfully");
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error("Failed to delete photo");
    } finally {
      setDeletingId(null);
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
    } catch (error) {
      toast.error("Failed to update photo");
    }
  };

  if (photos.length === 0) {
    return null;
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="bg-luxury-light rounded-lg overflow-hidden border border-luxury-accent/20 hover:border-luxury-accent/40 transition-colors group"
          >
            {/* Image */}
            <div className="aspect-square relative overflow-hidden">
              <Image
                src={photo.image_url}
                alt={photo.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />

              {/* Overlay Actions */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button
                  onClick={() => window.open(photo.image_url, "_blank")}
                  className="p-2 bg-luxury-accent text-luxury-dark rounded-lg hover:bg-luxury-accent-light transition-colors"
                  title="View full size"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleEdit(photo)}
                  className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  title="Edit photo"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(photo)}
                  disabled={deletingId === photo.id}
                  className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50"
                  title="Delete photo"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Info */}
            <div className="p-4">
              <h3
                className="font-medium text-luxury-text truncate"
                title={photo.title}
              >
                {photo.title}
              </h3>
              <div className="flex items-center justify-between mt-2">
                <span className="text-sm text-luxury-text-muted capitalize">
                  {photo.category}
                </span>
                <span className="text-xs text-luxury-text-muted">
                  {new Date(photo.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

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
