import { NextFunction, Request, Response } from "express";
import ProgramCycle from "./program-cycle/program.cycle.entity";
import Program from "./program.entity";

function createProgram(req: Request, res: Response, next: NextFunction) {
  const program = new Program();
  program.title = req.body.title;
  program.description = req.body.description;

  program
    .save()
    .then((pro) => res.status(200).json(pro))
    .catch(next);
}

function createProgramCycle(req: Request, res: Response, next: NextFunction) {
  const programCycle = new ProgramCycle();
  programCycle.title = req.body.title;
  programCycle.description = req.body.description;
  programCycle.startDate = req.body.startDate;
  programCycle.endDate = req.body.endDate;
  programCycle.programId = req.body.programId;

  programCycle
    .save()
    .then((pro) => res.status(200).json(pro))
    .catch(next);
}

function getProgramCyclesUsingProgramId(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // SELECT "firstName", "title" FROM "ProgramCycle"
  //   ProgramCycle.find({ select: ["title"] })
  //     .then((cycles) => res.json(cycles))
  //     .catch(next);

  ProgramCycle.createQueryBuilder("cycle")
    .where("cycle.programId = :id", {
      id: req.params.programId,
    })
    .getMany()
    .then((cycles) => res.json(cycles))
    .catch(next);

  ProgramCycle.find({
    join: {
      alias: "cycle",
      leftJoinAndSelect: {
        program: "cycle.program",
      },
    },
  })
    .then((cycles) => res.json(cycles))
    .catch(next);
}

function getProgramCyclesWithProgram(
  _req: Request,
  res: Response,
  next: NextFunction
) {
  ProgramCycle.find({
    join: {
      alias: "cycle",
      leftJoinAndSelect: {
        program: "cycle.program",
      },
    },
  })
    .then((cycles) => res.json(cycles))
    .catch(next);
}

function getProgramWithCycles(
  _req: Request,
  res: Response,
  next: NextFunction
) {
  Program.createQueryBuilder("programs")
    .leftJoinAndSelect("programs.programCycles", "program")
    .getMany()
    .then((programs) => {
      res.json(programs);
    })
    .catch(next);
}

export {
  createProgram,
  createProgramCycle,
  getProgramCyclesUsingProgramId,
  getProgramCyclesWithProgram,
  getProgramWithCycles,
};
