import { NavLink } from 'react-router-dom';

const OwnerSidebar = () => (
  <aside className="w-64 bg-white/90 border-r border-[#E2CFC3] shadow-lg flex flex-col py-10 px-4 min-h-screen">
    <button
      className="mb-10 flex items-center gap-3 px-2 w-full hover:bg-[#F5EFE6] rounded-xl py-3 transition"
    >
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#B3927A] via-[#D7C5B9] to-[#8C6A5D] flex items-center justify-center text-white text-2xl font-bold">
        U
      </div>
      <div>
        <div className="font-bold text-lg text-[#8C6A5D]">Venue Owner</div>
        <div className="text-xs text-[#B3927A]">owner@email.com</div>
      </div>
    </button>
    <nav className="flex flex-col gap-2">
      <NavLink
        to="/dashboard"
        className={({ isActive }) =>
          `flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-lg transition ${
            isActive
              ? "bg-gradient-to-r from-[#B3927A] via-[#D7C5B9] to-[#8C6A5D] text-white shadow"
              : "text-[#8C6A5D] hover:bg-[#F5EFE6] hover:text-[#4B3F36]"
          }`
        }
      >
        <span className="text-xl">📊</span> Dashboard
      </NavLink>
      <NavLink
        to="/owner/add-edit-venue"
        className={({ isActive }) =>
          `flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-lg transition ${
            isActive
              ? "bg-gradient-to-r from-[#B3927A] via-[#D7C5B9] to-[#8C6A5D] text-white shadow"
              : "text-[#8C6A5D] hover:bg-[#F5EFE6] hover:text-[#4B3F36]"
          }`
        }
      >
        <span className="text-xl">🏛️</span> Add/Edit Venue
      </NavLink>
      <NavLink
        to="/manage-bookings"
        className={({ isActive }) =>
          `flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-lg transition ${
            isActive
              ? "bg-gradient-to-r from-[#B3927A] via-[#D7C5B9] to-[#8C6A5D] text-white shadow"
              : "text-[#8C6A5D] hover:bg-[#F5EFE6] hover:text-[#4B3F36]"
          }`
        }
      >
        <span className="text-xl">📅</span> Manage Bookings
      </NavLink>
      <NavLink
        to="/employees"
        className={({ isActive }) =>
          `flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-lg transition ${
            isActive
              ? "bg-gradient-to-r from-[#B3927A] via-[#D7C5B9] to-[#8C6A5D] text-white shadow"
              : "text-[#8C6A5D] hover:bg-[#F5EFE6] hover:text-[#4B3F36]"
          }`
        }
      >
        <span className="text-xl">👥</span> Employees
      </NavLink>
      <NavLink
        to="/financials"
        className={({ isActive }) =>
          `flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-lg transition ${
            isActive
              ? "bg-gradient-to-r from-[#B3927A] via-[#D7C5B9] to-[#8C6A5D] text-white shadow"
              : "text-[#8C6A5D] hover:bg-[#F5EFE6] hover:text-[#4B3F36]"
          }`
        }
      >
        <span className="text-xl">💰</span> Financials
      </NavLink>
    </nav>
  </aside>
);

export default OwnerSidebar;