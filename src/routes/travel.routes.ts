import { Router } from 'express';
import { createTravelBooking, updateTravelPlaner } from '~/controllers/register.controller';
import { createTravelTour, findKashmirOdyssey, getAllTravelPlaners, getAllTravelPlanersPagination, getAllTravelPlannerFilters, getTravelProfileByAccountId, getTravelProfileDetailById, getTravelTourById, getTravelTours, travelApplicationStatus, updateTravelTour } from '~/controllers/travel.controller';
import { validate } from '~/middlewares/zod.middleware';
import { TravelTourCreationSchema, TravelTourUpdateSchema } from '~/schemas/travel';

const router = Router();

router.post('/create-tour',validate(TravelTourCreationSchema),createTravelTour)
router.get('/all',getAllTravelPlaners)
router.get('/pagination',getAllTravelPlanersPagination)
router.get('/filters',getAllTravelPlannerFilters)
router.get("/application-status/:accountId", travelApplicationStatus);
router.get('/tours/:accountId',getTravelTours)
router.get('/tour/:tourId',getTravelTourById)
router.get('/detail/:travelPlannerId',getTravelProfileDetailById)
router.get('/:accountId',getTravelProfileByAccountId)

router.post('/create-booking',createTravelBooking)
router.put('/toggle-status',updateTravelPlaner)
router.patch('/update-tour',validate(TravelTourUpdateSchema),updateTravelTour)
router.post('/find-kashmir-odyssey', findKashmirOdyssey);

export const travelRouter = router;