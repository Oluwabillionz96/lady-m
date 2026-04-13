"use client";

import { useState } from "react";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import Lightbox from "@/components/gallery/Lightbox";
import { galleryItems } from "@/config/gallery";

export default function GalleryPage() {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

        {/* Gallery Grid */}
        <GalleryGrid items={galleryItems} onImageClick={handleImageClick} />
      </div>

      {/* Lightbox */}
      <Lightbox
        images={galleryItems}
        currentIndex={currentImageIndex}
        isOpen={isLightboxOpen}
        onClose={handleClose}
        onNext={handleNext}
        onPrevious={handlePrevious}
      />
    </main>
  );
}
