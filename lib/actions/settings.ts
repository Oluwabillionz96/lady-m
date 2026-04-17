"use server";

import { Result } from "@/types";
import { createServerClient } from "../supabase";
import { revalidatePath } from "next/cache";

export interface SiteSetting {
  id: string;
  key: string;
  value: string;
  updated_at: string;
}

export interface SettingsData {
  email: string;
  phone: string;
  location: string;
  facebook: string;
  instagram?: string;
  about_header: string;
  about_text: string;
  about_image_url: string;
}

const SETTING_KEYS = [
  "email",
  "phone",
  "location",
  "facebook",
  "instagram",
  "about_header",
  "about_text",
  "about_image_url",
] as const;

export async function getSettings(): Promise<Result<SettingsData>> {
  try {
    const supabase = await createServerClient();

    const { data, error } = await supabase
      .from("site_settings")
      .select("*")
      .in("key", SETTING_KEYS);

    if (error) {
      console.error("Error fetching settings:", error);
      return { success: false, error: "Failed to fetch settings" };
    }

    // Transform array to object
    const settings: Partial<SettingsData> = {};
    data?.forEach((setting) => {
      settings[setting.key as keyof SettingsData] = setting.value;
    });

    // Provide defaults for missing settings
    const settingsData: SettingsData = {
      email: settings.email || "",
      phone: settings.phone || "",
      location: settings.location || "",
      facebook: settings.facebook || "",
      instagram: settings.instagram || "",
      about_header: settings.about_header || "Crafted for Queens",
      about_text: settings.about_text || "",
      about_image_url: settings.about_image_url || "",
    };

    return { success: true, data: settingsData };
  } catch (error) {
    console.error("Unexpected error:", error);
    return { success: false, error: "An unexpected error occurred" };
  }
}

export async function updateSettings(
  settings: Partial<SettingsData>,
): Promise<Result<boolean>> {
  try {
    const supabase = await createServerClient();

    // Check authentication
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      console.error("Authentication error:", authError);
      return { success: false, error: "Unauthorized" };
    }

    // Convert settings object to array of upsert operations
    const updates = Object.entries(settings).map(([key, value]) => ({
      key,
      value: value || "",
      updated_at: new Date().toISOString(),
    }));

    // Upsert will work now since 'key' is the primary key
    const { error } = await supabase.from("site_settings").upsert(updates);

    if (error) {
      console.error("Error updating settings:", error);
      return {
        success: false,
        error: `Failed to update settings: ${error.message}`,
      };
    }

    // Refresh home page cache
    revalidatePath("/");
    revalidatePath("/admin/settings");

    return { success: true, data: true };
  } catch (error) {
    console.error("Unexpected error:", error);
    return { success: false, error: "An unexpected error occurred" };
  }
}

export async function getSetting(key: string): Promise<Result<string>> {
  try {
    const supabase = await createServerClient();

    const { data, error } = await supabase
      .from("site_settings")
      .select("value")
      .eq("key", key)
      .single();

    if (error) {
      console.error(`Error fetching setting ${key}:`, error);
      return { success: false, error: `Failed to fetch ${key}` };
    }

    return { success: true, data: data?.value || "" };
  } catch (error) {
    console.error("Unexpected error:", error);
    return { success: false, error: "An unexpected error occurred" };
  }
}
