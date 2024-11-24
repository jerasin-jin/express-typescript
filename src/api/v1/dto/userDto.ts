import Joi from "joi";

export const UserRequest = {
  email: Joi.string().min(1).email().required(),
  password: Joi.string().min(1).required(),
  firstName: Joi.string().min(1).required(),
  lastName: Joi.string().min(1).required(),
  age: Joi.number().min(1).required(),
  organizationId: Joi.number().min(1).required(),
  roleId: Joi.number().min(1).required(),
};

export const UpdateUserRequest = {
  email: Joi.string().min(1).email(),
  firstName: Joi.string().min(1),
  lastName: Joi.string().min(1),
  age: Joi.number().min(1),
  organizationId: Joi.number().min(1),
  roleId: Joi.number().min(1),
};

export const UserResponse = {
  id: true,
  email: true,
  firstName: true,
  lastName: true,
  age: true,
};
