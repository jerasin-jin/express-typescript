import { Request, Response } from "express";
import validate from "../validate";
import { LoginRequest } from "../dto";
import { login } from "../services";
import { responseHandler } from "../utils";

export const loginController = async (req: Request, res: Response) => {
  const body = validate.validationSchema(LoginRequest, req.body);
  const user = await login(body);
  return responseHandler(res, { data: { token: user } });
};
