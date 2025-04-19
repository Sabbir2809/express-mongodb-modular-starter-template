import jwt, { JwtPayload } from "jsonwebtoken";

const signToken = (
  payload: JwtPayload,
  secretKey: string,
  expiresIn: jwt.SignOptions
) => {
  return jwt.sign(payload, secretKey, expiresIn);
};

const verifyToken = (token: string, secretKey: string): any => {
  return jwt.verify(token, secretKey);
};

export const jwtUtils = {
  signToken,
  verifyToken,
};
