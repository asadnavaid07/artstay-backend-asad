import { Request, Response } from "express";
import prisma from "~/libs/prisma";
import { artisanService } from "~/services/artisan.service";
import { logger } from "~/utils/logger";

export const artisanApplicationStatus = async (req: Request, res: Response) => {
  try {
    const { accountId } = req.params;
    const result = await artisanService.getApplicationStatus(accountId);
    res.status(201).json(result);
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      status: "error",
      message:
        error instanceof Error
          ? error.message
          : "Failed to fetch application status",
      data: null,
    });
  }
};

export const artisanDetailByAccountId = async (req: Request, res: Response) => {
  try {
    const { accountId } = req.params;
    const artisan: ArtisanDetailProps | null = await prisma.artisan.findUnique({
      where: {
        accountId: accountId,
      },
      include: {
        craft: true,
        subCraft: true,
      },
    });

    res
      .status(201)
      .json({ status: "success", message: "artisan details", data: artisan });
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      status: "error",
      message:
        error instanceof Error
          ? error.message
          : "Failed to fetch artisan details",
      data: null,
    });
  }
};

export const artisanDetailByArtisanId = async (req: Request, res: Response) => {
  try {
    const { artisanId } = req.params;
    const artisan: ArtisanPortolioProps | null =
      await prisma.artisan.findUnique({
        where: {
          artisanId: artisanId,
        },
        include: {
          craft: true,
          subCraft: true,
          Portfolio: true,
          ArtisanPackage: true,
        },
      });
    res
      .status(201)
      .json({ status: "success", message: "artisan details", data: artisan });
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      status: "error",
      message:
        error instanceof Error
          ? error.message
          : "Failed to fetch artisan details",
      data: null,
    });
  }
};

export const getAllArtisansPagination = async (req: Request, res: Response) => {
  try {
    const result = await artisanService.getAllArtisansPagination(req);

    res.status(201).json(result);
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      status: "error",
      message:
        error instanceof Error ? error.message : "Failed to fetch all artisans",
      data: null,
    });
  }
};

export const getAllArtisans = async (req: Request, res: Response) => {
  try {
    const artisans: ArtisanDetailProps[] = await prisma.artisan.findMany({
      include: {
        craft: true,
        subCraft: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(201).json({
      status: "success",
      message: "all artisan",
      data: artisans,
    });
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      status: "error",
      message:
        error instanceof Error ? error.message : "Failed to fetch all artisans",
      data: null,
    });
  }
};

export const updateArtisanStatus = async (req: Request, res: Response) => {
  try {
    const result = await artisanService.toggleStatus(req);
    res.status(201).json(result);
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      status: "error",
      message:
        error instanceof Error
          ? error.message
          : "Failed to fetch application status",
      data: null,
    });
  }
};

export const getPortfolioByArtisanId = async (req: Request, res: Response) => {
  try {
    const result = await artisanService.getPortfolioByArtisanId(req);
    res.status(201).json(result);
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      status: "error",
      message:
        error instanceof Error ? error.message : "Failed to fetch all artisans",
      data: null,
    });
  }
};

export const getPortfolioByAccountId = async (req: Request, res: Response) => {
  try {
    const result = await artisanService.getPortfolioByAccountId(req);
    res.status(201).json(result);
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      status: "error",
      message:
        error instanceof Error ? error.message : "Failed to fetch all artisans",
      data: null,
    });
  }
};

export const updatePortfolioArtisanId = async (req: Request, res: Response) => {
  try {
    const result = await artisanService.updateProtfolio(req);
    res.status(201).json(result);
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      status: "error",
      message:
        error instanceof Error ? error.message : "Failed to fetch all artisans",
      data: null,
    });
  }
};

export const artisanBooking = async (req: Request, res: Response) => {
  try {
    const result = await artisanService.createArtisanBooking(req);
    res.status(201).json(result);
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      status: "error",
      message:
        error instanceof Error ? error.message : "Failed to fetch all artisans",
      data: null,
    });
  }
};

export const getAllArtisanBookings = async (req: Request, res: Response) => {
  try {
    const result = await artisanService.getAllArtisanBookings(req.params.accountId);
    res.status(200).json(result);
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      status: "error",
      message: error instanceof Error ? error.message : "Failed to fetch artisan bookings",
      data: null,
    });
  }
};

export const findArtisanByCraft = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const result = await artisanService.findArtisanByCraft(payload);
    if (result.status === "error") {
      res.status(400).json(result);
      return;
    }
    res.status(200).json(result);
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      status: "error",
      message: error instanceof Error ? error.message : "Failed to search artisan craft",
      data: null
    });
  }
};

export const findNearbyArtisan = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const result = await artisanService.findNearbyArtisan(payload);
    if (result.status === "error") {
      res.status(400).json(result);
      return;
    }
    res.status(200).json(result);
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      status: "error",
      message: error instanceof Error ? error.message : "Failed to search artisan craft",
      data: null,
    });
  }
};

export const findTraditionalTour = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const result = await artisanService.findTraditionalTour(payload);
    if (result.status === "error") {
      res.status(400).json(result);
      return;
    }
    res.status(200).json(result);
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      status: "error",
      message: error instanceof Error ? error.message : "Failed to search traditional tour",
      data: null,
    });
  }
};

export const findSustainableLivingTour = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const result = await artisanService.findSustainableLivingTour(payload);
    if (result.status === "error") {
      res.status(400).json(result);
      return;
    }
    res.status(200).json(result);
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      status: "error",
      message: error instanceof Error ? error.message : "Failed to search sustainable living tour",
      data: null,
    });
  }
};
