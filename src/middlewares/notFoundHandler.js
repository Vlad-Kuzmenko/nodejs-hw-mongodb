import createHttpError from "http-errors";

export const notFoudHandler = (req, res, next) => {
  next(createHttpError(404, "Route not found"));
};
