import { Request, Response } from "express";
import { vendorService } from "~/services/vendor.service";
import { logger } from "~/utils/logger";

export const registerVendor = async (req: Request, res: Response) => {
  try {
    const result = await vendorService.register(req.body);
    res.status(201).json(result);
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      status: "error",
      message: error instanceof Error ? error.message : "Failed to register vendor",
      data: null,
    });
  }
};

export const loginVendor = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await vendorService.login(email, password);
    res.status(200).json(result);
  } catch (error) {
    logger.error(error);
    res.status(401).json({
      status: "error",
      message: error instanceof Error ? error.message : "Vendor login failed",
      data: null,
    });
  }
};
