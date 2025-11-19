import prisma from '~/libs/prisma';
import { logger } from '~/utils/logger';

export const ecoTransitService = {
  createEcoTransit: async (data: any) => {
    try {
      const ecoTransit = await prisma.ecoTransit.create({ data });
      return { status: 'success', message: 'Eco transit created', data: ecoTransit };
    } catch (error) {
      logger.error(error);
      throw new Error('Failed to create eco transit');
    }
  },
  getEcoTransitDetail: async (transitId: string) => {
    try {
      const ecoTransit = await prisma.ecoTransit.findUnique({
        where: { transitId },
        include: { EcoTransitOption: true },
      });
      return { status: 'success', message: 'Eco transit detail', data: ecoTransit };
    } catch (error) {
      logger.error(error);
      throw new Error('Failed to fetch eco transit detail');
    }
  },
  createEcoTransitOption: async (data: any) => {
    try {
      const option = await prisma.ecoTransitOption.create({ data });
      return { status: 'success', message: 'Eco transit option created', data: option };
    } catch (error) {
      logger.error(error);
      throw new Error('Failed to create eco transit option');
    }
  },
  getEcoTransitOptions: async (transitId: string) => {
    try {
      const options = await prisma.ecoTransitOption.findMany({ where: { transitId } });
      return { status: 'success', message: 'Eco transit options', data: options };
    } catch (error) {
      logger.error(error);
      throw new Error('Failed to fetch eco transit options');
    }
  },
  createEcoTransitBooking: async (data: any) => {
    try {
      // expects: { optionId, transitId, bookingDetailId, travelDate, numberOfPassengers, distance }
      const option = await prisma.ecoTransitOption.findUnique({ where: { optionId: data.optionId } });
      if (!option) throw new Error('Eco transit option not found');
      const totalAmount = data.distance * option.baseFee * data.numberOfPassengers;
      const booking = await prisma.ecoTransitBooking.create({
        data: {
          ...data,
          totalAmount,
        },
      });
      return { status: 'success', message: 'Eco transit booking created', data: booking };
    } catch (error) {
      logger.error(error);
      throw new Error('Failed to create eco transit booking');
    }
  },
  getEcoTransitBookings: async (transitId: string) => {
    try {
      const bookings = await prisma.ecoTransitBooking.findMany({ where: { transitId } });
      return { status: 'success', message: 'Eco transit bookings', data: bookings };
    } catch (error) {
      logger.error(error);
      throw new Error('Failed to fetch eco transit bookings');
    }
  },
  getAllEcoTransits: async () => {
    try {
      // Get all eco transit records with related data
      const ecoTransits = await prisma.ecoTransit.findMany({
        orderBy: { createdAt: "desc" },
        include: {
          account: {
            select: {
              userId: true,
              email: true,
              accountType: true,
            }
          },
          EcoTransitOption: true,
        }
      });
      
      logger.info(`Found ${ecoTransits.length} eco transit records`);
      
      return { status: "success", message: "Eco transit detail", data: ecoTransits };
    } catch (error) {
      logger.error(error);
      throw new Error("Failed to fetch eco transits");
    }
  },
  getApplicationStatus: async (accountId: string) => {
    try {
      const application = await prisma.ecoTransit.findUnique({
        where: {
          accountId: accountId,
        },
      });
      return {
        status: "success",
        message: "application status",
        data: application,
      };
    } catch (error: any) {
      logger.error(error);
      // Handle table not existing case
      if (error?.code === "P2021" || error?.meta?.table === "public.EcoTransit") {
        return {
          status: "success",
          message: "application status",
          data: null, // Return null if table doesn't exist (no application yet)
        };
      }
      return {
        status: "error",
        message: error instanceof Error ? error.message : "Failed to fetch application status",
        data: null,
      };
    }
  },
  getEcoTransitFilters: async () => {
    try {
      const ecoTransits = await prisma.ecoTransit.findMany({
        where: {
          isActive: true,
        },
        select: {
          address: true,
          EcoTransitOption: {
            select: {
              title: true,
              baseFee: true,
            },
          },
        },
      });

      // Extract unique addresses (locations)
      const locations = [
        ...new Set(ecoTransits.map((transit) => transit.address).filter((addr) => addr && addr !== "none")),
      ].sort();

      // Extract unique vehicle types from options
      const vehicleTypes = new Set<string>();
      ecoTransits.forEach((transit) => {
        transit.EcoTransitOption.forEach((option) => {
          if (option.title && option.title !== "none") {
            vehicleTypes.add(option.title);
          }
        });
      });

      // Create price ranges based on base fees
      const allFees = ecoTransits
        .flatMap((transit) => transit.EcoTransitOption.map((opt) => opt.baseFee))
        .filter((fee) => fee > 0);

      const priceRanges: string[] = [];
      if (allFees.length > 0) {
        const minFee = Math.min(...allFees);
        const maxFee = Math.max(...allFees);

        if (minFee < 50) priceRanges.push("Under $50");
        if (allFees.some((fee) => fee >= 50 && fee < 100)) priceRanges.push("$50-$100");
        if (allFees.some((fee) => fee >= 100 && fee < 200)) priceRanges.push("$100-$200");
        if (maxFee >= 200) priceRanges.push("$200+");
      }

      return {
        status: "success",
        message: "Eco transit filters fetched successfully",
        data: {
          locations: locations,
          vehicleTypes: Array.from(vehicleTypes).sort(),
          priceRanges: priceRanges,
        },
      };
    } catch (error) {
      logger.error(error);
      throw new Error("Failed to fetch eco transit filters");
    }
  },
  findEcoTransitAdventure: async (payload: {
    pickup?: string;
    destination?: string;
    travelDate?: string;
    numberOfGuests?: number;
    vehicleType?: string;
    accessibilityNeeds?: string[];
    sustainabilityPreferences?: string[];
    packageOption?: number;
    occasion?: string;
    addOnServices?: string[];
  }) => {
    try {
      // Move all filters to top-level where, use relation filters for transit
      const adventures = await prisma.ecoTransitOption.findMany({
        where: {
          ...(payload.vehicleType && { title: { equals: payload.vehicleType, mode: "insensitive" } }),
          ...(payload.packageOption && { baseFee: { lte: payload.packageOption } }),
          transit: {
            ...(payload.pickup && { address: { contains: payload.pickup, mode: "insensitive" } }),
            ...(payload.destination && { address: { contains: payload.destination, mode: "insensitive" } }),
          },
          // Add more filters as needed for accessibilityNeeds, sustainabilityPreferences, etc.
        },
        include: {
          transit: true,
        },
      });

      if (!adventures || adventures.length === 0) {
        return { status: "error", message: "No Eco transit adventure found", data: null };
      }

      return {
        status: "success",
        message: "Eco transit adventure found",
        data: adventures,
      };
    } catch (error) {
      logger.error(error);
      return {
        status: "error",
        message: error instanceof Error ? error.message : "Failed to search eco transit adventure",
        data: null,
      };
    }
  },
};