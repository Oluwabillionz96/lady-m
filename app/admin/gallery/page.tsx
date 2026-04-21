import { getGalleryPhotos } from "@/lib/actions/gallery";
import { GalleryGrid } from "@/components/admin/gallery-grid";
import { UploadWidget } from "@/components/admin/upload-widget";
import { PaginationControls } from "@/components/admin/pagination-controls";
import { Plus } from "lucide-react";
import PageHeader from "@/components/admin/page-header";

export const dynamic = "force-dynamic";

interface GalleryPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function GalleryPage({ searchParams }: GalleryPageProps) {
  const params = await searchParams;
  const page = Math.max(1, parseInt(params.page || "1", 10));
  const pageSize = 12;

  const result = await getGalleryPhotos(page, pageSize);

  if (!result.success) {
    return (
      <div className="space-y-6">
        <PageHeader headingText="Gallery Management">
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
            <p className="text-red-400">
              Error loading gallery: {result.error}
            </p>
          </div>
        </PageHeader>
      </div>
    );
  }

  const { data: photos, total, page: currentPage, pageSize: currentPageSize } = result.data;
  const totalPages = Math.ceil(total / currentPageSize);

  return (
    <div className="space-y-6">
      <PageHeader
        headingText="Gallery Management"
        subText={`Manage your portfolio photos (${total} total)`}
      >
        <UploadWidget />
      </PageHeader>

      {/* Gallery Grid */}
      {photos.length > 0 ? (
        <>
          <GalleryGrid photos={photos} />
          {totalPages > 1 && (
            <PaginationControls
              currentPage={currentPage}
              totalPages={totalPages}
            />
          )}
        </>
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
