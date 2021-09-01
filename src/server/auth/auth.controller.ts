import { NextFunction, Request, Response } from "express";
import { User } from "./user.entity";
import validate from "../../utils/validate";

const register = (req: Request, res: Response, next: NextFunction) => {
  const user = new User(req.body);

  validate(user).then((e) => {
    if (e.length) {
      return res.status(400).json(e);
    }
    user
      .save()
      .then((u) => res.json(u))
      .catch((e) => next(e));
  });
};

export { register };
