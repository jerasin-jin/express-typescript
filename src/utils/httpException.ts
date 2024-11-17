import { Response } from "express";

export type ErrorConst = "NOT_FOUND" | "BAD_REQUEST" | "ERROR";

export enum HttpStatus {
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  FORBIDDEN = 403,
  UNAUTHORIZED = 401,
  ERROR = 500,
}

interface HttpExceptionInterface {
  statusCode: HttpStatus;
  message?: string;
  messageCode?: string;
}

export class HttpException extends Error {
  statusCode: number;
  messageCode?: string;

  constructor(errorPayload: HttpExceptionInterface) {
    let { message, statusCode, messageCode } = errorPayload ?? null;
    if (messageCode == null) {
      switch (statusCode) {
        case HttpStatus.FORBIDDEN:
          messageCode = "Forbidden";
          break;

        case HttpStatus.NOT_FOUND:
          messageCode = "Not Found";
          break;

        case HttpStatus.BAD_REQUEST:
          messageCode = "Bad Request";
          break;

        case HttpStatus.UNAUTHORIZED:
          messageCode = "UnAuthorized";
          break;
        default:
          messageCode = "Error";
          break;
      }
    }

    super(message);
    this.statusCode = statusCode;
    this.messageCode = messageCode;
  }
}

export const HandleHttpException = (res: Response, error: unknown) => {
  if (error instanceof HttpException) {
    const { statusCode, message, messageCode } = error ?? {};
    res.status(statusCode).json({ messageCode, message });
  } else {
    console.log("error",error)
    res
      .status(500)
      .json({ message: "Unknown Type Error", detail: JSON.stringify(error) });
  }
};
