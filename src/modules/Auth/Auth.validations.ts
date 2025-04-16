import { z } from "zod";

const registration = z.object({
  body: z.object({
    phoneNumber: z.string({ required_error: "phoneNumber Field is Required" }),
  }),
});

const refreshToken = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: "Refresh Token is required",
    }),
  }),
});

export const AuthValidationSchemas = {
  registration,
  refreshToken,
};
