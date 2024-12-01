import { Request, Response } from "express";
import { Pagination } from "../utils";
import { PaginationSchema } from "../dto";
import validate from "../validate";

interface BuildQueryOptions {
  model?: any;
  where?: Record<string, any>;
}

export const buildQueryPagination = <T>(
  req: Request,
  options?: BuildQueryOptions
) => {
  const querySchema = validate.validationSchema(PaginationSchema, req.query);
  const { page, pageSize, sortField, sortValue } = querySchema;
  const query: Pagination<T> = {
    page,
    pageSize,
    sortField,
    sortValue,
    select: options?.model,
    where: options?.where,
  };

  return query;
};
