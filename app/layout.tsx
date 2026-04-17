import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { Toaster } from "sonner";
import { SiteSettingsProvider } from "@/context/site-settings-provider";
import { getSiteSettings } from "@/lib/supabase/server";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-family-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-family-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lady M - Luxury Tailoring & Fashion",
  description: "Premium tailoring services with a boss lady aesthetic",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetch site settings from Supabase
  const siteSettings = await getSiteSettings();

  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className={`${inter.className} `}>
        <SiteSettingsProvider settings={siteSettings}>
          <Navigation />
          {children}
          <Footer />
          <Toaster
            position="top-center"
            theme="dark"
            toastOptions={{
              style: {
                background: "#1a1a1a",
                border: "1px solid #d4af37",
                color: "#f5f5f5",
              },
            }}
            expand
            visibleToasts={3}
          />
        </SiteSettingsProvider>
      </body>
    </html>
  );
}
