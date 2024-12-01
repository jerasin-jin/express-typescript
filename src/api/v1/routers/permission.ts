import { Router } from "express";
import { ExceptionGuard, JwtMiddlewareV2 } from "../middleware";
import { getAllPermissionsController } from "../controllers";
import { PermissionAction, PermissionModule } from "../utils";

export const PermissionRouteV1: Router = Router();

PermissionRouteV1.get(
  "/",
//   JwtMiddlewareV2({
//     moduleName: PermissionModule.PERMISSION,
//     action: PermissionAction.VIEW,
//   }),
  ExceptionGuard(getAllPermissionsController)
);
