import { router } from "../../config/express";
import { register } from "./auth.controller";

router.post("/register", register);

export default router;
