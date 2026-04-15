// Re-export client creation functions
export { createClient as createBrowserClient } from './client'
export { createClient as createServerClient } from './server'

// Re-export data fetching functions
export {
  getMetrics,
  getTestimonials,
  getGalleryPhotos,
  getSiteSettings
} from './server'

// Re-export types
export type { Database } from '@/types/database'
export type {
  Result,
  DatabaseGalleryPhoto,
  DatabaseTestimonial,
  DatabaseMetric,
  DatabaseSiteSetting,
  ValidationError,
  FormState
} from '@/types/admin'