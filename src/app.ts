import express, { NextFunction, Request, Response } from "express";
import * as process from "process";
import dotenv from "dotenv";
import mongoose from "mongoose";
import routerUsers from "./routes/users";
import routerCards from "./routes/cards";
import handlingUnknownRouts from "./middlewares/handling-unknown-routs";

dotenv.config();

const { PORT = 3000 } = process.env;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose
  .connect("mongodb://127.0.0.1:27017/mestodb")
  .then(() => console.log("подключено к БД"))
  .catch((error) => console.log(error));
app.use((req: Request, res: Response, next: NextFunction) => {
  req.body.user = {
    _id: "6550ad44484618fbd9de9bbe",
  };

  next();
});

app.use("/", routerUsers);
app.use("/", routerCards);
app.use(handlingUnknownRouts);
app.listen(PORT, () => {
  console.log(`Сервер запущен порт:${PORT}`);
});
