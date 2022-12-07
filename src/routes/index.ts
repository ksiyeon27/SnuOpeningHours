import { Router } from "express";
import UserRouter from "./UserRouter";
import PlaceRouter from "./PlaceRouter";
import ReportRouter from "./ReportRouter";

const router: Router = Router();

router.use("/user", UserRouter);
router.use("/place", PlaceRouter);
router.use("/report", ReportRouter);

export default router;
