import Joi from "joi";

export const RoleRequest = {
  name: Joi.string().min(1).required(),
  permissions: Joi.array().items(Joi.number().default([])),
};

export interface RoleBody {
  name: string;
  permissions: number[];
}
