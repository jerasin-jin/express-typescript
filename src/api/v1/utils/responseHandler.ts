import { Response } from "express";

interface ResponseHandler {
  message: string;
  statusCode: number;
  messageCode: string;
  data?: Record<string, any>;
}

export const responseHandler = (
  res: Response,
  options?: Partial<ResponseHandler>
) => {
  const template: ResponseHandler = {
    message: "success",
    messageCode: "Success",
    statusCode: 200,
  };

  if (options?.message != null) {
    template.message = options?.message;
  }

  if (options?.messageCode != null) {
    template.messageCode = options?.messageCode;
  }

  if (options?.statusCode != null) {
    template.statusCode = options?.statusCode;
  }

  if (options?.data != null) {
    template.data = options?.data;
  }

  res.status(template.statusCode).json(template);
};
