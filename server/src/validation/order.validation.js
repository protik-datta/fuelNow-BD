const { z } = require("zod");

const orderValidationSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(11).max(15),
  division: z.string().min(2),
  district: z.string().min(2),
  address: z.string().min(5),
  fuelType: z.enum(["petrol", "octane"]),
  quantity: z.coerce.number().min(1),
  deliveryType: z.enum(["same_day", "next_day"]),
});

module.exports = orderValidationSchema;
