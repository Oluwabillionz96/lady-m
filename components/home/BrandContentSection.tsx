import React from "react";
import Image from "next/image";

interface BrandContentSectionProps {
  title: string;
  content: string;
  imageUrl?: string;
}

export default function BrandContentSection({
  title,
  content,
  imageUrl = "/images/hero/brand-image.jpg",
}: BrandContentSectionProps) {
  return (
    <section className="py-16 md:py-24 bg-luxury-darker">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <div className="order-2 lg:order-1">
            <h2 className="font-family-heading text-4xl md:text-5xl lg:text-6xl font-bold text-luxury-accent mb-6 leading-tight">
              {title}
            </h2>
            <div className="text-luxury-text text-lg md:text-xl leading-relaxed space-y-4">
              {content.split("\n\n").map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="order-1 lg:order-2">
            <div className="relative aspect-4/5 rounded-lg overflow-hidden shadow-luxury-lg">
              <Image
                src={imageUrl}
                alt={title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-linear-to-t from-luxury-darker/40 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
