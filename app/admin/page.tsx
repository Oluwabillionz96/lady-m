"use client";

import useAuth from "@/hooks/useAuth";
import { 
  // LayoutDashboard,
  Images, 
  MessageSquare, 
  Settings,
  Users,
  TrendingUp
} from "lucide-react";
import Link from "next/link";

const AdminPage = () => {
  const auth = useAuth();

  // Show loading state while auth is loading
  if (auth?.loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-luxury-dark">
        <div className="text-center">
          {/* Spinner */}
          <div className="relative w-16 h-16 mx-auto mb-6">
            <div className="absolute inset-0 border-4 border-luxury-accent/20 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-luxury-accent border-t-transparent rounded-full animate-spin"></div>
          </div>

          {/* Logo/Title */}
          <h1 className="font-family-heading text-3xl font-bold text-luxury-accent mb-2">
            Lady M
          </h1>
          <p className="text-luxury-text-muted text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  // Main dashboard content
  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="bg-luxury-light rounded-lg p-6 border border-luxury-accent/20">
        <h1 className="text-3xl font-bold text-luxury-text mb-2">
          Welcome to Admin Dashboard
        </h1>
        <p className="text-luxury-text-muted">
          Manage your portfolio content, gallery, testimonials, and site settings.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-luxury-light rounded-lg p-6 border border-luxury-accent/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-luxury-text-muted text-sm">Total Photos</p>
              <p className="text-2xl font-bold text-luxury-text">--</p>
            </div>
            <Images className="w-8 h-8 text-luxury-accent" />
          </div>
        </div>

        <div className="bg-luxury-light rounded-lg p-6 border border-luxury-accent/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-luxury-text-muted text-sm">Testimonials</p>
              <p className="text-2xl font-bold text-luxury-text">--</p>
            </div>
            <MessageSquare className="w-8 h-8 text-luxury-accent" />
          </div>
        </div>

        <div className="bg-luxury-light rounded-lg p-6 border border-luxury-accent/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-luxury-text-muted text-sm">Site Views</p>
              <p className="text-2xl font-bold text-luxury-text">--</p>
            </div>
            <TrendingUp className="w-8 h-8 text-luxury-accent" />
          </div>
        </div>

        <div className="bg-luxury-light rounded-lg p-6 border border-luxury-accent/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-luxury-text-muted text-sm">Admin Users</p>
              <p className="text-2xl font-bold text-luxury-text">1</p>
            </div>
            <Users className="w-8 h-8 text-luxury-accent" />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-luxury-light rounded-lg p-6 border border-luxury-accent/20">
        <h2 className="text-xl font-semibold text-luxury-text mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link
            href="/admin/gallery"
            className="flex items-center gap-3 p-4 bg-luxury-dark rounded-lg hover:bg-luxury-accent hover:text-black transition-all duration-200 group"
          >
            <Images className="w-6 h-6 text-luxury-accent group-hover:text-black" />
            <div>
              <h3 className="font-medium text-luxury-text group-hover:text-black">Manage Gallery</h3>
              <p className="text-sm text-luxury-text-muted group-hover:text-black/70">Upload and organize photos</p>
            </div>
          </Link>

          <Link
            href="/admin/testimonials"
            className="flex items-center gap-3 p-4 bg-luxury-dark rounded-lg hover:bg-luxury-accent hover:text-black transition-all duration-200 group"
          >
            <MessageSquare className="w-6 h-6 text-luxury-accent group-hover:text-black" />
            <div>
              <h3 className="font-medium text-luxury-text group-hover:text-black">Manage Testimonials</h3>
              <p className="text-sm text-luxury-text-muted group-hover:text-black/70">Add client reviews</p>
            </div>
          </Link>

          <Link
            href="/admin/settings"
            className="flex items-center gap-3 p-4 bg-luxury-dark rounded-lg hover:bg-luxury-accent hover:text-black transition-all duration-200 group"
          >
            <Settings className="w-6 h-6 text-luxury-accent group-hover:text-black" />
            <div>
              <h3 className="font-medium text-luxury-text group-hover:text-black">Site Settings</h3>
              <p className="text-sm text-luxury-text-muted group-hover:text-black/70">Update contact info</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-luxury-light rounded-lg p-6 border border-luxury-accent/20">
        <h2 className="text-xl font-semibold text-luxury-text mb-4">Recent Activity</h2>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-luxury-dark rounded-lg">
            <div className="w-2 h-2 bg-luxury-accent rounded-full"></div>
            <p className="text-luxury-text-muted">Welcome to your admin dashboard!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
