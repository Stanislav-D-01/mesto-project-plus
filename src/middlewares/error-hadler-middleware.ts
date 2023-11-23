import { Response, Request, NextFunction } from "express";

interface IError extends Error {
  statusCode: number;
  code?: number;
}

export default (
  error: IError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { statusCode = 500, message } = error;
  if (error.code === 11000) {
    res.status(409).send({
      message: "Ошибка в создании записи в БД (возможен дубликат)",
    });
    return;
  }

  res.status(error.statusCode).send({
    message: statusCode === 500 ? "На сервере произошла ошибка" : message,
  });
  next();
};
