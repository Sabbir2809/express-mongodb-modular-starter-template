import { ZodError } from "zod";

const handleZodError = (error: ZodError) => {
  const statusCode = 400;
  const errorMessage = error.errors
    .map((item) => `${item.path}, ${item.message}`)
    .toString();

  return {
    statusCode,
    message: "Validation Error",
    errorMessage,
    errorDetails: error,
  };
};

export default handleZodError;
