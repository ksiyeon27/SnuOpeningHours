import { Router } from "express";
import UserRouter from "./UserRouter";
import PlaceRouter from "./PlaceRouter";

const router: Router = Router();

router.use("/user", UserRouter);
router.use("/place", PlaceRouter);

export default router;
