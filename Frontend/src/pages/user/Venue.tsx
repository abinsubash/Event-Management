import  { useState, useEffect } from "react";
import venueHero from "../../assets/VenueHero.jpg";
import Navbar from "../../components/user/Navbar";

// Dummy venues data
const dummyVenues = Array.from({ length: 9 }).map((_, i) => ({
  id: i + 1,
  name: `Venue ${i + 1}`,
  place: ["Kochi", "Bangalore", "Chennai", "Delhi", "Mumbai", "Goa", "Hyderabad", "Jaipur", "Pune"][i],
  rate: `${5000 + i * 1000} INR`,
  date: `2025-08-${(i + 10).toString().padStart(2, "0")}`,
}));

const Venue = () => {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [place, setPlace] = useState("");
  const [date, setDate] = useState("");
  const [navbarBg, setNavbarBg] = useState("bg-transparent");

  useEffect(() => {
    const onScroll = () => {
      // 100vh is the hero section height
      if (window.scrollY > window.innerHeight - 80) {
        setNavbarBg("bg-white/90 shadow border-b border-[#E2CFC3]");
      } else {
        setNavbarBg("bg-transparent");
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Filter venues
  const filteredVenues = dummyVenues.filter((venue) => {
    return (
      (!search || venue.name.toLowerCase().includes(search.toLowerCase())) &&
      (!type || venue.name.toLowerCase().includes(type.toLowerCase())) &&
      (!place || venue.place.toLowerCase().includes(place.toLowerCase())) &&
      (!date || venue.date === date)
    );
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ceddf0] via-[#b0caec] to-[#b0caec]">
      {/* Sticky Navbar with dynamic background */}
      <Navbar bg={navbarBg} />

      {/* Full Hero Image Section */}
      <section className="relative w-full h-[100vh] flex items-center justify-center">
        <img
          src={venueHero}
          alt="Venue Hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-10 text-center w-full flex flex-col items-center justify-center">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white drop-shadow-lg mb-6">
            Find Your Perfect Venue
          </h1>
          <p className="text-xl md:text-2xl text-[#F5EFE6] font-medium drop-shadow mb-4">
            Book the best venues for your events, weddings, and parties!
          </p>
        </div>
      </section>

      {/* Search & Filter - below the hero image */}
      <div className="max-w-4xl mx-auto px-4 mb-10 mt-8 relative z-20">
        <div className="bg-white/90 rounded-2xl shadow-lg p-6 flex flex-col md:flex-row gap-4 items-center justify-between border border-[#E2CFC3]">
          <input
            type="text"
            placeholder="Search venue name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-[#E2CFC3] rounded-xl px-4 py-2 w-full md:w-1/4 focus:outline-none focus:ring-2 focus:ring-[#B3927A] bg-[#F5EFE6]/80"
          />
          <input
            type="text"
            placeholder="Type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="border border-[#E2CFC3] rounded-xl px-4 py-2 w-full md:w-1/4 focus:outline-none focus:ring-2 focus:ring-[#B3927A] bg-[#F5EFE6]/80"
          />
          <input
            type="text"
            placeholder="Place"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
            className="border border-[#E2CFC3] rounded-xl px-4 py-2 w-full md:w-1/4 focus:outline-none focus:ring-2 focus:ring-[#B3927A] bg-[#F5EFE6]/80"
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border border-[#E2CFC3] rounded-xl px-4 py-2 w-full md:w-1/4 focus:outline-none focus:ring-2 focus:ring-[#B3927A] bg-[#F5EFE6]/80"
          />
        </div>
      </div>

      {/* Venues List */}
      <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {filteredVenues.map((venue) => (
          <div
            key={venue.id}
            className="bg-white rounded-3xl shadow-xl p-8 flex flex-col justify-between border border-[#E2CFC3] min-h-[260px] hover:scale-[1.03] transition"
          >
            <div className="mb-4 flex flex-col items-center">
              <span className="text-2xl font-bold text-[#8C6A5D] mb-2">{venue.name}</span>
              <div className="text-xs text-gray-500">Available: {venue.date}</div>
            </div>
            <div className="flex w-full justify-between items-center mt-auto">
              <div>
                <div className="text-[#8C6A5D] font-semibold">{venue.place}</div>
                <div className="text-[#4B3F36] font-bold">{venue.rate}</div>
              </div>
              <button className="px-6 py-2 bg-green-500 text-white rounded-full font-bold shadow hover:bg-green-600 transition">
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Dummy Pagination */}
      <div className="flex justify-center items-center gap-3 py-8">
        <button
          className="w-8 h-8 rounded-full flex items-center justify-center font-bold bg-[#B3927A] text-white shadow transition"
        >
          1
        </button>
      </div>
    </div>
  );
};

export default Venue;