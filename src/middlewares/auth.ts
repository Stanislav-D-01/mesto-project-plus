import jwt, { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import Unauthorized from "../errors/unauthorized";

interface RequestSession extends Request {
  user?: string | JwtPayload;
}

export default (req: RequestSession, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    next(new Unauthorized("Необходима авторизация"));
    return;
  }
  const token = authorization && authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = token && jwt.verify(token, "keysecret");
  } catch (err) {
    next(new Unauthorized("Необходима авторизация"));
    return;
  }
  req.body.user = payload;
  next();
};
