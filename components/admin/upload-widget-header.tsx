import { UploadedFile } from "@/types";
import { X } from "lucide-react";

const UploadWidgetHeader = ({
  files,
  closeModal,
}: {
  files: UploadedFile[];
  closeModal: () => void;
}) => {
  return (
    <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-luxury-accent/20 bg-luxury-dark/30 shrink-0">
      <div>
        <h2 className="text-lg sm:text-xl font-semibold text-luxury-text">
          Upload Photos
        </h2>
        <p className="text-xs sm:text-sm text-luxury-text-muted mt-0.5">
          {files.length === 0
            ? "Select photos to upload"
            : `${files.length} selected`}
        </p>
      </div>
      <button
        onClick={closeModal}
        className="text-luxury-text-muted hover:text-luxury-text p-2 -mr-2"
      >
        <X className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>
    </div>
  );
};

export default UploadWidgetHeader
