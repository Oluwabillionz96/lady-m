"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Edit, Trash2 } from "lucide-react";
import { GalleryItem } from "@/types";

interface LightboxProps {
  images: GalleryItem[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
  // Optional admin actions
  adminActions?: {
    onEdit?: (image: GalleryItem, index: number) => void;
    onDelete?: (image: GalleryItem, index: number) => void;
    isDeleting?: boolean;
  };
}

export default function Lightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNext,
  onPrevious,
  adminActions,
}: LightboxProps) {
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [direction, setDirection] = useState(0);

  // Preload adjacent images
  useEffect(() => {
    if (isOpen && images.length > 0) {
      const nextIndex = (currentIndex + 1) % images.length;
      const prevIndex = (currentIndex - 1 + images.length) % images.length;

      [nextIndex, prevIndex].forEach((index) => {
        const img = new window.Image();
        img.src = images[index].imageUrl;
      });
    }
  }, [currentIndex, isOpen, images]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") {
        setDirection(-1);
        onPrevious();
      }
      if (e.key === "ArrowRight") {
        setDirection(1);
        onNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, onNext, onPrevious]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle touch events for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      // Swipe left - next image
      setDirection(1);
      onNext();
    }

    if (touchStart - touchEnd < -50) {
      // Swipe right - previous image
      setDirection(-1);
      onPrevious();
    }
  };

  if (!isOpen || images.length === 0) return null;

  const currentImage = images[currentIndex];

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
    }),
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-luxury-darker/95 backdrop-blur-sm flex items-center justify-center"
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Close Button */}
      <div className="absolute top-4 flex gap-4 right-4 z-50">
        
        {adminActions && (
          <div className="flex items-center gap-4">
            {adminActions.onEdit && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  adminActions.onEdit!(currentImage, currentIndex);
                }}
                className="p-3 rounded-full bg-blue-500/90 hover:bg-blue-500 text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-lg"
                aria-label="Edit photo"
              >
                <Edit className="w-6 h-6" />
              </button>
            )}
            {adminActions.onDelete && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  adminActions.onDelete!(currentImage, currentIndex);
                }}
                disabled={adminActions.isDeleting}
                className="p-3 rounded-full bg-red-500/90 hover:bg-red-500 text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-400 disabled:opacity-50 shadow-lg"
                aria-label="Delete photo"
              >
                <Trash2 className="w-6 h-6" />
              </button>
            )}
          </div>
        )}
        <button
          onClick={onClose}
          className=" p-3 rounded-full bg-luxury-light/80 hover:bg-luxury-light transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-luxury-accent"
          aria-label="Close lightbox"
        >
          <X className="w-6 h-6 text-luxury-text" />
        </button>
      </div>

      {/* Admin Actions - Top Right */}

      {/* Desktop Navigation - Previous */}
      {images.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setDirection(-1);
            onPrevious();
          }}
          className="hidden md:block absolute left-4 z-50 p-3 rounded-full bg-luxury-light/80 hover:bg-luxury-light transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-luxury-accent"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-8 h-8 text-luxury-text" />
        </button>
      )}

      {/* Desktop Navigation - Next */}
      {images.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setDirection(1);
            onNext();
          }}
          className="hidden md:block absolute right-4 z-50 p-3 rounded-full bg-luxury-light/80 hover:bg-luxury-light transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-luxury-accent"
          aria-label="Next image"
        >
          <ChevronRight className="w-8 h-8 text-luxury-text" />
        </button>
      )}

      {/* Image Container with Animation */}
      <div
        className="relative w-full h-full max-w-7xl max-h-[90vh] mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="relative w-full h-full"
          >
            <Image
              src={currentImage.imageUrl}
              alt={currentImage.alt}
              fill
              loading="eager"
              className="object-contain"
              sizes="100vw"
              priority
            />

            {/* Image Info */}
            <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-luxury-darker/90 to-transparent p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  {currentImage.title && (
                    <h3 className="text-luxury-text font-semibold text-xl md:text-2xl mb-2">
                      {currentImage.title}
                    </h3>
                  )}
                  <div className="flex items-center gap-4">
                    {currentImage.category && (
                      <p className="text-luxury-accent text-sm md:text-base">
                        {currentImage.category}
                      </p>
                    )}
                    <p className="text-luxury-text-muted text-sm">
                      {currentIndex + 1} / {images.length}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Mobile Swipe Hint */}
      <div className="md:hidden absolute bottom-4 left-1/2 transform -translate-x-1/2 text-luxury-text-muted text-sm">
        Swipe to navigate
      </div>
    </motion.div>
  );
}
