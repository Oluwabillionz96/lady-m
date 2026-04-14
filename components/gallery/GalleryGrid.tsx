"use client";

import Image from "next/image";
import { ZoomIn } from "lucide-react";
import { GalleryItem } from "@/types";

interface GalleryGridProps {
  items: GalleryItem[];
  onImageClick: (index: number) => void;
}

export default function GalleryGrid({ items, onImageClick }: GalleryGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
      {items.map((item, index) => (
        <button
          key={item.id}
          onClick={() => onImageClick(index)}
          className="group relative aspect-4/5 overflow-hidden rounded-lg bg-luxury-light cursor-pointer focus:outline-none focus:ring-2 focus:ring-luxury-accent"
        >
          {/* Image */}
          <Image
            src={item.imageUrl}
            alt={item.alt}
            fill
            loading="lazy"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-luxury-darker/90 via-luxury-darker/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-0 left-0 right-0 p-4">
              {item.title && (
                <h3 className="text-luxury-text font-semibold text-lg mb-1">
                  {item.title}
                </h3>
              )}
              {item.category && (
                <p className="text-luxury-accent text-sm">{item.category}</p>
              )}
            </div>
          </div>

          {/* Click Indicator */}
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-luxury-accent/90 rounded-full p-2">
              <ZoomIn className="w-5 h-5 text-luxury-dark" />
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}
