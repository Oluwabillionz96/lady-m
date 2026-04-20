/**
 * Centralized application configuration
 * Contains all constants, limits, and settings used across the app
 */

export const CONFIG = {
  // App metadata
  app: {
    name: "Lady M",
    tagline: "Luxury Tailoring & Fashion",
    description: "Premium tailoring services with a boss lady aesthetic",
  },

  // Upload configuration
  upload: {
    maxFileSize: 10 * 1024 * 1024, // 10MB
    maxPhotosPerUpload: 10,
    allowedFormats: ["image/jpeg", "image/jpg", "image/png", "image/webp"],
    allowedExtensions: [".jpg", ".jpeg", ".png", ".webp"],
  },

  // Gallery configuration
  gallery: {
    categories: ["portfolio", "bridal", "casual", "formal", "alterations"],
    gridCols: {
      mobile: 1,
      tablet: 2,
      desktop: 3,
    },
  },

  // Form validation limits
  form: {
    title: {
      min: 3,
      max: 100,
    },
    description: {
      min: 10,
      max: 1000,
    },
    name: {
      min: 2,
      max: 100,
    },
    testimonial: {
      min: 10,
      max: 1000,
    },
    role: {
      min: 0,
      max: 100,
    },
    email: {
      max: 255,
    },
    phone: {
      min: 10,
      max: 15,
    },
    location: {
      max: 100,
    },
    url: {
      max: 500,
    },
  },

  // Pagination
  pagination: {
    defaultPageSize: 20,
    maxPageSize: 100,
  },

  // UI/UX
  ui: {
    animationDuration: 200,
    toastDuration: 3000,
  },

  // API configuration
  api: {
    timeout: 30000, // 30 seconds
    retries: 3,
  },
};

/**
 * Get the app URL (for API calls, redirects, etc.)
 */
export function getAppUrl(): string {
  return process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
}

/**
 * Get API endpoint URL
 */
export function getApiUrl(path: string): string {
  return `${getAppUrl()}/api${path}`;
}
