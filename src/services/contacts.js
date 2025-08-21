import ContactsCollection from "../db/models/Contacts.js";

export const getContacts = async () => ContactsCollection.find();

export const getContactById = async (id) => ContactsCollection.findById(id);

export const addContact = async (payload) => ContactsCollection.create(payload);

export const patchContactById = async (_id, payload) => {
  const result = await ContactsCollection.findOneAndUpdate({ _id }, payload, {
    new: true,
    includeResultMetadata: true,
  });

  return result;
};

export const deleteContactById = (id) =>
  ContactsCollection.findByIdAndDelete(id);
