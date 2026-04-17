import HeroSection from "@/components/home/HeroSection";
import FeaturedWorks from "@/components/home/FeaturedWorks";
import FeaturedWorksSkeleton from "@/components/ui/FeaturedWorksSkeleton";
import MetricsSection from "@/components/home/MetricsSection";
import BrandContentSection from "@/components/home/BrandContentSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import FinalCTA from "@/components/home/FinalCTA";
import { getPublicGalleryPhotos } from "@/lib/actions/gallery";
import { getPublicTestimonials } from "@/lib/actions/testimonials";
import { getMetrics } from "@/lib/supabase/server";
import { GalleryItem } from "@/types";
import { Suspense } from "react";

async function FeaturedWorksSection() {
  // Fetch gallery photos from database
  const galleryResult = await getPublicGalleryPhotos();
  const galleryPhotos = galleryResult.success ? galleryResult.data : [];

  // Convert database photos to GalleryItem format
  const galleryItems: GalleryItem[] = galleryPhotos.map((photo) => ({
    id: photo.id,
    imageUrl: photo.image_url,
    alt: photo.title,
    title: photo.title,
    category: photo.category,
  }));

  return <FeaturedWorks items={galleryItems} maxItems={6} />;
}

export default async function Home() {
  // Fetch metrics from Supabase
  const supabaseMetrics = await getMetrics();

  // Transform Supabase data to match component interface
  const transformedMetrics = supabaseMetrics.map((metric) => ({
    id: metric.id,
    value: metric.value,
    label: metric.label,
  }));

  // Fetch testimonials from database
  const testimonialsResult = await getPublicTestimonials();
  const dbTestimonials = testimonialsResult.success
    ? testimonialsResult.data
    : [];

  // Transform database testimonials to match component interface (show first 3 on home)
  const transformedTestimonials = dbTestimonials
    .slice(0, 3)
    .map((testimonial) => ({
      id: testimonial.id,
      name: testimonial.name,
      photoUrl: testimonial.photo_url,
      text: testimonial.text,
      role: testimonial.role,
    }));

  const totalTestimonials = dbTestimonials.length;

  return (
    <main>
      <HeroSection
        title="Where Fashion Meets Freedom"
        subtitle="Luxury tailoring crafted for the modern boss lady. Every stitch tells a story of power, elegance, and confidence."
        ctaText="Book Your Consultation"
        heroImageUrl="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop"
      />

      <MetricsSection metrics={transformedMetrics} />

      <Suspense fallback={<FeaturedWorksSkeleton />}>
        <FeaturedWorksSection />
      </Suspense>

      <BrandContentSection
        title="Crafted for Queens"
        content="At Lady M, we don't just tailor clothes—we craft confidence. Every piece is designed to empower you, celebrate your individuality, and make you feel unstoppable.

Our approach combines timeless elegance with modern sophistication, creating garments that are as unique as you are. From the first consultation to the final fitting, we're dedicated to bringing your vision to life with impeccable craftsmanship and attention to detail."
        imageUrl="https://images.unsplash.com/photo-1558769132-cb1aea1c8f5f?q=80&w=1974&auto=format&fit=crop"
      />

      {transformedTestimonials.length > 0 && (
        <TestimonialsSection
          testimonials={transformedTestimonials}
          totalCount={totalTestimonials}
        />
      )}

      <FinalCTA
        title="Ready to Own Your Style?"
        subtitle="Let's create something extraordinary together. Book your consultation today and step into a world where fashion meets freedom."
        ctaText="Start Your Journey"
      />
    </main>
  );
}
