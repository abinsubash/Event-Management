import { useState } from "react";
import { addCategoryes } from "../../services/admin.services";

type Category = {
  name: string;
  status: "active" | "inactive";
};

const Categorys = () => {
  const [showModal, setShowModal] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [error, setError] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const nameRegex = /^[a-zA-Z0-9\- ]{3,30}$/;


  const handleAddCategory = async () => {
  const trimmedName = categoryName.trim();
  if (!trimmedName) {
    setError("Category name is required");
    return;
  }

  if (!nameRegex.test(trimmedName)) {
    setError(
      "Category must be 3–30 characters and use only letters, numbers, spaces or hyphens"
    );
    return;
  }

  setLoading(true);

  try {
    const response = await addCategoryes(trimmedName);

    if (response.status === 200 || response.status === 201) {
      setCategories([...categories, { name: trimmedName, status: "active" }]);
      setShowModal(false);
      setCategoryName("");
      setError("");
    } else if ("message" in response) {
      const msg = response.message.toLowerCase();

      if (msg.includes("already")) {
        setError("Category already exists");
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


  return (
    <div className="text-gray-200">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">Categories</h2>
        <button
          className="bg-gradient-to-r from-gray-700 via-gray-900 to-black text-white px-6 py-2 rounded-xl font-bold shadow hover:from-gray-900 hover:to-gray-700 transition"
          onClick={() => {
            setShowModal(true);
            setError("");
          }}
        >
          + Add Category
        </button>
      </div>

      {categories.length === 0 ? (
        <p className="text-gray-400 text-center">No categories yet. Add one!</p>
      ) : (
        <ul className="space-y-2">
          {categories.map((cat, idx) => (
            <li
              key={idx}
              className="bg-[#232323] px-4 py-2 rounded text-lg flex items-center justify-between"
            >
              <div>
                <span className="font-semibold">{cat.name}</span>
                <span className="ml-4 px-2 py-1 rounded text-xs font-bold bg-green-700 text-green-200">
                  {cat.status}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-[#181818] rounded-2xl shadow-2xl border border-gray-800 px-8 py-8 w-full max-w-sm">
            <h3 className="text-xl font-bold text-white mb-6">Add Category</h3>
            <div className="mb-4">
              <label className="block text-gray-300 mb-2 font-semibold">
                Category Name
              </label>
              <input
                type="text"
                value={categoryName}
                onChange={(e) => {
                  setCategoryName(e.target.value);
                  setError("");
                }}
                className="w-full px-4 py-2 rounded-xl border border-gray-700 bg-black text-white focus:outline-none focus:ring-2 focus:ring-gray-500"
                placeholder="Enter category name"
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
                  setCategoryName("");
                  setError("");
                }}
              >
                Cancel
              </button>
              <button
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-gray-700 via-gray-900 to-black text-white font-bold hover:from-gray-900 hover:to-gray-700 transition"
                onClick={handleAddCategory}
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categorys;
