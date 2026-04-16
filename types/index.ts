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
  title: string;
  category: string;
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
  value: string;
  label: string;
  icon?: string;
}

/**
 * Site configuration structure
 * Contains all site metadata, contact information, and social links
 */

export interface CloudinaryUploadResult {
  public_id: string;
  secure_url: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: string;
  bytes: number;
}

export interface CloudinaryTransformation {
  width?: number;
  height?: number;
  crop?: string;
  quality?: string | number;
  format?: string;
  gravity?: string;
  radius?: string | number;
  effect?: string;
  overlay?: string;
  underlay?: string;
  opacity?: number;
  angle?: number;
  border?: string;
  background?: string;
}

export interface CloudinaryUploadOptions {
  folder?: string;
  transformation?: Array<CloudinaryTransformation>;
  quality?: string | number;
  format?: string;
}

export interface GalleryPhoto {
  id: string;
  image_url: string;
  title: string;
  category: string;
  created_at: string;
  updated_at: string;
}

export interface CreateGalleryPhotoData {
  image_url: string;
  title: string;
  category: string;
}

export type Result<T> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      error: string;
    };
