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
    imageUrl: "https://images.unsplash.com/photo-1594633313593-bab3825d0caf?q=80&w=1974&auto=format&fit=crop",
    alt: "Custom tailored navy blue suit with gold accents",
    title: "Executive Power Suit",
    category: "Formal",
  },
  {
    id: "2",
    imageUrl: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1974&auto=format&fit=crop",
    alt: "Elegant burgundy evening gown with intricate beading",
    title: "Evening Elegance",
    category: "Evening Wear",
  },
  {
    id: "3",
    imageUrl: "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?q=80&w=1974&auto=format&fit=crop",
    alt: "Tailored black blazer with structured shoulders",
    title: "Boss Lady Blazer",
    category: "Business",
  },
  {
    id: "4",
    imageUrl: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1983&auto=format&fit=crop",
    alt: "Flowing emerald green cocktail dress",
    title: "Cocktail Sophistication",
    category: "Cocktail",
  },
  {
    id: "5",
    imageUrl: "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?q=80&w=1974&auto=format&fit=crop",
    alt: "Charcoal grey three-piece suit with pinstripes",
    title: "Classic Pinstripe",
    category: "Formal",
  },
  {
    id: "6",
    imageUrl: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?q=80&w=1974&auto=format&fit=crop",
    alt: "Champagne colored silk blouse with pearl buttons",
    title: "Luxury Silk Blouse",
    category: "Casual Luxury",
  },
  {
    id: "7",
    imageUrl: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1974&auto=format&fit=crop",
    alt: "Tailored cream pantsuit with wide-leg trousers",
    title: "Modern Pantsuit",
    category: "Business",
  },
  {
    id: "8",
    imageUrl: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=1974&auto=format&fit=crop",
    alt: "Deep purple velvet jacket with satin lapels",
    title: "Velvet Luxe",
    category: "Evening Wear",
  },
  {
    id: "9",
    imageUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1920&auto=format&fit=crop",
    alt: "Tailored white shirt dress with belt detail",
    title: "Shirt Dress Elegance",
    category: "Casual Luxury",
  },
  {
    id: "10",
    imageUrl: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?q=80&w=2070&auto=format&fit=crop",
    alt: "Black and gold embroidered evening coat",
    title: "Statement Coat",
    category: "Evening Wear",
  },
  {
    id: "11",
    imageUrl: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=1974&auto=format&fit=crop",
    alt: "Tailored camel wool coat with oversized collar",
    title: "Winter Sophistication",
    category: "Outerwear",
  },
  {
    id: "12",
    imageUrl: "https://images.unsplash.com/photo-1596783074918-c84cb06531ca?q=80&w=1974&auto=format&fit=crop",
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
