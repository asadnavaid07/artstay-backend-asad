import { Router } from "express";
import {
  createFairEvent,
  fairApplicationStatus,
  createFairBooking,
  fairDetailById,
  fairProfileByAccountId,
  getAllFairs,
  getAllFairsPagination,
  getEventById,
  getFairEvents,
  updateFairEvent,
  toggleFairStatus,
  getAllFairBookings,
  findFairByCriteria,
} from "~/controllers/fair.controller";
import { validate } from "~/middlewares/zod.middleware";
import { auth } from "~/middlewares/auth.middleware";
import { FairEventSchema, UpdateFairEventSchema } from "~/schemas/fair";

const router = Router();

router.get("/detail/:accountId", fairProfileByAccountId);
router.get("/events/:accountId", getFairEvents);
router.get("/event/:eventId", getEventById);
router.get("/all", getAllFairs);
router.get("/pagination", getAllFairsPagination);
router.get("/application-status/:accountId", fairApplicationStatus);
router.get('/bookings/:accountId', getAllFairBookings);
router.get("/:fairId", fairDetailById);

router.put("/toggle-status",toggleFairStatus);
router.post('/create-booking',createFairBooking)
router.post("/create-event", auth, validate(FairEventSchema), createFairEvent);
router.patch("/event", auth, validate(UpdateFairEventSchema), updateFairEvent);
// alias to match existing frontend usage
router.patch("/update-event", validate(UpdateFairEventSchema), updateFairEvent);
router.post('/find-fair', findFairByCriteria);

export const fairRouter = router;
