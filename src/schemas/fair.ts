import { z } from "zod"

export const FairEventSchema = z.object({
    title: z.string(),
    location: z.string(),
    vanue: z.string(),
    fairType: z.string(),
    startDate: z.string(),
    endDate: z.string(),
    organizer: z.string(),
    latitude: z.number(),
    longitude: z.number(),
    description: z.string(),
    accountId: z.string(),
})

export const UpdateFairEventSchema = z.object({
    title: z.string(),
    location: z.string(),
    vanue: z.string(),
    fairType: z.string(),
    startDate: z.string(),
    endDate: z.string(),
    organizer: z.string(),
    latitude: z.number(),
    longitude: z.number(),
    description: z.string(),
    eventId:z.string()
})