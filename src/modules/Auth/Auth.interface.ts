export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
  role: "USER" | "ADMIN" | "MODERATOR" | "SUPER_ADMIN";
  status: "ACTIVE" | "INACTIVE" | "BLOCKED" | "PENDING_VERIFICATION";
  isPhoneVerified: boolean;
  isEmailVerified: boolean;
  profileImage?: string;
  address?: string;
  dateOfBirth?: Date;
  gender?: "MALE" | "FEMALE" | "OTHER";
  preferences?: {
    language: string;
    notificationsEnabled: boolean;
  };
  socialLinks?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
  };
  lastLoginAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}
