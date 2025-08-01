import { useState } from "react";
import { addAmenities } from "../../services/admin.services";

type Amenity = {
  name: string;
  status: "active" | "inactive";
};

const Amenities = () => {
  const [showModal, setShowModal] = useState(false);
  const [amenityName, setAmenityName] = useState("");
  const [error, setError] = useState("");
  const [amenities, setAmenities] = useState<Amenity[]>([]);
  const [loading, setLoading] = useState(false);
  const nameRegex = /^[a-zA-Z0-9\- ]{3,30}$/;

  const handleAddAmenity = async () => {
    const trimmedName = amenityName.trim();
    if (!trimmedName) {
      setError("Amenity name is required");
      return;
    }

    if (!nameRegex.test(trimmedName)) {
      setError(
        "Amenity must be 3–30 characters and use only letters, numbers, spaces or hyphens"
      );
      return;
    }

    setLoading(true);

    try {
      const response = await addAmenities(trimmedName);

      if (response.status === 200 || response.status === 201) {
        setAmenities([...amenities, { name: trimmedName, status: "active" }]);
        setShowModal(false);
        setAmenityName("");
        setError("");
      } else if ("message" in response) {
        const msg = response.message.toLowerCase();

        if (msg.includes("already")) {
          setError("Amenity already exists");
        } else {
          setError(response.message);
        }
      } else {
        setError("Something went wrong");
      }
    } catch (err) {
      setError("Unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  // Edit, Delete, and Status Toggle logic (same as Categorys)
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const handleEdit = (idx: number) => {
    setAmenityName(amenities[idx].name);
    setEditIndex(idx);
    setShowModal(true);
    setError("");
  };

  const handleDelete = (idx: number) => {
    setAmenities(amenities.filter((_, i) => i !== idx));
  };

  const handleToggleStatus = (idx: number) => {
    setAmenities(amenities =>
      amenities.map((am, i) =>
        i === idx
          ? { ...am, status: am.status === "active" ? "inactive" : "active" }
          : am
      )
    );
  };

  const handleAddOrEditAmenity = async () => {
    if (editIndex !== null) {
      // Edit mode (local only)
      if (!amenityName.trim()) {
        setError("Amenity name is required");
        return;
      }
      if (!nameRegex.test(amenityName.trim())) {
        setError(
          "Amenity must be 3–30 characters and use only letters, numbers, spaces or hyphens"
        );
        return;
      }
      const updated = [...amenities];
      updated[editIndex] = { ...updated[editIndex], name: amenityName.trim() };
      setAmenities(updated);
      setEditIndex(null);
      setAmenityName("");
      setError("");
      setShowModal(false);
    } else {
      await handleAddAmenity();
    }
  };

  return (
    <div className="text-gray-200">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">Amenities</h2>
        <button
          className="bg-gradient-to-r from-gray-700 via-gray-900 to-black text-white px-6 py-2 rounded-xl font-bold shadow hover:from-gray-900 hover:to-gray-700 transition"
          onClick={() => {
            setShowModal(true);
            setError("");
            setEditIndex(null);
            setAmenityName("");
          }}
        >
          + Add Amenity
        </button>
      </div>

      {amenities.length === 0 ? (
        <p className="text-gray-400 text-center">No amenities yet. Add one!</p>
      ) : (
        <ul className="space-y-2">
          {amenities.map((am, idx) => (
            <li
              key={idx}
              className="bg-[#232323] px-4 py-2 rounded text-lg flex items-center justify-between"
            >
              <div>
                <span className="font-semibold">{am.name}</span>
                <span className={`ml-4 px-2 py-1 rounded text-xs font-bold ${am.status === "active"
                  ? "bg-green-700 text-green-200"
                  : "bg-red-700 text-red-200"
                  }`}>
                  {am.status}
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  className="px-3 py-1 rounded bg-gray-700 text-white hover:bg-gray-600 text-sm"
                  onClick={() => handleEdit(idx)}
                >
                  Edit
                </button>
                <button
                  className="px-3 py-1 rounded bg-red-700 text-white hover:bg-red-600 text-sm"
                  onClick={() => handleDelete(idx)}
                >
                  Delete
                </button>
                <button
                  className={`px-3 py-1 rounded text-white text-sm ${am.status === "active"
                    ? "bg-yellow-700 hover:bg-yellow-600"
                    : "bg-green-700 hover:bg-green-600"
                    }`}
                  onClick={() => handleToggleStatus(idx)}
                >
                  {am.status === "active" ? "Set Inactive" : "Set Active"}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-[#181818] rounded-2xl shadow-2xl border border-gray-800 px-8 py-8 w-full max-w-sm">
            <h3 className="text-xl font-bold text-white mb-6">
              {editIndex !== null ? "Edit Amenity" : "Add Amenity"}
            </h3>
            <div className="mb-4">
              <label className="block text-gray-300 mb-2 font-semibold">
                Amenity Name
              </label>
              <input
                type="text"
                value={amenityName}
                onChange={(e) => {
                  setAmenityName(e.target.value);
                  setError("");
                }}
                className="w-full px-4 py-2 rounded-xl border border-gray-700 bg-black text-white focus:outline-none focus:ring-2 focus:ring-gray-500"
                placeholder="Enter amenity name"
              />
              {error && (
                <div className="text-red-500 mt-1 text-sm">{error}</div>
              )}
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <button
                className="px-5 py-2 rounded-xl bg-gray-700 text-white font-semibold hover:bg-gray-600 transition"
                onClick={() => {
                  setShowModal(false);
                  setAmenityName("");
                  setEditIndex(null);
                  setError("");
                }}
              >
                Cancel
              </button>
              <button
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-gray-700 via-gray-900 to-black text-white font-bold hover:from-gray-900 hover:to-gray-700 transition"
                onClick={handleAddOrEditAmenity}
                disabled={loading}
              >
                {loading ? "Submitting..." : editIndex !== null ? "Update" : "Submit"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Amenities;