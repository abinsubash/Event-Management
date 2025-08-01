import  { useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminDashboard from "./AdminDashboard";
import Categorys from "./Categorys";
import Amenities from "./Amenities";

const AdminHome = () => {
  const [active, setActive] = useState(0);

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-black via-[#181818] to-[#232323]">
      <AdminSidebar active={active} setActive={setActive} />
      <main className="flex-1 p-10">
        <div className="bg-gradient-to-br from-[#181818] via-black to-[#232323] rounded-3xl shadow-xl border border-gray-800 p-8 min-h-[400px]">
          {active === 0 && <AdminDashboard />}
          {active === 1 && (
            <div className="text-gray-200">
              <h2 className="text-2xl font-bold mb-4">User Management</h2>
              <p>Manage all users here.</p>
            </div>
          )}
          {active === 2 && (
            <div className="text-gray-200">
              <h2 className="text-2xl font-bold mb-4">Owner Management</h2>
              <p>Manage all venue owners here.</p>
            </div>
          )}
          {active === 3 && (
            <div className="text-gray-200">
              <h2 className="text-2xl font-bold mb-4">Employee Management</h2>
              <p>Manage all employees here.</p>
            </div>
          )}
          {active === 4 && <Categorys/>}
          {active === 5 && <Amenities/>
          }
          {active === 6 && (
            <div className="text-gray-200">
              <h2 className="text-2xl font-bold mb-4">Reports</h2>
              <p>View reports here.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminHome;