import prisma from "~/libs/prisma";
import { logger } from "~/utils/logger";
import { Request } from "express";

export const fairService = {
  createFairBooking: async (bookingData: FairBookingInput) => {
    try {
      // First create the booking detail
      const bookingDetail = await prisma.bookingDetail.create({
        data: {
          firstName: bookingData.firstName,
          lastName: bookingData.lastName,
          email: bookingData.email,
          phone: bookingData.phone,
          additionalNote: bookingData.additionalNote,
        },
      });

      // Then create the fair booking
      const fairBooking = await prisma.fairBooking.create({
        data: {
          eventDate: bookingData.eventDate,
          numberOfTickets: bookingData.numberOfTickets,
          ticketType: bookingData.ticketType,
          totalAmount: bookingData.totalAmount,
          eventId: bookingData.eventId,
          fairId: bookingData.fairId,
          bookingDetailId: bookingDetail.bookingDetailId,
          status: "new",
        },
      });

      return {
        status: "success",
        message: "Fair booking created successfully",
        data: {
          bookingId: fairBooking.fairBookingId,
          bookingDetailId: bookingDetail.bookingDetailId,
        },
      };
    } catch (error) {
      logger.error(error);
      throw new Error("Failed to create fair booking");
    }
  },

  getApplicationStatus: async (accountId: string) => {
    try {
      const application = await prisma.fair.findUnique({
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
  getFairProfileByAccountId: async (accountId: string) => {
    try {
      const fair = await prisma.fair.findFirst({
        where: {
          accountId: accountId,
        },
      });
      return {
        status: "success",
        message: "fair details",
        data: fair,
      };
    } catch (error) {
      logger.error(error);
      throw new Error("Failed to fetch fair details");
    }
  },
  createFairEvent: async (event: FairEventCreationProps) => {
    try {
      const fair = await prisma.fair.findFirst({
        where: {
          accountId: event.accountId,
        },
        select: {
          fairId: true,
        },
      });

      if (!fair)
        return {
          status: "error" as const,
          message: "Fair seller not found",
          data: null,
        };

      await prisma.fairEvent.create({
        data: {
          fairId: fair.fairId,
          title: event.title,
          startDate: event.startDate,
          endDate: event.endDate,
          fairType: event.fairType.toUpperCase() as FairTypeEnum,
          location: event.location.toUpperCase() as FairLocationEnum,
          longitude: event.longitude,
          latitude: event.latitude,
          description: event.description,
          vanue: event.vanue,
          organizer: event.organizer,
        },
      });

      return {
        status: "success",
        message: "fair event created",
        data: null,
      };
    } catch (error) {
      logger.error(error);
      throw new Error("Failed to create fair event");
    }
  },

  updateFairEvent: async (event: FairEventUpdationProps) => {
    try {
      await prisma.fairEvent.update({
        where: { eventId: event.eventId },
        data: {
          title: event.title,
          startDate: event.startDate,
          endDate: event.endDate,
          fairType: event.fairType.toUpperCase() as FairTypeEnum,
          location: event.location.toUpperCase() as FairLocationEnum,
          longitude: event.longitude,
          latitude: event.latitude,
          description: event.description,
          vanue: event.vanue,
          organizer: event.organizer,
        },
      });

      return {
        status: "success",
        message: "fair event updated",
        data: null,
      };
    } catch (error) {
      logger.error(error);
      throw new Error("Failed to update fair event");
    }
  },

  getFairEvents: async (accountId: string) => {
    try {
      const events = await prisma.fairEvent.findMany({
        where: {
          fair: {
            accountId: accountId,
          },
        },
      });

      return {
        status: "success",
        message: "events fetched successfully",
        data: events,
      };
    } catch (error) {
      logger.error(error);
      throw new Error("Failed to fetch events");
    }
  },

  getEventById: async (eventId: string) => {
    try {
      const event = await prisma.fairEvent.findUniqueOrThrow({
        where: {
          eventId: eventId,
        },
      });

      return {
        status: "success",
        message: "event fetched successfully",
        data: event,
      };
    } catch (error) {
      logger.error(error);
      throw new Error("Failed to fetch event");
    }
  },

  getAllFairsPagination: async (req: Request) => {
    try {
      const queryParams = req.query;
      const limit = Number(queryParams.limit);
      const skip = Number(queryParams.cursor ?? 0);
      const totalCount = await prisma.fair.count();

      const fairs = await prisma.fair.findMany({
        take: limit,
        skip: skip,
        orderBy: {
          createdAt: "desc",
        },
        distinct: ["fairId"],
      });

      const nextCursor = skip + limit;
      const hasNextPage = nextCursor < totalCount;

      return {
        status: "success",
        message: "all fairs",
        data: {
          fairs: fairs,
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
      throw new Error("Failed to fetch all fairs");
    }
  },

  toggleStatus: async (req: Request) => {
    try {
      const { fairId, status } = req.body;
      await prisma.fair.update({
        where: {
          fairId: fairId,
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

  getAllFairs: async () => {
    try {
      const fairs = await prisma.fair.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });
      return {
        status: "success",
        message: "all fairs",
        data: fairs,
      };
    } catch (error) {
      logger.error(error);
      throw new Error("Failed to fetch all fairs");
    }
  },

  getFairDetailById: async (fairId: string) => {
    try {
      const fair = await prisma.fair.findUnique({
        where: {
          fairId: fairId,
        },
        include: {
          FairEvent: true,
        },
      });

      return {
        status: "success",
        message: "fair details",
        data: fair,
      };
    } catch (error) {
      logger.error(error);
      throw new Error("Failed to fetch fair details");
    }
  },

  getAllFairBookings: async (accountId: string) => {
    try {
      // Get all bookings for this fair, optimized for client-side processing
      const bookings = await prisma.fairBooking.findMany({
        where: {
          fair: {
            accountId: accountId,
          },
        },
        orderBy: {
          createdAt: "desc", // Default newest first
        },
        include: {
          // Only include the fields we need
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
          event: {
            select: {
              eventId: true,
              title: true,
              location: true,
              vanue: true,
              fairType: true,
              organizer: true,
            },
          },
          fair: {
            select: {
              fairId: true,
              firstName: true,
              lastName: true,
            },
          },
        },
      });

      return {
        status: "success",
        message: "Fair bookings fetched successfully",
        data: bookings,
      };
    } catch (error) {
      logger.error(error);
      throw new Error("Failed to fetch fair bookings");
    }
  },

  findFairByCriteria: async (payload: {
    eventLocation?: string;
    eventType?: string;
    startDate?: string;
    endDate?: string;
  }) => {
    try {
      // Normalize enum filters for prisma enum comparisons
      const normalizedLocation = payload.eventLocation
        ? payload.eventLocation.toUpperCase()
        : undefined;
      const normalizedType = payload.eventType
        ? payload.eventType.toUpperCase()
        : undefined;

      const fairs = await prisma.fairEvent.findMany({
        where: {
          ...(normalizedLocation && { location: normalizedLocation as FairLocationEnum }),
          ...(normalizedType && { fairType: normalizedType as FairTypeEnum }),
          // Date overlap: event overlaps with requested window
          ...((payload.startDate || payload.endDate) && {
            AND: [
              payload.startDate
                ? { endDate: { gte: payload.startDate } }
                : undefined,
              payload.endDate
                ? { startDate: { lte: payload.endDate } }
                : undefined,
            ].filter(Boolean) as any,
          }),
        },
        include: { fair: true },
        orderBy: { startDate: 'asc' },
      });

      if (!fairs || fairs.length === 0) {
        return { status: "error", message: "No fair craft found", data: null };
      }

      return {
        status: "success",
        message: "Fair(s) found",
        data: fairs,
      };
    } catch (error) {
      logger.error(error);
      return {
        status: "error",
        message: error instanceof Error ? error.message : "Failed to search fair",
        data: null,
      };
    }
  },
};
