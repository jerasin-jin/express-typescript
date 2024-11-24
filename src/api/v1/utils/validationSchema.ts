import Joi from "joi";
import { Response } from "express";
import { HttpException, HttpStatus } from "./httpException";

export const ValidationSchema = (
  res: Response,
  schema: Object,
  body: Object
) => {
  const validationSchema = Joi.object(schema);
  const { error, value } = validationSchema.validate(body);

  if (error) {
    throw new HttpException({
      statusCode: HttpStatus.BAD_REQUEST,
      message: error.message,
    });
  }
  return value;
};
