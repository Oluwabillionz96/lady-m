import HeroSection from "@/components/home/HeroSection";
import FeaturedWorks from "@/components/home/FeaturedWorks";
import MetricsSection from "@/components/home/MetricsSection";
import BrandContentSection from "@/components/home/BrandContentSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import FinalCTA from "@/components/home/FinalCTA";
import { getPublicGalleryPhotos } from "@/lib/actions/gallery";
import { getPublicTestimonials } from "@/lib/actions/testimonials";
import { getSettings } from "@/lib/actions/settings";
import { getMetrics } from "@/lib/supabase/server";
import { GalleryItem } from "@/types";

export default async function Home() {
  // Fetch all data in parallel
  const [metricsData, galleryResult, testimonialsResult, settingsResult] =
    await Promise.all([
      getMetrics(),
      getPublicGalleryPhotos(),
      getPublicTestimonials(),
      getSettings(),
    ]);

  // Transform metrics
  const transformedMetrics = metricsData.map((metric) => ({
    id: metric.id,
    value: metric.value,
    label: metric.label,
  }));

  // Transform gallery photos
  const galleryPhotos = galleryResult.success ? galleryResult.data.data : [];
  const galleryItems: GalleryItem[] = galleryPhotos.map((photo) => ({
    id: photo.id,
    imageUrl: photo.image_url,
    alt: photo.title,
    title: photo.title,
    category: photo.category,
  }));

  // Transform testimonials
  const dbTestimonials = testimonialsResult.success
    ? testimonialsResult.data.data
    : [];
  const transformedTestimonials = dbTestimonials
    .slice(0, 3)
    .map((testimonial) => ({
      id: testimonial.id,
      name: testimonial.name,
      photoUrl: testimonial.photo_url,
      text: testimonial.text,
      role: testimonial.role,
    }));
  const totalTestimonials = testimonialsResult.success
    ? testimonialsResult.data.total
    : 0;

  // Get settings with fallbacks
  const settings = settingsResult.success
    ? settingsResult.data
    : {
        about_header: "Crafted for Queens",
        about_text:
          "At Lady M, we don't just tailor clothes—we craft confidence. Every piece is designed to empower you, celebrate your individuality, and make you feel unstoppable.\n\nOur approach combines timeless elegance with modern sophistication, creating garments that are as unique as you are. From the first consultation to the final fitting, we're dedicated to bringing your vision to life with impeccable craftsmanship and attention to detail.",
        about_image_url:
          "https://images.unsplash.com/photo-1558769132-cb1aea1c8f5f?q=80&w=1974&auto=format&fit=crop",
      };

  return (
    <main>
      <HeroSection
        title="Where Fashion Meets Freedom"
        subtitle="Luxury tailoring crafted for the modern boss lady. Every stitch tells a story of power, elegance, and confidence."
        ctaText="Book Your Consultation"
        heroImageUrl="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop"
      />

      <MetricsSection metrics={transformedMetrics} />

      <FeaturedWorks items={galleryItems} maxItems={6} />

      <BrandContentSection
        title={settings.about_header}
        content={settings.about_text}
        imageUrl={settings.about_image_url}
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
