import ContactsCollection from "../db/models/Contacts.js";
import { calcPaginationData } from "../utils/calcPaginationData.js";

export const getContacts = async ({
  page = 1,
  perPage = 10,
  sortBy,
  sortOrder = "asc",
  filters = {},
}) => {
  const skip = (page - 1) * perPage;
  const query = ContactsCollection.find(filters);

  if (filters.userId) {
    query.where("userId").equals(filters.userId);
  }

  if (filters.contactType) {
    query.where("contactType").equals(filters.contactType);
  }
  if (filters.isFavourite) {
    query.where("isFavourite").equals(filters.isFavourite);
  }

  const data = await query
    .skip(skip)
    .limit(perPage)
    .sort({ [sortBy]: sortOrder });

  const totalItems = await ContactsCollection.countDocuments(filters);
  const paginationData = calcPaginationData({ page, perPage, totalItems });

  return {
    ...paginationData,
    data,
  };
};

export const getContact = async (query) => ContactsCollection.findOne(query);
export const addContact = async (payload) => ContactsCollection.create(payload);
export const patchContact = async (query, payload) => {
  return await ContactsCollection.findOneAndUpdate(query, payload, {
    new: true,
    includeResultMetadata: true,
  });
};

export const deleteContact = async (query) => {
  return await ContactsCollection.findOneAndDelete(query);
};
