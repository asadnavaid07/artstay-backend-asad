import { Request, Response } from 'express';
import { safariService } from '~/services/safari.service';
import { logger } from '~/utils/logger';

export const getApplicationStatus = async (req: Request, res: Response) => {
    try {
        const result = await safariService.getApplicationStatus(req.params.accountId)
        res.status(200).json(result);
    } catch (error) {
        logger.error(error)
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Failed to fetch application status',
            data: null
        });
    }
}

export const updateSafariStatus = async (req: Request, res: Response) => {
    try {
        const result = await safariService.toggleStatus(req)
        res.status(200).json(result);
    } catch (error) {
        logger.error(error)
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Failed to update safari status',
            data: null
        });
    }
}

export const safariDetailByAccountId = async (req: Request, res: Response) => {
    try {
        const result = await safariService.safariDetailByAccountId(req.params.accountId)
        res.status(200).json(result);
    } catch (error) {
        logger.error(error)
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Failed to fetch safari details',
            data: null
        });
    }
}

export const createSafariTour = async (req: Request, res: Response) => {
    try {
        const result = await safariService.createSafariTour(req.body)
        res.status(201).json(result);
    } catch (error) {
        logger.error(error)
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Failed to create safari tour',
            data: null
        });
    }
}

export const getSafariTours = async (req: Request, res: Response) => {
    try {
        const result = await safariService.getSafariTours(req.params.accountId)
        res.status(200).json(result);
    } catch (error) {
        logger.error(error)
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Failed to fetch tours',
            data: null
        });
    }
}

export const getTourById = async (req: Request, res: Response) => {
    try {
        const result = await safariService.getTourById(req.params.tourId)
        res.status(200).json(result);
    } catch (error) {
        logger.error(error)
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Failed to fetch tour',
            data: null
        });
    }
}

export const getAllSafaris = async (req: Request, res: Response) => {
    try {
       const result = await safariService.getAllSafaris()
        res.status(200).json(result);
    } catch (error) {
        logger.error(error)
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Failed to fetch all safaris',
            data: null
        });
    }
}

export const getAllSafarisPagination = async (req: Request, res: Response) => {
    try {
       const result = await safariService.getAllSafarisPagination(req)
        res.status(200).json(result);
    } catch (error) {
        logger.error(error)
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Failed to fetch all safaris',
            data: null
        });
    }
}

export const safariDetailById = async (req: Request, res: Response) => {
    try {
        const result = await safariService.safariDetailById(req.params.safariId)
        res.status(200).json(result);
    } catch (error) {
        logger.error(error)
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Failed to fetch safari details',
            data: null
        });
    }
}

export const createSafariBooking = async (req: Request, res: Response) => {
    try {
        const result = await safariService.createSafariBooking(req.body)
        res.status(201).json(result);
    } catch (error) {
        logger.error(error)
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Failed to create safari booking',
            data: null
        });
    }
}

export const getSafariBookingById = async (req: Request, res: Response) => {
    try {
        const result = await safariService.getSafariBookingById(req.params.bookingId)
        res.status(200).json(result);
    } catch (error) {
        logger.error(error)
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Failed to fetch booking',
            data: null
        });
    }
}

// export const getAllSafariBookings = async (req: Request, res: Response) => {
//     try {
//         const { safariId } = req.query
//         const result = await safariService.getAllSafariBookings(safariId as string)
//         res.status(200).json(result);
//     } catch (error) {
//         logger.error(error)
//         res.status(500).json({
//             status: 'error',
//             message: error instanceof Error ? error.message : 'Failed to fetch bookings',
//             data: null
//         });
//     }
// }

export const updateBookingStatus = async (req: Request, res: Response) => {
    try {
        const { bookingId } = req.params
        const { status } = req.body
        const result = await safariService.updateBookingStatus(bookingId, status)
        res.status(200).json(result);
    } catch (error) {
        logger.error(error)
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Failed to update booking status',
            data: null
        });
    }
}

export const getAllSafariBookings = async (req: Request, res: Response) => {
  try {
    const result = await safariService.getAllSafariBookings(req.params.accountId);
    
    res.status(200).json(result);
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      status: "error",
      message: error instanceof Error ? error.message : "Failed to fetch safari bookings",
      data: null,
    });
  }
};

export const findSafariByDestinations = async (req: Request, res: Response) : Promise<void> =>  {
  try {
    const payload = req.body;
    const result = await safariService.findSafariByDestinations(payload);
    if (result.status === "error") {
      res.status(404).json(result);
      return;
    }
    res.status(200).json(result);
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      status: "error",
      message: error instanceof Error ? error.message : "Failed to search safari",
      data: null,
    });
  }
};