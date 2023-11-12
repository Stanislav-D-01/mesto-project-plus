import { Request, Response } from "express";
import card from "../models/card";
import { errorsHandler } from "../utils/errorsHandler";

export const getAllCards = (req: Request, res: Response) => {
  card
    .find({})
    .then((cards) => res.send(cards))
    .catch((error) => errorsHandler(error, res));
};

export const createCard = (req: Request, res: Response) => {
  const { name, link } = req.body;
  const owner = req.body.user._id;

  card
    .create({ name, link, owner })
    .then((card) => res.send(card))
    .catch((error) => errorsHandler(error, res));
};

export const deleteCard = (req: Request, res: Response) => {
  const { id } = req.params;
  card
    .findByIdAndDelete(id)
    .then((card) => {
      res.send(card);
    })
    .catch((error) => errorsHandler(error, res));
};

export const addLikeCard = (req: Request, res: Response) => {
  const idUser = req.body.user._id;
  const { cardsId } = req.params;

  return card
    .findByIdAndUpdate(cardsId, { $addToSet: { likes: idUser } }, { new: true })
    .then((card) => res.send(card))
    .catch((error) => errorsHandler(error, res));
};

export const delLikeCard = (req: Request, res: Response) => {
  const idUser = req.body.user._id;
  const { cardsId } = req.params;
  return card
    .findByIdAndUpdate(cardsId, { $pull: { likes: idUser } }, { new: true })
    .then((card) => res.send(card))
    .catch((error) => errorsHandler(error, res));
};
