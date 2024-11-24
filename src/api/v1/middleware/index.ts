import { Request, Response, NextFunction } from "express";
import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import { HttpException, HttpStatus, prisma } from "../utils";

const SECRET_KEY: Secret = process.env.JWT_SECRET ?? "d";

interface PermissionToken {
  module: string;
  action: string;
}

export interface CustomRequest extends Request {
  token: string | JwtPayload;
}

export const JwtMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ messageCode: "UNAUTHORIZED", message: "UnAuthorized" });
      return;
    }

    const decoded = jwt.verify(token, SECRET_KEY, { algorithms: ["HS256"] });
    (req as CustomRequest).token = decoded;

    console.log("Before Next In JwtMiddleware");
    next();
  } catch (error: unknown) {
    console.log("error", error);
    res
      .status(HttpStatus.UNAUTHORIZED)
      .json({ messageCode: "UNAUTHORIZED", message: "UnAuthorized" });
  }
};

interface JwtMiddlewareOptions {
  moduleName: string;
  action: string;
}

export const JwtMiddlewareV2 = (options: JwtMiddlewareOptions) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.header("Authorization")?.replace("Bearer ", "");

      if (!token) {
        res
          .status(HttpStatus.UNAUTHORIZED)
          .json({ messageCode: "UNAUTHORIZED", message: "UnAuthorized" });
        return;
      }

      const decoded: any = jwt.verify(token, SECRET_KEY, {
        algorithms: ["HS256"],
      });
      (req as any).token = decoded;

      console.log(
        `Module Name: ${options.moduleName} & Action Name: ${options.action}`
      );
      console.log(`decoded: ${JSON.stringify(decoded.permissions)}`);
      console.log("Before Next In JwtMiddleware");

      const checkPermission = decoded?.permissions?.find(
        (i: PermissionToken) => (i.module == options.moduleName && i.action == options.action)
      );

      console.log("checkPermission", checkPermission);

      if (decoded?.permissions?.length === 0 || checkPermission == null) {
        res
          .status(HttpStatus.UNAUTHORIZED)
          .json({ messageCode: "UNAUTHORIZED", message: "UnAuthorized" });
        return;
      }

      next();
    } catch (error: unknown) {
      console.log("Error in JwtMiddlewareV2", error);
      res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ messageCode: "UNAUTHORIZED", message: "UnAuthorized" });
    }
  };
};
