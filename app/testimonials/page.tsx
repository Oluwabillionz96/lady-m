import Image from "next/image";
import Card from "@/components/ui/Card";
import { getPublicTestimonials } from "@/lib/actions/testimonials";
import { PaginationControls } from "@/components/admin/pagination-controls";
import { BiSolidQuoteLeft } from "react-icons/bi";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface TestimonialsPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function TestimonialsPage({
  searchParams,
}: TestimonialsPageProps) {
  const params = await searchParams;
  const page = Math.max(1, parseInt(params.page || "1", 10));
  const pageSize = 12;

  const testimonialsResult = await getPublicTestimonials(page, pageSize);
  const {
    data: testimonials,
    total,
    page: currentPage,
    pageSize: currentPageSize,
  } = testimonialsResult.success
    ? testimonialsResult.data
    : { data: [], total: 0, page: 1, pageSize: 12 };

  const totalPages = Math.ceil(total / currentPageSize);

  return (
    <main className="min-h-screen bg-luxury-dark">
      {/* Header */}
      <section className="py-16 md:py-24 bg-luxury-darker">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-luxury-text-muted hover:text-luxury-accent transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          {/* Page Header */}
          <div className="text-center">
            <h1 className="font-family-heading text-4xl md:text-5xl lg:text-6xl font-bold text-luxury-accent mb-4">
              Client Testimonials
            </h1>
            <p className="text-luxury-text-muted text-lg md:text-xl max-w-2xl mx-auto">
              Hear from the women we&apos;ve empowered through exceptional
              tailoring
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {testimonials.length > 0 ? (
            <>
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
                      {testimonial.photo_url ? (
                        <div className="relative w-12 h-12 rounded-full overflow-hidden bg-luxury-light shrink-0">
                          <Image
                            src={testimonial.photo_url}
                            alt={testimonial.name}
                            fill
                            className="object-cover"
                            sizes="48px"
                          />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-luxury-accent/20 flex items-center justify-center shrink-0">
                          <span className="text-luxury-accent font-semibold text-lg">
                            {testimonial.name.charAt(0)}
                          </span>
                        </div>
                      )}
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
              {totalPages > 1 && (
                <PaginationControls
                  currentPage={currentPage}
                  totalPages={totalPages}
                />
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-luxury-text-muted text-lg">
                No testimonials available yet.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
