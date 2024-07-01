import express from "express";

import isEmptyBody from "../middlewares/isEmptyBody.js";
import validateBody from "../decorators/validateBody.js";
import {
  authRegisterSchema,
  authSigninSchema,
  authEmailSchema,
} from "../schemas/authSchemas.js";
import authControllers from "../controllers/authControllers.js";
import authenticate from "../middlewares/authenticate.js";
import upload from "../middlewares/upload.js";
import resizeAvatar from "../middlewares/resizeAvatar.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  upload.single("avatar"),
  resizeAvatar,
  isEmptyBody,
  validateBody(authRegisterSchema),
  authControllers.register
);

authRouter.post(
  "/login",
  isEmptyBody,
  validateBody(authSigninSchema),
  authControllers.login
);

authRouter.get("/verify/:verificationToken", authControllers.verify);

authRouter.post(
  "/verify",
  isEmptyBody,
  validateBody(authEmailSchema),
  authControllers.resendEmail
);

authRouter.post("/logout", authenticate, authControllers.logout);

authRouter.get("/current", authenticate, authControllers.getCurrent);

authRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  resizeAvatar,
  authControllers.updateAvatar
);

export default authRouter;
