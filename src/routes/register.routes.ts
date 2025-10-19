import { Router } from "express";
import {
  createArtisan,
  createFair,
  createSafari,
  createShop,
  createRestaurant,
  updateArtisan,
  updateFair,
  updateRestaurant,
  updateSafari,
  updateShop,
  updateTravelPlaner,
  createTravelPlaner,
  createLanguageService,
  createHotel,
  createEcoTransit,
  updateEcoTransit,
} from "~/controllers/register.controller";
import { validate } from "~/middlewares/zod.middleware";
import { auth } from "~/middlewares/auth.middleware";
import { languageCreationSchema } from "~/schemas/language";
import {
  artisanCreationSchema,
  artisanUpdationSchema,
  fairCreationSchema,
  fairUpdationSchema,
  restaurantCreationSchema,
  restaurantUpdationSchema,
  safariCreationSchema,
  safariUpdationSchema,
  shopCreationSchema,
  shopUpdationSchema,
  travelPlanerCreationSchema,
  travelPlanerUpdationSchema,
  ecoTransitCreationSchema,
  ecoTransitUpdationSchema,
} from "~/schemas/register";

const router = Router();
//* artisan
router.post("/artisan", validate(artisanCreationSchema), createArtisan);
router.patch("/artisan", validate(artisanUpdationSchema), updateArtisan);
//* safair
router.post("/safari", validate(safariCreationSchema), createSafari);
router.patch("/safari", auth, validate(safariUpdationSchema), updateSafari);
//* fair
router.post("/fair", validate(fairCreationSchema), createFair);
router.patch("/fair", validate(fairUpdationSchema), updateFair);
//* shop
router.post("/shop", validate(shopCreationSchema), createShop);
router.patch("/shop", validate(shopUpdationSchema), updateShop);
//* dining
router.post("/dining", validate(restaurantCreationSchema), createRestaurant);
router.patch("/dining", validate(restaurantUpdationSchema), updateRestaurant);
//* travel
router.post("/travel",validate(travelPlanerCreationSchema),createTravelPlaner
);
router.patch(  "/travel",validate(travelPlanerUpdationSchema),updateTravelPlaner);
//* language
router.post("/language",validate(languageCreationSchema),createLanguageService);
// * hotel
router.post("/hotel", createHotel);
router.patch("/hotel", updateTravelPlaner);
//* eco transit
router.post("/eco-transit", validate(ecoTransitCreationSchema), createEcoTransit);
router.patch("/eco-transit", validate(ecoTransitUpdationSchema), updateEcoTransit);

export const registerRouter = router;
