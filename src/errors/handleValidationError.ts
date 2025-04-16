import mongoose from "mongoose";

const handleValidationError = (error: mongoose.Error.ValidationError) => {
  const statusCode = 400;
  const errorDetails = error.errors;

  return {
    statusCode,
    message: "Validation Error",
    errorDetails,
  };
};

export default handleValidationError;
