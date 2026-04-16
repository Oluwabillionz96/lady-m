"use client";

import { createContext, useContext, ReactNode } from "react";

interface SiteSettings {
  phone?: string;
  email?: string;
  location?: string;
  facebook?: string;
  instagram?: string;
}

const SiteSettingsContext = createContext<SiteSettings>({});

interface SiteSettingsProviderProps {
  children: ReactNode;
  settings: SiteSettings;
}

export function SiteSettingsProvider({
  children,
  settings,
}: SiteSettingsProviderProps) {
  return (
    <SiteSettingsContext.Provider value={settings}>
      {children}
    </SiteSettingsContext.Provider>
  );
}

export function useSiteSettings() {
  const context = useContext(SiteSettingsContext);
  return context;
}
