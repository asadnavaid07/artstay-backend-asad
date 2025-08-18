import { Router } from 'express';
import { artisanRouter } from '~/routes/artisan.routes';
import { accountRouter } from '~/routes/account.routes';
import { craftRouter } from '~/routes/craft.routes';
import { packageRouter } from '~/routes/package.routes';
import { registerRouter } from '~/routes/register.routes';
import { safariRouter } from '~/routes/safari.routes';
import { fairRouter } from '~/routes/fair.routes';
import { shopRouter } from '~/routes/shop.routes';
import { diningRouter } from '~/routes/dining.routes';
import { travelRouter } from '~/routes/travel.routes';
import { propertyRouter } from '~/routes/property.routes';
import { languageRouter } from '~/routes/language.routes';
import { documentorRouter } from '~/routes/documentor.routes';
import { rateplanRouter } from '~/routes/rateplan.route';
import { priceRouter } from '~/routes/price.routes';
import { reservationRouter } from '~/routes/reservation.routes';
import { ecoTransitRouter } from './eco-transit.routes';
import { vendorRouter } from '~/routes/vendor.routes';

const router = Router();

router.get('/health',(req , res)=>{
    res.status(200).json({status:'success',message:'API is running'})
})
router.use('/account', accountRouter);
router.use('/register', registerRouter)
router.use('/artisan', artisanRouter);
router.use('/craft', craftRouter)
router.use('/package', packageRouter)
router.use('/safari', safariRouter)
router.use('/fair', fairRouter)
router.use('/shop', shopRouter)
router.use('/dining', diningRouter)
router.use('/travel', travelRouter)
router.use('/property', propertyRouter)
router.use('/language',languageRouter)
router.use('/documentor',documentorRouter)
router.use('/rateplan',rateplanRouter)
router.use('/price',priceRouter)
router.use('/reservation',reservationRouter)
router.use('/eco-transit', ecoTransitRouter);
router.use('/vendor', vendorRouter);

export const mainRouter = router;