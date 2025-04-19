import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import config from "../config";
import { IErrorResponse } from "../utils";
import AppError from "../utils/errors/AppError";
import AuthError from "../utils/errors/AuthError";
import handleCastError from "../utils/errors/handleCastError";
import handleDuplicateError from "../utils/errors/handleDuplicateError";
import handleValidationError from "../utils/errors/handleValidationError";
import handleZodError from "../utils/errors/handleZodError";

const globalErrorHandler: ErrorRequestHandler = (
  error,
  req,
  res,
  next
): void => {
  // default object
  const errorResponse: IErrorResponse = {
    statusCode: error.statusCode || 500,
    error: "Internal Server Error",
    errorMessage: error.message,
    errorDetails:
      config.node_environment === "development" ? error.errors : null,
    stack: config.node_environment === "development" ? error?.stack : null,
  };

  // ZodError
  if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);
    errorResponse.statusCode = simplifiedError?.statusCode;
    errorResponse.error = simplifiedError?.message;
    errorResponse.errorMessage = simplifiedError?.errorMessage;
    errorResponse.errorDetails = simplifiedError?.errorDetails;
  }
  // ValidationError
  else if (error?.name === "ValidationError") {
    const simplifiedError = handleValidationError(error);
    errorResponse.statusCode = simplifiedError?.statusCode;
    errorResponse.error = simplifiedError?.message;
    errorResponse.errorDetails = simplifiedError?.errorDetails;
  }
  // CastError
  else if (error?.name === "CastError") {
    const simplifiedError = handleCastError(error);
    errorResponse.statusCode = simplifiedError?.statusCode;
    errorResponse.error = simplifiedError?.errorMessage;
    errorResponse.errorDetails = simplifiedError?.errorDetails;
  }
  // DuplicateError
  else if (error?.code === 11000) {
    const simplifiedError = handleDuplicateError(error);
    errorResponse.statusCode = simplifiedError?.statusCode;
    errorResponse.error = simplifiedError?.message;
    errorResponse.errorMessage = simplifiedError?.errorMessage;
    errorResponse.errorDetails = simplifiedError?.errorDetails;
  }
  // AppError
  else if (error instanceof AppError) {
    errorResponse.statusCode = error.statusCode;
    errorResponse.error = error?.message;
  }
  // AuthError
  else if (error instanceof AuthError) {
    errorResponse.statusCode = error.statusCode;
    errorResponse.error = "Unauthorized!";
    errorResponse.errorMessage = error?.message;
  }

  // response error
  res.status(errorResponse.statusCode).json({
    success: false,
    statusCode: errorResponse.statusCode,
    error: errorResponse.error,
    errorMessage: errorResponse.errorMessage,
    errorDetails: errorResponse.errorDetails,
    stack: errorResponse.stack,
  });
};

export default globalErrorHandler;
