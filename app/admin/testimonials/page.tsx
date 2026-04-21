import { getTestimonials } from "@/lib/actions/testimonials";
import { TestimonialsGrid } from "@/components/admin/testimonials-grid";
import { TestimonialForm } from "@/components/admin/testimonial-form";
import { PaginationControls } from "@/components/admin/pagination-controls";
import { Plus } from "lucide-react";
import PageHeader from "@/components/admin/page-header";

export const dynamic = "force-dynamic";

interface TestimonialsPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function TestimonialsPage({
  searchParams,
}: TestimonialsPageProps) {
  const params = await searchParams;
  const page = Math.max(1, parseInt(params.page || "1", 10));
  const pageSize = 12;

  const result = await getTestimonials(page, pageSize);

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

  const {
    data: testimonials,
    total,
    page: currentPage,
    pageSize: currentPageSize,
  } = result.data;
  const totalPages = Math.ceil(total / currentPageSize);

  return (
    <div className="space-y-6">
      <PageHeader
        headingText="Testimonials Management"
        subText={`Manage client testimonials (${total} total)`}
      >
        <TestimonialForm />
      </PageHeader>

      {/* Testimonials Grid */}
      {testimonials.length > 0 ? (
        <>
          <TestimonialsGrid testimonials={testimonials} />
          {totalPages > 1 && (
            <PaginationControls
              currentPage={currentPage}
              totalPages={totalPages}
            />
          )}
        </>
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
