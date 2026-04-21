import FeaturedWorksSkeleton from "@/components/ui/featured-works-skeleton";

export default function Loading() {
  return (
    <main className="bg-luxury-dark">
      {/* Hero Skeleton */}
      <section className="relative min-h-[80vh] md:min-h-screen flex items-center justify-center bg-luxury-darker">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 text-center">
          <div className="h-16 md:h-24 bg-linear-to-r from-luxury-light/5 via-luxury-light/10 to-luxury-light/5 rounded-lg mb-6 max-w-4xl mx-auto shimmer" />
          <div className="h-8 md:h-12 bg-linear-to-r from-luxury-light/5 via-luxury-light/10 to-luxury-light/5 rounded-lg mb-8 max-w-2xl mx-auto shimmer" />
          <div className="h-12 w-48 bg-linear-to-r from-luxury-accent/10 via-luxury-accent/20 to-luxury-accent/10 rounded-lg mx-auto shimmer" />
        </div>
      </section>

      {/* Metrics Skeleton */}
      <section className="py-16 md:py-24 bg-luxury-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="text-center">
                <div className="h-12 bg-linear-to-r from-luxury-light/5 via-luxury-light/10 to-luxury-light/5 rounded-lg mb-2 max-w-24 mx-auto shimmer" />
                <div className="h-6 bg-linear-to-r from-luxury-light/5 via-luxury-light/10 to-luxury-light/5 rounded-lg max-w-32 mx-auto shimmer" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Works Skeleton */}
      <FeaturedWorksSkeleton />

      {/* About Section Skeleton */}
      <section className="py-16 md:py-24 bg-luxury-darker">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            <div>
              <div className="h-12 bg-linear-to-r from-luxury-light/5 via-luxury-light/10 to-luxury-light/5 rounded-lg mb-6 max-w-md shimmer" />
              <div className="space-y-3">
                <div className="h-6 bg-linear-to-r from-luxury-light/5 via-luxury-light/10 to-luxury-light/5 rounded-lg shimmer" />
                <div className="h-6 bg-linear-to-r from-luxury-light/5 via-luxury-light/10 to-luxury-light/5 rounded-lg shimmer" />
                <div className="h-6 bg-linear-to-r from-luxury-light/5 via-luxury-light/10 to-luxury-light/5 rounded-lg w-3/4 shimmer" />
              </div>
            </div>
            <div className="aspect-4/5 bg-linear-to-r from-luxury-light/5 via-luxury-light/10 to-luxury-light/5 rounded-lg shimmer" />
          </div>
        </div>
      </section>

      {/* Testimonials Skeleton */}
      <section className="py-16 md:py-24 bg-luxury-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-10 bg-linear-to-r from-luxury-light/5 via-luxury-light/10 to-luxury-light/5 rounded-lg mb-12 max-w-md mx-auto shimmer" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-luxury-light/5 rounded-lg p-6 border border-luxury-accent/10"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-linear-to-r from-luxury-light/5 via-luxury-light/10 to-luxury-light/5 rounded-full shimmer" />
                  <div className="flex-1">
                    <div className="h-5 bg-linear-to-r from-luxury-light/5 via-luxury-light/10 to-luxury-light/5 rounded mb-2 w-32 shimmer" />
                    <div className="h-4 bg-linear-to-r from-luxury-light/5 via-luxury-light/10 to-luxury-light/5 rounded w-24 shimmer" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-linear-to-r from-luxury-light/5 via-luxury-light/10 to-luxury-light/5 rounded shimmer" />
                  <div className="h-4 bg-linear-to-r from-luxury-light/5 via-luxury-light/10 to-luxury-light/5 rounded shimmer" />
                  <div className="h-4 bg-linear-to-r from-luxury-light/5 via-luxury-light/10 to-luxury-light/5 rounded w-3/4 shimmer" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Skeleton */}
      <section className="py-20 md:py-32 bg-luxury-darker">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="h-12 bg-linear-to-r from-luxury-light/5 via-luxury-light/10 to-luxury-light/5 rounded-lg mb-6 max-w-2xl mx-auto shimmer" />
          <div className="h-6 bg-linear-to-r from-luxury-light/5 via-luxury-light/10 to-luxury-light/5 rounded-lg mb-10 max-w-xl mx-auto shimmer" />
          <div className="h-12 w-48 bg-linear-to-r from-luxury-accent/10 via-luxury-accent/20 to-luxury-accent/10 rounded-lg mx-auto shimmer" />
        </div>
      </section>
    </main>
  );
}
