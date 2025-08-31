import { Router } from "express";
import {
  getContactsController,
  getContactByIdController,
  addContactController,
  patchContactByIdController,
  deleteContactByIdController,
} from "../controllers/contacts.js";

import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { validateBody } from "../middlewares/validateBody.js";
import {
  contactAddSchema,
  contactUpdateSchema,
} from "../validation/contactSchema.js";
import { isValidId } from "../middlewares/isValidId.js";

const contactsRouter = Router();

contactsRouter.get("/", ctrlWrapper(getContactsController));

contactsRouter.get(
  "/:contactId",
  isValidId,
  ctrlWrapper(getContactByIdController),
);

contactsRouter.post(
  "/",
  validateBody(contactAddSchema),
  ctrlWrapper(addContactController),
);

contactsRouter.patch(
  "/:contactId",
  isValidId,
  validateBody(contactUpdateSchema),
  ctrlWrapper(patchContactByIdController),
);

contactsRouter.delete(
  "/:contactId",
  isValidId,
  ctrlWrapper(deleteContactByIdController),
);

export default contactsRouter;
