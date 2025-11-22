import prisma from "~/libs/prisma";
import { logger } from "~/utils/logger";
import {
  Certificate,
  Education,
  Experience,
  Recognition,
  Training,
} from "@prisma/client";
import { hash } from "bcrypt";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export const registerationService = {
  createArtisan: async (artisan: ArtisanCreationProps) => {
    try {
      const hashedPassword = await hash(artisan.password, 10);

      const account = await prisma.account.create({
        data: {
          email: artisan.email,
          password: hashedPassword,
          accountType: "ARTISAN" as AccountTypeEnum,
        },
      });

      await prisma.artisan.create({
        data: {
          firstName: artisan.firstName,
          lastName: artisan.lastName,
          address: artisan.address,
          description: artisan.description,
          dp: artisan.dp,
          experience: artisan.experience as Experience,
          education: artisan.education as Education,
          certificate: artisan.certificate as Certificate,
          training: artisan.training as Training,
          recongnition: artisan.recognition as Recognition,
          subCraftId: artisan.subCraftId,
          craftId: artisan.craftId,
          accountId: account.userId,
        },
      });

      return { status: "success", message: "artisan created", data: null };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new Error(error.message);
      }
      logger.error(error);
      throw new Error("Failed to create artisan");
    }
  },
  updateArtisan: async (artisan: ArtisanUpdationProps) => {
    try {
      await prisma.artisan.upsert({
        where: { accountId: artisan.accountId },
        update: {
          firstName: artisan.firstName,
          lastName: artisan.lastName,
          address: artisan.address,
          description: artisan.description,
          dp: artisan.dp,
          experience: artisan.experience as Experience,
          education: artisan.education as Education,
          certificate: artisan.certificate as Certificate,
          training: artisan.training as Training,
          recongnition: artisan.recognition as Recognition,
          subCraftId: artisan.subCraftId,
          craftId: artisan.craftId,
        },
        create: {
          firstName: artisan.firstName,
          lastName: artisan.lastName,
          address: artisan.address,
          description: artisan.description,
          dp: artisan.dp,
          experience: artisan.experience as Experience,
          education: artisan.education as Education,
          certificate: artisan.certificate as Certificate,
          training: artisan.training as Training,
          recongnition: artisan.recognition as Recognition,
          subCraftId: artisan.subCraftId,
          craftId: artisan.craftId,
          accountId: artisan.accountId,
        },
      });
      return { status: "success", message: "artisan updated", data: null };
    } catch (error) {
      logger.error(error);
      return {
        status: "error",
        message:
          error instanceof Error ? error.message : "Failed to update artisan",
        data: null,
      };
    }
  },
  createSafari: async (safari: SafariCreationProps) => {
    try {
      const hashedPassword = await hash(safari.password, 10);
      const account = await prisma.account.create({
        data: {
          email: safari.email,
          password: hashedPassword,
          accountType: "SAFARI" as AccountTypeEnum,
        },
      });

      await prisma.safari.create({
        data: {
          firstName: safari.firstName,
          lastName: safari.lastName,
          address: safari.address,
          description: safari.description,
          dp: safari.dp,
          accountId: account.userId,
        },
      });
      return { status: "success", message: "safari created", data: null };
    } catch (error) {
      logger.error(error);
      return {
        status: "error",
        message:
          error instanceof Error ? error.message : "Failed to create safari",
        data: null,
      };
    }
  },
  updateSafari: async (safari: SafariUpdationProps) => {
    try {
      console.log('updateSafari called with:', safari);
      console.log('Looking for Safari with accountId:', safari.accountId);
      
      // Check if Safari record exists
      const existingSafari = await prisma.safari.findUnique({
        where: { accountId: safari.accountId }
      });
      
      console.log('Existing Safari record:', existingSafari);
      
      if (!existingSafari) {
        console.log('Safari record not found, creating new one');
        // Create new Safari record if it doesn't exist
        await prisma.safari.create({
          data: {
            firstName: safari.firstName,
            lastName: safari.lastName,
            address: safari.address,
            description: safari.description,
            dp: safari.dp,
            accountId: safari.accountId,
          },
        });
        return { status: "success", message: "safari created", data: null };
      }
      
      // Update existing Safari record
      await prisma.safari.update({
        where: { accountId: safari.accountId },
        data: {
          firstName: safari.firstName,
          lastName: safari.lastName,
          address: safari.address,
          description: safari.description,
          dp: safari.dp,
        },
      });
      return { status: "success", message: "safari updated", data: null };
    } catch (error) {
      logger.error(error);
      return {
        status: "error",
        message:
          error instanceof Error ? error.message : "Failed to update safari",
        data: null,
      };
    }
  },
  createFair: async (fair: FairCreationProps) => {
    try {
      const hashedPassword = await hash(fair.password, 10);
      const account = await prisma.account.create({
        data: {
          email: fair.email,
          password: hashedPassword,
          accountType: "FAIRS" as AccountTypeEnum,
        },
      });

      await prisma.fair.create({
        data: {
          firstName: fair.firstName,
          lastName: fair.lastName,
          address: fair.address,
          description: fair.description,
          dp: fair.dp,
          accountId: account.userId,
        },
      });
      return { status: "success", message: "fair created", data: null };
    } catch (error) {
      logger.error(error);
      return {
        status: "error",
        message:
          error instanceof Error ? error.message : "Failed to create fair",
        data: null,
      };
    }
  },
  updateFair: async (fair: FairUpdationProps) => {
    try {
      await prisma.fair.upsert({
        where: { accountId: fair.accountId },
        update: {
          firstName: fair.firstName,
          lastName: fair.lastName,
          address: fair.address,
          description: fair.description,
          dp: fair.dp,
        },
        create: {
          firstName: fair.firstName,
          lastName: fair.lastName,
          address: fair.address,
          description: fair.description,
          dp: fair.dp,
          accountId: fair.accountId,
        },
      });
      return { status: "success", message: "fair updated", data: null };
    } catch (error) {
      logger.error(error);
      return {
        status: "error",
        message:
          error instanceof Error ? error.message : "Failed to update fair",
        data: null,
      };
    }
  },
  createShop: async (vendorData: ShopCreationProps) => {
    try {
      const hashedPassword = await hash(vendorData.password, 10);
      const account = await prisma.account.create({
        data: {
          email: vendorData.email,
          password: hashedPassword,
          accountType: "BUSINESS" as AccountTypeEnum,
        },
      });

      const shop = await prisma.shop.create({
        data: {
          businessName: vendorData.businessName,
          shopName: vendorData.shopName,
          vendorType: vendorData.vendorType,
          address: vendorData.address,
          city: vendorData.city,
          state: vendorData.state,
          country: vendorData.country,
          zipCode: vendorData.zipCode,
          ownerName: vendorData.ownerName,
          phoneNumber: vendorData.phoneNumber,
          website: vendorData.website,
          description: vendorData.description,
          productCategories: vendorData.productCategories,
          isGICertified: vendorData.isGICertified,
          isHandmade: vendorData.isHandmade,
          pickupOptions: vendorData.pickupOptions,
          deliveryTime: vendorData.deliveryTime,
          deliveryFee: vendorData.deliveryFee,
          pricingStructure: vendorData.pricingStructure,
          orderProcessing: vendorData.orderProcessing,
          paymentMethods: vendorData.paymentMethods,
          returnPolicy: vendorData.returnPolicy,
          stockAvailability: vendorData.stockAvailability,
          offersCustomization: vendorData.offersCustomization,
          packagingType: vendorData.packagingType,
          shopTiming: vendorData.shopTiming,
          workingDays: vendorData.workingDays,
          agreedToTerms: vendorData.agreedToTerms,
          agreedToBlacklist: vendorData.agreedToBlacklist,
          dp: vendorData.dp,
          accountId: account.userId,
        },
      });

      return {
        status: "success",
        message: "Vendor registration successful",
        data: {
          accountId: account.userId,
          shopId: shop.shopId,
          email: account.email,
        },
      };
    } catch (error) {
      logger.error(error);
      return {
        status: "error",
        message:
          error instanceof Error ? error.message : "Failed to register vendor",
        data: null,
      };
    }
  },
  updateShop: async (shop: ShopUpdationProps) => {
    try {
      // First check if shop exists
      const existingShop = await prisma.shop.findUnique({
        where: { accountId: shop.accountId },
      });

      if (!existingShop) {
        // Create a new shop record if it doesn't exist
        await prisma.shop.create({
          data: {
            businessName: shop.businessName,
            shopName: shop.shopName,
            vendorType: shop.vendorType,
            address: shop.address,
            city: shop.city,
            state: shop.state,
            country: shop.country,
            zipCode: shop.zipCode,
            ownerName: shop.ownerName,
            phoneNumber: shop.phoneNumber,
            email: "email@example.com", // Default email since it's required
            website: shop.website,
            description: shop.description,
            productCategories: shop.productCategories,
            isGICertified: shop.isGICertified,
            isHandmade: shop.isHandmade,
            pickupOptions: shop.pickupOptions,
            deliveryTime: shop.deliveryTime,
            deliveryFee: shop.deliveryFee,
            pricingStructure: shop.pricingStructure,
            orderProcessing: shop.orderProcessing,
            paymentMethods: shop.paymentMethods,
            returnPolicy: shop.returnPolicy,
            stockAvailability: shop.stockAvailability,
            offersCustomization: shop.offersCustomization,
            packagingType: shop.packagingType,
            shopTiming: shop.shopTiming,
            workingDays: shop.workingDays,
            dp: shop.dp,
            isActive: true,
            accountId: shop.accountId,
            agreedToTerms: shop.agreedToTerms ?? false,
            agreedToBlacklist: shop.agreedToBlacklist ?? false,
          },
        });
        return { status: "success", message: "shop profile created", data: null };
      } else {
        // Update existing shop record
        await prisma.shop.update({
          where: { accountId: shop.accountId },
          data: {
            businessName: shop.businessName,
            shopName: shop.shopName,
            vendorType: shop.vendorType,
            address: shop.address,
            city: shop.city,
            state: shop.state,
            country: shop.country,
            zipCode: shop.zipCode,
            ownerName: shop.ownerName,
            phoneNumber: shop.phoneNumber,
            website: shop.website,
            description: shop.description,
            productCategories: shop.productCategories,
            isGICertified: shop.isGICertified,
            isHandmade: shop.isHandmade,
            pickupOptions: shop.pickupOptions,
            deliveryTime: shop.deliveryTime,
            deliveryFee: shop.deliveryFee,
            pricingStructure: shop.pricingStructure,
            orderProcessing: shop.orderProcessing,
            paymentMethods: shop.paymentMethods,
            returnPolicy: shop.returnPolicy,
            stockAvailability: shop.stockAvailability,
            offersCustomization: shop.offersCustomization,
            packagingType: shop.packagingType,
            shopTiming: shop.shopTiming,
            workingDays: shop.workingDays,
            dp: shop.dp,
            ...(shop.agreedToTerms !== undefined && { agreedToTerms: shop.agreedToTerms }),
            ...(shop.agreedToBlacklist !== undefined && { agreedToBlacklist: shop.agreedToBlacklist }),
          },
        });
        return { status: "success", message: "shop updated", data: null };
      }
    } catch (error) {
      logger.error(error);
      return {
        status: "error",
        message:
          error instanceof Error ? error.message : "Failed to update shop",
        data: null,
      };
    }
  },
  createRestaurant: async (restaurant: RestaurantCreationProps) => {
    try {
      const hashedPassword = await hash(restaurant.password, 10);
      const account = await prisma.account.create({
        data: {
          email: restaurant.email,
          password: hashedPassword,
          accountType: "RESTAURANT" as AccountTypeEnum,
        },
      });
      await prisma.restaurant.create({
        data: {
          name: restaurant.name,
          description: restaurant.description,
          location: restaurant.location,
          cuisine: restaurant.cuisine,
          priceRange: restaurant.priceRange,
          image: restaurant.image,
          accountId: account.userId,
        },
      });

      return { status: "success", message: "restaurant created", data: null };
    } catch (error) {
      logger.error(error);
      return {
        status: "error",
        message:
          error instanceof Error
            ? error.message
            : "Failed to create restaurant",
        data: null,
      };
    }
  },
  updateRestaurant: async (restaurant: RestaurantUpdationProps) => {
    try {
      await prisma.restaurant.update({
        where: { restaurantId: restaurant.restaurantId },
        data: {
          name: restaurant.name,
          description: restaurant.description,
          location: restaurant.location,
          priceRange: restaurant.priceRange,
          image: restaurant.image,
        },
      });
      return { status: "success", message: "restaurant updated", data: null };
    } catch (error) {
      logger.error(error);
      return {
        status: "error",
        message:
          error instanceof Error
            ? error.message
            : "Failed to update restaurant",
        data: null,
      };
    }
  },
  createTravelPlaner: async (travelPlaner: TravelPlanerCreationProps) => {
    try {
      const hashedPassword = await hash(travelPlaner.password, 10);
      const account = await prisma.account.create({
        data: {
          email: travelPlaner.email,
          password: hashedPassword,
          accountType: "TRAVEL_PLANER" as AccountTypeEnum,
        },
      });
      await prisma.travelPlaner.create({
        data: {
          name: travelPlaner.name,
          description: travelPlaner.description,
          location: travelPlaner.location,
          priceRange: travelPlaner.priceRange,
          language: travelPlaner.language,
          speciality: travelPlaner.speciality,
          dp: travelPlaner.dp,
          accountId: account.userId,
        },
      });
      return {
        status: "success",
        message: "travel planer created",
        data: null,
      };
    } catch (error) {
      logger.error(error);
      return {
        status: "error",
        message:
          error instanceof Error
            ? error.message
            : "Failed to create travel planer",
        data: null,
      };
    }
  },
  updateTravelPlaner: async (travelPlaner: TravelPlanerUpdationProps) => {
    try {
      await prisma.travelPlaner.update({
        where: { accountId: travelPlaner.accountId },
        data: {
          name: travelPlaner.name,
          description: travelPlaner.description,
          location: travelPlaner.location,
          priceRange: travelPlaner.priceRange,
          language: travelPlaner.language,
          speciality: travelPlaner.speciality,
          dp: travelPlaner.dp,
        },
      });
      return {
        status: "success",
        message: "travel planer updated",
        data: null,
      };
    } catch (error) {
      logger.error(error);
      return {
        status: "error",
        message:
          error instanceof Error
            ? error.message
            : "Failed to update travel planer",
        data: null,
      };
    }
  },
  createHotel: async (hotel: HotelCreationProps) => {
    try {
      const hashedPassword = await hash(hotel.password, 10);
      const account = await prisma.account.create({
        data: {
          email: hotel.email,
          password: hashedPassword,
          accountType: "HOTEL" as AccountTypeEnum,
        },
      });

      await prisma.hotel.create({
        data: {
          name: hotel.hotelName,
          address: hotel.address,
          description: hotel.description,
          firstName: hotel.firstName,
          lastName: hotel.lastName,
          email: hotel.email,
          phone: hotel.phone,
          longitude: hotel.longitude ,
          latitude: hotel.latitude,
          checkIn: hotel.checkIn,
          checkOut: hotel.checkOut,
          accountId: account.userId,
        },
      });

      return {
        status: "success",
        message: "Hotel created successfully",
        data: null,
      };
    } catch (error) {
      logger.error(error);
      return {
        status: "error",
        message:
          error instanceof Error ? error.message : "Failed to create hotel",
        data: null,
      };
    }
  },
  createLanguageService: async (data: LanguageServiceCreationProps) => {
    try {
      const hashedPassword = await hash(data.password, 10);
      const account = await prisma.account.create({
        data: {
          email: data.email,
          password: hashedPassword,
          accountType: "LANGUAGE" as AccountTypeEnum,
        },
      });
      await prisma.languageService.create({
        data: {
          profileName: data.profileName,
          firstName: data.firstName,
          lastName: data.lastName,
          description: data.description,
          experience: data.experience,
          languages: data.languages,
          specialization: data.specialization,
          hourlyRate: data.hourlyRate,
          minBookingHours: data.minBookingHours,
          maxBookingHours: data.maxBookingHours,
          availability: data.availability,
          startTime: data.startTime,
          endTime: data.endTime,
          location: data.location,
          serviceMode: data.serviceMode,
          certification: data.certification,
          qualification: data.qualification,
          profileImage: data.profileImage,
          portfolio: data.portfolio,
          accountId: account.userId,
        },
      });

      return {
        status: "success",
        message: "Language service created successfully",
        data: null,
      };
    } catch (error) {
      logger.error(error);
      throw new Error("Failed to create language service");
    }
  },
  updateLanguageService: async (data: LanguageServiceUpdateProps) => {
    try {
      const { languageServiceId, ...updateData } = data;

      const languageService = await prisma.languageService.update({
        where: {
          languageServiceId: languageServiceId,
        },
        data: updateData,
      });

      return {
        status: "success",
        message: "Language service updated successfully",
        data: languageService,
      };
    } catch (error) {
      logger.error(error);
      throw new Error("Failed to update language service");
    }
  },
  createEcoTransit: async (ecoTransit: EcoTransitCreationProps) => {
    try {
      const existingAccount = await prisma.account.findUnique({
        where: { email: ecoTransit.email },
      });
      if (existingAccount) {
        return {
          status: "error",
          message: "An account with this email already exists. Please use a different email or log in with your existing account.",
          data: null,
        };
      }

      const hashedPassword = await hash(ecoTransit.password, 10);

      const account = await prisma.account.create({
        data: {
          email: ecoTransit.email,
          password: hashedPassword,
          accountType: "ECO_TRANSIT" as AccountTypeEnum,
        },
      });

      const newEcoTransit = await prisma.ecoTransit.create({
        data: {
          name: ecoTransit.name,
          address: ecoTransit.address,
          description: ecoTransit.description,
          dp: ecoTransit.dp || "/placeholder.png",
          accountId: account.userId,
        },
      });

      return {
        status: "success",
        message: "eco transit created",
        data: null,
      };
    } catch (error: any) {
      logger.error(error);
      
      // Handle enum error (ECO_TRANSIT not in database enum)
      if (error?.message?.includes("invalid input value for enum") || error?.message?.includes("ECO_TRANSIT")) {
        return {
          status: "error",
          message: "Database migration required: ECO_TRANSIT account type is not available. Please contact the administrator.",
          data: null,
        };
      }
      
      // Handle table not existing
      if (error?.code === "P2021" || error?.meta?.table === "public.EcoTransit") {
        return {
          status: "error",
          message: "Database migration required: EcoTransit table does not exist. Please run database migrations.",
          data: null,
        };
      }
      
      // Handle Prisma unique constraint errors
      if (error?.code === "P2002") {
        return {
          status: "error",
          message: "An account with this email already exists. Please use a different email or log in with your existing account.",
          data: null,
        };
      }
      
      return {
        status: "error",
        message: error instanceof Error ? error.message : "Failed to create eco transit",
        data: null,
      };
    }
  },
  updateEcoTransit: async (ecoTransit: EcoTransitUpdationProps) => {
    try {
      await prisma.ecoTransit.update({
        where: { accountId: ecoTransit.accountId },
        data: {
          name: ecoTransit.name,
          address: ecoTransit.address,
          description: ecoTransit.description,
          dp: ecoTransit.dp,
        },
      });

      return {
        status: "success",
        message: "eco transit updated",
        data: null,
      };
    } catch (error) {
      logger.error(error);
      throw new Error("Failed to update eco transit");
    }
  },
};
