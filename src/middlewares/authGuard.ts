import { NextFunction, Request, Response } from "express";
import config from "../config";
import { User } from "../modules/Auth/Auth.model";
import catchAsync from "../utils/catchAsync";
import AuthError from "../utils/errors/AuthError";
import { jwtUtils } from "../utils/jwtUtils";

const authGuard = (...requiredRoles: string[]) => {
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
      decodedToken = jwtUtils.verifyToken(token, config.jwt_access_secret_key);
    } catch (error) {
      throw new AuthError(401, "Unauthorized");
    }

    // decoded token
    const { userId, role, iat } = decodedToken;

    // Expired date
    if (!iat) {
      throw new AuthError(
        401,
        "Session Expired or Invalid. Please Login Again To Continue."
      );
    }

    // Authentication
    const user = await User.findById(userId);
    if (!user) {
      throw new AuthError(
        401,
        "User Not Found! Please register before logging"
      );
    }

    // authorization
    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AuthError(403, "Forbidden Access!");
    }

    // decoded
    req.user = decodedToken;
    next();
  });
};

export default authGuard;
