import { Router } from "express";
import {
  getDocumentorById,
  getAllDocumentors,
  getDocumentorFilters,
  toggleDocumentorStatus,
  documentorApplicationStatus,
  createDocumentorBooking,
  getDocumentorPortfolio,
  createDocumentorProfile,
  updateDocumentorProfile,
  getDocumentorByAccountId,
  getDocumentorPortfolioByAccountId,
  updateDocumentorPortfolio,
  createDocumentorPackage,
  deleteDocumentorPackage,
  getDocumentorPackages,
  updateDocumentorPackage,
  getDocumentorPackageById,
  getAllDocumentorBookings,
  findCraftDocumentationJourney,
} from "~/controllers/documentor.controller";

const router = Router();

router.get("/all", getAllDocumentors);
router.get("/filters", getDocumentorFilters);
router.get("/application-status/:accountId", documentorApplicationStatus);
router.get("/portfolio/:documentorId", getDocumentorPortfolio);
router.get("/account/:accountId", getDocumentorByAccountId);
router.get("/account-portfolio/:accountId", getDocumentorPortfolioByAccountId);
router.get("/packages/:accountId", getDocumentorPackages);
router.get('/package/:packageId', getDocumentorPackageById);
router.get('/bookings/:documentorId', getAllDocumentorBookings);
router.get("/:documentorId", getDocumentorById);

router.post("/package", createDocumentorPackage);
router.patch("/package", updateDocumentorPackage);
router.delete("/package/:packageId", deleteDocumentorPackage);
router.post("/portfolio", updateDocumentorPortfolio);
router.patch("/profile/:documentorId", updateDocumentorProfile);
router.post("/create-profile", createDocumentorProfile);
router.post("/create-booking", createDocumentorBooking);
router.patch("/toggle-status", toggleDocumentorStatus);
router.post('/find-craft-documentation-journey', findCraftDocumentationJourney);

export const documentorRouter = router;
