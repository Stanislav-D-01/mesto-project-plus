import { Error } from "mongoose";

export default class Forbidden extends Error {
  statusCode: number;
  constructor(message: string) {
    super(message);
    this.statusCode = 403;
  }
}
