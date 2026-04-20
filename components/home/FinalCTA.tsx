import WhatsAppButton from "@/components/ui/whats-app-button";

interface FinalCTAProps {
  title: string;
  subtitle: string;
  ctaText?: string;
}

export default function FinalCTA({
  title,
  subtitle,
  ctaText = "Let's Create Together",
}: FinalCTAProps) {
  return (
    <section className="py-20 md:py-32 bg-linear-to-b from-luxury-dark to-luxury-darker relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-luxury-accent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-luxury-accent rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Title */}
        <h2 className="font-family-heading text-4xl md:text-5xl lg:text-6xl font-bold text-luxury-accent mb-6 leading-tight">
          {title}
        </h2>

        {/* Subtitle */}
        <p className="text-luxury-text text-lg md:text-xl mb-10 leading-relaxed max-w-2xl mx-auto">
          {subtitle}
        </p>

        {/* CTA Button */}
        <WhatsAppButton text={ctaText} size="lg" variant="primary" />

        {/* Additional Info */}
        <p className="text-luxury-text-muted text-sm mt-8">
          Available for consultations Monday - Saturday
        </p>
      </div>
    </section>
  );
}
