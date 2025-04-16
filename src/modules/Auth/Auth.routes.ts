import { Router } from "express";
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

export const AuthRoutes = authRoute;
