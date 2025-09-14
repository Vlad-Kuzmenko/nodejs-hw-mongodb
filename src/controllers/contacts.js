import {
  getContacts,
  getContact,
  addContact,
  deleteContact,
  patchContact,
} from "../services/contacts.js";
import { parsePaginationParams } from "../utils/parsePaginationParams.js";
import { parseSortParams } from "../utils/parseSortParams.js";
import { contactFields } from "../db/models/Contacts.js";
import { parseContactFilter } from "../utils/parseContactFilter.js";
import { saveFileToUploadDir } from "../utils/saveFileToUploadDir.js";
import { getEnvVar } from "../utils/getEnvVar.js";
import { saveFileToCloudinary } from "../utils/saveFileToCloudinary.js";

export const getContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query, contactFields);
  const filters = parseContactFilter(req.query);
  const { _id: userId } = req.user;

  const data = await getContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filters: { ...filters, userId },
  });

  res.json({
    status: 200,
    message: "Successfully found contacts",
    data,
  });
};

export const getContactByIdController = async (req, res) => {
  const { contactId: _id } = req.params;
  const { _id: userId } = req.user;

  const data = await getContact({ _id, userId });

  if (!data) {
    throw createHttpError(404, "Contact not found");
  }

  res.json({
    status: 200,
    message: `Successfully find contact with id=${_id}`,
    data,
  });
};

export const addContactController = async (req, res) => {
  const { _id: userId } = req.user;
  const photo = req.file;

  let photoUrl;

  if (photo) {
    if (getEnvVar("ENABLE_CLOUDINARY") === "true") {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }

  const data = await addContact({
    ...req.body,
    userId,
    photo: photoUrl,
  });

  res.status(201).json({
    status: 201,
    message: "Successfully created a contact!",
    data,
  });
};

export const patchContactByIdController = async (req, res) => {
  const { contactId: _id } = req.params;
  const { _id: userId } = req.user;
  const photo = req.file;

  const updateData = { ...req.body };

  if (photo) {
    if (getEnvVar("ENABLE_CLOUDINARY") === "true") {
      updateData.photo = await saveFileToCloudinary(photo);
    } else {
      updateData.photo = await saveFileToUploadDir(photo);
    }
  }

  const result = await patchContact({ _id, userId }, updateData);

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

export const deleteContactByIdController = async (req, res) => {
  const { contactId: _id } = req.params;
  const { _id: userId } = req.user;

  const data = await deleteContact({ _id, userId });

  if (!data) {
    next(createHttpError(404, "Contact not found"));
    return;
  }
  res.status(204).send();
};
