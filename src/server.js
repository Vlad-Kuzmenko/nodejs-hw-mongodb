import express from "express";
import cors from "cors";
import pino from "pino-http";

import contactsRouter from "./routers/contacts.js";
import { notFoudHandler } from "./middlewares/notFoundHandler.js";
import { errorHandler } from "./middlewares/errorHandler.js";

export const setupServer = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(
    pino({
      transport: {
        target: "pino-pretty",
      },
    }),
  );

  app.use("/contacts", contactsRouter);

  app.use(notFoudHandler);
  app.use(errorHandler);

  const PORT = Number(process.env.PORT) || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
