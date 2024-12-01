import { Request, Response } from "express";
import { buildQueryPagination, paginationPermission } from "../services";
import { responseHandler } from "../utils";

export const getAllPermissionsController = async (
  req: Request,
  res: Response
) => {
  const response = await paginationPermission(buildQueryPagination(req));
  return responseHandler(res, { data: response });
};
