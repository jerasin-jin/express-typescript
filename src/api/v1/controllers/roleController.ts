import { Request, Response } from "express";
import validate from "../validate";
import { ParamId, RoleRequest } from "../dto";
import {
  buildQueryPagination,
  createRole,
  findOneRole,
  paginationRole,
  updateRole,
} from "../services";
import { responseHandler } from "../utils";

export const getAllRolesController = async (req: Request, res: Response) => {
  const response = await paginationRole(buildQueryPagination(req));
  return responseHandler(res, { data: response });
};

export const createRoleController = async (req: Request, res: Response) => {
  const body = validate.validationSchema(RoleRequest, req.body);
  const role = await createRole(body);
  return responseHandler(res, { data: role });
};

export const getRoleDetailController = async (req: Request, res: Response) => {
  const params = validate.validationSchema(ParamId, req.params);
  const role = await findOneRole({
    where: { id: params.id },
    select: {
      id: true,
      name: true,
      isActive: true,
      RoleAndPermission: {
        select: {
          permission: {
            select: {
              id: true,
              module: true,
              action: true,
            },
          },
        },
      },
    },
  });

  return responseHandler(res, { data: role });
};

export const updateRoleController = async (req: Request, res: Response) => {
  const params = validate.validationSchema(ParamId, req.params);
  const body = validate.validationSchema(RoleRequest, req.body);
  await updateRole(params.id, body);

  return responseHandler(res);
};
