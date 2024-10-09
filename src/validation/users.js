import Joi from "joi";
import { emailRegexp } from "../constans/users.js";


export const userRegisterSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(8).required(),
})

export const userLoginSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(8).required(),
})

export const requestResetEmailSchema = Joi.object({
    email: Joi.string().email().required(),
})

export const resetPasswordSchema = Joi.object({
    password: Joi.string().required(),
    token: Joi.string().required(),
})

export const userLoginWithGoogleOAuthSchema = Joi.object({
    code: Joi.string().required(),
})
