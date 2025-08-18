import { z } from "zod";

export const businessTypeEnum = z.enum([
  "kashmiriArtisiancollective",
  "handicraftTrader",
  "artisanNgo",
  "womenLeadSelfHelpGroup",
  "boutiqueWorkshop",
  "individualartisan",
]);

export const vendorRegistrationSchema = z.object({
  businessName: z.string(),
  contactPerson: z.string(),
  email: z.string().email(),
  password: z.string(),
  phoneNumber: z.string(),
  businessType: businessTypeEnum,
  location: z.string(),
  yearsOfExperience: z.number().optional(),
  businessDescription: z.string(),
  idCard: z.string(),
  giCertificate: z.string().optional(),
  sampleProductPhoto: z.string(),
  businessRegistration: z.string().optional(),
});

export const vendorLoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
