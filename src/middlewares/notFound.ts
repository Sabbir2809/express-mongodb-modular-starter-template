import { NextFunction, Request, Response } from "express";

const notFound = (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    statusCode: 404,
    error: "Not Found!",
    errorMessage: `Resource Not Found - [${req.method}] ${req.originalUrl}`,
  });
};

export default notFound;
