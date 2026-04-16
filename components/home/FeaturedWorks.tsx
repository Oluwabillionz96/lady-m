import Link from "next/link";
import Image from "next/image";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import { GalleryItem } from "@/types";

interface FeaturedWorksProps {
  items: GalleryItem[];
  maxItems?: number;
}

export default function FeaturedWorks({
  items,
  maxItems = 6,
}: FeaturedWorksProps) {
  const featuredItems = items.slice(0, maxItems);

  return (
    <section className="py-16 md:py-24 bg-luxury-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-family-heading text-4xl md:text-5xl lg:text-6xl font-bold text-luxury-accent mb-4">
            Recent Works
          </h2>
          <p className="text-luxury-text-muted text-lg md:text-xl max-w-2xl mx-auto">
            A glimpse into our portfolio of custom-tailored masterpieces
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
          {featuredItems.map((item) => (
            <Link
              key={item.id}
              href="/gallery"
              className="group relative aspect-4/5 overflow-hidden rounded-lg bg-luxury-light"
            >
              {/* Image */}
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-luxury-darker/90 via-luxury-darker/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  {item.title && (
                    <h3 className="text-luxury-text font-semibold text-xl mb-2">
                      {item.title}
                    </h3>
                  )}
                  {item.category && (
                    <p className="text-luxury-accent text-sm">{item.category}</p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center">
          <Link
            href="/gallery"
            className="inline-block text-luxury-accent hover:text-luxury-accent-light font-semibold text-lg transition-colors duration-300 border-b-2 border-luxury-accent hover:border-luxury-accent-light pb-1"
          >
            View Full Gallery →
          </Link>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <p className="text-luxury-text text-lg mb-6">
            Ready to create your own masterpiece?
          </p>
          <WhatsAppButton
            text="Start Your Journey"
            size="lg"
            variant="primary"
          />
        </div>
      </div>
    </section>
  );
}
