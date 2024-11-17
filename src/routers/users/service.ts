import { PrismaClient } from "@prisma/client";
import { Pagination } from "../base";
import { HttpException } from "../../utils";
import bcrypt from "bcrypt";
import { User } from "./interface";
import dotenv from "dotenv";
dotenv.config();

const prisma = new PrismaClient();

export const findMany = async (query?: Pagination) => {
  let users;
  if (query == null) {
    users = await prisma.user.findMany();
  } else {
    users = await prisma.user.findMany({ skip: 1, take: 10 });
  }
};

export const findFirst = async (email: string) => {
  return prisma.user.findFirst({ where: { email } });
};

export const createUser = async (body: User) => {
  const user = await findFirst(body.email);

  if (user != null) {
    throw new HttpException({ statusCode: 400, message: "User Is Exists" });
  }

  const saltRounds = process.env.SALT != null ? parseInt(process.env.SALT) : 10;
  const newPassword = await bcrypt.hash(body.password, saltRounds);
  body.password = newPassword;
  return prisma.user.create({ data: body });
};
