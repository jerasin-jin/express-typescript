import Joi from "joi";

export const LoginRequest = {
  email: Joi.string().min(1).email().required(),
  password: Joi.string().min(1).required(),
};

