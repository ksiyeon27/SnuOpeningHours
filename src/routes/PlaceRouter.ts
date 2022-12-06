import { Router } from "express";
//import { body } from "express-validator";
import { PlaceController } from "../controllers";

const router: Router = Router();

router.get("/:placeId", PlaceController.getPlace);
router.post("/", PlaceController.createPlace);

export default router;
