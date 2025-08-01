
const AdminDashboard = () => (
  <div>
    <h2 className="text-3xl font-bold text-gray-200 mb-6">Dashboard</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-2xl p-8 shadow text-center">
        <div className="text-4xl mb-2 text-[#FFD700]">👤</div>
        <div className="text-gray-300 text-lg font-semibold">Total Users</div>
        <div className="text-2xl font-bold text-white mt-2">1,234</div>
      </div>
      <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-2xl p-8 shadow text-center">
        <div className="text-4xl mb-2 text-[#00BFFF]">🏢</div>
        <div className="text-gray-300 text-lg font-semibold">Total Owners</div>
        <div className="text-2xl font-bold text-white mt-2">56</div>
      </div>
      <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-2xl p-8 shadow text-center">
        <div className="text-4xl mb-2 text-[#32CD32]">👥</div>
        <div className="text-gray-300 text-lg font-semibold">Total Employees</div>
        <div className="text-2xl font-bold text-white mt-2">312</div>
      </div>
    </div>
    <div className="mt-10 text-gray-400">
      <p>Welcome to the admin dashboard. Use the sidebar to manage users, owners, employees, categories, amenities, and view reports.</p>
    </div>
  </div>
);

export default AdminDashboard;