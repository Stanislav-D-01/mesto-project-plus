import { Error } from "mongoose";

class Forbidden extends Error {
  statusCode: number;
  constructor(message: string) {
    super(message);
    this.statusCode = 401;
  }
}
module.exports = Forbidden;
