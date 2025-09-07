import createHttpError from "http-errors";
import SessionCollection from "../db/models/Session.js";
import UsersCollection from "../db/models/User.js";

export const authenticate = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw createHttpError(401, "Please provide Authorization header");
  }

  const [bearer, accessToken] = authorization.split(" ");

  if (bearer !== "Bearer" || !accessToken) {
    throw createHttpError(401, "Auth header should be of type Bearer");
  }

  const session = await SessionCollection.findOne({ accessToken });

  if (!session) {
    throw createHttpError(401, "Session not found");
  }

  if (new Date(session.accessTokenValidUntil) < new Date()) {
    throw createHttpError(401, "Access token expired");
  }

  const user = await UsersCollection.findById(session.userId);

  if (!user) return next(createHttpError(401));

  req.user = user;

  next();
};
