import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

const PageHeader = ({
  headingText,
  subText,
  children,
}: {
  headingText: string;
  subText?: string;
  children: ReactNode;
}) => {
  return (
    <header className="flex flex-col md:flex-row justify-between items-center gap-2 md:gap-0">
      <div className="text-left w-full md:w-fit">
        {/* Mobile Header with Back Button */}
        <div className="flex items-center gap-3 md:block">
          <Link
            href="/admin"
            className="p-2 md:hidden text-luxury-text-muted hover:text-luxury-text transition-colors -ml-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-luxury-text">
              {headingText}
            </h1>
            {subText && (
              <p className="text-luxury-text-muted mt-1">{subText}</p>
            )}
          </div>
        </div>

        {/* Desktop Header */}
        {/* <div className="hidden md:block">
          <h1 className="text-2xl font-bold text-luxury-text">
            Gallery Management
          </h1>
          <p className="text-luxury-text-muted mt-1">
            Manage your portfolio photos
          </p>
        </div> */}
      </div>

      {children}
    </header>
  );
};

export default PageHeader;
