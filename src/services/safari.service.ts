import prisma from "~/libs/prisma";
import { logger } from "~/utils/logger";
import { Request } from "express";

export const safariService = {
  getApplicationStatus: async (accountId: string) => {
    try {
      const application = await prisma.safari.findUnique({
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

  toggleStatus: async (req: Request) => {
    try {
      const { safariId, status } = req.body;
      await prisma.safari.update({
        where: {
          safariId: safariId,
        },
        data: {
          isActive: status,
        },
      });
      return {
        status: "success",
        message: "safari toggle status",
        data: null,
      };
    } catch (error) {
      logger.error(error);
      throw new Error("Failed to toggle safari status");
    }
  },

  safariDetailByAccountId: async (accountId: string) => {
    try {
      const safari: SafariProps | null = await prisma.safari.findUnique({
        where: {
          accountId: accountId,
        },
      });
      return {
        status: "success",
        message: "safari details",
        data: safari,
      };
    } catch (error) {
      logger.error(error);
      throw new Error("Failed to fetch safari details");
    }
  },

  createSafariTour: async (tour: SafariTourCreationProps) => {
    try {
      const safari = await prisma.safari.findUnique({
        where: {
          accountId: tour.accountId,
        },
        select: {
          safariId: true,
        },
      });
      if (!safari) throw new Error("Safari seller not found.");

      const newTour = await prisma.safariTour.create({
        data: {
          safariId: safari.safariId,
          title: tour.title,
          fee: tour.fee,
          duration: tour.duration,
          description: tour.description,
          features: tour.features,
          operator: tour.operator,
        },
      });

      return {
        status: "success",
        message: "safari tour created",
        data: newTour,
      };
    } catch (error) {
      logger.error(error);
      throw new Error("Failed to create safari tour");
    }
  },

  getSafariTours: async (accountId: string) => {
    try {
      const tours: SafariTourProps[] = await prisma.safariTour.findMany({
        where: {
          safari: {
            accountId: accountId,
          },
        },
      });
      return {
        status: "success",
        message: "tours fetched successfully",
        data: tours,
      };
    } catch (error) {
      logger.error(error);
      throw new Error("Failed to fetch tours");
    }
  },

  getTourById: async (tourId: string) => {
    try {
      const tour: SafariTourProps = await prisma.safariTour.findUniqueOrThrow({
        where: {
          tourId: tourId,
        },
      });
      return {
        status: "success",
        message: "tour fetched successfully",
        data: tour,
      };
    } catch (error) {
      logger.error(error);
      throw new Error("Failed to fetch tour");
    }
  },

  getAllSafaris: async () => {
    try {
      const safaris: SafariProps[] = await prisma.safari.findMany({
        include: {
          SafariTour: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      return {
        status: "success",
        message: "all safaris",
        data: safaris,
      };
    } catch (error) {
      logger.error(error);
      throw new Error("Something went wrong");
    }
  },

  getAllSafarisPagination: async (req: Request) => {
    try {
      const queryParams = req.query;
      const limit = Number(queryParams.limit);
      const skip = Number(queryParams.cursor ?? 0);
      const totalCount = await prisma.safari.count();

      const safaris: SafariProps[] = await prisma.safari.findMany({
        take: limit,
        skip: skip,
        orderBy: {
          createdAt: "desc",
        },
        distinct: ["safariId"],
      });

      const nextCursor = skip + limit;
      const hasNextPage = nextCursor < totalCount;

      return {
        status: "success",
        message: "all safaris",
        data: {
          safaris: safaris,
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
      throw new Error("Something went wrong");
    }
  },

  safariDetailById: async (safariId: string) => {
    try {
      const safari: SafariDetailProps | null = await prisma.safari.findUnique({
        where: {
          safariId: safariId,
        },
        include: {
          SafariTour: true,
        },
      });
      return {
        status: "success",
        message: "safari details",
        data: safari,
      };
    } catch (error) {
      logger.error(error);
      throw new Error("Failed to fetch safari details");
    }
  },

  // Safari Booking Services
  createSafariBooking: async (bookingData: SafariBookingInput) => {
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

      // Then create the safari booking
      const safariBooking = await prisma.safariBooking.create({
        data: {
          tourDate: bookingData.tourDate,
          numberOfGuests: bookingData.numberOfGuests,
          totalAmount: bookingData.totalAmount,
          tourId: bookingData.tourId,
          safariId: bookingData.safariId,
          bookingDetailId: bookingDetail.bookingDetailId,
          status: "new",
        },
      });

      return {
        status: "success",
        message: "Safari booking created successfully",
        data: {
          bookingId: safariBooking.safariBookingId,
          bookingDetailId: bookingDetail.bookingDetailId,
        },
      };
    } catch (error) {
      logger.error(error);
      throw new Error("Failed to create safari booking");
    }
  },

  getSafariBookingById: async (bookingId: string) => {
    try {
      const booking = await prisma.safariBooking.findUnique({
        where: {
          safariBookingId: bookingId,
        },
        include: {
          bookingDetail: true,
          tour: true,
          safari: true,
        },
      });

      if (!booking) {
        throw new Error("Booking not found");
      }

      return {
        status: "success",
        message: "Booking fetched successfully",
        data: booking,
      };
    } catch (error) {
      logger.error(error);
      throw new Error("Failed to fetch booking");
    }
  },

  // getAllSafariBookings: async (safariId?: string) => {
  //     try {
  //         const whereClause = safariId ? { safariId } : {}

  //         const bookings = await prisma.safariBooking.findMany({
  //             where: whereClause,
  //             include: {
  //                 bookingDetail: true,
  //                 tour: true,
  //                 safari: true
  //             },
  //             orderBy: {
  //                 createdAt: 'desc'
  //             }
  //         })

  //         return {
  //             status: 'success',
  //             message: 'Bookings fetched successfully',
  //             data: bookings
  //         }
  //     } catch (error) {
  //         logger.error(error)
  //         throw new Error('Failed to fetch bookings')
  //     }
  // },

  updateBookingStatus: async (bookingId: string, status: string) => {
    try {
      const updatedBooking = await prisma.safariBooking.update({
        where: {
          safariBookingId: bookingId,
        },
        data: {
          status: status,
        },
      });

      return {
        status: "success",
        message: "Booking status updated successfully",
        data: updatedBooking,
      };
    } catch (error) {
      logger.error(error);
      throw new Error("Failed to update booking status");
    }
  },
  getAllSafariBookings: async (accountId: string) => {
    try {
      // Get all bookings for this safari, optimized for client-side processing
      const bookings = await prisma.safariBooking.findMany({
        where: {
          safari: {
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
          tour: {
            select: {
              tourId: true,
              title: true,
              operator: true,
              duration: true,
              fee: true,
            },
          },
          safari: {
            select: {
              safariId: true,
              firstName: true,
              lastName: true,
            },
          },
        },
      });

      return {
        status: "success",
        message: "Safari bookings fetched successfully",
        data: bookings,
      };
    } catch (error) {
      logger.error(error);
      throw new Error("Failed to fetch safari bookings");
    }
  },

  findSafariByDestinations: async (payload: {
    title: string;
    activityPreferences?: string[];
    duration?: string;
  }) => {
    try {
      console.log("Received payload:", payload);
      console.log("Activity preferences type:", typeof payload.activityPreferences);
      console.log("Activity preferences value:", payload.activityPreferences);
      
      // Ensure activityPreferences is always an array
      const activityPrefs = Array.isArray(payload.activityPreferences) 
        ? payload.activityPreferences 
        : payload.activityPreferences ? [payload.activityPreferences] : [];
      
      console.log("Processed activity preferences:", activityPrefs);
      
      // Find all safaris first, then filter tours
      const safaris = await prisma.safari.findMany({
        include: {
          SafariTour: true,
        },
      });

      // Filter safaris that have matching tours
      const filteredSafaris = safaris.filter(safari => {
        return safari.SafariTour.some(tour => {
          // Check title match
          const titleMatch = tour.title?.trim().toLowerCase() === payload.title?.trim().toLowerCase();

          
          // Check activity preferences match
          const activityMatch = activityPrefs.length === 0 || 
            activityPrefs.some(pref => tour.features.includes(pref));
          
          // Check duration match
          const durationMatch = !payload.duration || 
            tour.duration.toLowerCase().includes(payload.duration.toLowerCase());
          
          return titleMatch && activityMatch && durationMatch;
        });
      });

      // Update the tours to only include matching ones
      const safarisWithFilteredTours = filteredSafaris.map(safari => ({
        ...safari,
        SafariTour: safari.SafariTour.filter(tour => {
          const titleMatch = tour.title.toLowerCase() === payload.title.toLowerCase();
          const activityMatch = activityPrefs.length === 0 || 
            activityPrefs.some(pref => tour.features.includes(pref));
          const durationMatch = !payload.duration || 
            tour.duration.toLowerCase().includes(payload.duration.toLowerCase());
          
          return titleMatch && activityMatch && durationMatch;
        })
      }));

      if (!safarisWithFilteredTours || safarisWithFilteredTours.length === 0) {
        return { status: "error", message: "No safari found", data: null };
      }

      return {
        status: "success",
        message: "Safari(s) found",
        data: safarisWithFilteredTours,
      };
    } catch (error) {
      logger.error(error);
      return {
        status: "error",
        message: error instanceof Error ? error.message : "Failed to search safari",
        data: null,
      };
    }
  },
};
