import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

interface IErrorResponse {
  statusCode: number;
  message: string;
  errorMessage: string;
  errorDetails: any | null;
  stack: any | null;
}
