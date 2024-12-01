import { Prisma, PrismaClient } from "@prisma/client";

export interface BuildQuery<T> {
  where?: Prisma.Args<T, "findMany">["where"];
  select?: Prisma.Args<T, "findMany">["select"];
  include?: Prisma.Args<T, "findMany">["include"];
}

export interface Pagination<T> {
  page: number;
  pageSize: number;
  sortField: string;
  sortValue: string;
  where?: Prisma.Args<T, "findMany">["where"];
  select?: Prisma.Args<T, "findMany">["select"];
}

export const prisma = new PrismaClient().$extends({
  model: {
    $allModels: {
      async pagination<T>(this: T, buildQuery: Pagination<T>): Promise<T> {
        const { page, pageSize, sortField, sortValue, select } =
          buildQuery ?? {};
        const context = Prisma.getExtensionContext(this);
        const skip = (page - 1) * pageSize;
        const take = pageSize;
        const sortQuery: Record<string, any> = {};
        sortQuery[`${sortField}`] = sortValue;
        const where = { ...buildQuery.where, deleted: false };

        const result = await (context as any).findMany({
          where,
          skip,
          take,
          orderBy: sortQuery,
          select,
        });
        return result;
      },
      async findOne<T>(this: T, buildQuery: BuildQuery<T>) {
        const where = { ...buildQuery.where, deleted: false };
        const context = Prisma.getExtensionContext(this);
        return (context as any).findFirst({ ...buildQuery, where });
      },
      async countData<T>(this: T, buildQuery: BuildQuery<T>) {
        const where = { ...buildQuery.where, deleted: false };
        const context = Prisma.getExtensionContext(this);
        return (context as any).count({ ...buildQuery, where });
      },
    },
  },
});
