"use client";

import Link from "next/link";
import { siteConfig } from "@/config/site";
import { FaFacebook, FaInstagram } from "react-icons/fa6";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getSettings } from "@/lib/actions/settings";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();
  const [settings, setSettings] = useState<{
    phone: string;
    email: string;
    location: string;
    facebook: string;
    instagram?: string;
  }>({
    phone: "",
    email: "",
    location: "",
    facebook: "",
    instagram: "",
  });

  useEffect(() => {
    async function loadSettings() {
      try {
        const result = await getSettings();
        if (result.success) {
          setSettings(result.data);
        }
      } catch (error) {
        console.error("Error loading settings:", error);
      }
    }

    loadSettings();
  }, []);

  if (pathname.startsWith("/admin")) {
    return null;
  }

  const { phone, email, location, facebook, instagram } = settings;

  return (
    <footer className="bg-luxury-darker border-t border-luxury-accent/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Brand Section */}
          <div>
            <h3 className="text-2xl font-family-heading font-bold text-luxury-accent mb-4">
              {siteConfig.name}
            </h3>
            <p className="text-luxury-text-muted text-sm leading-relaxed">
              {siteConfig.tagline}
            </p>
            <p className="text-luxury-text-muted text-sm mt-2">
              {siteConfig.description}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-luxury-text mb-4">
              Quick Links
            </h4>
            <nav className="flex flex-col gap-3">
              <Link
                href="/"
                className="text-luxury-text-muted hover:text-luxury-accent transition-colors duration-300 text-sm"
              >
                Home
              </Link>
              <Link
                href="/gallery"
                className="text-luxury-text-muted hover:text-luxury-accent transition-colors duration-300 text-sm"
              >
                Gallery
              </Link>
            </nav>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-lg font-semibold text-luxury-text mb-4">
              Contact
            </h4>
            <div className="flex flex-col gap-3 text-sm">
              <a
                href={`tel:${phone}`}
                className="text-luxury-text-muted hover:text-luxury-accent transition-colors duration-300"
              >
                {phone}
              </a>
              <a
                href={`mailto:${email}`}
                className="text-luxury-text-muted hover:text-luxury-accent transition-colors duration-300"
              >
                {email}
              </a>
              <p className="text-luxury-text-muted">{location}</p>
            </div>

            {/* Social Links */}
            {(facebook || instagram) && (
              <div className="flex gap-4 mt-6">
                {instagram && (
                  <a
                    href={instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-luxury-text-muted hover:text-luxury-accent transition-colors duration-300"
                    aria-label="Instagram"
                  >
                    <FaInstagram size={24} />
                  </a>
                )}
                {facebook && (
                  <a
                    href={facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-luxury-text-muted hover:text-luxury-accent transition-colors duration-300"
                    aria-label="Facebook"
                  >
                    <FaFacebook size={24} />
                  </a>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-luxury-accent/10 text-center">
          <p className="text-luxury-text-muted text-sm">
            © {currentYear} {siteConfig.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
