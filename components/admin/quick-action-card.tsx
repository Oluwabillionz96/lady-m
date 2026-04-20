import { LucideIcon } from "lucide-react";
import Link from "next/link";

interface QuickActionCardProps {
  href: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

export default function QuickActionCard({
  href,
  icon: Icon,
  title,
  description,
}: QuickActionCardProps) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 p-4 bg-luxury-dark rounded-lg hover:bg-luxury-accent hover:text-black transition-all duration-200 group"
    >
      <Icon className="w-6 h-6 text-luxury-accent group-hover:text-black" />
      <div>
        <h3 className="font-medium text-luxury-text group-hover:text-black">
          {title}
        </h3>
        <p className="text-sm text-luxury-text-muted group-hover:text-black/70">
          {description}
        </p>
      </div>
    </Link>
  );
}
