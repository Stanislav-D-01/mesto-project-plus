import {Router} from "express";
import {createUser, getAllUsers, getUserFromId, updateAvatar, updateProfile} from "../controllers/users";

const routerUsers = Router();

routerUsers.get('/users', getAllUsers)
routerUsers.post('/users', createUser)
routerUsers.get('/users/:id', getUserFromId)
routerUsers.patch('/users/me', updateProfile)
routerUsers.patch('/users/me/avatar', updateAvatar)
export default routerUsers;