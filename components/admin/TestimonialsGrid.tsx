"use client";

import { Testimonial } from "@/lib/actions/testimonials";
import { TestimonialCard } from "./TestimonialCard";

interface TestimonialsGridProps {
  testimonials: Testimonial[];
}

export function TestimonialsGrid({ testimonials }: TestimonialsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {testimonials.map((testimonial) => (
        <TestimonialCard key={testimonial.id} testimonial={testimonial} />
      ))}
    </div>
  );
}
