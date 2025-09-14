import { notFoundHandler } from "./middlewares/notFoundHandler.js";
import express from "express";
import cors from "cors";
import pino from "pino-http";
import cookieParser from "cookie-parser";
import contactsRouter from "./routers/contacts.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import authRouter from "./routers/auth.js";
import { UPLOAD_DIR } from "./constants/index.js";
import { swaggerDocs } from "./middlewares/swaggerDocs.js";

export const setupServer = () => {
  const app = express();

  app.use(cors());
  app.use(cookieParser());
  app.use(express.json());

  app.use("/contacts", contactsRouter);
  app.use("/auth", authRouter);
  app.use("/uploads", express.static(UPLOAD_DIR));
  app.use("/api-docs", swaggerDocs());

  app.use(notFoundHandler);
  app.use(errorHandler);

  const PORT = Number(process.env.PORT) || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
