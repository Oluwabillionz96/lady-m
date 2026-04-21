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
 * Generic function to get paginated records from a table
 * @param tableName - Name of the table to fetch from
 * @param page - Page number (1-indexed)
 * @param pageSize - Number of records per page
 * @param orderBy - Column to order by (default: "created_at")
 * @param ascending - Sort order (default: false for descending)
 * @returns Result with paginated records and total count
 */
export async function getTableRecordsPaginated<T>(
  tableName: tableNames,
  page: number = 1,
  pageSize: number = 12,
  orderBy: string = "created_at",
  ascending: boolean = false,
): Promise<
  Result<{ data: T[]; total: number; page: number; pageSize: number }>
> {
  try {
    const supabase = await createServerClient();

    // Validate page and pageSize
    const validPage = Math.max(1, page);
    const validPageSize = Math.max(1, Math.min(pageSize, 100)); // Cap at 100

    const from = (validPage - 1) * validPageSize;
    const to = from + validPageSize - 1;

    const { data, error, count } = await supabase
      .from(tableName)
      .select("*", { count: "exact" })
      .order(orderBy, { ascending })
      .range(from, to);

    if (error) {
      console.error(`Error fetching paginated ${tableName}:`, error);
      return { success: false, error: `Failed to fetch ${tableName}` };
    }

    return {
      success: true,
      data: {
        data: (data as T[]) || [],
        total: count || 0,
        page: validPage,
        pageSize: validPageSize,
      },
    };
  } catch (error) {
    console.error(`Unexpected error fetching paginated ${tableName}:`, error);
    return { success: false, error: "An unexpected error occurred" };
  }
}
