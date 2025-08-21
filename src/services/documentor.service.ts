import { Request } from "express";
import { hash } from "bcrypt";
import prisma from "~/libs/prisma";
import { logger } from "~/utils/logger";

export const documentorService = {
  getApplicationStatus: async (accountId: string) => {
    try {
      const application = await prisma.craftDocumentor.findUnique({
        where: { accountId },
      });
      return {
        status: "success",
        message: "Application status fetched successfully",
        data: application,
      };
    } catch (error) {
      logger.error(error);
      throw new Error("Failed to fetch application status");
    }
  },

  deleteDocumentor: async (documentorId: string) => {
    try {
      await prisma.craftDocumentor.delete({
        where: { documentorId },
      });
      return {
        status: "success",
        message: "Documentor deleted successfully",
        data: null,
      };
    } catch (error) {
      logger.error(error);
      throw new Error("Failed to delete documentor");
    }
  },

  getDocumentorById: async (documentorId: string) => {
    try {
      const documentor = await prisma.craftDocumentor.findUnique({
        where: { documentorId },
        include: {
          DocumentorPortfolio: true,
          DocumentorPackage: true,
        },
      });

      if (!documentor) {
        throw new Error("Documentor not found");
      }

      return {
        status: "success",
        message: "Documentor fetched successfully",
        data: documentor,
      };
    } catch (error) {
      logger.error(error);
      throw new Error("Failed to fetch documentor");
    }
  },

  getDocumentorByAccountId: async (accountId: string) => {
    try {
      const documentor = await prisma.craftDocumentor.findUnique({
        where: { accountId: accountId },
      });

      if (!documentor) {
        throw new Error("Documentor not found");
      }

      return {
        status: "success",
        message: "Documentor fetched successfully",
        data: documentor,
      };
    } catch (error) {
      logger.error(error);
      throw new Error("Failed to fetch documentor");
    }
  },

  getDocumentorPortfolio: async (documentorId: string) => {
    try {
      const portfolio = await prisma.documentorPortfolio.findUnique({
        where: { documentorId },
      });

      if (!portfolio) {
        throw new Error("Portfolio not found");
      }

      return {
        status: "success",
        message: "Portfolio fetched successfully",
        data: portfolio,
      };
    } catch (error) {
      logger.error(error);
      throw new Error("Failed to fetch documentor portfolio");
    }
  },

  getAllDocumentors: async () => {
    try {
      const documentors = await prisma.craftDocumentor.findMany({
        orderBy: { createdAt: "desc" },
      });

      return {
        status: "success",
        message: "All documentors fetched successfully",
        data: documentors,
      };
    } catch (error) {
      logger.error(error);
      throw new Error("Failed to fetch documentors");
    }
  },

  getAllDocumentorsWithDetail: async () => {
    try {
      const documentors = await prisma.craftDocumentor.findMany({
        where: { isActive: true },
        include: {
          DocumentorPortfolio: {
            select: {
              images: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
      });

      return {
        status: "success",
        message: "All documentors fetched successfully",
        data: documentors,
      };
    } catch (error) {
      logger.error(error);
      throw new Error("Failed to fetch documentors");
    }
  },

  getDocumentorFilters: async () => {
    try {
      const documentors = await prisma.craftDocumentor.findMany({
        where: { isActive: true },
        select: {
          specialization: true,
          craftFocusAreas: true,
          languages: true,
          DocumentorPackage: {
            select: {
              packageType: true,
              price: true,
            },
          },
        },
      });

      // Extract unique specializations
      const specializations = new Set<string>();
      documentors.forEach((doc) => {
        doc.specialization.forEach((spec) => specializations.add(spec));
      });

      // Extract unique craft focus areas
      const craftFocusAreas = new Set<string>();
      documentors.forEach((doc) => {
        doc.craftFocusAreas.forEach((area) => craftFocusAreas.add(area));
      });

      // Extract unique languages
      const languages = new Set<string>();
      documentors.forEach((doc) => {
        doc.languages.forEach((lang) => languages.add(lang));
      });

      // Extract craftPackage types
      const packageTypes = new Set<string>();
      const priceRanges = new Set<string>();

      documentors.forEach((doc) => {
        doc.DocumentorPackage.forEach((pkg) => {
          packageTypes.add(pkg.packageType);

          // Create price ranges
          if (pkg.price < 100) priceRanges.add("Under $100");
          else if (pkg.price >= 100 && pkg.price < 300)
            priceRanges.add("$100-$300");
          else if (pkg.price >= 300 && pkg.price < 500)
            priceRanges.add("$300-$500");
          else priceRanges.add("$500+");
        });
      });

      return {
        status: "success",
        message: "Documentor filters fetched successfully",
        data: {
          specializations: Array.from(specializations).sort(),
          craftFocusAreas: Array.from(craftFocusAreas).sort(),
          languages: Array.from(languages).sort(),
          packageTypes: Array.from(packageTypes).sort(),
          priceRanges: Array.from(priceRanges).sort(),
        },
      };
    } catch (error) {
      logger.error(error);
      throw new Error("Failed to fetch documentor filters");
    }
  },

  toggleDocumentorStatus: async (documentorId: string, status: boolean) => {
    try {
      await prisma.craftDocumentor.update({
        where: { documentorId },
        data: { isActive: status },
      });

      return {
        status: "success",
        message: "Documentor status updated successfully",
        data: null,
      };
    } catch (error) {
      logger.error(error);
      throw new Error("Failed to update documentor status");
    }
  },

  createBooking: async (bookingData: DocumentorBookingInput) => {
    try {
      // First create the booking detail
      const bookingDetail = await prisma.bookingDetail.create({
        data: {
          firstName: bookingData.firstName,
          lastName: bookingData.lastName,
          email: bookingData.email,
          phone: bookingData.phone,
          address: bookingData.address || "none",
          city: bookingData.city || "none",
          postalCode: bookingData.postalCode || "none",
          additionalNote: bookingData.additionalNote || "none",
        },
      });

      // Then create the documentor booking
      const documentorBooking = await prisma.documentorBooking.create({
        data: {
          startDate: bookingData.startDate,
          endDate: bookingData.endDate,
          location: bookingData.location,
          specialRequests: bookingData.specialRequests || "none",
          totalAmount: bookingData.totalAmount,
          status: "new",
          packageId: bookingData.packageId,
          documentorId: bookingData.documentorId,
          bookingDetailId: bookingDetail.bookingDetailId,
        },
      });

      return {
        status: "success",
        message: "Documentor booking created successfully",
        data: {
          bookingId: documentorBooking.bookingId,
          bookingDetailId: bookingDetail.bookingDetailId,
        },
      };
    } catch (error) {
      logger.error(error);
      throw new Error("Failed to create documentor booking");
    }
  },
  createProfile: async (profileData: DocumentorProfileInput) => {
    try {
      const hashedPassword = await hash(profileData.password, 10);
      const account = await prisma.account.create({
        data: {
          email: profileData.email,
          password: hashedPassword,
          accountType: "CRAFT_DOCUMENTOR" as AccountTypeEnum,
        },
      });
      await prisma.craftDocumentor.create({
        data: {
          firstName: profileData.firstName,
          lastName: profileData.lastName,
          dp: profileData.dp,
          description: profileData.description,
          address: profileData.address,
          yearsExperience: profileData.yearsExperience,
          specialization: profileData.specialization,
          languages: profileData.languages,
          craftFocusAreas: profileData.craftFocusAreas,
          accountId: account.userId,
        },
      });
      return {
        status: "success",
        message: "Profile created successfully",
        data: null,
      };
    } catch (error) {
      logger.error(error);
      throw new Error("Failed to create profile");
    }
  },
  updateDocumentorProfile: async (
    documentorId: string,
    profileData: DocumentorProfileUpdateInputProps
  ) => {
    try {
      const updatedDocumentor = await prisma.craftDocumentor.update({
        where: { documentorId },
        data: {
          firstName: profileData.firstName,
          lastName: profileData.lastName,
          dp: profileData.dp,
          description: profileData.description,
          address: profileData.address,
          yearsExperience: profileData.yearsExperience,
          specialization: profileData.specialization,
          languages: profileData.languages,
          craftFocusAreas: profileData.craftFocusAreas,
        },
      });

      return {
        status: "success",
        message: "Documentor profile updated successfully",
        data: updatedDocumentor,
      };
    } catch (error) {
      logger.error(error);
      throw new Error("Failed to update documentor profile");
    }
  },
  updateDocumentorPortfolio: async (req: Request) => {
    try {
      const { accountId, images } = req.body as {
        accountId: string;
        images: string[];
      };
      const documentor = await prisma.craftDocumentor.findUnique({
        where: { accountId: accountId },
        select: { documentorId: true },
      });
      if (!documentor) throw new Error("Documentor not found");

      await prisma.documentorPortfolio.upsert({
        where: {
          documentorId: documentor.documentorId,
        },
        create: {
          documentorId: documentor.documentorId,
          images: images,
        },
        update: {
          images: images,
        },
      });

      return {
        status: "success",
        message: "portfolio updated",
        data: null,
      };
    } catch (error) {
      logger.error(error);
      throw new Error("Failed to upload portfolio");
    }
  },
  getDocumentorPortfolioByAccountId: async (req: Request) => {
    try {
      const { accountId } = req.params;
      const documentor = await prisma.craftDocumentor.findUnique({
        where: { accountId: accountId },
        select: { documentorId: true },
      });
      if (!documentor) throw new Error("Documentor not found");

      const portfolio = await prisma.documentorPortfolio.findUnique({
        where: {
          documentorId: documentor.documentorId,
        },
      });
      return {
        status: "success",
        message: "portfolio fetched",
        data: portfolio,
      };
    } catch (error) {
      logger.error(error);
      throw new Error("Failed to fetch portfolio");
    }
  },
  getDocumentorPackages: async (documentorId: string) => {
    try {
      const packages = await prisma.documentorPackage.findMany({
        where: { documentorId },
        orderBy: { createdAt: "desc" },
      });

      return {
        status: "success",
        message: "Packages fetched successfully",
        data: packages,
      };
    } catch (error) {
      logger.error(error);
      throw new Error("Failed to fetch packages");
    }
  },
  getDocumentorPackagesByAccountId: async (accountId: string) => {
    try {
      const packages = await prisma.documentorPackage.findMany({
        where: {
          documentor: {
            accountId: accountId,
          },
        },
        orderBy: { createdAt: "desc" },
      });

      return {
        status: "success",
        message: "Packages fetched successfully",
        data: packages,
      };
    } catch (error) {
      logger.error(error);
      throw new Error("Failed to fetch packages");
    }
  },

  createDocumentorPackage: async (req: Request) => {
    try {
      const {
        title,
        description,
        duration,
        deliverables,
        price,
        packageType,
        accountId,
      } = req.body;

      const documentor = await prisma.craftDocumentor.findUnique({
        where: {
          accountId: accountId,
        },
      });

      if (!documentor) throw new Error("Documentor dont found.");
      await prisma.documentorPackage.create({
        data: {
          title,
          description,
          duration,
          deliverables,
          price,
          packageType,
          documentorId: documentor.documentorId,
        },
      });

      return {
        status: "success",
        message: "Package created successfully",
        data: null,
      };
    } catch (error) {
      logger.error(error);
      throw new Error("Failed to create craftPackage");
    }
  },

  updateDocumentorPackage: async (req: Request) => {
    try {
      const {
        packageId,
        title,
        description,
        duration,
        deliverables,
        price,
        packageType,
      } = req.body;

      const craftPackage = await prisma.documentorPackage.update({
        where: { packageId },
        data: {
          title,
          description,
          duration,
          deliverables,
          price,
          packageType,
        },
      });

      return {
        status: "success",
        message: "Package updated successfully",
        data: craftPackage,
      };
    } catch (error) {
      logger.error(error);
      throw new Error("Failed to update craftPackage");
    }
  },

  deleteDocumentorPackage: async (packageId: string) => {
    try {
      await prisma.documentorPackage.delete({
        where: { packageId },
      });

      return {
        status: "success",
        message: "Package deleted successfully",
        data: null,
      };
    } catch (error) {
      logger.error(error);
      throw new Error("Failed to delete craftPackage");
    }
  },
  getDocumentorPackageById: async (packageId: string) => {
    try {
      const craftPackage = await prisma.documentorPackage.findUnique({
        where: { packageId },
      });

      if (!craftPackage) {
        throw new Error("Package not found");
      }

      return {
        status: "success",
        message: "Package fetched successfully",
        data: craftPackage,
      };
    } catch (error) {
      logger.error(error);
      throw new Error("Failed to fetch package");
    }
  },
  getAllDocumentorBookings: async (accountId: string) => {
    try {
      const bookings = await prisma.documentorBooking.findMany({
        where: {
          documentor: {
            accountId: accountId,
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        include: {
          bookingDetail: {
            select: {
              bookingDetailId: true,
              firstName: true,
              lastName: true,
              email: true,
              phone: true,
              additionalNote: true,
            },
          },
          package: {
            select: {
              packageId: true,
              title: true,
              price: true,
              duration: true,
              packageType: true,
            },
          },
        },
      });

      return {
        status: "success",
        message: "Documentor bookings fetched successfully",
        data: bookings,
      };
    } catch (error) {
      logger.error(error);
      throw new Error("Failed to fetch documentor bookings");
    }
  },
  findCraftDocumentationJourney: async (payload: {
    "booking-type"?: string;
    "select-services"?: string;
    date?: string;
    timeslot?: string;
    outputformat?: string;
    "preferred-delivery-method"?: string;
  }) => {
    try {
      // Map payload fields to model fields as best as possible
      // Example: select-services -> specialization, outputformat -> DocumentorPackage.packageType, etc.
      const documentors = await prisma.craftDocumentor.findMany({
        where: {
          ...(payload["select-services"] && { specialization: { has: payload["select-services"] } }),
          isActive: true,
        },
        include: {
          DocumentorPackage: true,
        },
      });

      // Filter by outputformat (packageType) if provided
      let filtered = documentors;
      if (payload.outputformat) {
        filtered = filtered.filter(doc =>
          doc.DocumentorPackage.some(pkg =>
            pkg.packageType.toLowerCase() === payload.outputformat?.toLowerCase()
          )
        );
      }

      if (!filtered || filtered.length === 0) {
        return { status: "error", message: "No artisy craft documentation found", data: null };
      }

      return {
        status: "success",
        message: "Craft documentation journey found",
        data: filtered,
      };
    } catch (error) {
      logger.error(error);
      return {
        status: "error",
        message: error instanceof Error ? error.message : "Failed to search craft documentation journey",
        data: null,
      };
    }
  },
};
