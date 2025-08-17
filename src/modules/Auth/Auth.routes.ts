import { Router } from "express";
import authGuard from "../../middlewares/authGuard";
import validateRequest from "../../middlewares/validateRequest";
import { ALL_USER_ROLES } from "./Auth.constant";
import { AuthControllers } from "./Auth.controllers";
import { AuthValidationSchemas } from "./Auth.validations";

const router = Router();

// Registration
// Endpoint: POST - BASE_URL/api/v1/auth/registration
router.post(
  "/registration",
  validateRequest(AuthValidationSchemas.registration),
  AuthControllers.registration
);

// Login
// Endpoint: POST - BASE_URL/api/v1/auth/login
router.post("/login", AuthControllers.login);

// Refresh Token Create
// Endpoint: POST - BASE_URL/api/v1/auth/refresh-token
router.post(
  "/refresh-token",
  validateRequest(AuthValidationSchemas.refreshToken),
  AuthControllers.refreshToken
);

// Get My Profile
// Endpoint: GET - BASE_URL/api/v1/auth/my-profile
router.get(
  "/my-profile",
  authGuard(...ALL_USER_ROLES),
  AuthControllers.myProfile
);

// Change Password
// Endpoint: POST - BASE_URL/api/v1/auth/change-password
router.post(
  "/change-password",
  authGuard(...ALL_USER_ROLES),
  validateRequest(AuthValidationSchemas.changePassword),
  AuthControllers.changePassword
);

// Forget Password
// Endpoint: POST - BASE_URL/api/v1/auth/forget-password
router.post(
  "/forget-password",
  validateRequest(AuthValidationSchemas.forgetPassword),
  AuthControllers.forgetPassword
);

// Reset Password
// Endpoint: POST - BASE_URL/api/v1/auth/reset-password
router.post(
  "/reset-password",
  validateRequest(AuthValidationSchemas.resetPassword),
  AuthControllers.resetPassword
);

export const AuthRoutes = router;
