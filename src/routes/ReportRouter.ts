import { Router } from "express";
import { ReportController } from "../controllers";
import auth from "../middleware/auth";

const router: Router = Router();

router.post("/", auth, ReportController.createReport);

export default router;
