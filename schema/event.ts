import { z } from "zod";

export const eventFormSchema = z.object({
  name: z.string().min(1, { message: "Required" }),
  description: z.string().optional(),
  isActive: z.boolean(),
  durationInMinutes: z.coerce
    .number()
    .int()
    .positive({ message: "Duration must be greater than 0" })
    .max(60 * 12, {
      message: `Duration must be less than 12 hours (${60 * 12} minutes)`,
    }) as z.ZodCoercedNumber<number>,
});
