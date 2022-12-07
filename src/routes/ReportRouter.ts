import { Router } from "express";
import { ReportController } from "../controllers";
import auth from "../middleware/auth";

const router: Router = Router();

router.post("/", auth, ReportController.createReport);
router.get("/user", auth, ReportController.getUserReportList);
router.get("/:reportId", ReportController.getReport);

export default router;
