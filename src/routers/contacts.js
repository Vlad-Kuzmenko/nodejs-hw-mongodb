import { Router } from "express";
import {
  getContactsController,
  getContactByIdController,
  addContactController,
  patchContactByIdController,
  deleteContactByIdController,
} from "../controllers/contacts.js";

import { ctrlWrapper } from "../utils/ctrlWrapper.js";

const contactsRouter = Router();

contactsRouter.get("/", ctrlWrapper(getContactsController));

contactsRouter.get("/:contactId", ctrlWrapper(getContactByIdController));

contactsRouter.post("/", ctrlWrapper(addContactController));

contactsRouter.patch("/:contactId", ctrlWrapper(patchContactByIdController));

contactsRouter.delete("/:contactId", ctrlWrapper(deleteContactByIdController));

export default contactsRouter;
