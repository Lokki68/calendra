import { DAYS_OF_WEEK_IN_ORDER } from "@/constants";
import { timeToFloat } from "@/lib/utils";
import z from "zod";

export const scheduleFormSchema = z.object({
  timezone: z.string().min(1, "Require"),
  availabilities: z
    .array(
      z.object({
        dayOfWeek: z.enum(DAYS_OF_WEEK_IN_ORDER),
        startTime: z
          .string()
          .regex(
            /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/,
            "Time must be in the format HH:MM"
          ),
        endTime: z // 'endTime' follows the same validation as 'startTime'
          .string()
          .regex(
            /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/, // Regex pattern to match the time format
            "Time must be in the format HH:MM" // Custom error message
          ),
      })
    )
    .superRefine((availabilities, ctx) => {
      availabilities.forEach((availability, index) => {
        const overlaps = availabilities.some((a, i) => {
          return (
            i !== index &&
            a.dayOfWeek === availability.dayOfWeek &&
            timeToFloat(a.startTime) < timeToFloat(availability.endTime) &&
            timeToFloat(a.endTime) > timeToFloat(availability.startTime)
          );
        });

        if (
          timeToFloat(availability.startTime) >=
          timeToFloat(availability.endTime)
        ) {
          ctx.addIssue({
            code: "custom",
            message: "End time must be after start time",
            path: [index, "endTime"],
          });
        }

        if (overlaps) {
          ctx.addIssue({
            code: "custom",
            message: "Availability overlaps with another",
            path: [index, "startTime"],
          });
        }

        if (
          timeToFloat(availability.startTime) >=
          timeToFloat(availability.endTime)
        ) {
          ctx.addIssue({
            code: "custom",
            message: "End time must be after start time",
            path: [index, "endTime"],
          });
        }
      });
    }),
});
