"use client";

import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const AdminPage = () => {
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!auth?.loading) {
      if (!auth?.user) {
        router.push("/admin/login");
      } else {
        router.push("/admin/dashboard");
      }
    }
  }, [auth?.loading, auth?.user, router]);

  // Loading state
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
};

export default AdminPage;
