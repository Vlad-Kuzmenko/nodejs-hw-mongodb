import Joi from "joi";
import { typeList } from "../constants/contact-constants.js";

export const contactAddSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    "any.required": "title must be exist",
    "string.base": "title must be string",
  }),
  phoneNumber: Joi.string()
    .pattern(/^\+\d{12}$/)
    .required(),
  email: Joi.string().min(3).max(30).required(),
  isFavourite: Joi.boolean(),
  contactType: Joi.string()
    .valid(...typeList)
    .min(3)
    .max(20)
    .required(),
});

export const contactUpdateSchema = Joi.object({
  name: Joi.string().min(3).max(20),
  phoneNumber: Joi.string().pattern(/^\+\d{12}$/),
  email: Joi.string().min(3).max(20),
  isFavourite: Joi.boolean(),
  contactType: Joi.string()
    .valid(...typeList)
    .min(3)
    .max(20),
});
