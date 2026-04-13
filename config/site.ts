export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  contact: {
    whatsapp: string;
    email: string;
    phone: string;
    location: string;
  };
  social: {
    instagram?: string;
    facebook?: string;
  };
}

export const siteConfig: SiteConfig = {
  name: "Lady M",
  tagline: "Luxury Tailoring & Fashion",
  description: "Premium tailoring services with a boss lady aesthetic",
  contact: {
    whatsapp: "+2347080923852",
    email: "contact@ladym.example",
    phone: "+234-708-092-3852",
    location: "Uyo, Akwa Ibom State",
  },
  social: {
    instagram: "https://instagram.com/ladym",
    facebook: "https://facebook.com/ladym",
  },
};
