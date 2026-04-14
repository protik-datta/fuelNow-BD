const { z } = require("zod");

const orderValidationSchema = z
  .object({
    name: z.string().min(2),
    phone: z.string().min(11).max(15),
    division: z.string().min(1),
    district: z.string().min(1),
    address: z.string().min(5),
    fuelType: z.enum(["petrol", "octane"]),
    quantity: z.coerce.number().min(1).optional(),
    customQuantity: z.coerce.number().min(1).optional(),
    deliveryType: z.enum(["same_day", "next_day"]),
  })
  .refine((data) => data.quantity != null || data.customQuantity != null, {
    message: "Quantity is required",
    path: ["quantity"],
  })
  .refine((data) => !(data.quantity != null && data.customQuantity != null), {
    message: "Provide either quantity or customQuantity, not both",
    path: ["customQuantity"],
  });

module.exports = orderValidationSchema;
