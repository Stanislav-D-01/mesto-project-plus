import { Request } from "express";
import { ObjectId } from "mongoose";

export default interface IRequestSession extends Request {
  user?: { _id: ObjectId };
}
