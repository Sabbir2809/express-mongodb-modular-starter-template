/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import config from "../config";
import AppError from "../errors/AppError";
import AuthError from "../errors/AuthError";
import { User } from "../modules/Auth/Auth.model";
import catchAsync from "../utils/catchAsync";
import { verifyToken } from "../utils/jwt";

const checkAuth = (...requiredRoles: string[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // headers token
    const token = req.headers.authorization;
    if (!token) {
      throw new AuthError(401, "No JWT is provided in the request headers");
    }

    // check if the token is valid
    let decodedToken;
    try {
      decodedToken = verifyToken(token, config.jwt_access_secret as string);
    } catch (error) {
      throw new AuthError(401, "Unauthorized!");
    }

    // decoded token
    const { userId, role, iat } = decodedToken as JwtPayload;

    // Expired date
    if (!iat) {
      throw new AuthError(401, "The provided JWT (JSON Web Token) has expired");
    }

    // Authentication
    const user = await User.findById(userId);
    if (!user) {
      throw new AuthError(404, "User Not Found");
    }

    // authorization
    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(401, "You are not authorized!");
    }

    // decoded
    (req as any).user = decodedToken as JwtPayload;
    next();
  });
};

export default checkAuth;
