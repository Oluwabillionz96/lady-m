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
    whatsapp: "+1234567890",
    email: "contact@ladym.example",
    phone: "+1 (234) 567-8900",
    location: "New York, NY",
  },
  social: {
    instagram: "https://instagram.com/ladym",
    facebook: "https://facebook.com/ladym",
  },
};
