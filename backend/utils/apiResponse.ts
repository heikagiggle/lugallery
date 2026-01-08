import { Response } from "express";

export const successResponse = <T>(
  res: Response,
  data: T,
  message = "Request successful",
  statusCode = 200
) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

export const errorResponse = (
  res: Response,
  message = "Something went wrong",
  statusCode = 400
) => {
  return res.status(statusCode).json({
    success: false,
    message,
  });
};
