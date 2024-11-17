import { Router, Request, Response } from "express";
import { createUser, findMany } from "./service";
import Joi from "joi";
import { ValidationSchema } from "../../utils/validationSchema";
import { HandleHttpException, HttpException, HttpStatus } from "../../utils";

const routes: Router = Router();

routes.get("/", async (req: Request, res: Response) => {
  try {
    const users = await findMany();
    res.json(users);
  } catch (e: unknown) {
    HandleHttpException(res, e);
  }
});

routes.post("/", async (req: Request, res: Response) => {
  try {
    const body = ValidationSchema(
      res,
      {
        email: Joi.string().min(1).email().required(),
        password: Joi.string().min(1).required(),
        firstName: Joi.string().min(1).required(),
        lastName: Joi.string().min(1).required(),
        age: Joi.number().min(1).required(),
      },
      req.body
    );

    const user = await createUser(body);

    res.json(user);
  } catch (e: unknown) {
    HandleHttpException(res, e);
  }
});

export default routes;
