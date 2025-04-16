import { NextFunction, Request, Response } from "express";

const notFound = (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    message: `The requested route ${req.originalUrl} does not exist on this server.`,
  });
};

export default notFound;
