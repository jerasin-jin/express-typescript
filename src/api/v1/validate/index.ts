import Joi from "joi";
import { HttpException, HttpStatus } from "../utils";

const validationSchema = (schema: Object, body: Object) => {
  const validationSchema = Joi.object(schema);
  const { error, value } = validationSchema.validate(body, {
    allowUnknown: true,
  });

  if (error) {
    throw new HttpException({
      statusCode: HttpStatus.BAD_REQUEST,
      message: error.message,
    });
  }
  return value;
};

export default {
  validationSchema,
};
