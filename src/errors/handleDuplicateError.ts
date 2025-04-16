const handleDuplicateError = (error: any) => {
  const statusCode = 409;
  const match = error.message.match(/"([^"]*)"/);
  const extractedMessage = match && match[1];

  return {
    statusCode,
    message: "Duplicate Error",
    errorMessage: `Duplicate value for ${extractedMessage}`,
    errorDetails: error,
  };
};
export default handleDuplicateError;
