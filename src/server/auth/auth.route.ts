import { router } from "../../config/express";
import authCheck from "../middlewares/authCheck";
import { register, login, me, logout } from "./auth.controller";

router.post("/register", register);
router.post("/login", login);
router.get("/me", authCheck, me);
router.get("/logout", authCheck, logout);

export default router;
