"use server";

import { Result } from "@/types";
import { createServerClient } from "../supabase";
import { revalidatePath } from "next/cache";

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  text: string;
  photo_url: string;
  created_at: string;
  updated_at: string;
}

export interface CreateTestimonialData {
  name: string;
  role?: string;
  text: string;
  photo_url?: string;
}

const supabase = await createServerClient();

export async function getTestimonials(): Promise<Result<Testimonial[]>> {
  const { getTableRecords } = await import("./utils");
  // TODO: Implement pagination with page/pageSize parameters
  // Use .range(from, to) for offset-based pagination
  // Add count: 'exact' to get total count for pagination UI
  return getTableRecords<Testimonial>("testimonials");
}

export async function createTestimonial(
  data: CreateTestimonialData,
): Promise<Result<Testimonial>> {
  try {
    // Validate required fields
    if (!data.name || !data.text) {
      return {
        success: false,
        error: "Name and testimonial text are required",
      };
    }

    const { data: testimonial, error } = await supabase
      .from("testimonials")
      .insert({
        name: data.name.trim(),
        role: data.role?.trim() || "",
        text: data.text.trim(),
        photo_url: data.photo_url || "",
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating testimonial:", error);
      return { success: false, error: "Failed to create testimonial" };
    }

    // Refresh home page cache
    revalidatePath("/");

    return { success: true, data: testimonial };
  } catch (error) {
    console.error("Unexpected error:", error);
    return { success: false, error: "An unexpected error occurred" };
  }
}

export async function updateTestimonial(
  id: string,
  data: Partial<CreateTestimonialData>,
): Promise<Result<Testimonial>> {
  try {
    const supabase = await createServerClient();

    // Validate ID
    if (!id) {
      return { success: false, error: "Testimonial ID is required" };
    }

    const updateData: {
      name?: string;
      role?: string;
      text?: string;
      photo_url?: string;
      updated_at: string;
    } = {
      updated_at: new Date().toISOString(),
    };

    if (data.name) updateData.name = data.name.trim();
    if (data.role !== undefined) updateData.role = data.role.trim();
    if (data.text) updateData.text = data.text.trim();
    if (data.photo_url !== undefined) updateData.photo_url = data.photo_url;

    const { data: testimonial, error } = await supabase
      .from("testimonials")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating testimonial:", error);
      return { success: false, error: "Failed to update testimonial" };
    }

    // Refresh home page cache
    revalidatePath("/");

    return { success: true, data: testimonial };
  } catch (error) {
    console.error("Unexpected error:", error);
    return { success: false, error: "An unexpected error occurred" };
  }
}

export async function deleteTestimonial(id: string): Promise<Result<boolean>> {
  try {
    const supabase = await createServerClient();

    // Validate ID
    if (!id) {
      return { success: false, error: "Testimonial ID is required" };
    }

    const { error } = await supabase.from("testimonials").delete().eq("id", id);

    if (error) {
      console.error("Error deleting testimonial:", error);
      return { success: false, error: "Failed to delete testimonial" };
    }

    // Refresh home page cache
    revalidatePath("/");

    return { success: true, data: true };
  } catch (error) {
    console.error("Unexpected error:", error);
    return { success: false, error: "An unexpected error occurred" };
  }
}

// Get testimonials for public display (no authentication required)
export async function getPublicTestimonials(): Promise<Result<Testimonial[]>> {
  const { getTableRecords } = await import("./utils");
  return getTableRecords<Testimonial>("testimonials");
}

// Get total testimonials count
export async function getTestimonialsCount(): Promise<Result<number>> {
  const { getTableCount } = await import("./utils");
  return getTableCount("testimonials");
}
