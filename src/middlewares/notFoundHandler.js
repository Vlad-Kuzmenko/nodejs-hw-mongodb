import createHttpError from "http-errors";

export const notFoudHandler = () => {
  throw createHttpError(404, `Route not found `);
};
