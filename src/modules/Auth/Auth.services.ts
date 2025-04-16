import config from "../../config";
import AppError from "../../errors/AppError";
import { createToken } from "../../utils/jwt";
import { IUser } from "./Auth.interfaces";
import { User } from "./Auth.model";

const registrationIntoDB = async (payload: IUser) => {
  // checking if the user is exist
  const user = await User.findOne({ phoneNumber: payload.phoneNumber });
  if (user) {
    throw new AppError(403, "This User is Already Exists!");
  }

  // user data save into db
  const result = await User.create({
    phoneNumber: payload.phoneNumber,
  });

  return result;
};

const loginFromDB = async (payload: IUser) => {
  const { phoneNumber } = payload;

  // checking if the user is exist
  const user = await User.findOne({ phoneNumber });
  if (!user) {
    throw new AppError(403, "Oops! Access denied. User profile not found.");
  }

  // create JWT token and sent to the client
  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };
  // access token
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in_secret as string
  );
  // refresh token
  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in_secret as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

export const AuthServices = {
  registrationIntoDB,
  loginFromDB,
};
