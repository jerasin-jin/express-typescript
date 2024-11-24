import { Router } from "express";
import { createUserController, loginController } from "../controllers";

export const AuthenV1: Router = Router();

AuthenV1.route("/login").post(loginController);
AuthenV1.route("/register").post(createUserController);
