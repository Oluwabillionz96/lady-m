"use server";

import { CreateGalleryPhotoData, GalleryPhoto, Result } from "@/types";
import { createServerClient } from "../supabase";
import { revalidatePath } from "next/cache";
import { deleteImage } from "../cloudinary/upload";

export async function getGalleryPhotos(): Promise<Result<GalleryPhoto[]>> {
  try {
    const supabase = await createServerClient();

    // TODO: Implement pagination with page/pageSize parameters
    // Use .range(from, to) for offset-based pagination
    // Add count: 'exact' to get total count for pagination UI
    const { data, error } = await supabase
      .from("gallery_photos")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching gallery photos:", error);
      return { success: false, error: "Failed to fetch gallery photos" };
    }

    return { success: true, data: data || [] };
  } catch (error) {
    console.error("Unexpected error:", error);
    return { success: false, error: "An unexpected error occurred" };
  }
}

export async function createGalleryPhoto(
  data: CreateGalleryPhotoData,
): Promise<Result<GalleryPhoto>> {
  try {
    const supabase = await createServerClient();

    // Validate required fields
    if (!data.image_url || !data.title || !data.category) {
      return {
        success: false,
        error: "Image URL, title, and category are required",
      };
    }

    const { data: photo, error } = await supabase
      .from("gallery_photos")
      .insert({
        image_url: data.image_url,
        title: data.title,
        category: data.category,
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating gallery photo:", error);
      return { success: false, error: "Failed to create gallery photo" };
    }

    // Refresh both admin and public gallery caches
    revalidatePath("/admin/gallery");
    revalidatePath("/gallery");

    return { success: true, data: photo };
  } catch (error) {
    console.error("Unexpected error:", error);
    return { success: false, error: "An unexpected error occurred" };
  }
}

export async function updateGalleryPhoto(
  id: string,
  data: Partial<CreateGalleryPhotoData>,
): Promise<Result<GalleryPhoto>> {
  try {
    const supabase = await createServerClient();

    // Validate ID
    if (!id) {
      return { success: false, error: "Photo ID is required" };
    }

    const { data: photo, error } = await supabase
      .from("gallery_photos")
      .update({
        ...(data.image_url && { image_url: data.image_url }),
        ...(data.title && { title: data.title }),
        ...(data.category && { category: data.category }),
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating gallery photo:", error);
      return { success: false, error: "Failed to update gallery photo" };
    }

    // Refresh both admin and public gallery caches
    revalidatePath("/admin/gallery");
    revalidatePath("/gallery");

    return { success: true, data: photo };
  } catch (error) {
    console.error("Unexpected error:", error);
    return { success: false, error: "An unexpected error occurred" };
  }
}

export async function deleteGalleryPhoto(id: string): Promise<Result<boolean>> {
  try {
    const supabase = await createServerClient();

    // Validate ID
    if (!id) {
      return { success: false, error: "Photo ID is required" };
    }

    // First, get the photo to find the Cloudinary public_id
    const { data: photo, error: fetchError } = await supabase
      .from("gallery_photos")
      .select("image_url")
      .eq("id", id)
      .single();

    if (fetchError || !photo) {
      return { success: false, error: "Photo not found" };
    }

    // Extract public_id from Cloudinary URL
    // URL format: https://res.cloudinary.com/cloud_name/image/upload/v1234567890/folder/public_id.jpg
    const publicId = extractPublicIdFromUrl(photo.image_url);

    // Delete from database first
    const { error: deleteError } = await supabase
      .from("gallery_photos")
      .delete()
      .eq("id", id);

    if (deleteError) {
      console.error("Error deleting gallery photo from database:", deleteError);
      return { success: false, error: "Failed to delete gallery photo" };
    }

    // Delete from Cloudinary (cleanup the actual image file)
    if (publicId) {
      const cloudinaryDeleted = await deleteImage(publicId);
      if (!cloudinaryDeleted) {
        console.warn("Failed to delete image from Cloudinary:", publicId);
        // Don't fail the whole operation - database deletion succeeded
      }
    }

    // Refresh both admin and public gallery caches
    revalidatePath("/admin/gallery");
    revalidatePath("/gallery");

    return { success: true, data: true };
  } catch (error) {
    console.error("Unexpected error:", error);
    return { success: false, error: "An unexpected error occurred" };
  }
}

// Helper function to extract public_id from Cloudinary URL
function extractPublicIdFromUrl(url: string): string | null {
  try {
    const parts = url.split("/");
    const uploadIndex = parts.findIndex((part) => part === "upload");
    if (uploadIndex === -1) return null;

    // Get everything after 'upload/v1234567890/' and remove file extension
    const pathAfterVersion = parts.slice(uploadIndex + 2).join("/");
    return pathAfterVersion.replace(/\.[^/.]+$/, ""); // Remove file extension
  } catch {
    return null;
  }
}

// Public gallery photos (no authentication required)
export async function getPublicGalleryPhotos(): Promise<
  Result<GalleryPhoto[]>
> {
  try {
    const supabase = await createServerClient();

    const { data, error } = await supabase
      .from("gallery_photos")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching public gallery photos:", error);
      return { success: false, error: "Failed to fetch gallery photos" };
    }

    return { success: true, data: data || [] };
  } catch (error) {
    console.error("Unexpected error fetching public gallery photos:", error);
    return { success: false, error: "An unexpected error occurred" };
  }
}

// Get total gallery photo count
export async function getGalleryPhotoCount(): Promise<Result<number>> {
  try {
    const supabase = await createServerClient();

    const { count, error } = await supabase
      .from("gallery_photos")
      .select("*", { count: "exact", head: true });

    if (error) {
      console.error("Error fetching gallery photo count:", error);
      return { success: false, error: "Failed to fetch photo count" };
    }

    return { success: true, data: count || 0 };
  } catch (error) {
    console.error("Unexpected error fetching gallery photo count:", error);
    return { success: false, error: "An unexpected error occurred" };
  }
}
