import {Router} from "express";
import ctrlWrapper from "../utils/ctrlWrapper.js";
import validateBody from "../utils/validateBody.js";
import {userLoginSchema, userRegisterSchema} from "../validation/users.js";
import * as authControllers from "../controllers/auth.js";

const authRouter = Router();

authRouter.post("/register", validateBody(userRegisterSchema), ctrlWrapper(authControllers.registerController));
authRouter.post("/login", validateBody(userLoginSchema), ctrlWrapper(authControllers.loginController))
authRouter.post("/refresh", ctrlWrapper(authControllers.refreshController));
authRouter.post("/logout", ctrlWrapper(authControllers.logoutController));

export default authRouter;
