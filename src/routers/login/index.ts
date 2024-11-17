import { Router, Request, Response } from "express";
import { HandleHttpException, ValidationSchema } from "../../utils";
import Joi from "joi";

const routes: Router = Router();

routes.post("/", async (req: Request, res: Response) => {
  try {
    const body = ValidationSchema(
      res,
      {
        email: Joi.string().min(1).email().required(),
        password: Joi.string().min(1).required(),
      },
      req.body
    );
  } catch (e: unknown) {
    HandleHttpException(res, e);
  }
});

export default routes;
