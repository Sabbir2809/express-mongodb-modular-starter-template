export interface IUser {
  fullName: string;
  email: string;
  password: string;
  role: "USER" | "ADMIN" | "MODERATOR" | "SUPER_ADMIN";
  status: boolean;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  // isEmailVerified: boolean;
  // phoneNumber: string;
  // isPhoneVerified: boolean;
  // profileImage?: string;
  // address?: string;
  // dateOfBirth?: Date;
  // gender?: "MALE" | "FEMALE" | "OTHER";
  // preferences?: {
  //   language: string;
  //   notificationsEnabled: boolean;
  // };
  // socialLinks?: {
  //   facebook?: string;
  //   twitter?: string;
  //   instagram?: string;
  // };
  // lastLoginAt?: Date;
  // deletedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}
