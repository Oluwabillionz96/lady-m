"use server";

import { Result } from "@/types";
import { createServerClient } from "../supabase";
import { revalidatePath } from "next/cache";

export interface Metric {
  id: string;
  value: string;
  label: string;
}

export async function getMetrics(): Promise<Result<Metric[]>> {
  try {
    const supabase = await createServerClient();

    const { data, error } = await supabase
      .from("metrics")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      console.error("Error fetching metrics:", error);
      return { success: false, error: "Failed to fetch metrics" };
    }

    return { success: true, data: data || [] };
  } catch (error) {
    console.error("Unexpected error:", error);
    return { success: false, error: "An unexpected error occurred" };
  }
}

export async function updateMetric(
  id: string,
  value: string,
): Promise<Result<Metric>> {
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

    // Validate ID
    if (!id) {
      return { success: false, error: "Metric ID is required" };
    }

    const { data: metric, error } = await supabase
      .from("metrics")
      .update({
        value: value.trim(),
      })
      .eq("id", id)
      .select()
      .single();
    if (error) {
      console.error("Error updating metric:", error);
      return { success: false, error: "Failed to update metric" };
    }

    // Refresh home page cache
    revalidatePath("/");

    return { success: true, data: metric };
  } catch (error) {
    console.error("Unexpected error:", error);
    return { success: false, error: "An unexpected error occurred" };
  }
}
