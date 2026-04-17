"use client";

import { useState, useRef } from "react";
import { toast } from "sonner";
import { updateSettings, SettingsData } from "@/lib/actions/settings";
import {
  Loader2,
  Edit2,
  Upload,
  X,
  Mail,
  Phone,
  MapPin,
  Check,
  LucideIcon,
} from "lucide-react";
import Image from "next/image";
import { FaFacebook } from "react-icons/fa6";
import EditModal from "./settings-edit-modal";
import SettingsContactInfo from "./settings-contact-info";
import { IconType } from "react-icons";

export type SettingKey = keyof SettingsData;

export type SettingCards = Array<{
  key: keyof SettingsData;
  label: string;
  icon: LucideIcon | IconType;
  value: string;
  type: string;
  placeholder: string;
}>;


interface SettingsFormProps {
  initialSettings: SettingsData;
}

export function SettingsForm({ initialSettings }: SettingsFormProps) {
  const [settings, setSettings] = useState<SettingsData>(initialSettings);
  const [editingKey, setEditingKey] = useState<SettingKey | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSaveSetting = async (key: SettingKey, value: string) => {
    try {
      const result = await updateSettings({ [key]: value });

      if (result.success) {
        setSettings((prev) => ({ ...prev, [key]: value }));
        toast.success("Setting updated successfully");
      } else {
        toast.error(result.error || "Failed to update setting");
        throw new Error(result.error);
      }
    } catch {
      // Error already shown via toast
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error("Image must be less than 10MB");
      return;
    }

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleCancelImageUpload = () => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSaveImage = async () => {
    if (!imageFile) return;

    setIsUploadingImage(true);
    try {
      // Upload to Cloudinary
      const uploadFormData = new FormData();
      uploadFormData.append("files", imageFile);

      const uploadResponse = await fetch("/api/upload", {
        method: "POST",
        body: uploadFormData,
      });

      if (!uploadResponse.ok) {
        throw new Error("Failed to upload image");
      }

      const uploadResult = await uploadResponse.json();
      if (!uploadResult.success) {
        throw new Error(uploadResult.error || "Failed to upload image");
      }

      const imageUrl = uploadResult.data[0].secure_url;

      // Save to database
      const result = await updateSettings({ about_image_url: imageUrl });

      if (result.success) {
        setSettings((prev) => ({ ...prev, about_image_url: imageUrl }));
        toast.success("Image updated successfully");
        // Clean up preview
        if (imagePreview) {
          URL.revokeObjectURL(imagePreview);
        }
        setImageFile(null);
        setImagePreview(null);
      } else {
        toast.error(result.error || "Failed to update image");
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to upload image",
      );
    } finally {
      setIsUploadingImage(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const settingCards = [
    {
      key: "email" as SettingKey,
      label: "Email Address",
      icon: Mail,
      value: settings.email,
      type: "email" as const,
      placeholder: "contact@ladym.com",
    },
    {
      key: "phone" as SettingKey,
      label: "Phone Number",
      icon: Phone,
      value: settings.phone,
      type: "tel" as const,
      placeholder: "+1 (555) 123-4567",
    },
    {
      key: "location" as SettingKey,
      label: "Location",
      icon: MapPin,
      value: settings.location,
      type: "text" as const,
      placeholder: "New York, NY",
    },
    {
      key: "facebook" as SettingKey,
      label: "Facebook URL",
      icon: FaFacebook,
      value: settings.facebook,
      type: "url" as const,
      placeholder: "https://facebook.com/ladym",
    },
    {
      key: "about_header" as SettingKey,
      label: "About Section Header",
      icon: Edit2,
      value: settings.about_header,
      type: "text" as const,
      placeholder: "Crafted for Queens",
    },
    {
      key: "about_text" as SettingKey,
      label: "About Section Text",
      icon: Edit2,
      value: settings.about_text,
      type: "textarea" as const,
      placeholder: "Tell your story...",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Contact Information */}
      {/* <div>
        <h2 className="text-xl font-semibold text-luxury-text mb-4">
          Contact Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {settingCards.slice(0, 4).map((setting) => {
            const Icon = setting.icon;
            return (
              <div
                key={setting.key}
                className="bg-luxury-light rounded-lg border border-luxury-accent/20 p-4 hover:border-luxury-accent/40 transition-all"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <div className="p-2 bg-luxury-dark rounded-lg shrink-0">
                      <Icon className="w-4 h-4 text-luxury-accent" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-luxury-text-muted mb-1">
                        {setting.label}
                      </p>
                      <p className="text-luxury-text font-medium wrap-break-word">
                        {setting.value || (
                          <span className="text-luxury-text-muted italic">
                            Not set
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setEditingKey(setting.key)}
                    className="p-2 text-luxury-text-muted hover:text-luxury-accent transition-colors shrink-0"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div> */}
      <SettingsContactInfo setEditingKey={setEditingKey} settingCards={settingCards}/>

      {/* About Section */}
      <div>
        <h2 className="text-xl font-semibold text-luxury-text mb-4">
          About Section
        </h2>
        <div className="space-y-4">
          {/* About Header & Text */}
          {settingCards.slice(4, 6).map((setting) => {
            const Icon = setting.icon;
            return (
              <div
                key={setting.key}
                className="bg-luxury-light rounded-lg border border-luxury-accent/20 p-4 hover:border-luxury-accent/40 transition-all"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <div className="p-2 bg-luxury-dark rounded-lg shrink-0">
                      <Icon className="w-4 h-4 text-luxury-accent" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-luxury-text-muted mb-1">
                        {setting.label}
                      </p>
                      <p className="text-luxury-text font-medium wrap-break-word whitespace-pre-wrap">
                        {setting.value || (
                          <span className="text-luxury-text-muted italic">
                            Not set
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setEditingKey(setting.key)}
                    className="p-2 text-luxury-text-muted hover:text-luxury-accent transition-colors shrink-0"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}

          {/* About Image */}
          <div className="bg-luxury-light rounded-lg border border-luxury-accent/20 p-4">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-luxury-dark rounded-lg">
                  <Upload className="w-4 h-4 text-luxury-accent" />
                </div>
                <div>
                  <p className="text-xs text-luxury-text-muted mb-1">
                    About Section Image
                  </p>
                  <p className="text-luxury-text font-medium">
                    {imagePreview
                      ? "Preview ready"
                      : settings.about_image_url
                        ? "Image uploaded"
                        : "No image"}
                  </p>
                </div>
              </div>
              {!imagePreview && (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploadingImage}
                  className="p-2 text-luxury-text-muted hover:text-luxury-accent transition-colors disabled:opacity-50"
                >
                  {isUploadingImage ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Edit2 className="w-4 h-4" />
                  )}
                </button>
              )}
            </div>

            {/* Image Preview or Current Image */}
            {(imagePreview || settings.about_image_url) && (
              <div className="space-y-3">
                <div className="relative w-full aspect-4/5 max-w-xs rounded-lg overflow-hidden bg-luxury-dark border border-luxury-accent/20">
                  <Image
                    src={imagePreview || settings.about_image_url}
                    alt="About section"
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Preview Actions */}
                {imagePreview && (
                  <div className="flex gap-2">
                    <button
                      onClick={handleSaveImage}
                      disabled={isUploadingImage}
                      className="flex items-center gap-2 px-4 py-2 bg-luxury-accent text-luxury-dark rounded-lg hover:bg-luxury-accent-light transition-all text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isUploadingImage ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Uploading...
                        </>
                      ) : (
                        <>
                          <Check className="w-4 h-4" />
                          Save Image
                        </>
                      )}
                    </button>
                    <button
                      onClick={handleCancelImageUpload}
                      disabled={isUploadingImage}
                      className="flex items-center gap-2 px-4 py-2 bg-luxury-dark border border-luxury-accent/30 text-luxury-text rounded-lg hover:border-luxury-accent/50 transition-all text-sm disabled:opacity-50"
                    >
                      <X className="w-4 h-4" />
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              className="hidden"
            />
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {editingKey && (
        <EditModal
          settingKey={editingKey}
          label={settingCards.find((s) => s.key === editingKey)?.label || ""}
          value={settings[editingKey]}
          onClose={() => setEditingKey(null)}
          onSave={handleSaveSetting}
          type={settingCards.find((s) => s.key === editingKey)?.type}
          placeholder={
            settingCards.find((s) => s.key === editingKey)?.placeholder
          }
        />
      )}
    </div>
  );
}
