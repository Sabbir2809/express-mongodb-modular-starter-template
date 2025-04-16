import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import config from "../config";
import AppError from "../errors/AppError";
import AuthError from "../errors/AuthError";
import handleCastError from "../errors/handleCastError";
import handleDuplicateError from "../errors/handleDuplicateError";
import handleValidationError from "../errors/handleValidationError";
import handleZodError from "../errors/handleZodError";
import { TErrorResponse } from "../types/error";

const globalErrorHandler: ErrorRequestHandler = (
  error,
  req,
  res,
  next
): void => {
  // default object
  const errorResponse: TErrorResponse = {
    statusCode: error.statusCode || 500,
    message: "Internal Server Error",
    errorMessage: error.message,
    errorDetails: error.errors,
    stack: config.node_environment === "staging" ? error?.stack : null,
  };

  // ZodError
  if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);
    errorResponse.statusCode = simplifiedError?.statusCode;
    errorResponse.message = simplifiedError?.message;
    errorResponse.errorMessage = simplifiedError?.errorMessage;
    errorResponse.errorDetails = simplifiedError?.errorDetails;
  }
  // ValidationError
  else if (error?.name === "ValidationError") {
    const simplifiedError = handleValidationError(error);
    errorResponse.statusCode = simplifiedError?.statusCode;
    errorResponse.message = simplifiedError?.message;
    errorResponse.errorDetails = simplifiedError?.errorDetails;
  }
  // CastError
  else if (error?.name === "CastError") {
    const simplifiedError = handleCastError(error);
    errorResponse.statusCode = simplifiedError?.statusCode;
    errorResponse.message = simplifiedError?.errorMessage;
    errorResponse.errorDetails = simplifiedError?.errorDetails;
  }
  // DuplicateError
  else if (error?.code === 11000) {
    const simplifiedError = handleDuplicateError(error);
    errorResponse.statusCode = simplifiedError?.statusCode;
    errorResponse.message = simplifiedError?.message;
    errorResponse.errorMessage = simplifiedError?.errorMessage;
    errorResponse.errorDetails = simplifiedError?.errorDetails;
  }
  // AppError
  else if (error instanceof AppError) {
    errorResponse.statusCode = error.statusCode;
    errorResponse.message = error?.message;
    errorResponse.errorDetails = [
      {
        path: "",
        message: error?.message,
      },
    ];
  }
  // AuthError
  else if (error instanceof AuthError) {
    errorResponse.statusCode = error.statusCode;
    errorResponse.message = "Unauthorized Access";
    errorResponse.errorMessage = error?.message;
    errorResponse.errorDetails = null;
    errorResponse.stack = null;
  }

  // response error
  res.status(errorResponse.statusCode).json({
    success: false,
    message: errorResponse.message,
    errorMessage: errorResponse.errorMessage,
    errorDetails: errorResponse.errorDetails,
    stack: errorResponse.stack,
  });
};

export default globalErrorHandler;
