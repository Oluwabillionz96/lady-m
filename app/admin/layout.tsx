"use client";
import { ReactNode, useState } from "react";
import { usePathname } from "next/navigation";
import { AuthProvider } from "@/context/auth-provider";
import { AdminNavigation } from "@/components/admin/AdminNavigation";
import useAuth from "@/hooks/useAuth";
import { Menu, X } from "lucide-react";

function AdminLayoutContent({ children }: { children: ReactNode }) {
  const authData = useAuth();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Show loading state
  if (authData?.loading) {
    return (
      <div className="min-h-screen bg-luxury-dark flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  // If on login page, render without admin layout
  if (pathname === "/admin/login") {
    return <div className="min-h-screen bg-luxury-dark">{children}</div>;
  }

  // If no user, don't render admin layout (middleware will handle redirect)
  if (!authData?.user) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-luxury-dark">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        lg:static fixed inset-y-0 left-0 z-50 w-64 bg-luxury-light border-r border-[#333333] 
        flex flex-col transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
      >
        <AdminNavigation />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="bg-luxury-light border-b border-[#333333] px-4 lg:px-6 py-4 flex items-center justify-between shrink-0">
          {/* Mobile menu button */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden text-white hover:text-luxury-accent transition-colors"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <h2 className="text-xl font-semibold text-white">Admin Dashboard</h2>

          {/* Spacer for mobile */}
          <div className="lg:hidden w-6" />
        </header>

        {/* Content Area */}
        <main className="flex-1 bg-luxury-dark p-4 lg:p-6">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}

const AdminLayout = ({ children }: { children: ReactNode }) => {
  return (
    <AuthProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </AuthProvider>
  );
};

export default AdminLayout;
