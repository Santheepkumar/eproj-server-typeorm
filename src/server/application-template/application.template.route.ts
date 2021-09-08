import { Router } from "express";
const router = Router();

// import { router } from "../../config/express";
import { create } from "./application.template.controller";

// router.route("").get(controller.getAll);

// router.route("/:id").get(validate(schema.getById), controller.getById);

router.post("/", create);

// /router.route("/:id").put(validate(schema.update), controller.update);

export default router;
