import { Router } from "express";
import { body } from "express-validator/check"; //check 안에서 바디 불러야 잘 인식이 되어서 express-validator 가 잘된대유
import { UserController } from "../controllers";
import User from "../models/User";
const router: Router = Router();

router.post("/", [], UserController.createUser);
router.post("/signin", [], UserController.signinUser);
router.get("/:userId", UserController.findUserById);

export default router;
