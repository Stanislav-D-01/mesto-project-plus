import { Response } from "express";
import * as errors from "./variables";

export const errorsHandler = (error: TypeError, res: Response) => {
  if (error.name === "ValidationError") {
    return res
      .status(errors.ERROR_CODE_ERR_DATA_REQ)
      .send({ message: errors.ERROR_CODE_ERR_DATA_REQ_TEXT });
  }
  if (error.name === "CastError") {
    return res
      .status(errors.ERROR_CODE_NOT_FOUND)
      .send({ message: errors.ERROR_CODE_NOT_FOUND_TEXT });
  } else {
    return res
      .status(errors.ERROR_CODE_SERVER_ERR)
      .send({ message: errors.ERROR_CODE_SERVER_ERR_TEXT });
  }
};
