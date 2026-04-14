import Image from "next/image";
import Card from "@/components/ui/Card";
import { Testimonial } from "@/types";
import { BiSolidQuoteLeft } from "react-icons/bi";

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export default function TestimonialsSection({
  testimonials,
}: TestimonialsSectionProps) {
  return (
    <section className="py-16 md:py-24 bg-luxury-darker">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-family-heading text-4xl md:text-5xl lg:text-6xl font-bold text-luxury-accent mb-4">
            What Our Clients Say
          </h2>
          <p className="text-luxury-text-muted text-lg md:text-xl max-w-2xl mx-auto">
            Empowering women through exceptional tailoring
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} variant="elevated">
              {/* Quote Icon */}
              <div className="mb-4">
                <BiSolidQuoteLeft className="w-10 h-10 text-luxury-accent opacity-50" />
              </div>

              {/* Testimonial Text */}
              <p className="text-luxury-text text-base leading-relaxed mb-6">
                &quot;{testimonial.text}&quot;
              </p>

              {/* Client Info */}
              <div className="flex items-center gap-4 pt-4 border-t border-luxury-accent/20">
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-luxury-light shrink-0">
                  <Image
                    src={testimonial.photoUrl}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
                <div>
                  <p className="text-luxury-text font-semibold">
                    {testimonial.name}
                  </p>
                  {testimonial.role && (
                    <p className="text-luxury-text-muted text-sm">
                      {testimonial.role}
                    </p>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
