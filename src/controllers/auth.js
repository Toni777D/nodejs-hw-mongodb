import * as authServices from "../services/auth.js";
import {requestResetToken} from "../services/auth.js";


const setupSession = (res, session) => {
    res.cookie("refreshToken", session.refreshToken, {
        httpOnly: true,
        expire: new Date(Date.now() + session.refreshTokenValidUntil),
    });

    res.cookie("sessionId", session._id, {
        httpOnly: true,
        expire: new Date(Date.now() + session.refreshTokenValidUntil),
    });
}
export const registerController = async(req, res) => {
    const newUser = await authServices.register(req.body);

    res.status(201).json({
        status: 201,
        message: "Succsessfuly registered a user!",
        data: newUser,
    });
};

export const loginController = async(req, res) => {
    const session = await authServices.login(req.body);
    setupSession(res, session);

    res.json({
        status: 200,
        message: "Successfuly logged in an user!",
        data: {
            accessToken: session.accessToken,
        }
    });
};

export const refreshController = async(req, res) => {
    const {refreshToken, sessionId} = req.cookies;

    const session = await authServices.refreshSession({refreshToken, sessionId});

    setupSession(res, session);

    res.json({
        status: 200,
        message: "Successfuly refreshed a session!",
        data: {
            accessToken: session.accessToken,
        }
    });
}
 export const logoutController = async(req, res) => {
    const {sessionId} = req.cookies;
    if(sessionId){
        await authServices.logout(sessionId);
    }

    res.clearCookie("sessionId");
    res.clearCookie("refreshToken");
    res.status(204).send();
 };

 export const requestResetEmailController = async(req, res) => {
    await requestResetToken(req.body.email)
    res.json({
        status: 200,
        message: "Reset password email has been successfully sent.",
        data: {},
    })
 }
