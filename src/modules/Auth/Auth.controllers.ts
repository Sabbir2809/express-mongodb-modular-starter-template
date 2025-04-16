import { Request, Response } from "express";
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
    statusCode: 200,
    success: true,
    message: "User login successful",
    data: { accessToken, refreshToken },
  });
});

export const AuthControllers = {
  registration,
  login,
};
