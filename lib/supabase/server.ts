import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Database } from "@/types/database";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    },
  );
}

// Data fetching functions
export async function getMetrics() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("metrics")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Error fetching metrics:", error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error("Error fetching metrics:", error);
    return [];
  }
}

export async function getTestimonials() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching testimonials:", error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return [];
  }
}

export async function getGalleryPhotos() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("gallery_photos")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching gallery photos:", error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error("Error fetching gallery photos:", error);
    return [];
  }
}

export async function getSiteSettings() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from("site_settings").select("*");

    if (error) {
      console.error("Error fetching site settings:", error);
      return {};
    }

    // Convert array of key-value pairs to object
    const settings: Record<string, string> = {};
    data?.forEach((setting) => {
      settings[setting.key] = setting.value;
    });

    return settings;
  } catch (error) {
    // Handle build-time errors gracefully (when cookies() is not available)
    console.error("Error fetching site settings:", error);
    return {};
  }
}
