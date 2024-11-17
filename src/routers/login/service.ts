import { HttpException } from "../../utils";
import { Login } from "./interface";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const login = async (body: Login) => {
  const user = await prisma.user.findFirst({ where: { email: body.email } });

  if (user == null) {
    throw new HttpException({ statusCode: 404 });
  }

  const saltRounds = process.env.SALT != null ? parseInt(process.env.SALT) : 10;
  const newPassword = await bcrypt.compare(body.password, user.);
};
