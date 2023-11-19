import { Response, Request, NextFunction } from "express";

interface IError extends Error {
  statusCode: number;
}

export default (
  error: IError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { statusCode = 500, message } = error;
  res.status(error.statusCode).send({
    message: statusCode === 500 ? "На сервере произошла ошибка" : message,
  });
  next();
};
