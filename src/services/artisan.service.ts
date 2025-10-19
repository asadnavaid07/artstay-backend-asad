import prisma from "~/libs/prisma";
import { logger } from "~/utils/logger";
import { Request } from "express";

export const artisanService = {
  getApplicationStatus: async (accountId: string) => {
    try {
      const application = await prisma.artisan.findUnique({
        where: {
          accountId: accountId,
        },
        include: {
          craft: true,
          subCraft: true,
        },
      });
      return {
        status: "success",
        message: "application status",
        data: application,
      };
    } catch (error) {
      logger.error(error);
      throw new Error("Failed to fetch application status");
    }
  },
  toggleStatus: async (req: Request) => {
    try {
      const { artisanId, status } = req.body;
      await prisma.artisan.update({
        where: {
          artisanId: artisanId,
        },
        data: {
          isActive: status,
        },
      });
      return {
        status: "success",
        message: "artisan toggle status",
        data: null,
      };
    } catch (error) {
      logger.error(error);
      throw new Error("Failed to fetch application status");
    }
  },
  getAllArtisansPagination: async (req: Request) => {
    try {
      const queryParams = req.query;
      const limit = Number(queryParams.limit);
      const skip = Number(queryParams.cursor ?? 0);
      const totalCount = await prisma.artisan.count();

      const artisans: ArtisanDetailProps[] = await prisma.artisan.findMany({
        include: {
          craft: true,
          subCraft: true,
        },
        take: limit,
        skip: skip,
        orderBy: {
          createdAt: "desc",
        },
        distinct: ["artisanId"],
      });

      const nextCursor = skip + limit;
      const hasNextPage = nextCursor < totalCount;

      return {
        status: "success",
        message: "all artisan",
        data: {
          artisans: artisans,
          metadata: {
            cursor: hasNextPage ? nextCursor.toString() : undefined,
            hasNextPage,
            totalItems: totalCount, // Use total count here
            currentPage: Math.floor(skip / limit) + 1,
            totalPages: Math.ceil(totalCount / limit),
          },
        },
      };
    } catch (error) {
      logger.error(error);
      throw new Error("Error in fetching the artisans");
    }
  },
  updateProtfolio: async (req: Request) => {
    try {
      const { accountId, images } = req.body as {
        accountId: string;
        images: string[];
      };
      const artisan = await prisma.artisan.findUnique({
        where: { accountId: accountId },
        select: { artisanId: true },
      });
      if (!artisan) throw new Error("Artisan not found");
      await prisma.portfolio.upsert({
        where: {
          artisanId: artisan.artisanId,
        },
        create: {
          artisanId: artisan.artisanId,
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
      throw new Error("Failed to uploadportfolio");
    }
  },
  getPortfolioByArtisanId: async (req: Request) => {
    try {
      const { artisanId } = req.params;
      const portfolio = await prisma.portfolio.findUnique({
        where: {
          artisanId: artisanId,
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
  getPortfolioByAccountId: async (req: Request) => {
    try {
      const { accountId } = req.params;
      const artisan = await prisma.artisan.findUnique({
        where: { accountId: accountId },
        select: { artisanId: true },
      });
      if (!artisan) throw new Error("Artisan not found");
      const portfolio = await prisma.portfolio.findUnique({
        where: {
          artisanId: artisan.artisanId,
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
  createArtisanBooking: async (req: Request) => {
    try {
      const booking = req.body as ArtisanBookingCreationProps;

      const bookingDetail = await prisma.bookingDetail.create({
        data: {
          firstName: booking.firstName,
          lastName: booking.lastName,
          email: booking.email,
          phone: booking.email,
          additionalNote: booking.additionalNote,
        },
      });

      await prisma.artisanBooking.create({
        data: {
          startDate: booking.startDate,
          endDate: booking.endDate,
          packageId: booking.packageId,
          artisanId: booking.artisanId,
          bookingDetailId: bookingDetail.bookingDetailId,
        },
      });

      return {
        status: "success",
        message: "artisan booking created",
        data: null,
      };
    } catch (error) {
      logger.error(error);
      throw new Error("Failed to create asrtisan booking");
    }
  },
   getAllArtisanBookings: async (accountId: string) => {
    try {
      // Get all bookings for this artisan
      const bookings = await prisma.artisanBooking.findMany({
        where: {
          artisan : {
            accountId: accountId,
          }
        },
        orderBy: {
          createdAt: 'desc',
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
            },
          },
          artisan: {
            select: {
              artisanId: true,
              firstName: true,
              lastName: true,
            }
          }
        },
      });
      
      return {
        status: "success",
        message: "Artisan bookings fetched successfully",
        data: bookings,
      };
    } catch (error) {
      logger.error(error);
      throw new Error("Failed to fetch artisan bookings");
    }
  },

  getArtisanBookedDates: async (artisanId: string) => {
    try {
      // Get all bookings for this artisan that are not cancelled
      const bookings = await prisma.artisanBooking.findMany({
        where: {
          artisanId: artisanId,
          status: { not: "cancelled" }
        },
        select: {
          startDate: true,
          endDate: true,
        },
      });
      
      // Transform to the format expected by the frontend
      const bookedDates = bookings.map(booking => ({
        startDate: booking.startDate,
        endDate: booking.endDate,
      }));
      
      return {
        status: "success",
        message: "Artisan booked dates fetched successfully",
        data: bookedDates,
      };
    } catch (error) {
      logger.error(error);
      throw new Error("Failed to fetch artisan booked dates");
    }
  },
  findArtisanByCraft: async (payload: {
    craft: string;
    subCraft: string;
    checkIn?: string;
    checkOut?: string;
    experienceGoals?: string;
    travelType?: string;
  }) => {
    try {
      // Find the craft by name
      const craftRecord = await prisma.craft.findFirst({
        where: { craftName: { equals: payload.craft, mode: "insensitive" } }
      });
      if (!craftRecord) {
        return { status: "error", message: "No artisan craft found", data: null };
      }

      // Find the subCraft by name and craftId
      const subCraftRecord = await prisma.subCraft.findFirst({
        where: {
          subCraftName: { equals: payload.subCraft, mode: "insensitive" },
          craftId: craftRecord.craftId
        }
      });
      if (!subCraftRecord) {
        return { status: "error", message: "No artisan craft found", data: null };
      }

      // Find artisans with this craft and subCraft
      const artisans = await prisma.artisan.findMany({
        where: {
          craftId: craftRecord.craftId,
          subCraftId: subCraftRecord.subCraftId
        },
        include: {
          craft: true,
          subCraft: true
        }
      });

      if (!artisans || artisans.length === 0) {
        return { status: "error", message: "No artisan craft found", data: null };
      }

      return {
        status: "success",
        message: "Artisan(s) found",
        data: artisans
      };
    } catch (error) {
      logger.error(error);
      return {
        status: "error",
        message: error instanceof Error ? error.message : "Failed to search artisan craft",
        data: null
      };
    }
  },
  findNearbyArtisan: async (payload: {
    craft: string;
    location: { country?: string; state?: string; city?: string };
    visitDate?: string;
  }) => {
    try {
      // Find the craft by name
      const craftRecord = await prisma.craft.findFirst({
        where: { craftName: { equals: payload.craft, mode: "insensitive" } }
      });
      if (!craftRecord) {
        return { status: "error", message: "No artisan craft found", data: null };
      }

      // Find artisans by craft and location fields
      const artisans = await prisma.artisan.findMany({
        where: {
          craftId: craftRecord.craftId,
          AND: [
            payload.location.country
              ? { address: { contains: payload.location.country, mode: "insensitive" } }
              : {},
            payload.location.state
              ? { address: { contains: payload.location.state, mode: "insensitive" } }
              : {},
            payload.location.city
              ? { address: { contains: payload.location.city, mode: "insensitive" } }
              : {},
          ],
        },
        include: {
          craft: true,
          subCraft: true,
        },
      });

      if (!artisans || artisans.length === 0) {
        return { status: "error", message: "No artisan craft found", data: null };
      }

      return {
        status: "success",
        message: "Nearby artisan(s) found",
        data: artisans,
      };
    } catch (error) {
      logger.error(error);
      return {
        status: "error",
        message: error instanceof Error ? error.message : "Failed to search artisan craft",
        data: null,
      };
    }
  },
  findTraditionalTour: async (payload: {
    destination?: string;
    tourPackage?: string;
    budgetPerPerson?: number;
    checkIn?: string;
    checkOut?: string;
    adults?: number;
    children?: number;
    tourPreferences?: string[];
  }) => {
    try {
      // Only address in Artisan matches destination.
      // No other model related to Artisan (ArtisanPackage, Portfolio, etc.) has fields matching the other filters.
      // So, only filter by address (destination).
      const where: any = {};

      if (payload.destination) {
        where.address = { contains: payload.destination, mode: "insensitive" };
      }

      // If you want to filter by other fields, you must add them to your Prisma schema.
      // No related model (ArtisanPackage, Portfolio, etc.) has fields like tourPackage, budgetPerPerson, etc.

      const tours = await prisma.artisan.findMany({
        where,
        include: {
          craft: true,
          subCraft: true,
        },
      });

      if (!tours || tours.length === 0) {
        return { status: "error", message: "No Traditional tour found", data: null };
      }

      return {
        status: "success",
        message: "Traditional tour found",
        data: tours,
      };
    } catch (error) {
      logger.error(error);
      return {
        status: "error",
        message: error instanceof Error ? error.message : "Failed to search traditional tour",
        data: null,
      };
    }
  },
  findSustainableLivingTour: async (payload: {
    accommodationType?: string;
    checkIn?: string;
    checkOut?: string;
    adults?: number;
    children?: number;
    experienceFilters?: string[];
    budgetTier?: number;
  }) => {
    try {
      // Only filter by fields that exist in Artisan model or its related models.
      // Artisan does NOT have experienceFilters, budgetTier, or accommodationType fields.
      // Only address (for accommodationType) is a close match.
      // No related model (ArtisanPackage, Portfolio, etc.) has experienceFilters or budgetTier.

      const where: any = {};

      // Filter by address as accommodationType (if you want to treat address as accommodationType)
      if (payload.accommodationType) {
        where.address = { contains: payload.accommodationType, mode: "insensitive" };
      }

      // You can add more filters here if you add those fields to your schema

      const tours = await prisma.artisan.findMany({
        where,
        include: {
          craft: true,
          subCraft: true,
        },
      });

      if (!tours || tours.length === 0) {
        return { status: "error", message: "No sustainable living tour found", data: null };
      }

      return {
        status: "success",
        message: "Sustainable living tour(s) found",
        data: tours,
      };
    } catch (error) {
      logger.error(error);
      return {
        status: "error",
        message: error instanceof Error ? error.message : "Failed to search sustainable living tour",
        data: null,
      };
    }
  },
};
