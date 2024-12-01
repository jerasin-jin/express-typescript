import { Permission } from "@prisma/client";
import { Pagination, prisma } from "../utils";

export const paginationPermission = async (query: Pagination<Permission>) => {
  return prisma.permission.pagination(query);
};
