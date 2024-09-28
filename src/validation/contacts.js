import Joi from "joi";
import { contactTypeList } from "../constans/contacts.js";

export const contactAddSchema = Joi.object({
    name: Joi.string().min(3).max(30).required().messages({
        "string.min": "Username should have at least 3 characters",
        "string.max": "Username should have at most 20 characters",
        "any.required": "name must be exist"
    }),
    phoneNumber: Joi.string().required(),
    email: Joi.string(),
    isFavourite: Joi.boolean(),
    contactType: Joi.string().min(3).max(20).valid(...contactTypeList).required()
})

export const contactPatchSchema = Joi.object({
    name: Joi.string().messages({
        "string.min": "Username should have at least 3 characters",
        "string.max": "Username should have at most 20 characters"
    }),
    phoneNumber: Joi.string(),
    email: Joi.string(),
    isFavourite: Joi.boolean(),
    contactType: Joi.string().valid(...contactTypeList)
})
