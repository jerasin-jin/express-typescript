import express, { Express, Request, Response } from "express";
import {
  UserRouteV1,
  AuthenticationRouteV1,
  OrganizationRouteV1,
  RoleRouteV1,
  PermissionRouteV1,
} from "./api/v1";
import dotenv from "dotenv";
import { HttpException, HttpStatus } from "./api/v1";
import { initMaster } from "./api/v1/scripts";
import { HttpExceptionHandler } from "./api/v1/middleware";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  // throw new HttpException({
  //   statusCode: HttpStatus.ERROR,
  // });
  res.json("HelloWorld");
});

app.use(
  "/v1",
  UserRouteV1,
  AuthenticationRouteV1,
  OrganizationRouteV1,
  RoleRouteV1,
  PermissionRouteV1
);

app.use(HttpExceptionHandler);

initMaster()
  .then()
  .catch((e) => {
    console.log("initPermission error", e);
  });

function getAllRoutes() {
  const routes: any = [];
  app._router.stack.forEach((middleware: any) => {
    if (middleware.route) {
      const path = middleware.route.path;
      const methods = Object.keys(middleware.route.methods);
      routes.push({ path, methods });
    }
  });
  return routes;
}

app.listen(port, () => {
  console.log("test", getAllRoutes());
  console.log(`[server]: Server is running at http://localhost:${port}`);

  console.log(`[db_server]: ${JSON.stringify(process.env.DATABASE_URL)}`);
});
