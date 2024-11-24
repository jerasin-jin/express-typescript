import { Router } from "express";
import {
  getAllUsersController,
  createUserController,
  getUserDetailController,
  updateUserController,
  deleteUserController,
} from "../controllers";
import { JwtMiddleware, JwtMiddlewareV2 } from "../middleware";
import { PermissionAction } from "../utils";
export const UserV1: Router = Router();

UserV1.get(
  "/",
  JwtMiddlewareV2({ moduleName: "user", action: PermissionAction.VIEW }),
  getAllUsersController
);

UserV1.post(
  "/",
  JwtMiddlewareV2({ moduleName: "user", action: PermissionAction.CREATE }),
  createUserController
);

UserV1.get(
  "/:id",
  JwtMiddlewareV2({ moduleName: "user", action: PermissionAction.VIEW }),
  getUserDetailController
);

UserV1.put(
  "/:id",
  JwtMiddlewareV2({ moduleName: "user", action: PermissionAction.EDIT }),
  updateUserController
);

UserV1.use(
  JwtMiddlewareV2({ moduleName: "user", action: PermissionAction.DELETE })
)
  .route("/:id")
  .delete(deleteUserController);
