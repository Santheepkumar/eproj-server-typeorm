import { Errback, NextFunction, Request, Response } from "express";
import User from "./user.entity";
import validate from "../../utils/validate";
import { hashPassword } from "../../utils/secure";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import env from "../../config/env.config";

const register = (req: Request, res: Response, next: NextFunction) => {
  const user = new User(req.body);

  validate(user).then((e: Errback) => {
    if (e.length) {
      return res.status(400).json(e);
    }
    return user
      .save()
      .then((u) => res.json(u))
      .catch((e) => next(e));
  });
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    const passwordMatch =
      (await hashPassword(password, user.salt)) === user.password;

    if (!passwordMatch)
      return res.status(401).json({ error: "Password is incurrect" });

    const token = jwt.sign({ email }, env.JWT_SECRET);

    res.set(
      "Set-Cookie",
      cookie.serialize("token", token, {
        httpOnly: true,
        secure: env.NODE_ENV === "production" ? true : false,
        sameSite: "strict",
        maxAge: 3600,
        path: "/",
      })
    );
    return res.json(user);
  } catch (err) {
    return next(err);
  }
};

const me = (_req: Request, res: Response, _next: NextFunction) => {
  // const token = req.cookies.token;
  // if (!token) res.status(401).json({ error: "Unauthenticated" });

  // const { email }: any = jwt.verify(token, env.JWT_SECRET);

  // User.findOne({ email })
  //   .then((user) => {
  //     if (!user) throw new Error("Unauthenticated");
  //     return res.json(user);
  //   })
  //   .catch((e) => {
  //     res.status(401).json({ error: e.message });
  //   });
  return res.json(res.locals.user);
};

const logout = (_req: Request, res: Response, _next: NextFunction) => {
  res.set(
    "Set-Cookie",
    cookie.serialize("token", "", {
      httpOnly: true,
      secure: env.NODE_ENV === "production" ? true : false,
      sameSite: "strict",
      expires: new Date(0),
      path: "/",
    })
  );
  res.status(200).json({ success: true });
};

export { login, register, me, logout };
