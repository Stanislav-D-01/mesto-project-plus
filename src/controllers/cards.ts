import { NextFunction, Request, Response } from "express";
import card from "../models/card";

import IRequestSession from "../types/request-type";
import NotFoundError from "../errors/not-found-error";
import Forbidden from "../errors/forbidden";

export const getAllCards = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  card
    .find({})
    .then((cards) => res.send(cards))
    .catch((error) => next(error));
};

export const createCard = (
  req: IRequestSession,
  res: Response,
  next: NextFunction,
) => {
  const { name, link } = req.body;
  if (req.user) {
    const owner = req.user._id;

    card
      .create({ name, link, owner })
      .then((card) => res.send(card))
      .catch((error) => next(error));
  }
};

export const deleteCard = (
  req: IRequestSession,
  res: Response,
  next: NextFunction,
) => {
  if (req.user) {
    const { id } = req.params;
    const idUser = req.user._id;

    card
      .findById(id)
      .orFail(() => new NotFoundError("Не найдено"))
      .then((cardFind) => {
        if (cardFind && cardFind.owner == idUser) {
          return cardFind
            .deleteOne()
            .then(() => res.send({ message: "Пост удален" }));
        } else {
          return Promise.reject(new Forbidden("Недостаточно прав"));
        }
      })
      .catch((error) => next(error));
  }
};

export const addLikeCard = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const idUser = req.body.user._id;
  const { cardsId } = req.params;

  return card
    .findByIdAndUpdate(cardsId, { $addToSet: { likes: idUser } }, { new: true })
    .orFail(() => new NotFoundError("Не найдено"))
    .then((card) => res.send(card))
    .catch((error) => next(error));
};

export const delLikeCard = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const idUser = req.body.user._id;
  const { cardsId } = req.params;
  return card
    .findByIdAndUpdate(cardsId, { $pull: { likes: idUser } }, { new: true })
    .orFail(() => new NotFoundError("Не найдено"))
    .then((card) => res.send(card))
    .catch((error) => next(error));
};
