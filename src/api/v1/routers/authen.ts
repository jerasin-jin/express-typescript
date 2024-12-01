import { Router } from "express";
import { createUserController, loginController } from "../controllers";
import { ExceptionGuard } from "../middleware";
const prefix = "authen";
export const AuthenticationRouteV1: Router = Router();

AuthenticationRouteV1.route(`/${prefix}/login`).post(
  ExceptionGuard(loginController)
);
AuthenticationRouteV1.route(`/${prefix}/register`).post(
  ExceptionGuard(createUserController)
);
