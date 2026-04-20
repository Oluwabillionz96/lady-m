export default function AdminLayoutLoading() {
  return (
    <div className="flex min-h-screen bg-luxury-dark">
      {/* Sidebar Skeleton */}
      <div className="hidden lg:flex w-64 bg-luxury-light border-r border-[#333333] flex-col p-6 space-y-6">
        {/* Logo skeleton */}
        <div className="h-8 bg-gradient-to-r from-luxury-light/5 via-luxury-light/10 to-luxury-light/5 rounded max-w-24 shimmer" />

        {/* Navigation items skeleton */}
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="h-10 bg-gradient-to-r from-luxury-light/5 via-luxury-light/10 to-luxury-light/5 rounded shimmer"
            />
          ))}
        </div>

        {/* User info skeleton */}
        <div className="mt-auto pt-6 border-t border-luxury-accent/20 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-luxury-light/5 via-luxury-light/10 to-luxury-light/5 rounded-full shimmer" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gradient-to-r from-luxury-light/5 via-luxury-light/10 to-luxury-light/5 rounded max-w-20 shimmer" />
              <div className="h-3 bg-gradient-to-r from-luxury-light/5 via-luxury-light/10 to-luxury-light/5 rounded max-w-24 shimmer" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header Skeleton */}
        <header className="bg-luxury-light border-b border-[#333333] px-4 lg:px-6 py-4 flex items-center justify-between shrink-0">
          <div className="h-6 bg-gradient-to-r from-luxury-light/5 via-luxury-light/10 to-luxury-light/5 rounded max-w-32 shimmer" />
          <div className="lg:hidden w-6" />
        </header>

        {/* Content Area Skeleton */}
        <main className="flex-1 bg-luxury-dark p-4 lg:p-6">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Header Skeleton */}
            <div className="bg-luxury-light rounded-lg p-6 border border-luxury-accent/20">
              <div className="space-y-3">
                <div className="h-10 bg-gradient-to-r from-luxury-light/5 via-luxury-light/10 to-luxury-light/5 rounded-lg max-w-md shimmer" />
                <div className="h-5 bg-gradient-to-r from-luxury-light/5 via-luxury-light/10 to-luxury-light/5 rounded-lg max-w-2xl shimmer" />
              </div>
            </div>

            {/* Stats Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-luxury-light rounded-lg p-6 border border-luxury-accent/20"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="h-4 bg-gradient-to-r from-luxury-light/5 via-luxury-light/10 to-luxury-light/5 rounded mb-3 max-w-24 shimmer" />
                      <div className="h-8 bg-gradient-to-r from-luxury-light/5 via-luxury-light/10 to-luxury-light/5 rounded max-w-16 shimmer" />
                    </div>
                    <div className="w-8 h-8 bg-gradient-to-r from-luxury-accent/10 via-luxury-accent/20 to-luxury-accent/10 rounded shimmer" />
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions Skeleton */}
            <div className="bg-luxury-light rounded-lg p-6 border border-luxury-accent/20">
              <div className="h-6 bg-gradient-to-r from-luxury-light/5 via-luxury-light/10 to-luxury-light/5 rounded mb-4 max-w-32 shimmer" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-4 bg-luxury-dark rounded-lg"
                  >
                    <div className="w-6 h-6 bg-gradient-to-r from-luxury-accent/10 via-luxury-accent/20 to-luxury-accent/10 rounded shimmer shrink-0" />
                    <div className="flex-1">
                      <div className="h-4 bg-gradient-to-r from-luxury-light/5 via-luxury-light/10 to-luxury-light/5 rounded mb-2 max-w-24 shimmer" />
                      <div className="h-3 bg-gradient-to-r from-luxury-light/5 via-luxury-light/10 to-luxury-light/5 rounded max-w-32 shimmer" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
