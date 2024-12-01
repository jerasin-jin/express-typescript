import { Router } from "express";
import {
  getAllUsersController,
  createUserController,
  getUserDetailController,
  updateUserController,
  deleteUserController,
} from "../controllers";
import { ExceptionGuard, JwtMiddleware, JwtMiddlewareV2 } from "../middleware";
import { PermissionAction, PermissionModule } from "../utils";
export const UserRouteV1: Router = Router();
const prefix = "user";

UserRouteV1.get(
  `/${prefix}`,
  JwtMiddlewareV2({
    moduleName: PermissionModule.USER,
    action: PermissionAction.VIEW,
  }),
  ExceptionGuard(getAllUsersController)
);

UserRouteV1.post(
  `/${prefix}`,
  JwtMiddlewareV2({
    moduleName: PermissionModule.USER,
    action: PermissionAction.CREATE,
  }),
  ExceptionGuard(createUserController)
);

UserRouteV1.get(
  `/${prefix}/:id`,
  JwtMiddlewareV2({
    moduleName: PermissionModule.USER,
    action: PermissionAction.VIEW,
  }),
  ExceptionGuard(getUserDetailController)
);

UserRouteV1.put(
  `/${prefix}/:id`,
  JwtMiddlewareV2({
    moduleName: PermissionModule.USER,
    action: PermissionAction.EDIT,
  }),
  ExceptionGuard(updateUserController)
);

UserRouteV1.delete(
  `/${prefix}/:id`,
  JwtMiddlewareV2({
    moduleName: PermissionModule.USER,
    action: PermissionAction.DELETE,
  }),
  ExceptionGuard(deleteUserController)
);
