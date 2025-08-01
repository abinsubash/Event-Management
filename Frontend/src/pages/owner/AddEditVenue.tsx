import { useEffect, useState } from "react";
import type { ChangeEvent } from "react";
import OwnerSidebar from "../../components/owner/OwnerSIdebar";
import {
  getAllAmenities,
  getAllCategories,
} from "../../services/owner.services";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import MultiSelectDropdown from "../../components/ui/MultiSelectDropdown";
import { Plus } from "lucide-react";
import Cropper from "react-easy-crop";
import Modal from "../../components/ui/Modal";
import type { Category } from "../../types/categories";
import type { Amenities } from "../../types/amenities";
import axios from "axios";
import {venueSchema}  from "../../validations/venue.schema";

type LocationFeature = {
  geometry: { type: "Point"; coordinates: [number, number] };
  properties: { formatted: string };
};

const AddEditVenue = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [allAmenities, setAllAmenities] = useState<Amenities[]>([]);
  const [allCategories, setAllCategories] = useState<Category[]>([]);
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [cropImageIdx, setCropImageIdx] = useState<number | null>(null);
  const [cropSrc, setCropSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [locationQuery, setLocationQuery] = useState("");
  const [locationSuggestions, setLocationSuggestions] = useState<LocationFeature[]>([]);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState({
    name: "",
    location: {
      type: "Point" as const,
      coordinates: [0, 0] as [number, number],
      address: "",
    },
    specialFeatures: "",
    price: "",
    cancellationPolicy: "",
    capacity: "",
    categories: [] as string[],
    amenities: [] as string[],
    images: [] as (File | null)[],
  });

  useEffect(() => {
    getAllData();
  }, []);

  const getAllData = async () => {
    try {
      const [CategoryResponse, AmenitiesResponse] = await Promise.all([
        getAllCategories(),
        getAllAmenities(),
      ]);
      setAllCategories(CategoryResponse);
      setAllAmenities(AmenitiesResponse);
    } catch (error) {
      console.error("Failed to fetch data", error);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "address") {
      setLocationQuery(value);
      setFormData((prev) => ({
        ...prev,
        location: {
          ...prev.location,
          address: value,
        },
      }));
      if (value.length > 2) {
        fetchLocationSuggestions(value);
      } else {
        setLocationSuggestions([]);
        setShowLocationDropdown(false);
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
    // Clear error for the field when user starts typing
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const fetchLocationSuggestions = async (query: string) => {
    try {
      const config = {
        method: "get",
        url: `https://api.geoapify.com/v1/geocode/autocomplete?text=${query}&apiKey=${import.meta.env.VITE_AUTOCOMPLETE_API_KEY}`,
        headers: {},
      };
      const response = await axios(config);
      if (response.data && response.data.features) {
        setLocationSuggestions(response.data.features);
        setShowLocationDropdown(true);
      }
    } catch (error) {
      setLocationSuggestions([]);
      setShowLocationDropdown(false);
    }
  };

  const handleLocationSelect = (feature: LocationFeature) => {
    setFormData((prev) => ({
      ...prev,
      location: {
        type: "Point",
        coordinates: feature.geometry.coordinates,
        address: feature.properties.formatted,
      },
    }));
    setLocationQuery(feature.properties.formatted);
    setLocationSuggestions([]);
    setShowLocationDropdown(false);
    setErrors((prev) => ({ ...prev, address: "" }));
  };

  const handleCategoryChange = (selected: string[]) => {
    setFormData((prev) => ({
      ...prev,
      categories: selected,
    }));
    setErrors((prev) => ({ ...prev, categories: "" }));
  };

  const handleAmenitiesChange = (selected: string[]) => {
    setFormData((prev) => ({
      ...prev,
      amenities: selected,
    }));
    setErrors((prev) => ({ ...prev, amenities: "" }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>, idx: number) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setCropSrc(reader.result as string);
        setCropImageIdx(idx);
        setCropModalOpen(true);
      };
      reader.readAsDataURL(file);
    }
    setErrors((prev) => ({ ...prev, images: "" }));
  };

  const onCropComplete = (_: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  async function getCroppedImg(imageSrc: string, crop: any) {
    const image = await createImage(imageSrc);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );
    return new Promise<File>((resolve) => {
      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], `cropped-${Date.now()}.jpg`, {
            type: "image/jpeg",
          });
          resolve(file);
        }
      }, "image/jpeg");
    });
  }

  function createImage(url: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const image = new window.Image();
      image.addEventListener("load", () => resolve(image));
      image.addEventListener("error", (error) => reject(error));
      image.setAttribute("crossOrigin", "anonymous");
      image.src = url;
    });
  }

  const handleCropSave = async () => {
    if (cropSrc && croppedAreaPixels !== null && cropImageIdx !== null) {
      const croppedFile = await getCroppedImg(cropSrc, croppedAreaPixels);
      setFormData((prev) => {
        const updatedImages = [
          ...(prev.images.length ? prev.images : [null, null, null]),
        ];
        updatedImages[cropImageIdx] = croppedFile;
        return { ...prev, images: updatedImages };
      });
      setCropModalOpen(false);
      setCropSrc(null);
      setCropImageIdx(null);
      setErrors((prev) => ({ ...prev, images: "" }));
    }
  };

  const handleAddImageInput = () => {
    setFormData((prev) => ({
      ...prev,
      images: [
        ...(prev.images.length ? prev.images : [null, null, null]),
        null,
      ],
    }));
  };

  const handleSubmit = () => {
    console.log('hi')
    try {
      const dataToValidate = {
        ...formData,
        images: formData.images.filter(Boolean),
      };
      venueSchema.parse(dataToValidate);
      setErrors({});
      console.log("Valid data:", dataToValidate);
      // Reset form after successful submission
      setFormData({
        name: "",
        location: {
          type: "Point",
          coordinates: [0, 0],
          address: "",
        },
        specialFeatures: "",
        price: "",
        cancellationPolicy: "",
        capacity: "",
        categories: [],
        amenities: [],
        images: [],
      });
      setLocationQuery("");
      setModalOpen(false); // Close modal after successful submission
    } catch (err: any) {
      if (err.errors) {
        const fieldErrors: Record<string, string> = {};
        err.errors.forEach((e: any) => {
          const path = e.path.join(".");
          if (path === "location.address") {
            fieldErrors["address"] = e.message;
          } else if (path === "location.coordinates") {
            fieldErrors["address"] = fieldErrors["address"] || "Valid coordinates are required";
          } else {
            fieldErrors[e.path[0]] = e.message;
          }
        });
        setErrors(fieldErrors);
      }
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-[#F5EFE6] via-[#D7C5B9] to-[#B3927A]">
      <OwnerSidebar />
      <main className="flex-1 p-10">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-[#8C6A5D]">Venues</h2>
          <Button
            onClick={() => setModalOpen(true)}
            className="bg-gradient-to-r from-[#8C6A5D] via-[#B3927A] to-[#4B3F36] text-white px-6 py-2 rounded-xl font-bold shadow hover:from-[#4B3F36] hover:to-[#8C6A5D] transition"
          >
            + Add Venue
          </Button>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl border border-[#E2CFC3] px-8 py-8 w-full max-w-2xl">
              <h3 className="text-xl font-bold text-[#8C6A5D] mb-6">
                Add Venue
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[#8C6A5D] mb-2 font-semibold">
                    Venue Name
                  </label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter venue name"
                    className={errors.name ? "border-red-500" : ""}
                  />
                  {errors.name && (
                    <small className="text-red-500">{errors.name}</small>
                  )}
                </div>
                <div className="relative">
                  <label className="block text-[#8C6A5D] mb-2 font-semibold">
                    Location
                  </label>
                  <Input
                    name="address"
                    value={formData.location.address}
                    onChange={handleInputChange}
                    placeholder="Enter address"
                    className={errors.address ? "border-red-500" : ""}
                  />
                  {errors.address && (
                    <small className="text-red-500">{errors.address}</small>
                  )}
                  {showLocationDropdown && locationSuggestions.length > 0 && (
                    <div className="absolute z-50 bg-white border border-gray-300 rounded shadow w-full max-h-60 overflow-y-auto mt-1">
                      {locationSuggestions.map((feature, idx) => (
                        <div
                          key={idx}
                          className="px-4 py-2 hover:bg-[#F5EFE6] cursor-pointer text-[#4B3F36]"
                          onClick={() => handleLocationSelect(feature)}
                        >
                          {feature.properties.formatted}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-[#8C6A5D] mb-2 font-semibold">
                    Latitude
                  </label>
                  <Input
                    name="latitude"
                    type="number"
                    value={formData.location.coordinates[1] || ""}
                    readOnly
                    placeholder="Latitude"
                    className="bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-[#8C6A5D] mb-2 font-semibold">
                    Longitude
                  </label>
                  <Input
                    name="longitude"
                    type="number"
                    value={formData.location.coordinates[0] || ""}
                    readOnly
                    placeholder="Longitude"
                    className="bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-[#8C6A5D] mb-2 font-semibold">
                    Capacity
                  </label>
                  <Input
                    name="capacity"
                    type="number"
                    value={formData.capacity}
                    onChange={handleInputChange}
                    placeholder="Enter capacity"
                    className={errors.capacity ? "border-red-500" : ""}
                  />
                  {errors.capacity && (
                    <small className="text-red-500">{errors.capacity}</small>
                  )}
                </div>
                <div>
                  <MultiSelectDropdown
                    label="Category"
                    options={allCategories.map((cat) => ({
                      label: cat.name,
                      value: cat._id,
                    }))}
                    selected={formData.categories}
                    setSelected={handleCategoryChange}
                  />
                  {errors.categories && (
                    <small className="text-red-500">{errors.categories}</small>
                  )}
                </div>
                <div>
                  <MultiSelectDropdown
                    label="Amenities"
                    options={allAmenities.map((ami) => ({
                      label: ami.name,
                      value: ami._id,
                    }))}
                    selected={formData.amenities}
                    setSelected={handleAmenitiesChange}
                  />
                  {errors.amenities && (
                    <small className="text-red-500">{errors.amenities}</small>
                  )}
                </div>
                <div>
                  <label className="block text-[#8C6A5D] mb-2 font-semibold">
                    Special Features (comma separated)
                  </label>
                  <Input
                    name="specialFeatures"
                    value={formData.specialFeatures}
                    onChange={handleInputChange}
                    placeholder="e.g., Pool, Garden, Stage"
                    className={errors.specialFeatures ? "border-red-500" : ""}
                  />
                  {errors.specialFeatures && (
                    <small className="text-red-500">{errors.specialFeatures}</small>
                  )}
                </div>
                <div>
                  <label className="block text-[#8C6A5D] mb-2 font-semibold">
                    Price
                  </label>
                  <Input
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="Enter price"
                    className={errors.price ? "border-red-500" : ""}
                  />
                  {errors.price && (
                    <small className="text-red-500">{errors.price}</small>
                  )}
                </div>
                <div>
                  <label className="block text-[#8C6A5D] mb-2 font-semibold">
                    Cancellation Policy
                  </label>
                  <Input
                    name="cancellationPolicy"
                    value={formData.cancellationPolicy}
                    onChange={handleInputChange}
                    placeholder="Enter cancellation policy"
                    className={errors.cancellationPolicy ? "border-red-500" : ""}
                  />
                  {errors.cancellationPolicy && (
                    <small className="text-red-500">{errors.cancellationPolicy}</small>
                  )}
                </div>
                <div className="md:col-span-2">
                  <label className="block text-[#8C6A5D] mb-2 font-semibold">
                    Images (upload from device, minimum 3)
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {(formData.images.length
                      ? formData.images
                      : [null, null, null]
                    ).map((img, idx) => (
                      <div key={idx} className="flex flex-col items-center">
                        <label
                          className={`w-28 h-28 flex items-center justify-center bg-[#F5EFE6] rounded shadow cursor-pointer border-2 border-dashed ${
                            errors.images && !img
                              ? "border-red-500"
                              : "border-[#B3927A]"
                          } hover:bg-[#e9e1d6] transition`}
                        >
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageChange(e, idx)}
                            className="hidden"
                          />
                          {img ? (
                            <img
                              src={URL.createObjectURL(img)}
                              alt={`venue-img-${idx}`}
                              className="w-28 h-28 object-cover rounded"
                            />
                          ) : (
                            <Plus className="w-10 h-10 text-[#B3927A]" />
                          )}
                        </label>
                      </div>
                    ))}
                  </div>
                  {errors.images && (
                    <small className="text-red-500 block mt-2">
                      {errors.images}
                    </small>
                  )}
                  <Button
                    type="button"
                    variant="outline"
                    className="mt-4"
                    onClick={handleAddImageInput}
                  >
                    + Add More Image
                  </Button>
                </div>
              </div>
              <div className="flex justify-end gap-4 mt-8">
                <Button variant="secondary" onClick={() => setModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSubmit} disabled={cropModalOpen}>
                  Submit
                </Button>
              </div>
            </div>
          </div>
        )}

        {cropModalOpen && cropSrc && (
          <Modal open={cropModalOpen} onClose={() => setCropModalOpen(false)}>
            <div className="w-full max-w-2xl h-[500px] flex flex-col items-center justify-center">
              <div className="relative w-full h-[400px] bg-black rounded-lg overflow-hidden">
                <Cropper
                  image={cropSrc}
                  crop={crop}
                  zoom={zoom}
                  aspect={1}
                  cropShape="rect"
                  showGrid={true}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={onCropComplete}
                  objectFit="horizontal-cover"
                />
              </div>
              <div className="flex items-center gap-4 mt-6 w-full justify-center">
                <input
                  type="range"
                  min={1}
                  max={3}
                  step={0.01}
                  value={zoom}
                  onChange={(e) => setZoom(Number(e.target.value))}
                  className="w-1/2"
                />
                <span className="text-[#8C6A5D] font-semibold">Zoom</span>
              </div>
              <div className="flex gap-4 mt-8">
                <Button
                  variant="secondary"
                  onClick={() => setCropModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleCropSave}>Confirm Crop</Button>
              </div>
            </div>
          </Modal>
        )}
      </main>
    </div>
  );
};

export default AddEditVenue;