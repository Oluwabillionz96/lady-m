import React from "react";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  ctaText?: string;
  heroImageUrl?: string;
}

export default function HeroSection({
  title,
  subtitle,
  ctaText = "Book Your Consultation",
  heroImageUrl = "/images/hero/hero-bg.jpg",
}: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImageUrl})` }}
      >
        <div className="absolute inset-0 bg-linear-to-b from-luxury-darker/80 via-luxury-dark/70 to-luxury-dark" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <h1 className="font-family-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-luxury-accent mb-6 leading-tight animate-fade-in">
          {title}
        </h1>
        <p className="text-luxury-text text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto mb-12 leading-relaxed">
          {subtitle}
        </p>
        <div className="flex justify-center">
          <WhatsAppButton text={ctaText} size="lg" variant="primary" />
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6 text-luxury-accent"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
          />
        </svg>
      </div>
    </section>
  );
}
