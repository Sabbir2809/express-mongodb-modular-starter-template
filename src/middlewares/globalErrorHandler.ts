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

const globalErrorHandler: ErrorRequestHandler = (error, req, res): void => {
  // default object
  const errorResponse: IErrorResponse = {
    statusCode: error.statusCode || 500,
    message: "Internal Server Error",
    errorMessage: error.message,
    errorDetails: error.errors,
    stack: config.node_environment === "development" ? error?.stack : null,
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
    statusCode: errorResponse.statusCode,
    message: errorResponse.message,
    errorMessage: errorResponse.errorMessage,
    errorDetails: errorResponse.errorDetails,
    stack: errorResponse.stack,
  });
};

export default globalErrorHandler;
