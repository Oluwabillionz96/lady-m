export default function FeaturedWorksSkeleton() {
  return (
    <section className="py-16 md:py-24 bg-luxury-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-family-heading text-4xl md:text-5xl lg:text-6xl font-bold text-luxury-accent mb-4">
            Featured Works
          </h2>
          <p className="text-luxury-text-muted text-lg md:text-xl max-w-2xl mx-auto">
            A glimpse into our portfolio of custom-tailored masterpieces
          </p>
        </div>

        {/* Skeleton Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="relative aspect-4/5 overflow-hidden rounded-lg bg-luxury-light animate-pulse"
            >
              {/* Image skeleton */}
              <div className="absolute inset-0 bg-linear-to-br from-luxury-light to-luxury-dark/20" />
              
              {/* Content skeleton */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-linear-to-t from-luxury-darker/90 to-transparent">
                {/* Title skeleton */}
                <div className="h-6 bg-luxury-accent/30 rounded mb-2 w-4/5 animate-pulse" />
                {/* Category skeleton */}
                <div className="h-4 bg-luxury-accent/20 rounded w-2/3 animate-pulse" />
              </div>
            </div>
          ))}
        </div>

        {/* View All Link Skeleton */}
        <div className="text-center">
          <div className="inline-block h-6 w-40 bg-luxury-accent/30 rounded animate-pulse" />
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <p className="text-luxury-text text-lg mb-6">
            Ready to create your own masterpiece?
          </p>
          <div className="inline-block h-12 w-48 bg-luxury-accent/30 rounded-lg animate-pulse" />
        </div>
      </div>
    </section>
  );
}
