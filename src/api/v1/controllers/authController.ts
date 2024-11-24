import { Request, Response, NextFunction } from "express";
import { HandleHttpException, ValidationSchema } from "../utils";
import { LoginRequest } from "../dto";
import { login } from "../services";

export const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = ValidationSchema(res, LoginRequest, req.body);
    const user = await login(body);
    res.json({ token: user });
  } catch (e: unknown) {
    HandleHttpException(res, e);
  }
};
