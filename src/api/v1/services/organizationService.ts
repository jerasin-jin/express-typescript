import { Organization } from "@prisma/client";
import { HttpException, HttpStatus, Pagination, prisma } from "../utils";

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

export const findOneOrganization = async (user: Partial<Organization>) => {
  const data = await prisma.organization.findOne({ where: user });

  if (data == null) {
    throw new HttpException({
      statusCode: HttpStatus.NOT_FOUND,
      schema: "user",
    });
  }

  return data;
};

export const paginationOrganization = async (
  query: Pagination<Organization>
) => {
  return prisma.organization.pagination(query);
};
