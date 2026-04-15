// Result type for server actions
export type Result<T> = 
  | { success: true; data: T }
  | { success: false; error: string };

// Database types
export interface DatabaseGalleryPhoto {
  id: string;
  image_url: string;
  title: string;
  category: string;
  created_at: string;
  updated_at: string;
}

export interface DatabaseTestimonial {
  id: string;
  name: string;
  role?: string;
  text: string;
  photo_url?: string;
  created_at: string;
  updated_at: string;
}

export interface DatabaseMetric {
  id: string;
  value: string;
  label: string;
  updated_at: string;
}

export interface DatabaseSiteSetting {
  id: string;
  key: string;
  value: string;
  updated_at: string;
}

// Form validation types
export interface ValidationError {
  field: string;
  message: string;
}

export interface FormState<T> {
  data: T;
  errors: ValidationError[];
  isSubmitting: boolean;
}
