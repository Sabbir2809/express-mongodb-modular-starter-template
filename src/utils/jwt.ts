import jwt from "jsonwebtoken";

// create jwt token
export const createToken = (
  payload: object,
  secretOrPrivateKey: string,
  options?: object
) => {
  return jwt.sign(payload, secretOrPrivateKey, options);
};

// verify jwt token
export const verifyToken = (token: string, secretOrPublicKey: string) => {
  return jwt.verify(token, secretOrPublicKey);
};
