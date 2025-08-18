import { Router } from 'express';
import {  createSafariBooking, createSafariTour, getAllSafariBookings, getAllSafaris, getAllSafarisPagination, getApplicationStatus, getSafariTours, getTourById, safariDetailByAccountId, safariDetailById, updateSafariStatus, findSafariByDestinations } from '~/controllers/safari.controller';
import { validate } from '~/middlewares/zod.middleware';
import { SafariTourSchema } from '~/schemas/safari';

const router = Router();

router.get('/detail/:accountId', safariDetailByAccountId)
router.get('/tours/:accountId',getSafariTours)
router.get('/tour/:tourId',getTourById)
router.get('/pagination', getAllSafarisPagination)
router.get('/all', getAllSafaris)
router.get('/bookings/:accountId', getAllSafariBookings);
router.get('/application-status/:accountId', getApplicationStatus)
router.get('/:safariId', safariDetailById)

router.post('/create-tour',validate(SafariTourSchema), createSafariTour)
router.put('/toggle-status', updateSafariStatus)
router.post('/create-booking',createSafariBooking)
router.post('/find-safari', findSafariByDestinations);

export const safariRouter = router;