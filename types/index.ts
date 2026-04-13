/**
 * Type definitions for Lady M Portfolio Website
 * 
 * This file contains all TypeScript interfaces and types used across the application.
 * These types ensure type safety and provide clear contracts for data structures.
 */

/**
 * Represents a single gallery item (tailoring work photo)
 * Used in gallery grid and featured works sections
 */
export interface GalleryItem {
  id: string;
  imageUrl: string;
  alt: string;
  title?: string;
  category?: string;
}

/**
 * Represents a client testimonial
 * Used in the testimonials section on the home page
 */
export interface Testimonial {
  id: string;
  name: string;
  photoUrl: string;
  text: string;
  role?: string;
}

/**
 * Represents a metric/statistic card
 * Used in the metrics section on the home page
 */
export interface Metric {
  id: string;
  value: string | number;
  label: string;
  icon?: string;
}

/**
 * Site configuration structure
 * Contains all site metadata, contact information, and social links
 */
export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  contact: {
    whatsapp: string;
    email: string;
    phone: string;
    location: string;
  };
  social?: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
    linkedin?: string;
  };
}
