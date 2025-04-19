import { z } from "zod";

const registration = z.object({
  body: z.object({
    firstName: z
      .string({ required_error: "First Name is Required" })
      .min(1, "First Name cannot be empty"),
    lastName: z
      .string({ required_error: "Last Name is Required" })
      .min(1, "Last Name cannot be empty"),
    phoneNumber: z
      .string({ required_error: "Phone Number is Required" })
      .regex(/^01[0-9]{9}$/, {
        message:
          "Invalid Bangladeshi phone number. Must be 11 digits starting with 01",
      }),
    isPhoneVerified: z.boolean().default(false),
    password: z
      .string({ required_error: "Password is Required" })
      .min(6, "Password should be at least 6 characters"),
    role: z
      .string()
      .refine(
        (val) => ["USER", "ADMIN", "MODERATOR", "SUPER_ADMIN"].includes(val),
        {
          message: "Role must be one of USER, ADMIN, MODERATOR, SUPER_ADMIN",
        }
      )
      .default("USER"),
    status: z
      .string()
      .refine(
        (val) =>
          ["ACTIVE", "INACTIVE", "BLOCKED", "PENDING_VERIFICATION"].includes(
            val
          ),
        {
          message:
            "Status must be one of ACTIVE, INACTIVE, BLOCKED, PENDING_VERIFICATION",
        }
      )
      .default("ACTIVE"),
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
