import { Router } from "express";
import { registerVendor, loginVendor } from "~/controllers/vendor.controller";
import { validate } from "~/middlewares/zod.middleware";
import { vendorRegistrationSchema, vendorLoginSchema } from "~/schemas/vendor";

const router = Router();

router.post("/register", validate(vendorRegistrationSchema), registerVendor);
router.post("/login", validate(vendorLoginSchema), loginVendor);

export const vendorRouter = router;
