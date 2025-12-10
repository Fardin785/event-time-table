import { z } from "zod";

export const venueSchema = z.object({
  name: z.string().trim().min(1, "Venue name is required").max(50, "Venue name is too long"),
  color: z.string().regex(/^#([0-9A-F]{3}){1,2}$/i, "Invalid color"),
});

export type VenueFormValues = z.infer<typeof venueSchema>;
