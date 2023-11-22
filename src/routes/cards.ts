import { Router } from "express";
import {
  addLikeCard,
  createCard,
  deleteCard,
  delLikeCard,
  getAllCards,
} from "../controllers/cards";

import { createCardValid, deleteCardValid, likeValid } from "./validation";

const routerCards = Router();

routerCards.post("/", createCardValid, createCard);
routerCards.delete("/:id", deleteCardValid, deleteCard);
routerCards.get("/", getAllCards);
routerCards.put("/:cardsId/likes", likeValid, addLikeCard);
routerCards.delete("/:cardsId/likes", likeValid, delLikeCard);

export default routerCards;
