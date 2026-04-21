import { z } from "zod";
import { CONFIG } from "@/config/app";

/**
 * Shared validation schemas for forms across the application
 * Single source of truth for validation rules
 */

// Testimonial schemas
export const testimonialSchema = z.object({
  name: z
    .string()
    .min(CONFIG.form.name.min, `Name must be at least ${CONFIG.form.name.min} characters`)
    .max(CONFIG.form.name.max, `Name must be at most ${CONFIG.form.name.max} characters`),
  role: z
    .string()
    .max(CONFIG.form.role.max, `Role must be at most ${CONFIG.form.role.max} characters`)
    .optional(),
  text: z
    .string()
    .min(CONFIG.form.testimonial.min, `Testimonial must be at least ${CONFIG.form.testimonial.min} characters`)
    .max(CONFIG.form.testimonial.max, `Testimonial must be at most ${CONFIG.form.testimonial.max} characters`),
});

export type TestimonialFormData = z.infer<typeof testimonialSchema>;

// Gallery photo schemas
export const galleryPhotoSchema = z.object({
  title: z
    .string()
    .min(CONFIG.form.title.min, `Title must be at least ${CONFIG.form.title.min} characters`)
    .max(CONFIG.form.title.max, `Title must be at most ${CONFIG.form.title.max} characters`),
  category: z.enum(CONFIG.gallery.categories as [string, ...string[]]),
  description: z
    .string()
    .max(CONFIG.form.description.max, `Description must be at most ${CONFIG.form.description.max} characters`)
    .optional(),
});

export type GalleryPhotoFormData = z.infer<typeof galleryPhotoSchema>;

// Settings schemas
export const settingsSchema = z.object({
  email: z.email("Invalid email address")
    .max(CONFIG.form.email.max, `Email must be at most ${CONFIG.form.email.max} characters`),
  phone: z
    .string()
    .min(CONFIG.form.phone.min, `Phone must be at least ${CONFIG.form.phone.min} digits`)
    .max(CONFIG.form.phone.max, `Phone must be at most ${CONFIG.form.phone.max} digits`),
  location: z
    .string()
    .max(CONFIG.form.location.max, `Location must be at most ${CONFIG.form.location.max} characters`),
  facebook: z
    .string()
    .url("Invalid URL")
    .max(CONFIG.form.url.max, `URL must be at most ${CONFIG.form.url.max} characters`)
    .optional(),
  instagram: z
    .string()
    .url("Invalid URL")
    .max(CONFIG.form.url.max, `URL must be at most ${CONFIG.form.url.max} characters`)
    .optional(),
  about_header: z
    .string()
    .max(CONFIG.form.title.max, `Header must be at most ${CONFIG.form.title.max} characters`),
  about_text: z
    .string()
    .max(CONFIG.form.description.max, `Text must be at most ${CONFIG.form.description.max} characters`),
});

export type SettingsFormData = z.infer<typeof settingsSchema>;
