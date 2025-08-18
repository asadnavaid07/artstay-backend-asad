import prisma from "~/libs/prisma";
import { hash, compare } from "bcrypt";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

// @ts-ignore
const vendorModel = (prisma as any).vendor;

export const vendorService = {
  register: async (data: any) => {
    try {
      const existing = await vendorModel.findUnique({ where: { email: data.email } });
      if (existing) throw new Error("Vendor already exists with this email");

      const hashedPassword = await hash(data.password, 10);

      await vendorModel.create({
        data: {
          businessName: data.businessName,
          contactPerson: data.contactPerson,
          email: data.email,
          password: hashedPassword,
          phoneNumber: data.phoneNumber,
          businessType: data.businessType,
          location: data.location,
          yearsOfExperience: data.yearsOfExperience,
          businessDescription: data.businessDescription,
          idCard: data.idCard,
          giCertificate: data.giCertificate,
          sampleProductPhoto: data.sampleProductPhoto,
          businessRegistration: data.businessRegistration,
        },
      });

      return { status: "success", message: "Vendor registered successfully", data: data };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) throw new Error(error.message);
      throw new Error(error instanceof Error ? error.message : "Failed to register vendor");
    }
  },

  login: async (email: string, password: string) => {
    const vendor = await vendorModel.findUnique({ where: { email } });
    if (!vendor) throw new Error("Vendor not found");

    const valid = await compare(password, vendor.password);
    if (!valid) throw new Error("Invalid password");

    // You can add JWT here if needed
    return {
      status: "success",
      message: "Vendor login successful",
      data: {
        vendorId: vendor.vendorId,
        businessName: vendor.businessName,
        email: vendor.email,
        businessType: vendor.businessType, // Return the business type
      },
    };
  },
};
