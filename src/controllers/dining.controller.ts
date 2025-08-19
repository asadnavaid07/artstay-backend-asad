import { Request, Response } from "express";
import { diningService } from "~/services/dining.service";
import { logger } from "~/utils/logger";

export const getAllRestaurantsPagination = async (
  req: Request,
  res: Response
) => {
  try {
    const result = await diningService.getAllRestaurantsPagination(req);
    res.status(201).json(result);
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      status: "error",
      message:
        error instanceof Error ? error.message : "Failed to fetch all dinings",
      data: null,
    });
  }
};

export const getAllRestaurants = async (req: Request, res: Response) => {
  try {
    const result = await diningService.getAllRestaurants();
    res.status(201).json(result);
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      status: "error",
      message:
        error instanceof Error ? error.message : "Failed to fetch all dinings",
      data: null,
    });
  }
};

export const restaurantDetailByAccountId = async (
  req: Request,
  res: Response
) => {
  try {
    const { accountId } = req.params;
    const result = await diningService.getRestaurantByAccountId(accountId);
    res.status(201).json(result);
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      status: "error",
      message:
        error instanceof Error
          ? error.message
          : "Failed to fetch restaurants details",
      data: null,
    });
  }
};

export const restaurantDetailByRestaurantId = async (
  req: Request,
  res: Response
) => {
  try {
    const { restaurantId } = req.params;
    const result = await diningService.getRestaurantById(restaurantId);
    res.status(201).json(result);
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      status: "error",
      message:
        error instanceof Error
          ? error.message
          : "Failed to fetch restaurant details",
      data: null,
    });
  }
};

export const getMenuItemsByRestaurant = async (req: Request, res: Response) => {
  try {
    const { accountId } = req.params;
    const result = await diningService.getMenuItems(accountId);
    res.status(201).json(result);
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      status: "error",
      message:
        error instanceof Error ? error.message : "Failed to fetch menu items",
      data: null,
    });
  }
};

export const createMenuItem = async (req: Request, res: Response) => {
  try {
    const { menuItem } = req.body;
    const result = await diningService.createMenuItem(menuItem);
    res.status(201).json(result);
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      status: "error",
      message:
        error instanceof Error ? error.message : "Failed to create menu item",
      data: null,
    });
  }
};

export const updateMenuItem = async (req: Request, res: Response) => {
  try {
    const { menuItemId } = req.params;
    const { menuItem } = req.body;
    const result = await diningService.updateMenuItem(menuItemId, menuItem);
    res.status(201).json(result);
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      status: "error",
      message:
        error instanceof Error ? error.message : "Failed to update menu item",
      data: null,
    });
  }
};

export const getAllRestaurantsFilters = async (req: Request, res: Response) => {
  try {
    const result = await diningService.getDiningFilterOptions();
    res.status(201).json(result);
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      status: "error",
      message:
        error instanceof Error ? error.message : "Failed to fetch all dinings",
      data: null,
    });
  }
};

export const diningApplicationStatus = async (req: Request, res: Response) => {
  try {
    const { accountId } = req.params;
    const result = await diningService.getApplicationStatus(accountId);
    res.status(201).json(result);
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      status: "error",
      message:
        error instanceof Error
          ? error.message
          : "Failed to fetched application status",
      data: null,
    });
  }
};

export const createRestaurantBooking = async (req: Request, res: Response) => {
  try {
    const result = await diningService.createRestaurantBooking(req);
    res.status(201).json(result);
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      status: "error",
      message:
        error instanceof Error
          ? error.message
          : "Failed to fetched application status",
      data: null,
    });
  }
};

export const updateDiningStatus = async (req: Request, res: Response) => {
  try {
    const result = await diningService.toggleStatus(req);
    res.status(200).json(result);
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      status: "error",
      message: error instanceof Error ? error.message : "Failed to update dining status",
      data: null,
    });
  }
};

export const getAllRestaurantBookings = async (req: Request, res: Response) => {
  try {

    // Get all bookings from service for client-side processing
    const result = await diningService.getAllRestaurantBookings(req.params.accountId);
    
    res.status(200).json(result);
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      status: "error",
      message: error instanceof Error ? error.message : "Failed to fetch restaurant bookings",
      data: null,
    });
  }
};

export const findTraditionalDiningVoyage = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const result = await diningService.findTraditionalDiningVoyage(payload);
    if (result.status === "error") {
       res.status(400).json(result);
       return;
    }
    res.status(200).json(result);
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      status: "error",
      message: error instanceof Error ? error.message : "Failed to search traditional dining voyage",
      data: null,
    });
  }
};