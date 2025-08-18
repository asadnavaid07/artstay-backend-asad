import prisma from "~/libs/prisma";
import { logger } from "~/utils/logger";
import { Request } from "express";

export const travelService = {
  getApplicationStatus: async (accountId: string) => {
    try {
      const application = await prisma.travelPlaner.findUnique({
        where: {
          accountId: accountId,
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
  getTravelProfileByAccountId: async (accountId: string) => {
    try {
      const travel = await prisma.travelPlaner.findUnique({
        where: {
          accountId: accountId,
        },
      });

      return {
        status: "success",
        message: "travel profile",
        data: travel,
      };
    } catch (error) {
      logger.error(error);
      throw new Error("Failed to fetch travel profile");
    }
  },
  getTravelProfileDetailById: async (travelPlannerId: string) => {
    try {
      const travel = await prisma.travelPlaner.findUnique({
        where: {
          travelPlanerId: travelPlannerId,
        },
        include: {
          TravelTour: true,
        },
      });
      return {
        status: "success",
        message: "travel profile",
        data: travel,
      };
    } catch (error) {
      logger.error(error);
      throw new Error("Failed to fetch travel profile");
    }
  },
  createTravelTour: async (travelTour: TravelTourCreationProps) => {
    try {
      const travelPlaner = await prisma.travelPlaner.findUnique({
        where: {
          accountId: travelTour.accountId,
        },
      });

      if (!travelPlaner) {
        throw new Error("Travel Planer not found");
      }

      await prisma.travelTour.create({
        data: {
          title: travelTour.title,
          description: travelTour.description,
          price: travelTour.price,
          image: travelTour.image,
          duration: travelTour.duration,
          isPricePerPerson: travelTour.isPricePerPerson,
          maxGroupSize: travelTour.maxGroupSize,
          languages: travelTour.languages,
          features: travelTour.features,
          isActive: travelTour.isActive,
          travelPlanerId: travelPlaner.travelPlanerId,
        },
      });

      return {
        status: "success",
        message: "travel tour created",
        data: travelTour,
      };
    } catch (error) {
      logger.error(error);
      throw new Error(
        error instanceof Error ? error.message : "Failed to create travel tour"
      );
    }
  },
  updateTravelTour: async (travelTour: TravelTourUpdateProps) => {
    try {
      await prisma.travelTour.update({
        where: {
          tourId: travelTour.tourId,
        },
        data: travelTour,
      });

      return {
        status: "success",
        message: "travel tour updated",
        data: travelTour,
      };
    } catch (error) {
      logger.error(error);
      throw new Error("Failed to update travel tour");
    }
  },
  getTravelTours: async (accountId: string) => {
    try {
      const travelTours = await prisma.travelTour.findMany({
        where: {
          travelPlaner: {
            accountId: accountId,
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        distinct: ["tourId"],
      });

      return {
        status: "success",
        message: "travel tours",
        data: travelTours,
      };
    } catch (error) {
      logger.error(error);
      throw new Error("Failed to get travel tours");
    }
  },
  getTravelTourById: async (tourId: string) => {
    try {
      const tour = await prisma.travelTour.findUnique({
        where: {
          tourId: tourId,
        },
      });

      return {
        status: "success",
        message: "travel tour",
        data: tour,
      };
    } catch (error) {
      logger.error(error);
      throw new Error("Failed to get travel tour");
    }
  },
  getAllTravelPlanersPagination: async (req: Request) => {
    try {
      const queryParams = req.query;
      const limit = Number(queryParams.limit);
      const skip = Number(queryParams.cursor ?? 0);
      const totalCount = await prisma.travelPlaner.count();

      const travelPlaners = await prisma.travelPlaner.findMany({
        take: limit,
        skip: skip,
        orderBy: {
          createdAt: "desc",
        },
        distinct: ["travelPlanerId"],
      });

      const nextCursor = skip + limit;
      const hasNextPage = nextCursor < totalCount;

      return {
        status: "success",
        message: "all travel planers",
        data: {
          travelPlaners: travelPlaners,
          metadata: {
            cursor: hasNextPage ? nextCursor.toString() : undefined,
            hasNextPage,
            totalItems: totalCount,
            currentPage: Math.floor(skip / limit) + 1,
            totalPages: Math.ceil(totalCount / limit),
          },
        },
      };
    } catch (error) {
      logger.error(error);
      throw new Error("Failed to fetch all travel planers");
    }
  },
  getAllTravelPlaners: async () => {
    try {
      const travelPlaners = await prisma.travelPlaner.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });

      return {
        status: "success",
        message: "all travel planers",
        data: travelPlaners,
      };
    } catch (error) {
      logger.error(error);
      throw new Error("Failed to fetch all travel planers");
    }
  },
  toggleStatus: async (req: Request) => {
    try {
      const { travelPlanerId, status } = req.body;
      await prisma.travelPlaner.update({
        where: {
          travelPlanerId: travelPlanerId,
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
  getTravelPlannerFilterOptions: async () => {
    try {
      const travelPlanners = await prisma.travelPlaner.findMany({
        select: {
          location: true,
          priceRange: true,
          language: true,
          speciality: true,
        },
      });

      // Extract unique locations
      const locations = [
        ...new Set(travelPlanners.map((tp) => tp.location)),
      ].filter((location) => location && location !== "none");

      // Extract unique price ranges
      const priceRanges = [
        ...new Set(travelPlanners.map((tp) => tp.priceRange)),
      ].filter((range) => range && range !== "none");

      // Extract unique languages
      const allLanguages = new Set();
      travelPlanners.forEach((tp) => {
        tp.language.forEach((lang) => {
          allLanguages.add(lang);
        });
      });

      // Extract unique specialities
      const allSpecialities = new Set();
      travelPlanners.forEach((tp) => {
        tp.speciality.forEach((spec) => {
          allSpecialities.add(spec);
        });
      });

      return {
        status: "success",
        message: "Fetched all travel planner",
        data: {
          locations: locations.sort(),
          priceRanges: priceRanges.sort(),
          languages: Array.from(allLanguages).sort(),
          specialities: Array.from(allSpecialities).sort(),
        },
      };
    } catch (error) {
      logger.error(error);
      throw new Error("Failed to fetch travel planner filters");
    }
  },

  createTravelBooking: async (req: Request) => {
    try {
      const booking = req.body as TravelBookingCreationProps;

      const bookingDetail = await prisma.bookingDetail.create({
        data: {
          firstName: booking.firstName,
          lastName: booking.lastName,
          email: booking.email,
          phone: booking.phone,
          additionalNote: booking.additionalRequests,
        },
      });
      await prisma.travelBooking.create({
        data: {
          bookingDetailId: bookingDetail.bookingDetailId,
          startDate: booking.startDate,
          endDate: booking.endDate,
          tourId: booking.tourId,
          totalAmount: booking.totalAmount,
          travelPlanerId: booking.travelPlanerId,
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
  findKashmirOdyssey: async (payload: {
    tripCategory?: string;
    adultTravelers?: number;
    childTravelers?: number;
    tripStartDate?: string;
    tripEndDate?: string;
    craftCulturalExperiences?: string[];
    tourismRetreats?: string[];
    supportServices?: string[];
    focusAreas?: string[];
    stayType?: string;
  }) => {
    try {
      // Example: Assuming you have a model called TravelTour for odyssey packages
      const tours = await prisma.travelTour.findMany({
        where: {
          ...(payload.tripCategory && { title: { contains: payload.tripCategory, mode: "insensitive" } }),
          ...(payload.stayType && { features: { has: payload.stayType } }),
          ...(payload.craftCulturalExperiences && payload.craftCulturalExperiences.length > 0 && {
            features: { hasSome: payload.craftCulturalExperiences },
          }),
          ...(payload.tourismRetreats && payload.tourismRetreats.length > 0 && {
            features: { hasSome: payload.tourismRetreats },
          }),
          ...(payload.supportServices && payload.supportServices.length > 0 && {
            features: { hasSome: payload.supportServices },
          }),
          ...(payload.focusAreas && payload.focusAreas.length > 0 && {
            features: { hasSome: payload.focusAreas },
          }),
        },
      });

      if (!tours || tours.length === 0) {
        return { status: "error", message: "No Kashmir Odyssey tour found", data: null };
      }

      return {
        status: "success",
        message: "Kashmir Odyssey tour found",
        data: tours,
      };
    } catch (error) {
      logger.error(error);
      return {
        status: "error",
        message: error instanceof Error ? error.message : "Failed to search Kashmir Odyssey",
        data: null,
      };
    }
  },
};
