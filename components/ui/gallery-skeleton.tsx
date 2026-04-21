export default function GallerySkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
      {Array.from({ length: 12 }).map((_, index) => (
        <div
          key={index}
          className="relative aspect-4/5 overflow-hidden rounded-lg bg-luxury-light"
        >
          {/* Base skeleton */}
          <div className="absolute inset-0 bg-linear-to-br from-luxury-light via-luxury-accent/5 to-luxury-light animate-pulse" />

          {/* Shimmer effect */}
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-linear-to-r from-transparent via-luxury-accent/10 to-transparent" />
        </div>
      ))}
    </div>
  );
}
