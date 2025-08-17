import { ZodError } from "zod";

const handleZodError = (error: ZodError) => {
  const statusCode = 400;
  const errorMessage = error.issues
    .map((item) => `${item.path.join(".")} - ${item.message}`)
    .join(", ");

  return {
    statusCode,
    message: "Zod Validation Error!",
    errorMessage,
    errorDetails: error,
  };
};

export default handleZodError;
