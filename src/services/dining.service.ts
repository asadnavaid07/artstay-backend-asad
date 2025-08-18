import prisma from "~/libs/prisma";
import { logger } from "~/utils/logger";
import { Request } from "express";

export const diningService = {
  getApplicationStatus: async (accountId: string) => {
    try {
      const application = await prisma.restaurant.findUnique({
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
  getAllRestaurantsPagination: async (req: Request) => {
    try {
      const queryParams = req.query;
      const limit = Number(queryParams.limit);
      const skip = Number(queryParams.cursor ?? 0);
      const totalCount = await prisma.restaurant.count();

      const dinings = await prisma.restaurant.findMany({
        take: limit,
        skip: skip,
        orderBy: {
          createdAt: "desc",
        },
        distinct: ["restaurantId"],
      });

      const nextCursor = skip + limit;
      const hasNextPage = nextCursor < totalCount;

      return {
        status: "success",
        message: "all dinings",
        data: {
          dinings: dinings,
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
      throw new Error("Failed to fetch all dinings");
    }
  },
  getAllRestaurants: async () => {
    try {
      const dinings = await prisma.restaurant.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });
      return {
        status: "success",
        message: "all dinings",
        data: dinings,
      };
    } catch (error) {
      logger.error(error);
      throw new Error("Failed to fetch all dinings");
    }
  },
  getDiningFilterOptions: async () => {
    try {
      const restaurants = await prisma.restaurant.findMany({
        select: {
          cuisine: true,
          priceRange: true,
          location: true,
        },
      });

      // Extract unique cuisines
      const allCuisines = new Set();
      restaurants.forEach((restaurant) => {
        restaurant.cuisine.forEach((cuisineItem) => {
          allCuisines.add(cuisineItem);
        });
      });

      // Extract unique price ranges
      const priceRanges = [
        ...new Set(restaurants.map((r) => r.priceRange)),
      ].filter((range) => range && range !== "none");

      // Extract unique locations
      const locations = [...new Set(restaurants.map((r) => r.location))].filter(
        (location) => location && location !== "none"
      );
      console.log({
        cuisines: Array.from(allCuisines).sort(),
        priceRanges: priceRanges.sort(),
        locations: locations.sort(),
      });
      return {
        status: "success",
        message: "dining filter fetched",
        data: {
          cuisines: Array.from(allCuisines).sort(),
          priceRanges: priceRanges.sort(),
          locations: locations.sort(),
        },
      };
    } catch (error) {
      logger.error(error);
      throw new Error("Failed to fetch dining filters");
    }
  },
  getRestaurantByAccountId: async (accountId: string) => {
    try {
      const restaurant = await prisma.restaurant.findUnique({
        where: {
          accountId: accountId,
        },
      });

      return {
        status: "success",
        message: "restaurants details",
        data: restaurant,
      };
    } catch (error) {
      logger.error(error);
      throw new Error("Failed to fetch restaurant details");
    }
  },

  getRestaurantById: async (restaurantId: string) => {
    try {
      const restaurant = await prisma.restaurant.findUnique({
        where: {
          restaurantId: restaurantId,
        },
        include: {
          menu: true,
        },
      });

      return {
        status: "success",
        message: "restaurant details",
        data: restaurant,
      };
    } catch (error) {
      logger.error(error);
      throw new Error("Failed to fetch restaurant details");
    }
  },

  getMenuItems: async (accountId: string) => {
    try {
      const menuItems = await prisma.menuItem.findMany({
        where: {
          restaurant: {
            accountId: accountId,
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      return {
        status: "success",
        message: "menu items",
        data: menuItems,
      };
    } catch (error) {
      logger.error(error);
      throw new Error("Failed to fetch menu items");
    }
  },

  createMenuItem: async (menuItem: MenuItemCreationProps) => {
    try {
      await prisma.menuItem.create({
        data: {
          name: menuItem.name,
          description: menuItem.description,
          price: menuItem.price,
          category: menuItem.category,
          isVegetarian: menuItem.isVegetarian,
          isVegan: menuItem.isVegan,
          isGlutenFree: menuItem.isGlutenFree,
          spicyLevel: menuItem.spicyLevel,
          image: menuItem.image,
          restaurant: {
            connect: {
              accountId: menuItem.accountId,
            },
          },
        },
      });

      return {
        status: "success",
        message: "menu item created",
        data: null,
      };
    } catch (error) {
      logger.error(error);
      throw new Error("Failed to create menu item");
    }
  },

  updateMenuItem: async (
    menuItemId: string,
    menuItem: MenuItemCreationProps
  ) => {
    try {
      await prisma.menuItem.update({
        where: {
          menuItemId: menuItemId,
        },
        data: menuItem,
      });

      return {
        status: "success",
        message: "menu item updated",
        data: null,
      };
    } catch (error) {
      logger.error(error);
      throw new Error("Failed to update menu item");
    }
  },
  createRestaurantBooking: async (req: Request) => {
    try {
      const booking = req.body as RestaurantBookingCreationProps;

      // 1. Create booking detail
      const bookingDetail = await prisma.bookingDetail.create({
        data: {
          firstName: booking.firstName,
          lastName: booking.lastName,
          email: booking.email,
          phone: booking.phone,
          additionalNote: booking.additionalNote,
        },
      });

      // 2. Create restaurant booking
      const restaurantBooking = await prisma.restaurantBooking.create({
        data: {
          isActive: true,
          subtotal: booking.subtotal,
          tax: booking.tax,
          total: booking.total,
          bookingDetailId: bookingDetail.bookingDetailId,
          resturantId: booking.resturantId,
        },
      });

      // 3. Create booking items
      if (booking.items && booking.items.length > 0) {
        const bookingItems = booking.items.map((item) => ({
          bookingId: restaurantBooking.bookingId,
          menuItemId: item.menuItemId,
          quantity: item.quantity,
        }));

        await prisma.diningBookingItem.createMany({
          data: bookingItems,
        });
      }

      // 4. Get the complete booking with items
      const completeBooking = await prisma.restaurantBooking.findUnique({
        where: { bookingId: restaurantBooking.bookingId },
        include: {
          DiningBookingItem: {
            include: {
              menuItem: true,
            },
          },
          bookingDetail: true,
          resturant: {
            select: {
              name: true,
              location: true,
            },
          },
        },
      });

      return {
        status: "success",
        message: "Restaurant booking created successfully",
        data: {
          bookingId: restaurantBooking.bookingId,
          booking: completeBooking,
        },
      };
    } catch (error) {
      logger.error(error);
      throw new Error("Failed to create restaurant booking");
    }
  },
  getBookingDetails: async (bookingId: string) => {
    try {
      const booking = await prisma.restaurantBooking.findUnique({
        where: { bookingId },
        include: {
          DiningBookingItem: {
            include: {
              menuItem: true,
            },
          },
          bookingDetail: true,
          resturant: {
            select: {
              name: true,
              location: true,
              image: true,
            },
          },
        },
      });

      if (!booking) {
        throw new Error("Booking not found");
      }

      return {
        status: "success",
        message: "Booking details fetched successfully",
        data: booking,
      };
    } catch (error) {
      logger.error(error);
      throw new Error("Failed to fetch booking details");
    }
  },

  toggleStatus: async (req: Request) => {
    try {
      const { restaurantId, status } = req.body;
      await prisma.restaurant.update({
        where: {
          restaurantId: restaurantId,
        },
        data: {
          isActive: status,
        },
      });
      return {
        status: "success",
        message: "restaurant toggle status",
        data: null,
      };
    } catch (error) {
      logger.error(error);
      throw new Error("Failed to toggle restaurant status");
    }
  },
   getAllRestaurantBookings: async (restaurantId: string) => {
    try {
      // Get all bookings for this restaurant, optimized for client-side processing
      const bookings = await prisma.restaurantBooking.findMany({
        where: {
          resturantId: restaurantId,
        },
        orderBy: {
          createdAt: 'desc', // Default newest first
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
          resturant: {
            select: {
              restaurantId: true,
              name: true,
              location: true,
              cuisine: true,
              priceRange: true,
            },
          },
          DiningBookingItem: {
            select: {
              bookingItemId: true,
              quantity: true,
              menuItem: {
                select: {
                  menuItemId: true,
                  name: true,
                  price: true,
                  category: true,
                }
              }
            }
          }
        },
      });      
      return {
        status: "success",
        message: "Restaurant bookings fetched successfully",
        data: bookings,
      };
    } catch (error) {
      logger.error(error);
      throw new Error("Failed to fetch restaurant bookings");
    }
  },
  findTraditionalDiningVoyage: async (payload: {
    experienceType?: string;
    date?: string;
    time?: string;
    guests?: number;
    children?: number;
    tablePreference?: string;
    dietaryPreferences?: string[];
    occasion?: string;
    addOnServices?: string[];
  }) => {
    try {
      // Only filter on fields that exist in RestaurantBooking model
      // Supported: date (createdAt), guests (sum of DiningBookingItem.quantity)
      const where: any = {};

      // Filter by date (createdAt)
      if (payload.date) {
        // Assuming date is in YYYY-MM-DD format
        const start = new Date(payload.date);
        const end = new Date(payload.date);
        end.setDate(end.getDate() + 1);
        where.createdAt = { gte: start, lt: end };
      }

      // You can add more filters here if you add those fields to your schema

      const bookings = await prisma.restaurantBooking.findMany({
        where,
        include: {
          DiningBookingItem: true,
          bookingDetail: true,
          resturant: true,
        },
      });

      // Filter by guests if requested (sum of DiningBookingItem.quantity)
      let filtered = bookings;
      if (payload.guests) {
        filtered = bookings.filter(b =>
          b.DiningBookingItem.reduce((sum, item) => sum + item.quantity, 0) === payload.guests
        );
      }

      if (!filtered || filtered.length === 0) {
        return { status: "error", message: "No Traditional dining voyage found", data: null };
      }

      return {
        status: "success",
        message: "Traditional dining voyage found",
        data: filtered,
      };
    } catch (error) {
      logger.error(error);
      return {
        status: "error",
        message: error instanceof Error ? error.message : "Failed to search traditional dining voyage",
        data: null,
      };
    }
  },
};
