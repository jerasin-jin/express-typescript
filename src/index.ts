import express, { Express, Request, Response } from "express";
import test from "./routers/test/index";
import user from "./routers/users/index";
import dotenv from "dotenv";
import {
  HttpException,
  ErrorConst,
  HttpStatus,
  HandleHttpException,
} from "./utils";

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

app.use("/test", test);
app.use("/user", user);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);

  console.log(`[db_server]: ${JSON.stringify(process.env.DATABASE_URL)}`);
});
