import { Router } from "express";
import { body } from "express-validator";
import { UserController } from "../controllers";
import auth from "../middleware/auth";
const router: Router = Router();

router.get("/signup", UserController.showSignupPage);
router.post("/signup", UserController.createUser);
router.get("/signin", UserController.showLoginPage);
router.post("/signin", UserController.signinUser);
router.get("/", auth, UserController.getUser);

export default router;
