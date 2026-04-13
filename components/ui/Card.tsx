import React from "react";

interface CardProps {
  children: React.ReactNode;
  variant?: "default" | "elevated" | "bordered";
  className?: string;
}

export default function Card({
  children,
  variant = "default",
  className = "",
}: CardProps) {
  const baseStyles =
    "rounded-lg p-6 md:p-8 bg-luxury-light transition-all duration-300";

  const variantStyles = {
    default: "",
    elevated: "shadow-luxury hover:shadow-luxury-lg",
    bordered: "border border-luxury-text-muted/20",
  };

  return (
    <div className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
      {children}
    </div>
  );
}
