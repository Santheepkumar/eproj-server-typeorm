import { router } from "../config/express";
import authRoutes from "./auth/auth.route";
import programRoutes from "./program/program.route";

router.use("/auth", authRoutes);
router.use("/program", programRoutes);

export default router;
