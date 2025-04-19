import { Schema, model } from "mongoose";
import { IUser } from "./Auth.interface";

const userSchema = new Schema<IUser>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phoneNumber: { type: String, unique: true, required: true },
    isPhoneVerified: { type: Boolean, default: false },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["USER", "ADMIN", "MODERATOR", "SUPER_ADMIN"],
      default: "USER",
    },
    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE", "BLOCKED", "PENDING_VERIFICATION"],
      default: "ACTIVE",
    },
    // email: { type: String, unique: true, required: true },
    // isEmailVerified: { type: Boolean, default: false },
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
