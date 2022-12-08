import { Router } from "express";
import { body } from "express-validator";
import { UserController } from "../controllers";
import auth from "../middleware/auth";
const router: Router = Router();

router.post("/signup", [], UserController.createUser);
router.post("/signin", UserController.signinUser);
router.get("/", auth, UserController.getUser);
router.get("/mypage", function (req, res) {
  res.render("mypage");
});
export default router;
