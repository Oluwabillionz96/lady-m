"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Images,
  MessageSquare,
  Settings,
  LogOut,
  User,
} from "lucide-react";
import { logout } from "@/lib/actions/auth";
import useAuth from "@/hooks/useAuth";

const navigationItems = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    label: "Gallery",
    href: "/admin/gallery",
    icon: Images,
  },
  {
    label: "Testimonials",
    href: "/admin/testimonials",
    icon: MessageSquare,
  },
  {
    label: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

export function AdminNavigation() {
  const pathname = usePathname();
  const authData = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <>
      {/* Logo/Brand */}
      <div className="p-6 border-b border-gray-700">
        <h1 className="text-xl font-semibold text-luxury-text">Lady M Admin</h1>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 p-4 space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
                ${
                  isActive
                    ? "bg-luxury-accent text-black font-medium"
                    : "text-luxury-text-muted hover:text-luxury-text hover:bg-gray-800"
                }
              `}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* User Info & Logout */}
      <div className="p-4 border-t border-gray-700 space-y-3">
        {/* User Info */}
        <div className="flex items-center gap-3 px-4 py-2 text-luxury-text-muted">
          <User size={20} />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-luxury-text truncate">
              {authData?.user?.email || "Admin User"}
            </p>
            <p className="text-xs text-luxury-text-muted">Administrator</p>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="
            w-full flex items-center gap-3 px-4 py-3 rounded-lg
            text-luxury-text-muted hover:text-luxury-text hover:bg-gray-800
            transition-all duration-200
          "
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </>
  );
}
