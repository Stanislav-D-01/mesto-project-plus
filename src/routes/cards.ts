import { Router } from "express";
import {
  addLikeCard,
  createCard,
  deleteCard,
  delLikeCard,
  getAllCards,
} from "../controllers/cards";
import { celebrate, Joi } from "celebrate";

const routerCards = Router();

routerCards.post(
  "/cards",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required(),
    }),
  }),
  createCard,
);
routerCards.delete("/cards/:id", deleteCard);
routerCards.get("/cards", getAllCards);
routerCards.put("/cards/:cardsId/likes", addLikeCard);
routerCards.delete("/cards/:cardsId/likes", delLikeCard);

export default routerCards;
