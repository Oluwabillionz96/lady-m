import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}

// Server-side Supabase client for data fetching
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Data fetching functions
export async function getMetrics() {
  try {
    const { data, error } = await supabase
      .from('metrics')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching metrics:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching metrics:', error);
    return [];
  }
}

export async function getTestimonials() {
  try {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching testimonials:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return [];
  }
}

export async function getGalleryPhotos() {
  try {
    const { data, error } = await supabase
      .from('gallery_photos')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching gallery photos:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching gallery photos:', error);
    return [];
  }
}

export async function getSiteSettings() {
  try {
    const { data, error } = await supabase
      .from('site_settings')
      .select('*');

    if (error) {
      console.error('Error fetching site settings:', error);
      return {};
    }

    // Convert array of key-value pairs to object
    const settings: Record<string, string> = {};
    data?.forEach(setting => {
      settings[setting.key] = setting.value;
    });

    return settings;
  } catch (error) {
    console.error('Error fetching site settings:', error);
    return {};
  }
}