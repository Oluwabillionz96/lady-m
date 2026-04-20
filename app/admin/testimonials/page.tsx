import { getTestimonials } from "@/lib/actions/testimonials";
import { TestimonialsGrid } from "@/components/admin/testimonials-grid";
import { TestimonialForm } from "@/components/admin/testimonial-form";
import { Plus } from "lucide-react";
import PageHeader from "@/components/admin/page-header";

export const dynamic = "force-dynamic";

export default async function TestimonialsPage() {
  const result = await getTestimonials();

  if (!result.success) {
    return (
      <PageHeader
        headingText="Testimonials Management"
        subText="Manage client testimonials"
      >
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
          <p className="text-red-400">
            Error loading testimonials: {result.error}
          </p>
        </div>
      </PageHeader>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        headingText="Testimonials Management"
        subText="Manage client testimonials"
      >
        <TestimonialForm />
      </PageHeader>

      {/* Testimonials Grid */}
      {result.data.length > 0 ? (
        <TestimonialsGrid testimonials={result.data} />
      ) : (
        <div className="text-center py-12">
          <div className="bg-luxury-light rounded-lg p-8 border border-luxury-accent/20">
            <Plus className="w-12 h-12 text-luxury-text-muted mx-auto mb-4" />
            <h3 className="text-lg font-medium text-luxury-text mb-2">
              No testimonials yet
            </h3>
            <p className="text-luxury-text-muted mb-4">
              Start building trust by adding your first client testimonial
            </p>
            <TestimonialForm />
          </div>
        </div>
      )}
    </div>
  );
}
