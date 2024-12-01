import { Router } from "express";
import {
  createOrganizationController,
  getAllOrganizationsController,
  createOrganizationControllerInit,
  getOrganizationDetailController,
  deleteOrganizationController,
} from "../controllers";
import { ExceptionGuard, JwtMiddlewareV2 } from "../middleware";
import { PermissionAction, PermissionModule } from "../utils";
const prefix = "organization";
export const OrganizationRouteV1: Router = Router();

OrganizationRouteV1.get(
  `/${prefix}`,
  JwtMiddlewareV2({
    moduleName: PermissionModule.ORGANIZATION,
    action: PermissionAction.VIEW,
  }),
  ExceptionGuard(getAllOrganizationsController)
);

OrganizationRouteV1.post(
  `/${prefix}`,
  JwtMiddlewareV2({
    moduleName: PermissionModule.ORGANIZATION,
    action: PermissionAction.CREATE,
  }),
  ExceptionGuard(createOrganizationController)
);

OrganizationRouteV1.post(
  `/${prefix}/init`,
  ExceptionGuard(createOrganizationControllerInit)
);

OrganizationRouteV1.get(
  `/${prefix}/:id`,
  JwtMiddlewareV2({
    moduleName: PermissionModule.ORGANIZATION,
    action: PermissionAction.VIEW,
  }),
  ExceptionGuard(getOrganizationDetailController)
);

OrganizationRouteV1.delete(
  `/${prefix}/:id`,
  JwtMiddlewareV2({
    moduleName: PermissionModule.ORGANIZATION,
    action: PermissionAction.VIEW,
  }),
  ExceptionGuard(deleteOrganizationController)
);
