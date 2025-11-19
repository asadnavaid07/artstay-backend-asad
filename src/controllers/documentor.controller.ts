import { Request, Response } from 'express';
import { documentorService } from '~/services/documentor.service';
import { logger } from '~/utils/logger';

export const documentorApplicationStatus = async (req: Request, res: Response) => {
  try {
    const { accountId } = req.params;
    const result = await documentorService.getApplicationStatus(accountId);
    res.status(200).json(result);
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      status: "error",
      message: error instanceof Error ? error.message : "Failed to fetch application status",
      data: null,
    });
  }
};

export const getDocumentorById = async (req: Request, res: Response) => {
    try {
        const { documentorId } = req.params;
        const result = await documentorService.getDocumentorById(documentorId);
        res.status(200).json(result);
    } catch (error) {
        logger.error(error);
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Failed to fetch documentor',
            data: null
        });
    }
};

export const getDocumentorByAccountId = async (req: Request, res: Response) => {
    try {
        const { accountId } = req.params;
        const result = await documentorService.getDocumentorByAccountId(accountId);
        res.status(200).json(result);
    } catch (error) {
        logger.error(error);
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Failed to fetch documentor',
            data: null
        });
    }
};


export const getDocumentorPortfolio = async (req: Request, res: Response) => {
    try {
        const { documentorId } = req.params;
        const result = await documentorService.getDocumentorPortfolio(documentorId);
        res.status(200).json(result);
    } catch (error) {
        logger.error(error);
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Failed to fetch documentor portfolio',
            data: null
        });
    }
};

export const getAllDocumentors = async (req: Request, res: Response) => {
    try {
        const result = await documentorService.getAllDocumentors();
        res.status(200).json(result);
    } catch (error) {
        logger.error(error);
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Failed to fetch documentors',
            data: null
        });
    }
};

export const getDocumentorFilters = async (req: Request, res: Response) => {
    try {
        const result = await documentorService.getDocumentorFilters();
        res.status(200).json(result);
    } catch (error) {
        logger.error(error);
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Failed to fetch documentor filters',
            data: null
        });
    }
};

export const toggleDocumentorStatus = async (req: Request, res: Response) => {
    try {
        const { status, documentorId } = req.body;
        const result = await documentorService.toggleDocumentorStatus(documentorId, status);
        res.status(200).json(result);
    } catch (error) {
        logger.error(error);
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Failed to update documentor status',
            data: null
        });
    }
};

export const createDocumentorBooking = async (req: Request, res: Response) => {
    try {
        const result = await documentorService.createBooking(req.body);
        res.status(201).json(result);
    } catch (error) {
        logger.error(error);
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Failed to create documentor booking',
            data: null
        });
    }
};

export const createDocumentorProfile = async (req: Request, res: Response) => {
  try {
    const profileData: DocumentorProfileInput = req.body;
    const result = await documentorService.createProfile(profileData);
    
    // If the service returns an error status, respond with appropriate status code
    if (result.status === "error") {
      res.status(400).json(result);
      return;
    }
    
    res.status(201).json(result);
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      status: "error",
      message: error instanceof Error ? error.message : "Failed to create documentor profile",
      data: null,
    });
  }
};

export const updateDocumentorProfile = async (req: Request, res: Response) => {
  try {
    const { documentorId } = req.params;
    const result = await documentorService.updateDocumentorProfile(documentorId, req.body);
    res.status(200).json(result);
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      status: 'error',
      message: error instanceof Error ? error.message : 'Failed to update documentor profile',
      data: null
    });
  }
};

export const updateDocumentorPortfolio = async (req: Request, res: Response) => {
  try {
    const result = await documentorService.updateDocumentorPortfolio(req);
    res.status(200).json(result);
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      status: 'error',
      message: error instanceof Error ? error.message : 'Failed to update documentor portfolio',
      data: null
    });
  }
};

export const getDocumentorPortfolioByAccountId = async (req: Request, res: Response) => {
  try {
    const result = await documentorService.getDocumentorPortfolioByAccountId(req);
    res.status(200).json(result);
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      status: 'error',
      message: error instanceof Error ? error.message : 'Failed to fetch documentor portfolio',
      data: null
    });
  }
};

export const getDocumentorPackages = async (req: Request, res: Response) => {
  try {
    const { documentorId } = req.params;
    const result = await documentorService.getDocumentorPackages(documentorId);
    res.status(200).json(result);
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      status: 'error',
      message: error instanceof Error ? error.message : 'Failed to fetch packages',
      data: null
    });
  }
};

export const getDocumentorPackagesByAccountId = async (req: Request, res: Response) => {
  try {
    const { accountId } = req.params;
    const result = await documentorService.getDocumentorPackages(accountId);
    res.status(200).json(result);
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      status: 'error',
      message: error instanceof Error ? error.message : 'Failed to fetch packages',
      data: null
    });
  }
};

export const createDocumentorPackage = async (req: Request, res: Response) => {
  try {
    const result = await documentorService.createDocumentorPackage(req);
    res.status(201).json(result);
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      status: 'error',
      message: error instanceof Error ? error.message : 'Failed to create package',
      data: null
    });
  }
};

export const getDocumentorPackageById = async (req: Request, res: Response) => {
  try {
    const { packageId } = req.params;
    const result = await documentorService.getDocumentorPackageById(packageId);
    res.status(200).json(result);
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      status: 'error',
      message: error instanceof Error ? error.message : 'Failed to fetch package',
      data: null
    });
  }
};

export const updateDocumentorPackage = async (req: Request, res: Response) => {
  try {
    const result = await documentorService.updateDocumentorPackage(req);
    res.status(200).json(result);
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      status: 'error',
      message: error instanceof Error ? error.message : 'Failed to update package',
      data: null
    });
  }
};

export const deleteDocumentorPackage = async (req: Request, res: Response) => {
  try {
    const { packageId } = req.params;
    const result = await documentorService.deleteDocumentorPackage(packageId);
    res.status(200).json(result);
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      status: 'error',
      message: error instanceof Error ? error.message : 'Failed to delete package',
      data: null
    });
  }
};

export const getAllDocumentorBookings = async (req: Request, res: Response) => {
  try {
    const { documentorId } = req.params;
    const result = await documentorService.getAllDocumentorBookings(documentorId);
    res.status(200).json(result);
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      status: 'error',
      message: error instanceof Error ? error.message : 'Failed to fetch bookings',
      data: null
    });
  }
};

export const findCraftDocumentationJourney = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const result = await documentorService.findCraftDocumentationJourney(payload);
    if (result.status === "error") {
      res.status(400).json(result);
      return;
    }
    res.status(200).json(result);
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      status: "error",
      message: error instanceof Error ? error.message : "Failed to search craft documentation journey",
      data: null,
    });
  }
};