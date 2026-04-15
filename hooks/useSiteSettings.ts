"use client";

import { useSiteSettings as useContext } from "@/context/site-settings-provider";

export function useSiteSettings() {
  return useContext();
}