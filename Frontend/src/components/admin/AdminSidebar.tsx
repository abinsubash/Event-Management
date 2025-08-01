
const adminSidebarOptions = [
  { label: "Dashboard", icon: "📊" },
  { label: "Users", icon: "👤" },
  { label: "Owners", icon: "🏢" },
  { label: "Employees", icon: "👥" },
  { label: "Categorys", icon: "🗂️" },
  { label: "Amenities", icon: "🛎️" },
  { label: "Reports", icon: "📑" },
];

const AdminSidebar = ({
  active,
  setActive,
}: {
  active: number;
  setActive: (idx: number) => void;
}) => (
  <aside className="w-64 min-h-screen bg-gradient-to-b from-black via-[#181818] to-[#232323] border-r border-gray-800 shadow-lg flex flex-col py-10 px-4">
    <div className="mb-10 flex items-center gap-3 px-2">
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-700 via-gray-900 to-black flex items-center justify-center text-white text-2xl font-bold">
        A
      </div>
      <div>
        <div className="font-bold text-lg text-gray-200">Admin Panel</div>
        <div className="text-xs text-gray-400">admin@email.com</div>
      </div>
    </div>
    <nav className="flex flex-col gap-2">
      {adminSidebarOptions.map((option, idx) => (
        <button
          key={option.label}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-lg transition
            ${
              active === idx
                ? "bg-gradient-to-r from-gray-700 via-gray-900 to-black text-white shadow"
                : "text-gray-300 hover:bg-[#232323] hover:text-white"
            }`}
          onClick={() => setActive(idx)}
        >
          <span className="text-xl">{option.icon}</span>
          {option.label}
        </button>
      ))}
    </nav>
  </aside>
);

export default AdminSidebar;