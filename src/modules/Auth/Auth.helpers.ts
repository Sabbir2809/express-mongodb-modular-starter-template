import bcrypt from "bcrypt";
import config from "../../config";

// bcrypt hash password
const generateHashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, Number(config.bcrypt_salt_rounds));
};

// bcrypt compare password
const comparePassword = async (
  plainTextPassword: string,
  hashedPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

export const passwordHelpers = {
  generateHashPassword,
  comparePassword,
};
