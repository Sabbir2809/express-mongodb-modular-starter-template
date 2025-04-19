/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { User } from "../modules/Auth/Auth.model";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/errors/AppError";
import AuthError from "../utils/errors/AuthError";
import { verifyToken } from "../utils/jwt";

const checkAuth = (...requiredRoles: string[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // headers token
    const token = req.headers.authorization;
    if (!token) {
      throw new AuthError(
        401,
        "Authorization token is required! Please Login."
      );
    }

    // check if the token is valid
    let decodedToken;
    try {
      decodedToken = verifyToken(token, config.jwt_access_secret_key);
    } catch (error) {
      throw new AuthError(
        401,
        "Session Expired or Invalid. Please Login Again To Continue."
      );
    }

    // decoded token
    const { userId, role, iat } = decodedToken as JwtPayload;

    // Expired date
    if (!iat) {
      throw new AuthError(401, "Token Expired! Please Login");
    }

    // Authentication
    const user = await User.findById(userId);
    if (!user) {
      throw new AppError(400, "User Not Found! Please Register or Login");
    }

    // authorization
    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AuthError(403, "Forbidden Access!");
    }

    // decoded
    (req as any).user = decodedToken;
    next();
  });
};

export default checkAuth;
