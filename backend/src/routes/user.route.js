import { Router } from "express";
import { registerUser, userLogin, userLogout } from "../controllers/user.controller.js";

const router = Router();

router.route('/register').post(registerUser);
router.route('/login').post(userLogin);
router.route('/logout').post(userLogout);

export default router;