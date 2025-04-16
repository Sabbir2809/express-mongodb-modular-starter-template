import mongoose from "mongoose";

const handleCastError = (error: mongoose.Error.CastError) => {
  const statusCode = 400;
  const errorMessage = error.value;

  return {
    statusCode,
    message: "Invalid ID",
    errorMessage: `${errorMessage}  is not a valid ID!`,
    errorDetails: error,
  };
};
export default handleCastError;
