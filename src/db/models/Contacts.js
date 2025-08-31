import { Schema, model } from "mongoose";
import { typeList } from "../../constants/contact-constants.js";

const contactsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    isFavourite: {
      type: Boolean,
      default: false,
    },
    contactType: {
      type: String,
      required: true,
      enum: typeList,
      default: "personal",
    },
  },
  { versionKey: false, timestamps: true },
);

export const contactFields = ["name", "phoneNumber", "email"];

const ContactsCollection = model("contact", contactsSchema);
export default ContactsCollection;
