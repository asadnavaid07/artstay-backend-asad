import { Request, Response } from 'express';
import { ecoTransitService } from '~/services/eco-transit.service';
import { logger } from '~/utils/logger';

export const createEcoTransit = async (req: Request, res: Response) => {
    try {
        const result = await ecoTransitService.createEcoTransit(req.body);
        res.status(201).json(result);
    } catch (error) {
        logger.error(error);
        res.status(500).json({ status: 'error', message: error instanceof Error ? error.message : 'Failed to create eco transit', data: null });
    }
};

export const getEcoTransitDetail = async (req: Request, res: Response) => {
    try {
        const result = await ecoTransitService.getEcoTransitDetail(req.params.transitId);
        res.status(200).json(result);
    } catch (error) {
        logger.error(error);
        res.status(500).json({ status: 'error', message: error instanceof Error ? error.message : 'Failed to fetch eco transit detail', data: null });
    }
};

export const createEcoTransitOption = async (req: Request, res: Response) => {
    try {
        const result = await ecoTransitService.createEcoTransitOption(req.body);
        res.status(201).json(result);
    } catch (error) {
        logger.error(error);
        res.status(500).json({ status: 'error', message: error instanceof Error ? error.message : 'Failed to create eco transit option', data: null });
    }
};

export const getEcoTransitOptions = async (req: Request, res: Response) => {
    try {
        const result = await ecoTransitService.getEcoTransitOptions(req.params.transitId);
        res.status(200).json(result);
    } catch (error) {
        logger.error(error);
        res.status(500).json({ status: 'error', message: error instanceof Error ? error.message : 'Failed to fetch eco transit options', data: null });
    }
};

export const createEcoTransitBooking = async (req: Request, res: Response) => {
    try {
        // expects: { optionId, transitId, bookingDetailId, travelDate, numberOfPassengers, distance }
        const result = await ecoTransitService.createEcoTransitBooking(req.body);
        res.status(201).json(result);
    } catch (error) {
        logger.error(error);
        res.status(500).json({ status: 'error', message: error instanceof Error ? error.message : 'Failed to create eco transit booking', data: null });
    }
};

export const getEcoTransitBookings = async (req: Request, res: Response) => {
    try {
        const result = await ecoTransitService.getEcoTransitBookings(req.params.transitId);
        res.status(200).json(result);
    } catch (error) {
        logger.error(error);
        res.status(500).json({ status: 'error', message: error instanceof Error ? error.message : 'Failed to fetch eco transit bookings', data: null });
    }
};

export const getAllEcoTransits = async (req: Request, res: Response) => {
    try {
        logger.info('getAllEcoTransits endpoint called');
        const result = await ecoTransitService.getAllEcoTransits();
        logger.info('getAllEcoTransits result:', JSON.stringify(result, null, 2));
        res.status(200).json(result);
    } catch (error) {
        logger.error('Error in getAllEcoTransits:', error);
        res.status(500).json({ status: 'error', message: error instanceof Error ? error.message : 'Failed to fetch eco transits', data: null });
    }
};

export const getApplicationStatus = async (req: Request, res: Response) => {
    try {
        const result = await ecoTransitService.getApplicationStatus(req.params.accountId);
        
        // If the service returns an error status, respond with appropriate status code
        if (result.status === "error") {
            res.status(500).json(result);
            return;
        }
        
        res.status(200).json(result);
    } catch (error) {
        logger.error(error);
        res.status(500).json({ 
            status: 'error', 
            message: error instanceof Error ? error.message : 'Failed to fetch application status', 
            data: null 
        });
    }
};

export const getEcoTransitFilters = async (req: Request, res: Response) => {
  try {
    const result = await ecoTransitService.getEcoTransitFilters();
    res.status(200).json(result);
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      status: "error",
      message: error instanceof Error ? error.message : "Failed to fetch eco transit filters",
      data: null,
    });
  }
};

export const findEcoTransitAdventure = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const result = await ecoTransitService.findEcoTransitAdventure(payload);
    if (result.status === "error") {
       res.status(400).json(result);
       return;
    }
    res.status(200).json(result);
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      status: "error",
      message: error instanceof Error ? error.message : "Failed to search eco transit adventure",
      data: null,
    });
  }
};