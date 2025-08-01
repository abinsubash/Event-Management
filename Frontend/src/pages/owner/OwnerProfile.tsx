import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import OwnerSidebar from "../../components/owner/OwnerSIdebar";
import Navbar from "../../components/user/Navbar";
import AddEditVenue from "./AddEditVenue";

const OwnerProfile = () => {
  const [active, setActive] = useState(0);
  const location = useLocation();

  // Map routes to active indices
  const navRoutes = [
    "/dashboard",
    "/owner/add-edit-venue",
    "/manage-bookings",
    "/employees",
    "/financials",
    "/profile",
  ];

  useEffect(() => {
    const currentIndex = navRoutes.indexOf(location.pathname);
    setActive(currentIndex !== -1 ? currentIndex : 0);
  }, [location.pathname]);

  // Dummy profile data
  const profileData = {
    name: "Abin",
    email: "owner@email.com",
    phone: "999-999-9999",
    venuesOwned: "Sunset Hall, Moonlight Pavilion",
    joined: "January 2023",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5EFE6] via-[#D7C5B9] to-[#B3927A] flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <OwnerSidebar />
        <main className="flex-1 p-10">
          <div className="bg-white/90 rounded-3xl shadow-xl border border-[#E2CFC3] p-8 min-h-[400px]">
            {active === 0 && (
              <div>
                <h2 className="text-2xl font-bold text-[#8C6A5D] mb-4">
                  Dashboard
                </h2>
                <p className="text-[#4B3F36]">
                  Welcome to your dashboard. Here you can see an overview of your venues, bookings, and more.
                </p>
              </div>
            )}
            {active === 1 && <AddEditVenue />}
            {active === 2 && (
              <div>
                <h2 className="text-2xl font-bold text-[#8C6A5D] mb-4">
                  Manage Bookings
                </h2>
                <p className="text-[#4B3F36]">
                  View and manage all your bookings.
                </p>
              </div>
            )}
            {active === 3 && (
              <div>
                <h2 className="text-2xl font-bold text-[#8C6A5D] mb-4">
                  Employee Management
                </h2>
                <p className="text-[#4B3F36]">
                  Add, edit, or remove employees for your venues.
                </p>
              </div>
            )}
            {active === 4 && (
              <div>
                <h2 className="text-2xl font-bold text-[#8C6A5D] mb-4">
                  Financials
                </h2>
                <p className="text-[#4B3F36]">
                  Track your earnings, expenses, and financial reports.
                </p>
              </div>
            )}
            {active === 5 && (
              <div>
                <h2 className="text-2xl font-bold text-[#8C6A5D] mb-6">
                  Profile Details
                </h2>
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#B3927A] via-[#D7C5B9] to-[#8C6A5D] flex items-center justify-center text-white text-5xl font-bold mb-4 md:mb-0">
                    {profileData.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 space-y-4">
                    <div>
                      <span className="font-semibold text-[#8C6A5D]">Name: </span>
                      <span className="text-[#4B3F36]">{profileData.name}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-[#8C6A5D]">Email: </span>
                      <span className="text-[#4B3F36]">{profileData.email}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-[#8C6A5D]">Phone: </span>
                      <span className="text-[#4B3F36]">{profileData.phone}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-[#8C6A5D]">Venues Owned: </span>
                      <span className="text-[#4B3F36]">{profileData.venuesOwned}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-[#8C6A5D]">Joined: </span>
                      <span className="text-[#4B3F36]">{profileData.joined}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default OwnerProfile;