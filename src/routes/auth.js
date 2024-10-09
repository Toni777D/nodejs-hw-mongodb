import {Router} from "express";
import ctrlWrapper from "../utils/ctrlWrapper.js";
import validateBody from "../utils/validateBody.js";
import {userLoginSchema, userRegisterSchema, userLoginWithGoogleOAuthSchema} from "../validation/users.js";
import * as authControllers from "../controllers/auth.js";
import { requestResetEmailSchema } from "../validation/users.js";
import { requestResetEmailController } from "../controllers/auth.js";
import { resetPasswordSchema } from "../validation/users.js";
import { resetPasswordController } from "../controllers/auth.js";

const authRouter = Router();

authRouter.post("/register", validateBody(userRegisterSchema), ctrlWrapper(authControllers.registerController));

authRouter.post("/login", validateBody(userLoginSchema), ctrlWrapper(authControllers.loginController));

authRouter.post("/refresh", ctrlWrapper(authControllers.refreshController));

authRouter.post("/logout", ctrlWrapper(authControllers.logoutController));

authRouter.post("/send-reset-email", validateBody(requestResetEmailSchema), ctrlWrapper(requestResetEmailController));

authRouter.post("/reset-pwd", validateBody(resetPasswordSchema), ctrlWrapper(resetPasswordController));

authRouter.get("/google-oauth-url", ctrlWrapper(authControllers.getGoogleOAuthUrlController));

authRouter.post("/confirm-google", validateBody(userLoginWithGoogleOAuthSchema), ctrlWrapper(authControllers.loginWithGoogleOAuthController))

export default authRouter;
