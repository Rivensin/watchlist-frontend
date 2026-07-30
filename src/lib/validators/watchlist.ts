import { z } from "zod";

export const WatchlistSchema = z.object({
  status: z.enum([
    "PLANNED",
    "WATCHING",
    "COMPLETED",
    "DROPPED",
  ]),
  rating: z.number().int().min(0).max(10),
  notes: z.string().max(500).optional(),
});

export type WatchlistFormData = z.infer<typeof WatchlistSchema>;