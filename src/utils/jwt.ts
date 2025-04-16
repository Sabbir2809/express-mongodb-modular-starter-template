import jwt, { JwtPayload } from "jsonwebtoken";

// create jwt token
export const createToken = (
  JwtPayload: { userId: string; role: string },
  secret: string,
  expiresIn: string
) => {
  return jwt.sign(JwtPayload, secret, { expiresIn });
};

// verify jwt token
export const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret) as JwtPayload;
};
