import { Organization } from "@prisma/client";
import {
  BuildQuery,
  HttpException,
  HttpStatus,
  Pagination,
  prisma,
} from "../utils";

export const createOrganization = async (body: Organization) => {
  return prisma.$transaction(async (tx) => {
    const organization = await tx.organization.findFirst({
      where: { name: body.name },
    });

    if (organization != null) {
      throw new HttpException({
        statusCode: 400,
        message: "Organization Is Exists",
      });
    }

    return tx.organization.create({ data: body });
  });
};

export const findOneOrganization = async (
  buildQuery: BuildQuery<Organization>
) => {
  const data = await prisma.organization.findOne(buildQuery);

  if (data == null) {
    throw new HttpException({
      statusCode: HttpStatus.NOT_FOUND,
      schema: "organization",
    });
  }

  return data;
};

export const paginationOrganization = async (
  query: Pagination<Organization>
) => {
  return prisma.organization.pagination(query);
};

export const deleteOrganization = async (id: number) => {
  return prisma.$transaction(async (tx) => {
    const organization = await tx.organization.findFirst({ where: { id } });

    if (organization == null) {
      throw new HttpException({ statusCode: HttpStatus.NOT_FOUND });
    }

    const body = {
      deleted: true,
    };

    return tx.organization.update({ where: { id }, data: body });
  });
};
