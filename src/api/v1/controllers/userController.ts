import { Request, Response } from "express";
import {
  createUser,
  paginationUser,
  findOneUser,
  updateUser,
  deleteUser,
  buildQueryPagination,
} from "../services";
import { UpdateUserRequest, UserRequest, UserResponse } from "../dto";
import validate from "../validate";
import { ParamId } from "../dto";
import { responseHandler } from "../utils";

export const getAllUsersController = async (req: Request, res: Response) => {
  const response = await paginationUser(
    buildQueryPagination(req, { model: UserResponse })
  );

  return responseHandler(res, { data: response });
};

export const createUserController = async (req: Request, res: Response) => {
  const body = validate.validationSchema(UserRequest, req.body);

  const user = await createUser(body);
  return responseHandler(res, { data: user });
};

export const getUserDetailController = async (req: Request, res: Response) => {
  const params = validate.validationSchema(ParamId, req.params);
  const user = await findOneUser({ where: { id: params.id } });

  return responseHandler(res, { data: user });
};

export const updateUserController = async (req: Request, res: Response) => {
  const params = validate.validationSchema(ParamId, req.params);
  const body = validate.validationSchema(UpdateUserRequest, req.body);
  const user = await updateUser(params.id, body);

  return responseHandler(res, { data: user });
};

export const deleteUserController = async (req: Request, res: Response) => {
  const params = validate.validationSchema(ParamId, req.params);
  const user = await deleteUser(params.id);

  return responseHandler(res, { data: user });
};
