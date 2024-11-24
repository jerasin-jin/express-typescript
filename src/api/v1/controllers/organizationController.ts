import { Request, Response, NextFunction } from "express";
import {
  HandleHttpException,
  Pagination,
  prisma,
  ValidationSchema,
} from "../utils";
import { OrganizationRequest, PaginationSchema } from "../dto";
import { createOrganization, paginationOrganization } from "../services";
import { Organization } from "@prisma/client";

export const organizationControllerInit = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = ValidationSchema(res, OrganizationRequest, req.body);
    const user = await createOrganization(body);
    res.json({ token: user });
  } catch (e: unknown) {
    HandleHttpException(res, e);
  }
};

export const getAllOrganizationsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("token", req.token);
    const querySchema = ValidationSchema(res, PaginationSchema, req.query);
    const { page, pageSize, sortField, sortValue } = querySchema;
    const query: Pagination<Organization> = {
      page,
      pageSize,
      sortField,
      sortValue,
      // select: UserResponse,
    };
    const organization = await paginationOrganization(query);
    const total = await prisma.organization.countData({});

    const response = {
      page,
      pageSize,
      data: organization,
      total,
    };
    res.json(response);
  } catch (e: unknown) {
    HandleHttpException(res, e);
  }
};
