export default function Loading() {
  return (
    <main className="animate-pulse">
      {/* Hero Skeleton */}
      <section className="relative min-h-[80vh] md:min-h-screen flex items-center justify-center bg-luxury-darker">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 text-center">
          <div className="h-16 md:h-24 bg-luxury-light/10 rounded-lg mb-6 max-w-4xl mx-auto" />
          <div className="h-8 md:h-12 bg-luxury-light/10 rounded-lg mb-8 max-w-2xl mx-auto" />
          <div className="h-12 w-48 bg-luxury-accent/20 rounded-lg mx-auto" />
        </div>
      </section>

      {/* Metrics Skeleton */}
      <section className="py-16 md:py-24 bg-luxury-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="text-center">
                <div className="h-12 bg-luxury-light/10 rounded-lg mb-2 max-w-24 mx-auto" />
                <div className="h-6 bg-luxury-light/10 rounded-lg max-w-32 mx-auto" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Works Skeleton */}
      <section className="py-16 md:py-24 bg-luxury-darker">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-10 bg-luxury-light/10 rounded-lg mb-4 max-w-md mx-auto" />
          <div className="h-6 bg-luxury-light/10 rounded-lg mb-12 max-w-2xl mx-auto" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="aspect-4/5 bg-luxury-light/10 rounded-lg"
              />
            ))}
          </div>
        </div>
      </section>

      {/* About Section Skeleton */}
      <section className="py-16 md:py-24 bg-luxury-darker">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            <div>
              <div className="h-12 bg-luxury-light/10 rounded-lg mb-6 max-w-md" />
              <div className="space-y-3">
                <div className="h-6 bg-luxury-light/10 rounded-lg" />
                <div className="h-6 bg-luxury-light/10 rounded-lg" />
                <div className="h-6 bg-luxury-light/10 rounded-lg w-3/4" />
              </div>
            </div>
            <div className="aspect-4/5 bg-luxury-light/10 rounded-lg" />
          </div>
        </div>
      </section>

      {/* Testimonials Skeleton */}
      <section className="py-16 md:py-24 bg-luxury-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-10 bg-luxury-light/10 rounded-lg mb-12 max-w-md mx-auto" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-luxury-light/5 rounded-lg p-6 border border-luxury-accent/10"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-luxury-light/10 rounded-full" />
                  <div className="flex-1">
                    <div className="h-5 bg-luxury-light/10 rounded mb-2 w-32" />
                    <div className="h-4 bg-luxury-light/10 rounded w-24" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-luxury-light/10 rounded" />
                  <div className="h-4 bg-luxury-light/10 rounded" />
                  <div className="h-4 bg-luxury-light/10 rounded w-3/4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Skeleton */}
      <section className="py-20 md:py-32 bg-luxury-darker">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="h-12 bg-luxury-light/10 rounded-lg mb-6 max-w-2xl mx-auto" />
          <div className="h-6 bg-luxury-light/10 rounded-lg mb-10 max-w-xl mx-auto" />
          <div className="h-12 w-48 bg-luxury-accent/20 rounded-lg mx-auto" />
        </div>
      </section>
    </main>
  );
}
