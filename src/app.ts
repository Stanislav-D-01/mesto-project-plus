import * as process from "process";
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

import handlingUnknownRouts from "./middlewares/handling-unknown-routs";
import { login } from "./controllers/login";
import { createUser } from "./controllers/users";
import auth from "./middlewares/auth";
import errorsHandler from "./middlewares/error-hadler-middleware";

import { requestLogger, errorLogger } from "./middlewares/logger";
import routerIndex from "./routes";
import { createUserValid, loginValid } from "./routes/validation";
dotenv.config();

const { PORT = 3000 } = process.env;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose
  .connect("mongodb://127.0.0.1:27017/mestodb")
  .then(() => console.log("подключено к БД"))
  .catch((error) => console.log(error));
app.use(requestLogger);
app.post("/signin", loginValid, login);
app.post("/signup", createUserValid, createUser);

app.use(auth);
app.use("/", routerIndex);
app.use(handlingUnknownRouts);
app.use(errorLogger);
app.use(errorsHandler);
app.listen(PORT, () => {
  console.log(`Сервер запущен порт:${PORT}`);
});
