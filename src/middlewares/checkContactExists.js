import createHttpError from "http-errors";
import { getContact } from "../services/contacts.js";

export const checkContactExists = async (req, res, next) => {
  const { contactId: _id } = req.params;
  const { _id: userId } = req.user;

  const contact = await getContact({ _id, userId });

  if (!contact) {
    return next(createHttpError(404, "Contact not found"));
  }

  req.contact = contact;
  next();
};
