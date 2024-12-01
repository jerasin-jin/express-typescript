import { RoleBody } from "../dto";
import { Prisma } from "@prisma/client";
import { HttpException, HttpStatus } from "../utils";

const createRoleAndPermission = async (
  tx: Prisma.TransactionClient,
  body: RoleBody,
  roleId: number
) => {
  if (body?.permissions == null || body.permissions.length == 0) return;

  const permissions = await tx.permission.findMany({
    where: {
      id: {
        in: body?.permissions ?? [],
      },
    },
  });

  if (permissions.length == 0) {
    throw new HttpException({
      statusCode: HttpStatus.NOT_FOUND,
      message: "Permission Is Not Found",
    });
  }

  const roleAndPermissions = permissions?.map((i) => {
    return {
      roleId: roleId,
      permissionId: i.id,
    };
  });

  await tx.roleAndPermission.createMany({ data: roleAndPermissions });
};

const updateRoleAndPermission = async (
  tx: Prisma.TransactionClient,
  body: RoleBody,
  roleId: number
) => {
  if (body?.permissions == null || body.permissions.length == 0) return;

  const permissions = await tx.permission.findMany({
    where: {
      id: {
        in: body?.permissions ?? [],
      },
    },
  });

  if (permissions.length == 0) {
    throw new HttpException({
      statusCode: HttpStatus.NOT_FOUND,
      message: "Permission Is Not Found",
    });
  }

  await tx.roleAndPermission.deleteMany({
    where: {
      roleId,
    },
  });

  const roleAndPermissions = permissions?.map((i) => {
    return {
      roleId: roleId,
      permissionId: i.id,
    };
  });

  console.log("roleAndPermissions", roleAndPermissions);
  await tx.roleAndPermission.createMany({ data: roleAndPermissions });
};

export default {
  createRoleAndPermission,
  updateRoleAndPermission,
};
