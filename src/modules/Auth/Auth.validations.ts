import { z } from "zod";

const registration = z.object({
  body: z.object({
    fullName: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(6),
  }),
});

const refreshToken = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: "Refresh Token is required",
    }),
  }),
});

const changePassword = z.object({
  body: z.object({
    oldPassword: z.string().min(6),
    newPassword: z.string().min(6),
  }),
});

const forgetPassword = z.object({
  body: z.object({
    email: z.string().email(),
  }),
});

const resetPassword = z.object({
  body: z.object({
    token: z.string(),
    email: z.string().email(),
    newPassword: z.string().min(6),
  }),
});

export const AuthValidationSchemas = {
  registration,
  refreshToken,
  changePassword,
  forgetPassword,
  resetPassword,
};
