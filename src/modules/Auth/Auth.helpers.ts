import bcrypt from "bcrypt";
import config from "../../config";

// bcrypt hash password
export const generateHashPassword = async (
  password: string
): Promise<string> => {
  return await bcrypt.hash(password, Number(config.bcrypt_salt_rounds));
};

// bcrypt compare password
export const comparePassword = async (
  plainTextPassword: string,
  hashedPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

export const generateWelcomeEmailHTML = (name: string) => {
  return `
    <h2>🎉 Welcome, ${name}!</h2>
    <p>
      Thank you for registering with <strong>Project Name</strong>.  
      Your account has been successfully created and you’re now part of our community.  
    </p>
    <p>
      Start exploring the features we’ve built for you.  
    </p>
    <a href="${config.cors_origin || "#"}" 
       style="display:inline-block;margin-top:16px;background:#2563eb;color:white;padding:12px 24px;border-radius:6px;text-decoration:none;">
       Go to Dashboard
    </a>
  `;
};

export const generateResetPasswordEmailHTML = (resetURL: string) => {
  return `
      <div>
        <h3>Reset Your Password</h3>
        <p>Click below to reset your password. This link expires in 5 minutes.</p>
        <a href="${resetURL}" style="padding:10px 15px;background:#007bff;color:#fff;text-decoration:none;border-radius:5px;">Reset Password</a>
        <p>If you didn't request this, ignore this email.</p>
      </div>
    `;
};
