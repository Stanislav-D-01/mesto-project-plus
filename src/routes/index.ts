import routerCards from "./cards";
import routerUsers from "./users";
import { Router } from "express";

const routerIndex = Router();

routerIndex.use("/users", routerUsers);
routerIndex.use("/cards", routerCards);
export default routerIndex;
