const { z } = require("zod");

const emergencyOrderSchema = z.object({
  name: z.string().min(1, "Name is required").trim(),
  phone: z.string().regex(/^01[3-9]\d{8}$/, "Invalid Bangladeshi phone number"),
  locationText: z.string().min(1, "Location is required").trim(),
  mapLink: z.string().url("Invalid map link URL").optional().or(z.literal("")),
  fuelType: z.enum(["petrol", "octane"], {
    errorMap: () => ({ message: "Fuel type must be 'petrol' or 'octane'" }),
  }),
  quantity: z.coerce
    .number({ invalid_type_error: "Quantity must be a number" })
    .min(1, "Minimum 1 liter")
    .max(10, "Maximum 10 liters"),
  urgency: z.enum(["low", "medium", "high"], {
    errorMap: () => ({ message: "Urgency must be 'low', 'medium', or 'high'" }),
  }),
  note: z
    .string()
    .max(300, "Note cannot exceed 300 characters")
    .optional()
    .default(""),
  coordinates: z
    .object({
      lat: z.number().optional(),
      lng: z.number().optional(),
    })
    .optional(),
});

module.exports = { emergencyOrderSchema };
