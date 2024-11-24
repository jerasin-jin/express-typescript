import express, { Express, Request, Response } from "express";
import { UserV1, AuthenV1, OrganizationV1 } from "./api/v1";
import dotenv from "dotenv";
import { HttpException, HttpStatus, HandleHttpException } from "./api/v1";
import { initMaster } from "./api/v1/scripts";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());


app.get("/", (req: Request, res: Response) => {
  try {
    throw new HttpException({
      statusCode: HttpStatus.ERROR,
    });
  } catch (e: unknown) {
    HandleHttpException(res, e);
  }
});

app.use("/v1/user", UserV1);
app.use("/v1/auth", AuthenV1);
app.use("/v1/organization", OrganizationV1);

initMaster()
  .then()
  .catch((e) => {
    console.log("initPermission error", e);
  });

  
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);

  console.log(`[db_server]: ${JSON.stringify(process.env.DATABASE_URL)}`);
});
