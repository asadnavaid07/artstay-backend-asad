import { Request, Response } from 'express';
import { travelService } from '~/services/travel.service';
import { logger } from '~/utils/logger';

export const getTravelProfileByAccountId = async (req: Request, res: Response) => {
    try {
        const { accountId } = req.params
        const result = await travelService.getTravelProfileByAccountId(accountId)
        res.status(201).json(result);
    } catch (error) {
        logger.error(error)
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Failed to fetch travel profile',
            data: null
        });
    }
}

export const getTravelProfileDetailById = async (req: Request, res: Response) => {
    try {
        const { travelPlannerId } = req.params
        const result = await travelService.getTravelProfileDetailById(travelPlannerId)
        res.status(201).json(result);
    } catch (error) {
        logger.error(error)
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Failed to fetch travel profile',
            data: null
        });
    }
}

export const createTravelTour = async (req: Request, res: Response) => {
    try {
        const travelTour = req.body
        const result = await travelService.createTravelTour(travelTour)
        res.status(201).json(result);
    } catch (error) {
        logger.error(error)
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Failed to create travel tour',
            data: null
        });
    }
}

export const updateTravelTour = async (req: Request, res: Response) => {
    try {
        const travelTour = req.body
        const result = await travelService.updateTravelTour(travelTour)
        res.status(201).json(result);
    } catch (error) {
        logger.error(error)
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Failed to update travel tour',
            data: null
        });
    }
}

export const getTravelTours = async (req: Request, res: Response) => {
    try {
        const { accountId } = req.params
        const result = await travelService.getTravelTours(accountId)
        res.status(201).json(result);
    } catch (error) {
        logger.error(error)
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Failed to get travel tours',
            data: null
        });
    }
}

export const getTravelTourById = async (req: Request, res: Response) => {
    try {
        const { tourId } = req.params
        const result = await travelService.getTravelTourById(tourId)
        res.status(201).json(result);
    } catch (error) {
        logger.error(error)
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Failed to get travel tour',
            data: null
        });
    }
}

export const getAllTravelPlanersPagination = async (req: Request, res: Response) => {
    try {
        const result = await travelService.getAllTravelPlanersPagination(req)
        res.status(201).json(result);
    } catch (error) {
        logger.error(error)
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Failed to fetch all travel planers',
            data: null
        });
    }
}

export const getAllTravelPlaners = async (req: Request, res: Response) => {
    try {
        const result = await travelService.getAllTravelPlaners()
        res.status(201).json(result);
    } catch (error) {
        logger.error(error)
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Failed to fetch all travel planers',
            data: null
        });
    }
}

export const updateTravelStatus = async (req: Request, res: Response) => {
    try {
        const result = await travelService.toggleStatus(req)
        res.status(201).json(result);
    } catch (error) {
        logger.error(error)
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Failed to fetch application status',
            data: null
        });
    }
}


export const getAllTravelPlannerFilters = async (req: Request, res: Response) => {
    try {
        const result = await travelService.getTravelPlannerFilterOptions()
        res.status(201).json(result);
    } catch (error) {
        logger.error(error)
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Failed to fetch application status',
            data: null
        });
    }
}

export const travelApplicationStatus = async (req: Request, res: Response) => {
  try {
    const { accountId } = req.params;
    const result = await travelService.getApplicationStatus(accountId);
    res.status(201).json(result);
  } catch (error) {
    logger.error(error);
    throw new Error("fair applcaition status error");
  }
};

export const findKashmirOdyssey = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const result = await travelService.findKashmirOdyssey(payload);
    if (result.status === "error") {
       res.status(400).json(result);
       return;
    }
    res.status(200).json(result);
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      status: "error",
      message: error instanceof Error ? error.message : "Failed to search Kashmir Odyssey",
      data: null,
    });
  }
};