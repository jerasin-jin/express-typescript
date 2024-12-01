import { Router } from "express";
import { ExceptionGuard, JwtMiddlewareV2 } from "../middleware";
import { PermissionAction, PermissionModule } from "../utils";
import {
  createRoleController,
  getAllRolesController,
  getRoleDetailController,
  updateRoleController,
} from "../controllers/roleController";
const prefix = "role";
export const RoleRouteV1: Router = Router();

RoleRouteV1.get(
  `/${prefix}`,
  JwtMiddlewareV2({
    moduleName: PermissionModule.ROLE,
    action: PermissionAction.VIEW,
  }),
  ExceptionGuard(getAllRolesController)
);

RoleRouteV1.post(
  `/${prefix}`,
  JwtMiddlewareV2({
    moduleName: PermissionModule.ROLE,
    action: PermissionAction.VIEW,
  }),
  ExceptionGuard(createRoleController)
);

RoleRouteV1.get(
  `/${prefix}/:id`,
  JwtMiddlewareV2({
    moduleName: PermissionModule.ROLE,
    action: PermissionAction.VIEW,
  }),
  ExceptionGuard(getRoleDetailController)
);

RoleRouteV1.put(
  `/${prefix}/:id`,
  JwtMiddlewareV2({
    moduleName: PermissionModule.ROLE,
    action: PermissionAction.EDIT,
  }),
  ExceptionGuard(updateRoleController)
);
