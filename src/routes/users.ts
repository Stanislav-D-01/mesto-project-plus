import { Router } from "express";
import {
  getAllUsers,
  getCurrentUser,
  getUserFromId,
  updateAvatar,
  updateProfile,
} from "../controllers/users";
import { celebrate, Joi } from "celebrate";

const routerUsers = Router();

routerUsers.get("/users", getAllUsers);
routerUsers.get("/users/me", getCurrentUser);
routerUsers.get("/users/:id", getUserFromId);

routerUsers.patch(
  "/users/me",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2).max(300),
    }),
  }),
  updateProfile,
);
routerUsers.patch(
  "/users/me/avatar",
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().required(),
    }),
  }),
  updateAvatar,
);
export default routerUsers;
