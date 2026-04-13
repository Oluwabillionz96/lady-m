import HeroSection from "@/components/home/HeroSection";
import FeaturedWorks from "@/components/home/FeaturedWorks";
import MetricsSection from "@/components/home/MetricsSection";
import BrandContentSection from "@/components/home/BrandContentSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import FinalCTA from "@/components/home/FinalCTA";
import { galleryItems } from "@/config/gallery";
import { testimonials } from "@/config/testimonials";
import { metrics } from "@/config/metrics";

export default function Home() {
  return (
    <main>
      <HeroSection
        title="Where Fashion Meets Freedom"
        subtitle="Luxury tailoring crafted for the modern boss lady. Every stitch tells a story of power, elegance, and confidence."
        ctaText="Book Your Consultation"
        heroImageUrl="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop"
      />

      <MetricsSection metrics={metrics} />

      <FeaturedWorks items={galleryItems} maxItems={6} />

      <BrandContentSection
        title="Crafted for Queens"
        content="At Lady M, we don't just tailor clothes—we craft confidence. Every piece is designed to empower you, celebrate your individuality, and make you feel unstoppable.

Our approach combines timeless elegance with modern sophistication, creating garments that are as unique as you are. From the first consultation to the final fitting, we're dedicated to bringing your vision to life with impeccable craftsmanship and attention to detail."
        imageUrl="https://images.unsplash.com/photo-1558769132-cb1aea1c8f5f?q=80&w=1974&auto=format&fit=crop"
      />

      <TestimonialsSection testimonials={testimonials} />

      <FinalCTA
        title="Ready to Own Your Style?"
        subtitle="Let's create something extraordinary together. Book your consultation today and step into a world where fashion meets freedom."
        ctaText="Start Your Journey"
      />
    </main>
  );
}
