"use client";

import { getWhatsAppUrl } from "@/lib/utils";
import { toast } from "sonner";
import { FaWhatsapp } from "react-icons/fa6";
import { getSettings } from "@/lib/actions/settings";

interface WhatsAppButtonProps {
  text?: string;
  message?: string;
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function WhatsAppButton({
  text = "Contact on WhatsApp",
  message = "Hi Lady M, I'm interested in your tailoring services!",
  variant = "primary",
  size = "md",
  className,
}: WhatsAppButtonProps) {
  const handleClick = async () => {
    try {
      // Fetch phone number on click
      const result = await getSettings();
      
      if (!result.success || !result.data.phone) {
        toast.error(
          "Unable to connect. Please try again or contact us directly.",
        );
        return;
      }

      const url = getWhatsAppUrl(result.data.phone, message);

      if (!url) {
        toast.error(
          "Unable to connect. Please try again or contact us directly.",
        );
        return;
      }

      window.open(url, "_blank", "noopener,noreferrer");
    } catch (error) {
      console.error("Failed to open WhatsApp:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const baseStyles =
    "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105 active:scale-95";

  const variantStyles = {
    primary:
      "bg-luxury-accent text-luxury-dark hover:bg-luxury-accent-light shadow-luxury hover:shadow-luxury-lg",
    secondary:
      "bg-luxury-light text-luxury-text border border-luxury-accent hover:bg-luxury-accent hover:text-luxury-dark",
  };

  const sizeStyles = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "md:px-8 md:py-4 md:text-lg px-6 py-3 text-base",
  };

  return (
    <button
      onClick={handleClick}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      aria-label={text}
    >
      <FaWhatsapp
        className={
          size === "sm" ? "w-4 h-4" : size === "md" ? "w-5 h-5" : "w-6 h-6"
        }
      />
      <span>{text}</span>
    </button>
  );
}
