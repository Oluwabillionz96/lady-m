import { UploadedFile } from "@/types";

const UploadWidgetFooter = ({
  files,
  closeModal,
  uploadAll,
}: {
  files: UploadedFile[];
  closeModal: () => void;
  uploadAll: () => void;
}) => {
  const uploadedCount = files.filter((f) => f.uploaded).length;
  const hasUnuploaded = files.some((f) => !f.uploaded && !f.uploading);
  return (
    <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-t border-luxury-accent/20 bg-luxury-dark/30 shrink-0">
      <div className="text-xs sm:text-sm text-luxury-text-muted">
        {uploadedCount} of {files.length} uploaded
      </div>
      <div className="flex gap-2 sm:gap-3">
        <button
          onClick={closeModal}
          className="px-3 sm:px-4 py-2 text-luxury-text-muted hover:text-luxury-text transition-colors font-medium text-sm"
        >
          {uploadedCount === files.length ? "Done" : "Cancel"}
        </button>
        {hasUnuploaded && (
          <button
            onClick={uploadAll}
            className="px-3 sm:px-4 py-2 bg-luxury-accent text-luxury-dark rounded-lg hover:bg-luxury-accent-light transition-colors font-medium text-sm"
          >
            Upload All
          </button>
        )}
      </div>
    </div>
  );
};

export default UploadWidgetFooter;
