/**
 * Gallery Data Configuration
 * 
 * This file contains all gallery items displayed on the Gallery page and Featured Works section.
 * Placeholder images can be easily replaced by updating the imageUrl paths.
 * 
 * Image orientation guide:
 * - Portrait: 800x1000 (4:5 ratio)
 * - Landscape: 1000x800 (5:4 ratio)
 */

import { GalleryItem } from "@/types";

export const galleryItems: GalleryItem[] = [
  {
    id: "1",
    imageUrl: "/images/gallery/placeholder-1.jpg",
    alt: "Custom tailored navy blue suit with gold accents",
    title: "Executive Power Suit",
    category: "Formal",
  },
  {
    id: "2",
    imageUrl: "/images/gallery/placeholder-2.jpg",
    alt: "Elegant burgundy evening gown with intricate beading",
    title: "Evening Elegance",
    category: "Evening Wear",
  },
  {
    id: "3",
    imageUrl: "/images/gallery/placeholder-3.jpg",
    alt: "Tailored black blazer with structured shoulders",
    title: "Boss Lady Blazer",
    category: "Business",
  },
  {
    id: "4",
    imageUrl: "/images/gallery/placeholder-4.jpg",
    alt: "Flowing emerald green cocktail dress",
    title: "Cocktail Sophistication",
    category: "Cocktail",
  },
  {
    id: "5",
    imageUrl: "/images/gallery/placeholder-5.jpg",
    alt: "Charcoal grey three-piece suit with pinstripes",
    title: "Classic Pinstripe",
    category: "Formal",
  },
  {
    id: "6",
    imageUrl: "/images/gallery/placeholder-6.jpg",
    alt: "Champagne colored silk blouse with pearl buttons",
    title: "Luxury Silk Blouse",
    category: "Casual Luxury",
  },
  {
    id: "7",
    imageUrl: "/images/gallery/placeholder-7.jpg",
    alt: "Tailored cream pantsuit with wide-leg trousers",
    title: "Modern Pantsuit",
    category: "Business",
  },
  {
    id: "8",
    imageUrl: "/images/gallery/placeholder-8.jpg",
    alt: "Deep purple velvet jacket with satin lapels",
    title: "Velvet Luxe",
    category: "Evening Wear",
  },
  {
    id: "9",
    imageUrl: "/images/gallery/placeholder-9.jpg",
    alt: "Tailored white shirt dress with belt detail",
    title: "Shirt Dress Elegance",
    category: "Casual Luxury",
  },
  {
    id: "10",
    imageUrl: "/images/gallery/placeholder-10.jpg",
    alt: "Black and gold embroidered evening coat",
    title: "Statement Coat",
    category: "Evening Wear",
  },
  {
    id: "11",
    imageUrl: "/images/gallery/placeholder-11.jpg",
    alt: "Tailored camel wool coat with oversized collar",
    title: "Winter Sophistication",
    category: "Outerwear",
  },
  {
    id: "12",
    imageUrl: "/images/gallery/placeholder-12.jpg",
    alt: "Rose gold sequined cocktail dress",
    title: "Glamour Night",
    category: "Cocktail",
  },
];

/**
 * Get a subset of gallery items for featured works section
 * @param maxItems - Maximum number of items to return (default: 6)
 * @returns Array of gallery items
 */
export function getFeaturedItems(maxItems: number = 6): GalleryItem[] {
  return galleryItems.slice(0, maxItems);
}

/**
 * Get gallery item by ID
 * @param id - Gallery item ID
 * @returns Gallery item or undefined if not found
 */
export function getGalleryItemById(id: string): GalleryItem | undefined {
  return galleryItems.find((item) => item.id === id);
}
