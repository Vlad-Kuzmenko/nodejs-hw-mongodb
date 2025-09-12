import { Router } from "express";
import { validateBody } from "../middlewares/validateBody.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import {
  registerSchema,
  loginSchema,
  sendResetEmailSchema,
  resetPasswordSchema,
} from "../validation/authSchemas.js";
import {
  loginController,
  logoutUserController,
  refreshUserSessoinController,
  registerController,
  resetPasswordController,
  sendResetEmailController,
} from "../controllers/auth.js";

const authRouter = Router();

authRouter.post(
  "/register",
  validateBody(registerSchema),
  ctrlWrapper(registerController),
);

authRouter.post(
  "/login",
  validateBody(loginSchema),
  ctrlWrapper(loginController),
);

authRouter.post("/logout", ctrlWrapper(logoutUserController));

authRouter.post("/refresh", ctrlWrapper(refreshUserSessoinController));

authRouter.post(
  "/send-reset-email",
  validateBody(sendResetEmailSchema),
  ctrlWrapper(sendResetEmailController),
);

authRouter.post(
  "/reset-pwd",
  validateBody(resetPasswordSchema),
  ctrlWrapper(resetPasswordController),
);

export default authRouter;
