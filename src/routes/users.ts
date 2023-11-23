import { Router } from "express";
import {
  getAllUsers,
  getCurrentUser,
  getUserFromId,
  updateAvatar,
  updateProfile,
} from "../controllers/users";

import {
  getUserFromIdValid,
  updateAvatarValid,
  updateProfileValid,
} from "./validation";

const routerUsers = Router();

routerUsers.get("/", getAllUsers);
routerUsers.get("/me", getCurrentUser);
routerUsers.get("/:id", getUserFromIdValid, getUserFromId);

routerUsers.patch("/me", updateProfileValid, updateProfile);
routerUsers.patch("/me/avatar", updateAvatarValid, updateAvatar);
export default routerUsers;
