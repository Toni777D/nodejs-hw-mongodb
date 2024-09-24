import UserCollection from "../db/models/User.js";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";
import {randomBytes} from "crypto";
import SessionCollection from "../db/models/Session.js";
import { accessTokenLifetime, refreshTokenLifetime } from "../constans/users.js";


export const register = async (payload) => {
    const {email, password} = payload;
    const user = await UserCollection.findOne({email});

    if(user) {
        throw createHttpError(409, "Email in use");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const data = await UserCollection.create({...payload, password: hashPassword});
    delete data._doc.password;
    return data._doc;
};

export const login = async(payload) => {
    const {email, password} = payload;

    const user = await UserCollection.findOne({email});
    if(!user) {
        throw createHttpError(401, "Email or password invalid");
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if(!passwordCompare) {
        throw createHttpError(401, "Email or password invalid");
    }

    await SessionCollection.deleteOne({userId: user._id});

    const accessToken = randomBytes(30).toString("base64");
    const refreshToken = randomBytes(30).toString("base64");
    const accessTokenValidUntil = new Date(Date.now() + accessTokenLifetime);
    const refreshTokenValidUntil = new Date(Date.now() + refreshTokenLifetime);

    const userSession = await SessionCollection.create({
        userId: user._id,
        accessToken,
        refreshToken,
        accessTokenValidUntil,
        refreshTokenValidUntil,
    });
    return userSession;
};

export const findSessionByAccessToken = accessToken => SessionCollection.findOne({accessToken});

export const findUser = filter => UserCollection.findOne(filter);
