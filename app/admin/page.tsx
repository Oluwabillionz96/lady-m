"use client";

import { Images, MessageSquare, Settings, Users } from "lucide-react";
import { useState, useEffect } from "react";
import { getTableCount } from "@/lib/actions/utils";
import DashboardHeader from "@/components/admin/dashboard-header";
import DashboardStatCard from "@/components/admin/dashboard-stat-card";
import QuickActionCard from "@/components/admin/quick-action-card";

const AdminPage = () => {
  const [photoCount, setPhotoCount] = useState<number | null>(null);
  const [testimonialsCount, setTestimonialsCount] = useState<number | null>(
    null,
  );
  const [loadingCount, setLoadingCount] = useState(true);

  // Fetch counts on component mount
  useEffect(() => {
    async function fetchCounts() {
      try {
        const [photosResult, testimonialsResult] = await Promise.all([
          getTableCount("gallery_photos"),
          getTableCount("testimonials"),
        ]);

        if (photosResult.success) {
          setPhotoCount(photosResult.data);
        }
        if (testimonialsResult.success) {
          setTestimonialsCount(testimonialsResult.data);
        }
      } catch (error) {
        console.error("Error fetching counts:", error);
      } finally {
        setLoadingCount(false);
      }
    }

    fetchCounts();
  }, []);

  // Show loading state while auth is loading

  const stats = [
    {
      label: "Total Photos",
      value: photoCount ?? 0,
      icon: Images,
      isLoading: loadingCount,
    },
    {
      label: "Testimonials",
      value: testimonialsCount ?? 0,
      icon: MessageSquare,
      isLoading: loadingCount,
    },
    {
      label: "Admin Users",
      value: 1,
      icon: Users,
      isLoading: false,
    },
  ];

  const quickActions = [
    {
      href: "/admin/gallery",
      icon: Images,
      title: "Manage Gallery",
      description: "Upload and organize photos",
    },
    {
      href: "/admin/testimonials",
      icon: MessageSquare,
      title: "Manage Testimonials",
      description: "Add client reviews",
    },
    {
      href: "/admin/settings",
      icon: Settings,
      title: "Site Settings",
      description: "Update contact info",
    },
  ];

  // Main dashboard content
  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <DashboardHeader />

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <DashboardStatCard key={stat.label} {...stat} />
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-luxury-light rounded-lg p-6 border border-luxury-accent/20">
        <h2 className="text-xl font-semibold text-luxury-text mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActions.map((action) => (
            <QuickActionCard key={action.href} {...action} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
