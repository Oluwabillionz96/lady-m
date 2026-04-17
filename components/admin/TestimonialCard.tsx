"use client";

import { useState } from "react";
import { Testimonial } from "@/lib/actions/testimonials";
import { deleteTestimonial } from "@/lib/actions/testimonials";
import { Pencil, Trash2, User } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import { ConfirmDialog } from "./ConfirmDialog";
import { TestimonialEditForm } from "./TestimonialEditForm";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const result = await deleteTestimonial(testimonial.id);
      if (result.success) {
        toast.success("Testimonial deleted");
        setShowDeleteDialog(false);
      } else {
        toast.error(result.error || "Failed to delete testimonial");
      }
    } catch (error) {
      toast.error("Failed to delete testimonial");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className="bg-luxury-light rounded-lg border border-luxury-accent/20 p-4 md:p-6 hover:border-luxury-accent/40 transition-all">
        {/* Header with Photo and Actions */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            {testimonial.photo_url ? (
              <div className="relative w-12 h-12 rounded-full overflow-hidden bg-luxury-dark border border-luxury-accent/20">
                <Image
                  src={testimonial.photo_url}
                  alt={testimonial.name}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="w-12 h-12 rounded-full bg-luxury-dark border border-luxury-accent/20 flex items-center justify-center">
                <User className="w-6 h-6 text-luxury-text-muted" />
              </div>
            )}
            <div>
              <h3 className="font-semibold text-luxury-text">
                {testimonial.name}
              </h3>
              {testimonial.role && (
                <p className="text-sm text-luxury-text-muted">
                  {testimonial.role}
                </p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => setShowEditForm(true)}
              className="p-2 md:p-2.5 text-luxury-accent hover:bg-luxury-accent/10 rounded-lg transition-colors"
              title="Edit testimonial"
            >
              <Pencil className="w-4 h-4 md:w-5 md:h-5" />
            </button>
            <button
              onClick={() => setShowDeleteDialog(true)}
              className="p-2 md:p-2.5 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
              title="Delete testimonial"
            >
              <Trash2 className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>
        </div>

        {/* Testimonial Text */}
        <p className="text-luxury-text-muted text-sm leading-relaxed line-clamp-4">
          "{testimonial.text}"
        </p>

        {/* Date */}
        <p className="text-xs text-luxury-text-muted mt-4">
          {new Date(testimonial.created_at).toLocaleDateString()}
        </p>
      </div>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleDelete}
        title="Delete Testimonial"
        message={`Are you sure you want to delete ${testimonial.name}'s testimonial? This action cannot be undone.`}
        confirmText="Delete"
        isLoading={isDeleting}
      />

      {/* Edit Form Modal */}
      {showEditForm && (
        <TestimonialEditForm
          testimonial={testimonial}
          onClose={() => setShowEditForm(false)}
        />
      )}
    </>
  );
}
