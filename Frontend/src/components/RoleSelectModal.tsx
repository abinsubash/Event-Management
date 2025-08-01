import React from "react";
import { useNavigate } from "react-router-dom";

interface RoleSelectModalProps {
  open: boolean;
  onClose: () => void;
}

const roles = [
  {
    label: "User",
    description: "Book venues and manage your events.",
    color: "from-[#8C6A5D] via-[#B3927A] to-[#4B3F36]",
    route: "/login",
    query: "user",
    icon: (
      <svg className="w-8 h-8 text-[#8C6A5D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" />
        <path stroke="currentColor" strokeWidth="2" d="M4 20c0-4 4-6 8-6s8 2 8 6" />
      </svg>
    ),
  },
  {
    label: "Owner",
    description: "Upload venues and select people for jobs.",
    color: "from-[#B3927A] via-[#D7C5B9] to-[#F5EFE6]",
    route: "/ownerLogin",
    query: "owner",
    icon: (
      <svg className="w-8 h-8 text-[#B3927A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <rect x="6" y="6" width="12" height="12" rx="3" stroke="currentColor" strokeWidth="2" />
        <path stroke="currentColor" strokeWidth="2" d="M9 12h6" />
      </svg>
    ),
  },
  {
    label: "Employee",
    description: "Apply for jobs at venues.",
    color: "from-[#4B3F36] via-[#B3927A] to-[#8C6A5D]",
    route: "/employeeLogin",
    query: "employee",
    icon: (
      <svg className="w-8 h-8 text-[#4B3F36]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <rect x="4" y="4" width="16" height="16" rx="4" stroke="currentColor" strokeWidth="2" />
        <path stroke="currentColor" strokeWidth="2" d="M8 16h8" />
      </svg>
    ),
  },
];

const RoleSelectModal: React.FC<RoleSelectModalProps> = ({ open, onClose }) => {
  const navigate = useNavigate();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl border border-[#E2CFC3] px-8 py-10 flex flex-col items-center max-w-md w-full">
        <h2 className="text-3xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-[#8C6A5D] via-[#B3927A] to-[#4B3F36]">
          Choose Your Role
        </h2>
        <div className="flex flex-col gap-6 w-full">
          {roles.map((role) => (
            <button
              key={role.label}
              className={`flex items-center justify-between w-full px-6 py-4 rounded-2xl shadow bg-gradient-to-r ${role.color} text-white font-semibold hover:scale-[1.03] transition`}
              onClick={() => {
                onClose();
                navigate(`${role.route}?role=${role.query}`);
              }}
            >
              <div className="flex items-center gap-4">
                {role.icon}
                <span className="text-lg">{role.label}</span>
              </div>
              <span className="text-sm opacity-80">{role.description}</span>
            </button>
          ))}
        </div>
        <button
          className="mt-8 text-[#8C6A5D] font-bold hover:underline"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default RoleSelectModal;