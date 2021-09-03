import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../auth/user.entity";

export default async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token;
  if (!token) res.status(401).json({ error: "Unauthenticated" });

  const { email }: any = jwt.verify(token, process.env.JWT_SECRET);

  return User.findOne({ email })
    .then((user) => {
      if (!user) throw new Error("Unauthenticated");
      res.locals.user = user;
      return next();
    })
    .catch((e) => {
      res.status(401).json({ error: e.message });
    });
};
