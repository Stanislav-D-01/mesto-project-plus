import { NextFunction, Request, Response } from "express";
import user from "../models/user";

import bcrypt from "bcrypt";

import IRequestSession from "../types/request-type";
import NotFoundError from "../errors/not-found-error";
import BadRequestError from "../errors/bad-request";
import ConflictError from "../errors/conflict-error";

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const { name, about, avatar, email, password } = req.body;

  user.findOne({ email: email }).then((user) => {
    if (user) {
      next(new ConflictError("Пользователь с таким емэйл уже существует"));
    }
  });

  return bcrypt
    .hash(password, 10)
    .then((password) => user.create({ name, about, avatar, email, password }))
    .then((user) =>
      res.send({
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        _id: user._id,
      }),
    )

    .catch(() => next(new BadRequestError("Ошибка в создании пользователя")));
};

export const getAllUsers = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  return user
    .find({})
    .then((users) =>
      res.send(
        users.map((user) => {
          return {
            name: user.name,
            about: user.about,
            avatar: user.avatar,
            _id: user._id,
          };
        }),
      ),
    )

    .catch(() => next(new Error("Ошибка в запросе")));
};

export const getUserFromId = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  if (id) {
    return user
      .findById(id)
      .orFail(() => new NotFoundError("Не найден пользователь с заданным ID"))
      .then((user) => {
        res.send({
          name: user.name,
          about: user.about,
          avatar: user.avatar,
          _id: user._id,
        });
      })
      .catch((error) => next(error));
  }
};

export const updateProfile = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { name, about } = req.body;
  const id = req.body.user._id;
  return user
    .findByIdAndUpdate(id, { name, about }, { new: true, runValidators: true })
    .orFail(() => new NotFoundError("Не найден пользователь с заданным ID"))
    .then((user) => {
      res.send({
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        _id: user._id,
      });
    })
    .catch((error) => next(error));
};

export const updateAvatar = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { avatar } = req.body;
  const id = req.body.user._id;

  return user
    .findByIdAndUpdate(id, { avatar }, { new: true, runValidators: true })
    .orFail(() => new NotFoundError("Не найден пользователь с заданным ID"))
    .then((user) => {
      res.send({
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        _id: user._id,
      });
    })
    .catch((error) => next(error));
};

export const getCurrentUser = (
  req: IRequestSession,
  res: Response,
  next: NextFunction,
) => {
  if (req.user) {
    const id = req.user._id;

    if (id) {
      return user
        .findById(id)
        .orFail(() => new NotFoundError("Не найден пользователь с заданным ID"))
        .then((user) =>
          res.send({
            name: user.name,
            about: user.about,
            avatar: user.avatar,
            _id: user._id,
          }),
        )
        .catch((error) => next(error));
    }
  }
};
