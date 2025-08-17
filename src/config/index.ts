import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join((process.cwd(), ".env")) });

export default {
  node_environment: process.env.NODE_ENVIRONMENT!,

  port: process.env.PORT!,
  database_url: process.env.DATABASE_URL!,
  cors_origin: process.env.CORS_ORIGIN!,

  // password
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS!,

  // JWT
  jwt_access_secret_key: process.env.JWT_ACCESS_SECRET_KEY!,
  jwt_refresh_secret_key: process.env.JWT_REFRESH_SECRET_KEY!,

  // Cloudinary configuration
  cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY!,
  cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET!,

  // ImageKit configuration
  imagekit_private_key: process.env.IMAGEKIT_PRIVATE_KEY!,
  imagekit_public_key: process.env.IMAGEKIT_PUBLIC_KEY!,
  imagekit_public_url_endpoint_key:
    process.env.IMAGEKIT_PUBLIC_URL_ENDPOINT_KEY,

  smtp_user: process.env.SMTP_USER,
  smtp_password: process.env.SMTP_PASSWORD,
};
