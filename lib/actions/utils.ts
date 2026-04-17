"use server";

import { Result } from "@/types";
import { createServerClient } from "../supabase";
type tableNames =
  | "gallery_photos"
  | "testimonials"
  | "metrics"
  | "site_settings";

/**
 * Generic function to get count of rows from any table
 * @param tableName - Name of the table to count rows from
 * @returns Result with count number
 */
export async function getTableCount(
  tableName: tableNames,
): Promise<Result<number>> {
  try {
    const supabase = await createServerClient();

    const { count, error } = await supabase
      .from(tableName)
      .select("*", { count: "exact", head: true });

    if (error) {
      console.error(`Error fetching ${tableName} count:`, error);
      return { success: false, error: `Failed to fetch ${tableName} count` };
    }

    return { success: true, data: count || 0 };
  } catch (error) {
    console.error(`Unexpected error fetching ${tableName} count:`, error);
    return { success: false, error: "An unexpected error occurred" };
  }
}

/**
 * Generic function to get all records from a table
 * @param tableName - Name of the table to fetch from
 * @param orderBy - Column to order by (default: "created_at")
 * @param ascending - Sort order (default: false for descending)
 * @returns Result with array of records
 */
export async function getTableRecords<T>(
  tableName: tableNames,
  orderBy: string = "created_at",
  ascending: boolean = false,
): Promise<Result<T[]>> {
  try {
    const supabase = await createServerClient();

    const { data, error } = await supabase
      .from(tableName)
      .select("*")
      .order(orderBy, { ascending });

    if (error) {
      console.error(`Error fetching ${tableName}:`, error);
      return { success: false, error: `Failed to fetch ${tableName}` };
    }

    return { success: true, data: (data as T[]) || [] };
  } catch (error) {
    console.error(`Unexpected error fetching ${tableName}:`, error);
    return { success: false, error: "An unexpected error occurred" };
  }
}
