import { getGalleryPhotos } from "@/lib/actions/gallery";
import { GalleryGrid } from "@/components/admin/GalleryGrid";
import { UploadWidget } from "@/components/admin/UploadWidget";
import { Plus, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function GalleryPage() {
  const result = await getGalleryPhotos();

  if (!result.success) {
    return (
      <div className="space-y-6">
        {/* Mobile Back Button */}
        <div className="flex items-center gap-3 md:hidden">
          <Link
            href="/admin"
            className="p-2 text-luxury-text-muted hover:text-luxury-text transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-bold text-luxury-text">
            Gallery Management
          </h1>
        </div>

        {/* Desktop Header */}
        <div className="hidden md:block">
          <h1 className="text-2xl font-bold text-luxury-text">
            Gallery Management
          </h1>
        </div>

        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
          <p className="text-red-400">Error loading gallery: {result.error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-2 md:gap-0">
        <div className="text-left w-full md:w-fit">
          {/* Mobile Header with Back Button */}
          <div className="flex items-center gap-3 md:hidden">
            <Link
              href="/admin"
              className="p-2 text-luxury-text-muted hover:text-luxury-text transition-colors -ml-2"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-luxury-text">
                Gallery Management
              </h1>
              <p className="text-luxury-text-muted mt-1">
                Manage your portfolio photos
              </p>
            </div>
          </div>

          {/* Desktop Header */}
          <div className="hidden md:block">
            <h1 className="text-2xl font-bold text-luxury-text">
              Gallery Management
            </h1>
            <p className="text-luxury-text-muted mt-1">
              Manage your portfolio photos
            </p>
          </div>
        </div>

        <UploadWidget />
      </div>

      {/* Gallery Grid */}
      {result.data.length > 0 ? (
        <GalleryGrid photos={result.data} />
      ) : (
        <div className="text-center py-12">
          <div className="bg-luxury-light rounded-lg p-8 border border-luxury-accent/20">
            <Plus className="w-12 h-12 text-luxury-text-muted mx-auto mb-4" />
            <h3 className="text-lg font-medium text-luxury-text mb-2">
              No photos yet
            </h3>
            <p className="text-luxury-text-muted mb-4">
              Start building your portfolio by uploading your first photos
            </p>
            <UploadWidget />
          </div>
        </div>
      )}
    </div>
  );
}
