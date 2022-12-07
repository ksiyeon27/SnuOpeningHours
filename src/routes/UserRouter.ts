import { Router } from "express";
import { body } from "express-validator";
import { UserController } from "../controllers";
import auth from "../middleware/auth";
const router: Router = Router();

router.get("/signup", function (req, res) {
  res.render("signup");
});
router.post("/signup", [], UserController.createUser);
router.get("/signin", function (req, res) {
  res.render("login");
});
router.post("/signin", UserController.signinUser);
router.get("/", auth, UserController.getUser);

export default router;
