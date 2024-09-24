import Joi from "joi";
import { emailRegexp } from "../constans/users.js";


export const userRegisterSchema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(8).required(),
})

export const userLoginSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(8).required(),
})
