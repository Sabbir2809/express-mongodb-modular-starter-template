import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import config from "../../config";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./Auth.services";

const registration = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.registrationIntoDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "User registered successfully",
    data: result,
  });
});

const login = catchAsync(async (req: Request, res: Response) => {
  // service
  const result = await AuthServices.loginFromDB(req.body);
  const { refreshToken, accessToken } = result;

  // cookie
  res.cookie("refreshToken", refreshToken, {
    secure: config.node_environment === "production",
    httpOnly: true,
  });

  // send response
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "User Login Successfully",
    data: result,
  });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  // service
  const { accessToken } = await AuthServices.generateRefreshToken(refreshToken);

  // send response
  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "Access Token Retrieved Successfully",
    data: accessToken,
  });
});

const myProfile = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.user as JwtPayload;
  // service
  const result = await AuthServices.myProfileFromDB(userId);

  // send response
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "My Profile Retrieved Successfully",
    data: result,
  });
});

const changePassword = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.user as JwtPayload;
  const { oldPassword, newPassword } = req.body;

  const result = await AuthServices.changePasswordInDB(
    userId,
    oldPassword,
    newPassword
  );

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: result.message,
  });
});

const forgetPassword = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.body;

  const result = await AuthServices.forgetPasswordFromDB(email);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: result.message,
  });
});

const resetPassword = catchAsync(async (req: Request, res: Response) => {
  const { token, newPassword } = req.body;

  const result = await AuthServices.resetPasswordInDB(token, newPassword);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: result.message,
  });
});

export const AuthControllers = {
  registration,
  login,
  refreshToken,
  myProfile,
  changePassword,
  forgetPassword,
  resetPassword,
};
