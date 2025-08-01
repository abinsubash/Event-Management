import { useEffect } from "react";

interface CustomToastProps {
  message: string;
  type?: "error" | "success";
  onClose: () => void;
}

const CustomToast = ({ message, type = "error", onClose }: CustomToastProps) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed top-6 right-6 z-[9999]`}>
      <div
        className={`px-6 py-3 rounded-xl shadow-lg flex items-center gap-2
          ${type === "error"
            ? "bg-gradient-to-r from-[#B3927A] via-[#D7C5B9] to-[#8C6A5D] text-[#4B3F36] border border-[#E2CFC3]"
            : "bg-gradient-to-r from-[#F5EFE6] via-[#B3927A] to-[#8C6A5D] text-[#4B3F36] border border-[#E2CFC3]"
          }
        `}
      >
        {type === "error" ? (
          <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ) : (
          <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        )}
        <span className="font-semibold">{message}</span>
        <button
          className="ml-4 text-lg font-bold text-[#4B3F36] hover:text-[#8C6A5D] transition"
          onClick={onClose}
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default CustomToast;