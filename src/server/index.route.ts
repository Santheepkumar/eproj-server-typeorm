import { router } from "../config/express";
import authRoutes from "./auth/auth.route";

router.use("/auth", authRoutes);

export default router;
