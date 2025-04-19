import { Router } from "express";
import authGuard from "../../middlewares/authGuard";
import validateRequest from "../../middlewares/validateRequest";
import { AuthControllers } from "./Auth.controllers";
import { AuthValidationSchemas } from "./Auth.validations";

const authRoute = Router();

// Registration
// Endpoint: POST - BASE-URL/api/v1/auth/registration
authRoute.post(
  "/registration",
  validateRequest(AuthValidationSchemas.registration),
  AuthControllers.registration
);

// Login
// Endpoint: POST - BASE-URL/api/v1/auth/login
authRoute.post("/login", AuthControllers.login);

// Refresh Token Create
// Endpoint: POST - BASE-URL/api/v1/auth/refresh-token
authRoute.post(
  "/refresh-token",
  validateRequest(AuthValidationSchemas.refreshToken),
  AuthControllers.refreshToken
);

// Get My Profile
// Endpoint: GET - BASE-URL/api/v1/auth/my-profile
authRoute.get(
  "/my-profile",
  authGuard("USER", "ADMIN"),
  AuthControllers.myProfile
);

export const AuthRoutes = authRoute;
