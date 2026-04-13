import React from "react";
import Image from "next/image";
import Card from "@/components/ui/Card";
import { Testimonial } from "@/types";

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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-10 h-10 text-luxury-accent opacity-50"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
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
