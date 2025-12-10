import { z } from "zod";

export const createEventSchema = z
  .object({
    title: z.string().min(1, "Event title is required"),
    date: z.string().min(1),
    startTime: z.string(),
    endTime: z.string(),
    venueIds: z.array(z.string()).min(1, "Please select at least one venue"),
  })
  .refine((data) => data.startTime < data.endTime, {
    message: "Start time must be before end time",
    path: ["endTime"],
  });

export type CreateEventFormValues = z.infer<typeof createEventSchema>;
