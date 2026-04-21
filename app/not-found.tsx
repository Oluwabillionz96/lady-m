import Link from "next/link";
import WhatsAppButton from "@/components/ui/whats-app-button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto text-center">
        {/* 404 Number */}
        <h1 className="font-family-heading text-8xl md:text-9xl font-bold text-luxury-accent mb-4">
          404
        </h1>

        {/* Message */}
        <h2 className="font-family-heading text-3xl md:text-4xl font-bold text-luxury-text mb-4">
          Page Not Found
        </h2>
        <p className="text-luxury-text-muted text-lg md:text-xl mb-8 max-w-md mx-auto">
          Looks like this page took a detour. Let&apos;s get you back on track.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-lg w-full sm:w-fit bg-luxury-accent text-luxury-dark hover:bg-luxury-accent-light shadow-luxury hover:shadow-luxury-lg transition-all duration-300 hover:scale-105"
          >
            Back to Home
          </Link>

          <WhatsAppButton
            text="Contact Us"
            variant="secondary"
            size="lg"
            className="w-full md:w-fit"
          />
        </div>
      </div>
    </div>
  );
}
