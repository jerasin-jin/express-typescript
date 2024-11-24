import { Request, Response, NextFunction } from "express";
import {
  createUser,
  paginationUser,
  findOneUser,
  updateUser,
  deleteUser,
} from "../services";
import { UpdateUserRequest, UserRequest, UserResponse } from "../dto";
import {
  HandleHttpException,
  HttpException,
  HttpStatus,
  Pagination,
  prisma,
  ValidationSchema,
} from "../utils";
import { User } from "@prisma/client";
import { PaginationSchema, ParamId } from "../dto";
// import { CustomRequest } from "../middleware";

export const getAllUsersController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("token", req.token);
    const querySchema = ValidationSchema(res, PaginationSchema, req.query);
    const { page, pageSize, sortField, sortValue } = querySchema;
    const query: Pagination<User> = {
      page,
      pageSize,
      sortField,
      sortValue,
      select: UserResponse,
    };
    const users = await paginationUser(query);
    const total = await prisma.user.countData({});
    const response = {
      page,
      pageSize,
      data: users,
      total,
    };
    res.json(response);
  } catch (e: unknown) {
    HandleHttpException(res, e);
  }
};

export const createUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = ValidationSchema(res, UserRequest, req.body);

    const user = await createUser(body);
    res.json(user);
  } catch (e: unknown) {
    HandleHttpException(res, e);
  }
};

export const getUserDetailController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const params = ValidationSchema(res, ParamId, req.params);
    const user = await findOneUser({ where: { id: params.id } });

    res.json(user);
  } catch (e: unknown) {
    HandleHttpException(res, e);
  }
};

export const updateUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const params = ValidationSchema(res, ParamId, req.params);
    const body = ValidationSchema(res, UpdateUserRequest, req.body);
    const user = await updateUser(params.id, body);

    res.json(user);
  } catch (e: unknown) {
    HandleHttpException(res, e);
  }
};

export const deleteUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const params = ValidationSchema(res, ParamId, req.params);
    const user = await deleteUser(params.id);

    res.json(user);
  } catch (e: unknown) {
    HandleHttpException(res, e);
  }
};
