import { prisma } from "../utils";

export const initPermission = async () => {
  const data: any = [
    {
      module: "user",
      action: "view",
    },
    {
      module: "user",
      action: "create",
    },
    {
      module: "user",
      action: "edit",
    },
    {
      module: "user",
      action: "delete",
    },
  ];

  const permissions = await prisma.permission.findMany({
    where: {
      module: "user",
    },
  });

  if (permissions.length === 0) {
    prisma.permission.createMany({ data });
  }
};

export const initRole = async () => {
  const data: any = {
    name: "admin",
  };

  const permissions = await prisma.role.findMany({
    where: {
      name: "admin",
    },
  });

  if (permissions.length === 0) {
    prisma.role.createMany({ data });
  }
};

export const initRoleAndPermission = async () => {
  const permissions = await prisma.permission.findMany();
  const role = await prisma.role.findFirst();
  const initRoleAndPermission: any = permissions.map((item) => ({
    roleId: role?.id,
    permissionId: item.id,
  }));

  const roleAndPermissions = await prisma.roleAndPermission.findMany();

  if (roleAndPermissions.length === 0) {
    return prisma.roleAndPermission.createMany({ data: initRoleAndPermission });
  }
};

export const initMaster = async () => {
  await initPermission();
  await initRole();
  await initRoleAndPermission();
};
