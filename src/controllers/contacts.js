import createHttpError from "http-errors";
import { notFoudHandler } from "../middlewares/notFoundHandler.js";
import {
  getContacts,
  getContactById,
  addContact,
  patchContactById,
  deleteContactById,
} from "../services/contacts.js";

export const getContactsController = async (req, res) => {
  const data = await getContacts();

  res.json({
    status: 200,
    message: "Successfully find contacts",
    data,
  });
};

export const getContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  const data = await getContactById(contactId);

  if (!data) {
    return notFoudHandler(req, res);
  }

  res.json({
    status: 200,
    message: `Successfully find contact with id=${contactId}`,
    data,
  });
};

export const addContactController = async (req, res) => {
  const data = await addContact(req.body);

  res.status(201).json({
    status: 201,
    message: "Successfully created a contact!",
    data,
  });
};

export const patchContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;

  const result = await patchContactById(contactId, req.body);

  if (!result || !result.value) {
    next(createHttpError(404, "Contact not found"));
    return;
  }

  res.json({
    status: 200,
    messasge: "Successfully patched a contact!",
    data: result.value,
  });
};

export const deleteContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;

  const data = await deleteContactById(contactId);

  if (!data) {
    next(createHttpError(404, "Contact not found"));
    return;
  }

  res.status(204).send();
};
