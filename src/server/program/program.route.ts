import { Router } from "express";
const router = Router();
import {
  createProgram,
  createProgramCycle,
  getProgramCyclesUsingProgramId,
  getProgramCyclesWithProgram,
  getProgramWithCycles,
} from "./program.controller";

router.post("/", createProgram);
router.post("/cycle", createProgramCycle);
router.get("/cycle/:programId", getProgramCyclesUsingProgramId);
router.get("/all-cycles", getProgramCyclesWithProgram);
router.get("/programs", getProgramWithCycles);

export default router;
