import { Router } from 'express';
import {  artisanApplicationStatus, artisanBooking, artisanDetailByAccountId, artisanDetailByArtisanId, getAllArtisanBookings, getAllArtisans, getAllArtisansPagination, getPortfolioByAccountId, getPortfolioByArtisanId, updateArtisanStatus, updatePortfolioArtisanId, findArtisanByCraft, findNearbyArtisan, findTraditionalTour, findSustainableLivingTour } from '~/controllers/artisan.controller';
import { validate } from '~/middlewares/zod.middleware';
import { artisanStatusUpdateSchema, artisanUpdatePortfolioSchema, createArtisanBookingSchema, } from '~/schemas/artisan';


const router = Router();

router.get('/pagination', getAllArtisansPagination)
router.get('/all', getAllArtisans)

router.get('/detail/:accountId', artisanDetailByAccountId)
router.get('/application-status/:accountId', artisanApplicationStatus)
router.get('/account-portfolio/:accountId', getPortfolioByAccountId)
router.get('/artisan-portfolio/:artisanId', getPortfolioByArtisanId)
router.get('/bookings/:accountId', getAllArtisanBookings);
router.get('/:artisanId', artisanDetailByArtisanId)
router.put('/toggle-status', updateArtisanStatus)
router.post('/status', validate(artisanStatusUpdateSchema), updatePortfolioArtisanId)
router.post('/portfolio', validate(artisanUpdatePortfolioSchema), updatePortfolioArtisanId)
router.post('/create-booking',validate(createArtisanBookingSchema),artisanBooking)
router.post('/find-artisan', findArtisanByCraft);
router.post('/find-nearby-artisan', findNearbyArtisan);
router.post('/find-traditional-tour', findTraditionalTour);
router.post('/find-sustainable-living-tour', findSustainableLivingTour);
export const artisanRouter = router;