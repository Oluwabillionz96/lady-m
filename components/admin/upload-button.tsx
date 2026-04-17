import { Plus } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

const UploadButton = ({
  setIsOpen,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <button
      onClick={() => setIsOpen(true)}
      className="flex items-center gap-2 bg-luxury-accent w-full md:w-fit justify-center  text-luxury-dark md:px-4 py-2 rounded-lg hover:bg-luxury-accent-light transition-colors font-medium text-base md:text-sm sm:text-base"
    >
      <Plus className="w-4 h-4" />
      <span className="hidden sm:inline">Upload Photos</span>
      <span className="sm:hidden">Upload</span>
    </button>
  );
};

export default UploadButton;
