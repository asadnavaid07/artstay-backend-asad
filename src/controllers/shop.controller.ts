import { Request, Response } from 'express';
import { shopService } from '~/services/shop.service';
import { logger } from '~/utils/logger';


export const getAllFilters = async (req: Request, res: Response) => {
    try {
        const result = await shopService.getFilterOptions()
        res.status(201).json(result);
    } catch (error) {
        logger.error(error)
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Failed to fetch all shops',
            data: null
        });
    }
}

export const getAllShops = async (req: Request, res: Response) => {
    try {
        const result = await shopService.getAllShops()
        res.status(201).json(result);
    } catch (error) {
        logger.error(error)
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Failed to fetch all shops',
            data: null
        });
    }
}

export const getAllShopsPagination = async (req: Request, res: Response) => {
    try {
        const result = await shopService.getAllShopsPagination(req)
        res.status(201).json(result);
    } catch (error) {
        logger.error(error)
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Failed to fetch all shops',
            data: null
        });
    }
}

export const shopDetailByAccountId = async (req: Request, res: Response) => {
    try {
        const { accountId } = req.params
        const result = await shopService.getShopByAccountId(accountId)
        res.status(201).json(result);
    } catch (error) {
        logger.error(error)
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Failed to fetch shops details',
            data: null
        });
    }
}

export const shopDetailByShopId = async (req: Request, res: Response) => {
    try {
        const { shopId } = req.params
        const result = await shopService.getShopById(shopId)
        res.status(201).json(result);
    } catch (error) {
        logger.error(error)
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Failed to fetch shop details',
            data: null
        });
    }
}

export const createProduct = async (req: Request, res: Response) => {
    try {
        const product = req.body
        const result = await shopService.createProduct(product)
        res.status(201).json(result);
    } catch (error) {
        logger.error(error)
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Failed to create product',
            data: null
        });
    }
}

export const updateProduct = async (req: Request, res: Response) => {
    try {
        const product = req.body
        const result = await shopService.updateProduct(product)
        res.status(201).json(result);
    } catch (error) {
        logger.error(error)
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Failed to update product',
            data: null
        });
    }
}

export const getProductsByAccountId = async (req: Request, res: Response) => {
    try {
        const { accountId } = req.params
        const result = await shopService.getProductsByAccountId(accountId)
        res.status(201).json(result);
    } catch (error) {
        logger.error(error)
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Failed to get products',
            data: null
        });
    }
}

export const getProductById = async (req: Request, res: Response) => {
    try {
        const { productId } = req.params
        const result = await shopService.getProductById(productId)
        res.status(201).json(result);
    } catch (error) {
        logger.error(error)
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Failed to get product',
            data: null
        });
    }
}

export const shopApplicationStatus = async (req: Request, res: Response) => {
  try {
    const { accountId } = req.params;
    const result = await shopService.getApplicationStatus(accountId);
    res.status(201).json(result);
  } catch (error) {
    logger.error(error);
    throw new Error("fair applcaition status error");
  }
};

export const createShopOrder = async (req: Request, res: Response) => {
  try {
    const result = await shopService.createShopOrder(req);
    res.status(201).json(result);
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      status: "error",
      message:
        error instanceof Error
          ? error.message
          : "Failed to create shop order",
      data: null,
    });
  }
};

export const getShopOrders = async (req: Request, res: Response) => {
  try {
    const { accountId } = req.params;
    const result = await shopService.getShopOrders(accountId);
    res.status(200).json(result);
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      status: "error",
      message:
        error instanceof Error
          ? error.message
          : "Failed to fetch shop orders",
      data: null,
    });
  }
};

export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const result = await shopService.updateOrderStatus(orderId, status);
    res.status(200).json(result);
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      status: "error",
      message:
        error instanceof Error
          ? error.message
          : "Failed to update order status",
      data: null,
    });
  }
};