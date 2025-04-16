export type TErrorResponse = {
  statusCode: number;
  message: string;
  errorMessage: string;
  errorDetails: any | null;
  stack: any | null;
};
