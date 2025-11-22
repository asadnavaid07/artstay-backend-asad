import { Request, Response } from 'express';
import { fairService } from '~/services/fair.service';
import { logger } from '~/utils/logger';

export const fairProfileByAccountId = async (req: Request, res: Response) => {
    try {
        const { accountId } = req.params
        const result = await fairService.getFairProfileByAccountId(accountId)
        res.status(201).json(result);
    } catch (error) {
        logger.error(error)
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Failed to fetch fair details',
            data: null
        });
    }
}

export const createFairEvent = async (req: Request, res: Response): Promise<void> => {
    try {
        const event = req.body;
        
        if (!event.accountId) {
            res.status(400).json({ 
                status: 'error', 
                message: 'accountId is required in request body' 
            });
            return;
        }
        
        const result = await fairService.createFairEvent(event);
        
        if (result.status === 'error') {
            res.status(400).json({ status: 'error', errors: [result.message] });
            return;
        }
        
        res.status(201).json(result);
        return;
    } catch (error) {
        logger.error(error);
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Failed to create fair event',
            data: null
        });
        return;
    }
}

export const updateFairEvent = async (req: Request, res: Response): Promise<void> => {
    try {
        const event = req.body
        const result = await fairService.updateFairEvent(event)
        res.status(201).json(result);
        return;
    } catch (error) {
        logger.error(error)
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Failed to update fair event',
            data: null
        });
        return;
    }
}

export const getFairEvents = async (req: Request, res: Response) => {
    try {
        const { accountId } = req.params
        const result = await fairService.getFairEvents(accountId)
        res.status(201).json(result);
    } catch (error) {
        logger.error(error)
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Failed to fetch events',
            data: null
        });
    }
}

export const getEventById = async (req: Request, res: Response) => {
    try {
        const { eventId } = req.params
        const result = await fairService.getEventById(eventId)
        res.status(201).json(result);
    } catch (error) {
        logger.error(error)
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Failed to fetch event',
            data: null
        });
    }
}

export const fairApplicationStatus = async (req: Request, res: Response) => {
  try {
    const { accountId } = req.params;
    const result = await fairService.getApplicationStatus(accountId);
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

export const getAllFairs = async (req: Request, res: Response) => {
    try {
        const result = await fairService.getAllFairs()
        res.status(201).json(result);
    } catch (error) {
        logger.error(error)
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Failed to fetch all fairs',
            data: null
        });
    }
}

export const updateFairStatus = async (req: Request, res: Response) => {
    try {
        const result = await fairService.toggleStatus(req)
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


export const getAllFairsPagination = async (req: Request, res: Response) => {
    try {
        const result = await fairService.getAllFairsPagination(req)
        res.status(201).json(result);
    } catch (error) {
        logger.error(error)
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Failed to fetch all fairs',
            data: null
        });
    }
}

export const fairDetailById = async (req: Request, res: Response) => {
    try {
        const { fairId } = req.params
        const result = await fairService.getFairDetailById(fairId)
        res.status(201).json(result);
    } catch (error) {
        logger.error(error)
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Failed to fetch fair details',
            data: null
        });
    }
}

export const createFairBooking = async (req: Request, res: Response) => {
    try {
        const result = await fairService.createFairBooking(req.body)
        res.status(201).json(result);
    } catch (error) {
        logger.error(error)
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Failed to fetch fair details',
            data: null
        });
    }
}

export const toggleFairStatus = async (req: Request, res: Response) => {
  try {
    const result = await fairService.toggleStatus(req);
    res.status(201).json(result);
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      status: "error",
      message:
        error instanceof Error
          ? error.message
          : "Failed to update travel planer",
      data: null,
    });
  }
};

export const getAllFairBookings = async (req: Request, res: Response) => {
  try {
    const result = await fairService.getAllFairBookings(req.params.accountId);
    
    res.status(200).json(result);
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      status: "error",
      message: error instanceof Error ? error.message : "Failed to fetch fair bookings",
      data: null,
    });
  }
};

export const findFairByCriteria = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const result = await fairService.findFairByCriteria(payload);
    if (result.status === "error") {
      res.status(400).json(result);
      return;
    }
    res.status(200).json(result);
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      status: "error",
      message: error instanceof Error ? error.message : "Failed to search fair",
      data: null,
    });
  }
};