import { Response } from "express";

export enum HttpStatus {
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  FORBIDDEN = 403,
  UNAUTHORIZED = 401,
  ERROR = 500,
}

export interface HttpExceptionInterface {
  statusCode: HttpStatus;
  message?: string;
  messageCode?: string;
  schema?:string
}

export class HttpException extends Error {
  statusCode: number;
  messageCode?: string;
  schema?: string;

  constructor(errorPayload: HttpExceptionInterface) {
    let { message, statusCode, messageCode,schema } = errorPayload ?? null;

    if (messageCode == null) {
      switch (statusCode) {
        case HttpStatus.FORBIDDEN:
          messageCode = "FORBIDDEN";
          break;

        case HttpStatus.NOT_FOUND:
          messageCode = "NOT_FOUND";
          break;

        case HttpStatus.BAD_REQUEST:
          messageCode = "BAD_REQUEST";
          break;

        case HttpStatus.UNAUTHORIZED:
          messageCode = "UNAUTHORIZED";
          break;
        default:
          messageCode = "ERROR";
          break;
      }
    }

    if (message == null) {
      switch (statusCode) {
        case HttpStatus.FORBIDDEN:
          message = "Forbidden";
          break;

        case HttpStatus.NOT_FOUND:
          message = "Data Not Found";
          break;

        case HttpStatus.BAD_REQUEST:
          message = "Bad Request";
          break;

        case HttpStatus.UNAUTHORIZED:
          message = "UnAuthorized";
          break;
        default:
          message = "Error";
          break;
      }
    }

    super(message);
    this.statusCode = statusCode;
    this.messageCode = messageCode;
    this.schema = schema
  }
}

