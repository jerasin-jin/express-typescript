import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import {
  BuildQuery,
  HttpException,
  HttpStatus,
  Pagination,
  prisma,
} from "../utils";
dotenv.config();

export const paginationUser = async (query: Pagination<User>) => {
  return prisma.user.pagination(query);
};

export const findOneUser = async (
  buildQuery: BuildQuery<User>
): Promise<User> => {
  const data = await prisma.user.findOne(buildQuery);

  if (data == null) {
    throw new HttpException({
      statusCode: HttpStatus.NOT_FOUND,
      schema: "user",
    });
  }

  return data;
};

export const createUser = async (body: User) => {
  return prisma.$transaction(async (tx) => {
    const user = await tx.user.findFirst({ where: { email: body.email } });

    if (user != null) {
      throw new HttpException({ statusCode: 400, message: "User Is Exists" });
    }

    const organization = await tx.organization.findOne({
      where: { id: body.organizationId },
    });

    console.log("organization", organization);

    if (organization == null) {
      throw new HttpException({
        statusCode: HttpStatus.NOT_FOUND,
        message: "Organization Is Not Found",
      });
    }

    const role = await tx.role.findOne({
      where: { id: body.roleId },
    });

    if (role == null) {
      throw new HttpException({
        statusCode: HttpStatus.NOT_FOUND,
        message: "Role Is Not Found",
      });
    }

    const saltRounds =
      process.env.SALT != null ? parseInt(process.env.SALT) : 10;
    const newPassword = await bcrypt.hash(body.password, saltRounds);
    body.password = newPassword;

    return tx.user.create({ data: body });
  });
};

export const updateUser = async (id: number, body: User) => {
  return prisma.$transaction(async (tx) => {
    const user = await tx.user.findFirst({ where: { id } });

    if (user == null) {
      throw new HttpException({ statusCode: HttpStatus.NOT_FOUND });
    }

    if (body.organizationId != null) {
      const organization = await tx.organization.findOne({
        where: { id: body.organizationId },
      });

      console.log("organization", organization);

      if (organization == null) {
        throw new HttpException({
          statusCode: HttpStatus.NOT_FOUND,
          message: "Organization Is Not Found",
        });
      }
    }

    if (body.roleId != null) {
      const role = await tx.role.findOne({
        where: { id: body.roleId },
      });

      if (role == null) {
        throw new HttpException({
          statusCode: HttpStatus.NOT_FOUND,
          message: "Role Is Not Found",
        });
      }
    }

    return tx.user.update({ where: { id }, data: body });
  });
};

export const deleteUser = async (id: number) => {
  return prisma.$transaction(async (tx) => {
    const user = await tx.user.findFirst({ where: { id } });

    if (user == null) {
      throw new HttpException({ statusCode: HttpStatus.NOT_FOUND });
    }

    const body = {
      deleted: true,
    };

    return tx.user.update({ where: { id }, data: body });
  });
};
