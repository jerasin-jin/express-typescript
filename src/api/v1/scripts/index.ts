import { PermissionModule, prisma } from "../utils";

export const initPermission = async () => {
  const data: any[] = [
    {
      action: "view",
    },
    {
      action: "create",
    },
    {
      action: "edit",
    },
    {
      action: "delete",
    },
  ];

  const mapping: any = [];
  const modules = [];
  for (let [key, value] of Object.entries(PermissionModule)) {
    console.log(`${key}: ${value}`);
    data.forEach((i) => {
      mapping.push({
        action: i.action,
        module: value,
      });
    });

    modules.push(value);
  }

  console.log("modules", modules);

  const permissions = await prisma.permission.findMany({
    where: {
      module: {
        in: modules,
      },
    },
  });

  if (permissions.length === 0) {
    await prisma.permission.createMany({ data: mapping });
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
    await prisma.role.createMany({ data });
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
