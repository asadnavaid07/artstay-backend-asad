import prisma from "~/libs/prisma";
import { logger } from "~/utils/logger";

export const languageService = {

  getApplicationStatus: async (accountId: string) => {
    try {
      const application = await prisma.languageService.findUnique({
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
  deleteLanguageService: async (languageServiceId: string) => {
    try {
      await prisma.languageService.delete({
        where: {
          languageServiceId: languageServiceId,
        },
      });

      return {
        status: "success",
        message: "Language service deleted successfully",
        data: null,
      };
    } catch (error) {
      logger.error(error);
      throw new Error("Failed to delete language service");
    }
  },

  getLanguageServiceById: async (languageServiceId: string) => {
    try {
      const languageService = await prisma.languageService.findUnique({
        where: {
          languageServiceId: languageServiceId,
        },
      });

      if (!languageService) {
        throw new Error("Language service not found");
      }

      return {
        status: "success",
        message: "Language service fetched successfully",
        data: languageService,
      };
    } catch (error) {
      logger.error(error);
      throw new Error("Failed to fetch language service");
    }
  },

  getAllLanguageServices: async () => {
    try {
      const languageServices = await prisma.languageService.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });

      return {
        status: "success",
        message: "All language services fetched successfully",
        data: languageServices,
      };
    } catch (error) {
      logger.error(error);
      throw new Error("Failed to fetch language services");
    }
  },

  getLanguageServiceFilters: async () => {
    try {
      const languageServices = await prisma.languageService.findMany({
        where: {
          isActive: true,
        },
        select: {
          languages: true,
          specialization: true,
          location: true,
          serviceMode: true,
          hourlyRate: true,
        },
      });

      // Extract unique languages
      const allLanguages = new Set();
      languageServices.forEach((service) => {
        service.languages.forEach((lang) => {
          allLanguages.add(lang);
        });
      });

      // Extract unique specializations
      const allSpecializations = new Set();
      languageServices.forEach((service) => {
        service.specialization.forEach((spec) => {
          allSpecializations.add(spec);
        });
      });

      // Extract unique locations
      const locations = [
        ...new Set(languageServices.map((service) => service.location)),
      ].filter((location) => location && location !== "none");

      // Extract unique service modes
      const allServiceModes = new Set();
      languageServices.forEach((service) => {
        service.serviceMode.forEach((mode) => {
          allServiceModes.add(mode);
        });
      });

      // Create price ranges based on hourly rates
      const rates = languageServices.map((service) => service.hourlyRate);
      const minRate = Math.min(...rates);
      const maxRate = Math.max(...rates);

      const priceRanges = [];
      if (minRate < 50) priceRanges.push("Under $50/hr");
      if (rates.some((rate) => rate >= 50 && rate < 100))
        priceRanges.push("$50-$100/hr");
      if (rates.some((rate) => rate >= 100 && rate < 200))
        priceRanges.push("$100-$200/hr");
      if (maxRate >= 200) priceRanges.push("$200+/hr");

      return {
        status: "success",
        message: "Language service filters fetched successfully",
        data: {
          languages: Array.from(allLanguages).sort(),
          specializations: Array.from(allSpecializations).sort(),
          locations: locations.sort(),
          serviceModes: Array.from(allServiceModes).sort(),
          priceRanges: priceRanges,
        },
      };
    } catch (error) {
      logger.error(error);
      throw new Error("Failed to fetch language service filters");
    }
  },

  toggleLanguageServiceStatus: async (
    languageServiceId: string,
    status: boolean
  ) => {
    try {
      await prisma.languageService.update({
        where: {
          languageServiceId: languageServiceId,
        },
        data: {
          isActive: status,
        },
      });

      return {
        status: "success",
        message: "Language service status updated successfully",
        data: null,
      };
    } catch (error) {
      logger.error(error);
      throw new Error("Failed to update language service status");
    }
  },
  createBooking: async (bookingData: LanguageServiceBookingInput) => {
    try {
      // First create the booking detail
      const bookingDetail = await prisma.bookingDetail.create({
        data: {
          firstName: bookingData.firstName,
          lastName: bookingData.lastName,
          email: bookingData.email,
          phone: bookingData.phone,
          additionalNote: bookingData.additionalNote,
        }
      })
  
      // Then create the language service booking
      const languageBooking = await prisma.languageServiceBooking.create({
        data: {
          bookingDate: bookingData.bookingDate,
          bookingTime: bookingData.bookingTime,
          hours: bookingData.hours,
          sourceLanguage: bookingData.sourceLanguage,
          targetLanguage: bookingData.targetLanguage,
          totalAmount: bookingData.totalAmount,
          languageServiceId: bookingData.languageServiceId,
          bookingDetailId: bookingDetail.bookingDetailId,
          status: "new"
        }
      })
  
      return {
        status: 'success',
        message: 'Language service booking created successfully',
        data: {
          bookingId: languageBooking.languageBookingId,
          bookingDetailId: bookingDetail.bookingDetailId
        }
      }
    } catch (error) {
      logger.error(error)
      throw new Error('Failed to create language service booking')
    }
  },
  findLanguageExploration: async (payload: {
    serviceType?: string;
    languages?: string[];
    date?: string;
    duration?: string;
    contactMethod?: string;
  }) => {
    try {
      // Assuming 'specialization' is used for serviceType, 'languages' for language match, 'availability' for date, 'serviceMode' for contactMethod
      const services = await prisma.languageService.findMany({
        where: {
          ...(payload.serviceType && { specialization: { has: payload.serviceType } }),
          ...(payload.languages && payload.languages.length > 0 && { languages: { hasSome: payload.languages } }),
          ...(payload.contactMethod && { serviceMode: { has: payload.contactMethod } }),
        },
      });

      if (!services || services.length === 0) {
        return { status: "error", message: "No Language service found", data: null };
      }

      return {
        status: "success",
        message: "Language exploration service found",
        data: services,
      };
    } catch (error) {
      logger.error(error);
      return {
        status: "error",
        message: error instanceof Error ? error.message : "Failed to search language exploration",
        data: null,
      };
    }
  },
};
