import Joi from "joi";

export const OrganizationRequest = {
  name: Joi.string().min(1).required(),
};
