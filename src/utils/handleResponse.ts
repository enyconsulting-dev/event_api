import statusCodeMap from "./statusCode";
import formatResponse from "./responseFormatter";
import type { Response } from "express";

const handleResponse = (res: Response, code: number, message: string, data?: any) => {
  const statusCode: number = statusCodeMap[code] ?? 500;

  return res.status(statusCode).send(
    formatResponse({
      message: message,
      ...{ data: data }
    })
  );
};

export default handleResponse;
