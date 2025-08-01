import { z } from "zod";

export const venueSchema = z.object({
  name: z.string().min(1, "Venue name is required"),
  location: z.object({
    type: z.literal("Point"),
    coordinates: z
      .array(z.number())
      .length(2, "Location must have latitude and longitude"),
    address: z.string().min(1, "Location/address is required"),
  }),
  specialFeatures: z
    .string()
    .min(1, "At least one special feature is required (comma separated)"),
  price: z
    .string()
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Price must be a positive number",
    }),
  cancellationPolicy: z.string().min(1, "Cancellation policy is required"),
  capacity: z
    .string()
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Capacity must be a positive number",
    }),
  categories: z
    .array(z.string())
    .min(1, "Select at least one category"),
  amenities: z
    .array(z.string())
    .min(1, "Select at least one amenity"),
  images: z
    .array(z.any())
    .min(3, "At least three images are required"),
});