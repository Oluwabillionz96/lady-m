"use client";

import { useState, useEffect } from "react";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import Lightbox from "@/components/gallery/Lightbox";
import GallerySkeleton from "@/components/ui/GallerySkeleton";
import { getPublicGalleryPhotos } from "@/lib/actions/gallery";
import { GalleryItem } from "@/types";

export default function GalleryPage() {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Fetch gallery photos on component mount
  useEffect(() => {
    async function fetchGalleryPhotos() {
      try {
        const result = await getPublicGalleryPhotos();
        if (result.success) {
          // Convert database photos to GalleryItem format
          const items: GalleryItem[] = result.data.map((photo) => ({
            id: photo.id,
            imageUrl: photo.image_url,
            alt: photo.title,
            title: photo.title,
            category: photo.category,
          }));
          setGalleryItems(items);
        }
      } catch (error) {
        console.error("Error fetching gallery photos:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchGalleryPhotos();
  }, []);

  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index);
    setIsLightboxOpen(true);
  };

  const handleClose = () => {
    setIsLightboxOpen(false);
  };

  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryItems.length);
  };

  const handlePrevious = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + galleryItems.length) % galleryItems.length,
    );
  };

  return (
    <main className="min-h-screen bg-luxury-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {/* Page Header */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="font-family-heading text-4xl md:text-5xl lg:text-6xl font-bold text-luxury-accent mb-4">
            Our Gallery
          </h1>
          <p className="text-luxury-text-muted text-lg md:text-xl max-w-2xl mx-auto">
            Explore our collection of bespoke tailoring and luxury fashion
          </p>
        </div>

        {/* Loading Skeleton */}
        {loading && <GallerySkeleton />}

        {/* Gallery Grid */}
        {!loading && galleryItems.length > 0 && (
          <GalleryGrid items={galleryItems} onImageClick={handleImageClick} />
        )}

        {/* Empty State */}
        {!loading && galleryItems.length === 0 && (
          <div className="text-center py-16">
            <p className="text-luxury-text-muted text-lg">
              No gallery photos available at the moment.
            </p>
            <p className="text-luxury-text-muted text-sm mt-2">
              Check back soon for our latest work!
            </p>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {galleryItems.length > 0 && (
        <Lightbox
          images={galleryItems}
          currentIndex={currentImageIndex}
          isOpen={isLightboxOpen}
          onClose={handleClose}
          onNext={handleNext}
          onPrevious={handlePrevious}
        />
      )}
    </main>
  );
}
