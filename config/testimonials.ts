/**
 * Testimonials Data Configuration
 *
 * This file contains all client testimonials displayed on the Home page.
 * Placeholder photos and names can be easily replaced by updating the data below.
 *
 * Photo specifications:
 * - Size: 200x200 (square)
 * - Format: JPG or PNG
 * - Location: /public/images/testimonials/
 */

import { Testimonial } from "@/types";

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Sophia Martinez",
    photoUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
    text: "Lady M transformed my wardrobe with her impeccable tailoring. Every piece she creates makes me feel powerful and confident. Her attention to detail is unmatched!",
    role: "CEO, Tech Startup",
  },
  {
    id: "2",
    name: "Isabella Chen",
    photoUrl:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop",
    text: "Working with Lady M was an absolute dream. She understood my vision perfectly and delivered a custom suit that exceeded all expectations. I've never felt more like a boss!",
    role: "Executive Director",
  },
  {
    id: "3",
    name: "Amara Johnson",
    photoUrl:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop",
    text: "Lady M's craftsmanship is extraordinary. She doesn't just tailor clothes—she creates wearable art that empowers you. I recommend her to every woman who wants to look and feel unstoppable.",
    role: "Fashion Entrepreneur",
  },
];

/**
 * Get testimonial by ID
 * @param id - Testimonial ID
 * @returns Testimonial or undefined if not found
 */
export function getTestimonialById(id: string): Testimonial | undefined {
  return testimonials.find((testimonial) => testimonial.id === id);
}

/**
 * Get a subset of testimonials
 * @param maxItems - Maximum number of testimonials to return
 * @returns Array of testimonials
 */
export function getFeaturedTestimonials(maxItems: number = 3): Testimonial[] {
  return testimonials.slice(0, maxItems);
}
