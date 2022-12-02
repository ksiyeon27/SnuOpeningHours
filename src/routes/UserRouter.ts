import { Router } from "express";
import { body } from "express-validator";
import { UserController } from "../controllers";
import auth from "../middleware/auth";
const router: Router = Router();

router.post("/", [body("email").isEmail()], UserController.createUser);
router.post("/signin", auth, [], UserController.signinUser);
router.get("/:userId", auth, UserController.findUserById);

export default router;
