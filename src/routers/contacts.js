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
import { authenticate } from "../middlewares/authenticate.js";
import { upload } from "../middlewares/multer.js";
import { checkContactExists } from "../middlewares/checkContactExists.js";

const contactsRouter = Router();

contactsRouter.use(authenticate);

contactsRouter.get("/", ctrlWrapper(getContactsController));

contactsRouter.get(
  "/:contactId",
  isValidId,
  upload.single("photo"),
  ctrlWrapper(getContactByIdController),
);

contactsRouter.post(
  "/",
  upload.single("photo"),
  validateBody(contactAddSchema),
  ctrlWrapper(addContactController),
);

contactsRouter.patch(
  "/:contactId",
  isValidId,
  checkContactExists,
  upload.single("photo"),
  validateBody(contactUpdateSchema),
  ctrlWrapper(patchContactByIdController),
);

contactsRouter.delete(
  "/:contactId",
  isValidId,
  ctrlWrapper(deleteContactByIdController),
);

export default contactsRouter;
