import { Router } from "express";
const router = Router();
// import { router } from "../config/express";
import authRoutes from "./auth/auth.route";
import programRoutes from "./program/program.route";
import templateRoutes from "./application-template/application.template.route";

router.use("/auth", authRoutes);
router.use("/template", templateRoutes);
router.use("/program", programRoutes);

export default router;
