import { Request, Response } from "express";
import user from "../models/user";
import { errorsHandler } from "../utils/errorsHandler";

export const createUser = (req: Request, res: Response) => {
  const { name, about, avatar } = req.body;
  return user
    .create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((error) => errorsHandler(error, res));
};

export const getAllUsers = (req: Request, res: Response) => {
  return user
    .find({})
    .then((users) => res.send(users))
    .catch((error) => errorsHandler(error, res));
};

export const getUserFromId = (req: Request, res: Response) => {
  const { id } = req.params;
  return user
    .findById(id)
    .then((user) => res.send(user))
    .catch((error) => errorsHandler(error, res));
};

export const updateProfile = (req: Request, res: Response) => {
  const { name, about } = req.body;
  const id = req.body.user._id;
  return user
    .findByIdAndUpdate(id, { name, about }, { new: true })
    .then((user) => res.send(user))
    .catch((error) => errorsHandler(error, res));
};

export const updateAvatar = (req: Request, res: Response) => {
  const { avatar } = req.body;
  const id = req.body.user._id;

  return user
    .findByIdAndUpdate(id, { avatar }, { new: true })
    .then((user) => res.send(user))
    .catch((error) => errorsHandler(error, res));
};
