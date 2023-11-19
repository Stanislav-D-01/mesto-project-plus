import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import user from "../models/user";
import bcrypt from "bcrypt";

import Unauthorized from "../errors/unauthorized";

export const login = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  return user
    .findOne({ email })
    .select("+password")
    .orFail(() => new Unauthorized("Неверный логин или пароль"))
    .then((user) => {
      return bcrypt.compare(password, user.password).then((matches) => {
        if (!matches) {
          return Promise.reject(new Unauthorized("Неверный логин или пароль"));
        }
        console.log({ _id: user._id });
        const token = jwt.sign({ _id: user._id }, "keysecret");
        res.json({ token: `Bearer ` + token });
      });
    })
    .catch((error) => next(error));
};
