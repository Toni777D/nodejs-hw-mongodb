import * as authServices from "../services/auth.js";

export const registerController = async(req, res) => {
    const newUser = await authServices.register(req.body);

    res.status(201).json({
        status: 201,
        message: "Succsessfuly registered a user!",
        data: {
            username: newUser,
        },
    })
}
export const loginController = async(req, res) => {
    const session = await authServices.login(req.body);

    res.cookie("refresh", session.refreshToken, {
        httpOnly: true,
        expire: new Date(Date.now() + session.refreshTokenValidUntil),
    });

    res.json({
        status: 200,
        message: "Successfuly logged in an user!",
        data: {
            accessToken: session.accessToken,
        }
    })
};
