import { Schema, model } from "mongoose";
import { ALL_USER_ROLES } from "./Auth.constant";
import { IUser } from "./Auth.interface";

const userSchema = new Schema<IUser>(
  {
    fullName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: [...ALL_USER_ROLES],
      default: "USER",
    },
    status: {
      type: Boolean,
      default: true,
    },
    passwordResetToken: { type: String },
    passwordResetExpires: { type: Date },
    // isEmailVerified: { type: Boolean, default: false },
    // phoneNumber: { type: String, unique: true, required: true },
    // isPhoneVerified: { type: Boolean, default: false },
    // profileImage: { type: String },
    // address: { type: String },
    // dateOfBirth: { type: Date },
    // gender: { type: String, enum: ["MALE", "FEMALE", "OTHER"] },
    // preferences: {
    //   language: { type: String, default: "en" },
    //   notificationsEnabled: { type: Boolean, default: true },
    // },
    // socialLinks: {
    //   facebook: { type: String },
    //   twitter: { type: String },
    //   instagram: { type: String },
    // },
    // lastLoginAt: { type: Date },
  },
  { timestamps: true, versionKey: false }
);

// middleware hook: password hide
userSchema.post("save", async function (doc, next) {
  doc.password = "";
  next();
});

// Export the model
export const User = model<IUser>("User", userSchema);
