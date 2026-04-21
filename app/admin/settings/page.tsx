import { getSettings } from "@/lib/actions/settings";
import { getMetrics } from "@/lib/actions/metrics";
import { SettingsForm } from "@/components/admin/settings-form";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const [settingsResult, metricsResult] = await Promise.all([
    getSettings(),
    getMetrics(),
  ]);

  if (!settingsResult.success) {
    return (
      <div className="space-y-6">
        {/* Mobile Back Button */}
        <div className="flex items-center gap-3 md:hidden">
          <Link
            href="/admin"
            className="p-2 text-luxury-text-muted hover:text-luxury-text transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-bold text-luxury-text">Site Settings</h1>
        </div>

        {/* Desktop Header */}
        <div className="hidden md:block">
          <h1 className="text-2xl font-bold text-luxury-text">Site Settings</h1>
        </div>

        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
          <p className="text-red-400">
            Error loading settings: {settingsResult.error}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-2 md:gap-0">
        <div className="text-left w-full md:w-fit">
          {/* Mobile Header with Back Button */}
          <div className="flex items-center gap-3 md:hidden">
            <Link
              href="/admin"
              className="p-2 text-luxury-text-muted hover:text-luxury-text transition-colors -ml-2"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-luxury-text">
                Site Settings
              </h1>
              <p className="text-luxury-text-muted mt-1">
                Manage your site information
              </p>
            </div>
          </div>

          {/* Desktop Header */}
          <div className="hidden md:block">
            <h1 className="text-2xl font-bold text-luxury-text">
              Site Settings
            </h1>
            <p className="text-luxury-text-muted mt-1">
              Manage your site information
            </p>
          </div>
        </div>
      </div>

      {/* Settings Form */}
      <SettingsForm
        initialSettings={settingsResult.data}
        initialMetrics={metricsResult.success ? metricsResult.data : []}
      />
    </div>
  );
}
