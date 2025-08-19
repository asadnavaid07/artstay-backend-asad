import { Request, Response } from 'express';
import { languageService } from '~/services/language.service';
import { logger } from '~/utils/logger';



export const languageApplicationStatus = async (req: Request, res: Response) => {
  try {
    const { accountId } = req.params;
    const result = await languageService.getApplicationStatus(accountId);
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

export const getLanguageServiceById = async (req: Request, res: Response) => {
    try {
        const { languageServiceId } = req.params;
        const result = await languageService.getLanguageServiceById(languageServiceId);
        res.status(200).json(result);
    } catch (error) {
        logger.error(error);
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Failed to fetch language service',
            data: null
        });
    }
};

export const getAllLanguageServices = async (req: Request, res: Response) => {
    try {
        const result = await languageService.getAllLanguageServices();
        res.status(200).json(result);
    } catch (error) {
        logger.error(error);
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Failed to fetch language services',
            data: null
        });
    }
};

export const getLanguageServiceFilters = async (req: Request, res: Response) => {
    try {
        const result = await languageService.getLanguageServiceFilters();
        res.status(200).json(result);
    } catch (error) {
        logger.error(error);
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Failed to fetch language service filters',
            data: null
        });
    }
};

export const toggleLanguageServiceStatus = async (req: Request, res: Response) => {
    try {
        const { status,languageServiceId } = req.body;
        const result = await languageService.toggleLanguageServiceStatus(languageServiceId, status);
        res.status(200).json(result);
    } catch (error) {
        logger.error(error);
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Failed to update language service status',
            data: null
        });
    }
};

export const createLanguageBooking = async (req: Request, res: Response) => {
    try {
        const result = await languageService.createBooking(req.body)
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

export const findLanguageExploration = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const result = await languageService.findLanguageExploration(payload);
    if (result.status === "error") {
       res.status(400).json(result);
       return;
    }
    res.status(200).json(result);
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      status: "error",
      message: error instanceof Error ? error.message : "Failed to search language exploration",
      data: null,
    });
  }
};