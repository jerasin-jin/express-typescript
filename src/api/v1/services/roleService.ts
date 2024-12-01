import { Prisma, PrismaClient, Role, RoleAndPermission } from "@prisma/client";
import {
  BuildQuery,
  HttpException,
  HttpStatus,
  Pagination,
  prisma,
} from "../utils";
import { RoleBody } from "../dto";
import roleAndPermissionService from "./roleAndPermissionService";

export const paginationRole = async (query: Pagination<Role>) => {
  return prisma.role.pagination(query);
};

export const createRole = async (body: RoleBody) => {
  return prisma.$transaction(async (tx: any) => {
    const role = await tx.role.findFirst({ where: { name: body.name } });

    if (role != null) {
      throw new HttpException({ statusCode: 400, message: "User Is Exists" });
    }
    const newRole = await tx.role.create({ data: { name: body.name } });
    await roleAndPermissionService.createRoleAndPermission(
      tx,
      body,
      newRole.id
    );
    return newRole;
  });
};

export const findOneRole = async (
  buildQuery: BuildQuery<Role>
): Promise<Role> => {
  const data = await prisma.role.findOne(buildQuery);

  if (data == null) {
    throw new HttpException({
      statusCode: HttpStatus.NOT_FOUND,
      schema: "role",
    });
  }

  return data;
};

export const updateRole = async (id: number, body: RoleBody) => {
  return prisma.$transaction(async (tx: any) => {
    const role = await tx.role.findFirst({
      where: { id },
      select: {
        id: true,
        RoleAndPermission: true,
      },
    });

    if (role == null) {
      throw new HttpException({ statusCode: HttpStatus.NOT_FOUND });
    }

    await roleAndPermissionService.updateRoleAndPermission(tx, body, id);

    if (role.name != body.name) {
      await tx.role.update({ where: { id }, data: { name: body.name } });
    }
  });
};
