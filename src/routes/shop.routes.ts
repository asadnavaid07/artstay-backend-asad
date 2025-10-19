import { Router } from 'express';
import { createProduct, createShopOrder, getAllFilters, getAllShops, getAllShopsPagination, getProductById, getProductsByAccountId, getShopOrders, shopApplicationStatus, shopDetailByAccountId, shopDetailByShopId, updateOrderStatus, updateProduct } from '~/controllers/shop.controller';
import { validate } from '~/middlewares/zod.middleware';
import { productCreationSchema, productUpdateSchema } from '~/schemas/shop';

const router = Router();

router.get('/filters',getAllFilters)
router.get('/all', getAllShops)
router.get('/pagination', getAllShopsPagination) 
router.get("/application-status/:accountId", shopApplicationStatus);
router.get('/detail/:accountId', shopDetailByAccountId)
router.get('/products/:accountId', getProductsByAccountId)
router.get('/product/:productId', getProductById)
router.get('/:shopId', shopDetailByShopId)

router.post('/create-order', createShopOrder);
router.post('/product', validate(productCreationSchema), createProduct)
router.patch('/product', validate(productUpdateSchema), updateProduct)

// Order management routes
router.get('/orders/:accountId', getShopOrders);
router.patch('/order/:orderId/status', updateOrderStatus);

export const shopRouter = router;