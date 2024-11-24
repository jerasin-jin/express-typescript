import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { HttpException, HttpStatus, prisma } from "../utils";
dotenv.config();
import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import { findOneUser } from "./userService";
import { permission } from "process";

const SECRET_KEY: Secret = process.env.JWT_SECRET ?? "d";

export const login = async (body: User) => {
  const user: any = await findOneUser({
    where: { email: body.email },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      age: true,
      password: true,
      organization: true,
      role: {
        select: {
          RoleAndPermission: {
            select: {
              permission: {
                select: {
                  module: true,
                  action: true,
                },
              },
            },
          },
        },
      },
    },
  });

  const comparePassword = await bcrypt.compare(body.password, user.password);
  if (!comparePassword) {
    throw new HttpException({
      statusCode: HttpStatus.BAD_REQUEST,
      message: "Password Wrong",
    });
  }

  console.log("user", user);
  const token = jwt.sign(
    {
      email: user.email,
      organization: user?.organization,
      permissions: user?.role?.RoleAndPermission.map(
        (item: any) => item?.permission
      ),
    },
    SECRET_KEY,
    {
      expiresIn: "2d",
      algorithm: "HS256",
    }
  );
  return token;
};
