import express from "express";
import cors from "cors";
import pino from "pino-http";
import contactsRouter from "./routers/contacts.js";
import { notFoundHandler } from "./middlewares/notFoundHandler.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import authRouter from "./routers/auth.js";
import { authenticate } from "./middlewares/authenticate.js";

export const setupServer = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use("/auth", authRouter);
  app.use("/contacts", authenticate, contactsRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  const PORT = Number(process.env.PORT) || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
