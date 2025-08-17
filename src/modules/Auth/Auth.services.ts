import mongoose from "mongoose";
import crypto from "node:crypto";
import config from "../../config";
import AppError from "../../utils/errors/AppError";
import AuthError from "../../utils/errors/AuthError";
import { jwtUtils } from "../../utils/jwtUtils";
import { sendEmail } from "../../utils/sendEmail";
import {
  comparePassword,
  generateHashPassword,
  generateResetPasswordEmailHTML,
  generateWelcomeEmailHTML,
} from "./Auth.helpers";
import { IUser } from "./Auth.interface";
import { User } from "./Auth.model";

const registrationIntoDB = async (payload: IUser) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { fullName, email, password } = payload;

    // Check if email is already registered
    const existingUser = await User.findOne({ email }).session(session);
    if (existingUser) {
      throw new AppError(409, "Email is already registered");
    }

    // Hash password
    const hashedPassword = await generateHashPassword(password);

    // Create new user
    const newUser = await User.create(
      [
        {
          fullName,
          email,
          password: hashedPassword,
          role: "USER",
          status: true,
        },
      ],
      { session }
    );

    // Prepare welcome email
    const subject = "🎉 Welcome to";
    const htmlContent = generateWelcomeEmailHTML(fullName);

    // Send welcome email (outside transaction, to avoid side effects)
    await sendEmail(email, subject, htmlContent);

    // Commit transaction
    await session.commitTransaction();
    session.endSession();

    return newUser[0];
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const loginFromDB = async (payload: { email: string; password: string }) => {
  const user = await User.findOne({ email: payload.email });
  if (!user) throw new AuthError(401, "User not found");

  const isMatch = await comparePassword(payload.password, user.password);
  if (!isMatch) throw new AuthError(401, "Incorrect password");

  const jwtPayload = {
    userId: user._id,
    role: user.role,
  };

  const accessToken = jwtUtils.signToken(
    jwtPayload,
    config.jwt_access_secret_key,
    { expiresIn: "1d" }
  );
  const refreshToken = jwtUtils.signToken(
    jwtPayload,
    config.jwt_refresh_secret_key,
    { expiresIn: "7d" }
  );

  return {
    accessToken,
    refreshToken,
  };
};

const generateRefreshToken = async (token: string) => {
  // check if the token is valid
  const decoded = jwtUtils.verifyToken(token, config.jwt_refresh_secret_key);
  const { userId } = decoded;

  // checking if the user is exist
  const user = await User.findById(userId);
  if (!user) {
    throw new AuthError(401, "User Not Found! Please Register.");
  }

  // JWT payload
  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };

  // access token
  const accessToken = jwtUtils.signToken(
    jwtPayload,
    config.jwt_access_secret_key,
    { expiresIn: "1d" }
  );

  return { accessToken };
};

const myProfileFromDB = async (userId: string) => {
  const user = await User.findById(userId).select("-password");
  if (!user) throw new AppError(404, "User not found");

  return user;
};

const changePasswordInDB = async (
  userId: string,
  oldPassword: string,
  newPassword: string
) => {
  const user = await User.findById(userId);
  if (!user) throw new AppError(404, "User not found");

  const isMatch = await comparePassword(oldPassword, user.password);
  if (!isMatch) throw new AuthError(401, "Old password is incorrect");

  // Hash and update password
  user.password = await generateHashPassword(newPassword);
  await user.save();

  return { message: "Password changed successfully" };
};

const forgetPasswordFromDB = async (email: string) => {
  const user = await User.findOne({ email });
  if (!user) throw new AppError(404, "User not found");

  // Generate JWT reset token
  const resetToken = jwtUtils.signToken(
    { email: user.email },
    config.jwt_access_secret_key,
    { expiresIn: "5m" }
  );

  // Hash the token before storing in DB
  const tokenHash = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  user.passwordResetToken = tokenHash;
  user.passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000);
  await user.save();

  const resetURL = `${config.cors_origin}/reset-password?token=${resetToken}`;
  const html = generateResetPasswordEmailHTML(resetURL);

  await sendEmail(user.email, "🔐 Reset Your Password", html);

  return { message: "Reset password link sent to your email" };
};

const resetPasswordInDB = async (token: string, newPassword: string) => {
  const decoded = jwtUtils.verifyToken(token, config.jwt_refresh_secret_key);

  // Hash the token
  const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
  // find user
  const user = await User.findOne({
    email: decoded.email,
    passwordResetToken: tokenHash,
    passwordResetExpires: { $gt: new Date() },
  });

  if (!user) {
    throw new AppError(404, "User not found");
  }

  user.password = await generateHashPassword(newPassword);
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  return { message: "Password reset successful" };
};

export const AuthServices = {
  registrationIntoDB,
  loginFromDB,
  generateRefreshToken,
  myProfileFromDB,
  changePasswordInDB,
  forgetPasswordFromDB,
  resetPasswordInDB,
};
