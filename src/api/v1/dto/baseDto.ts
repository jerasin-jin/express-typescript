import Joi from "joi";

export const ParamId = {
  id: Joi.number().min(1).required(),
};

export const PaginationSchema = {
  page: Joi.number().default(1),
  pageSize: Joi.number().default(10),
  sortField: Joi.string().default("updatedAt"),
  sortValue: Joi.string().default("desc"),
};
