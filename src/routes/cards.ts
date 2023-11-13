import { Router } from "express";
import {
  addLikeCard,
  createCard,
  deleteCard,
  delLikeCard,
  getAllCards,
} from "../controllers/cards";

const routerCards = Router();

routerCards.post("/cards", createCard);
routerCards.delete("/cards/:id", deleteCard);
routerCards.get("/cards", getAllCards);
routerCards.put("/cards/:cardsId/likes", addLikeCard);
routerCards.delete("/cards/:cardsId/likes", delLikeCard);

export default routerCards;
