import { Dispatch, SetStateAction, useRef, useState } from "react";
import { SettingCards } from "./settings-form";
import { SettingsData, updateSettings } from "@/lib/actions/settings";
import { Check, Edit2, Loader2, Upload, X } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

const SettingsAboutSection = ({
  settingCards,
  setEditingKey,
  about_image_url,
  setSettings,
}: {
  settingCards: SettingCards;
  setEditingKey: Dispatch<SetStateAction<keyof SettingsData | null>>;
  about_image_url: string;
  setSettings: Dispatch<SetStateAction<SettingsData>>;
}) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
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

  return (
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
                    : about_image_url
                      ? "Image uploaded"
                      : "No image"}
                </p>
              </div>
            </div>
            {!imagePreview && (
              <button
                onClick={() => fileInputRef?.current?.click()}
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
          {(imagePreview || about_image_url) && (
            <div className="space-y-3">
              <div className="relative w-full aspect-4/5 max-w-xs rounded-lg overflow-hidden bg-luxury-dark border border-luxury-accent/20">
                <Image
                  src={imagePreview || about_image_url}
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
  );
};

export default SettingsAboutSection;
