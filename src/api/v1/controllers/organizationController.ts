import { Request, Response } from "express";
import validate from "../validate";
import { OrganizationRequest, ParamId } from "../dto";
import {
  buildQueryPagination,
  createOrganization,
  deleteOrganization,
  findOneOrganization,
  paginationOrganization,
} from "../services";
import { responseHandler } from "../utils";

export const createOrganizationControllerInit = async (
  req: Request,
  res: Response
) => {
  const body = validate.validationSchema(OrganizationRequest, req.body);
  const organization = await createOrganization(body);
  return responseHandler(res, { data: organization });
};

export const getAllOrganizationsController = async (
  req: Request,
  res: Response
) => {
  const response = await paginationOrganization(buildQueryPagination(req));
  return responseHandler(res, { data: response });
};

export const getOrganizationDetailController = async (
  req: Request,
  res: Response
) => {
  const params = validate.validationSchema(ParamId, req.params);
  const organization = await findOneOrganization({
    where: { id: params.id },
    select: {
      id: true,
      name: true,
      isActive: true,
    },
  });

  return responseHandler(res, { data: organization });
};

export const createOrganizationController = async (
  req: Request,
  res: Response
) => {
  const body = validate.validationSchema(OrganizationRequest, req.body);
  const organization = await createOrganization(body);
  return responseHandler(res, { data: organization });
};

export const deleteOrganizationController = async (
  req: Request,
  res: Response
) => {
  const params = validate.validationSchema(ParamId, req.params);
  await deleteOrganization(params.id);
  return responseHandler(res);
};
