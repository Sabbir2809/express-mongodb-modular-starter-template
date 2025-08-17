# Project Name

#### [Server Live Link]()

## Overview

## Features

## Technology Stack

- **Programming Language:** TypeScript
- **Framework:** Express.js
- **Database:** MongoDB (Mongoose ODM)
- **Authentication:** JWT (JSON Web Tokens)
- **Password Hashing:** bcrypt
- **Validation:** Zod
- **Security:** Helmet, CORS, Rate Limiting
- **File Uploads:** Multer + Cloudinary
- **Email Service:** Nodemailer
- **API Docs:** Swagger (swagger-jsdoc + swagger-ui-express)

## Project Setup Instructions

1. Clone the repository:

   ```bash
   git clone https://github.com/Sabbir2809/express-mongodb-modular-starter-template.git
   cd express-mongoose-modular-starter-template
   ```

2. Install dependencies:
   ```bash
   yarn install
   ```
3. Setup environment variables in `.env`.

   ```bash
   NODE_ENVIRONMENT=

   PORT=
   DATABASE_URL=
   CORS_ORIGIN=

   # password
    BCRYPT_SALT_ROUNDS=

   # JWT
   JWT_ACCESS_SECRET_KEY=
   JWT_REFRESH_SECRET_KEY=

   # SMTP
   SMTP_USER=
   SMTP_PASSWORD=

   # Cloudinary configuration
   CLOUDINARY_CLOUD_NAME=
   CLOUDINARY_API_KEY=
   CLOUDINARY_API_SECRET=

   # ImageKit configuration
   IMAGEKIT_PUBLIC_KEY=
   IMAGEKIT_PRIVATE_KEY=
   IMAGEKIT_PUBLIC_URL_ENDPOINT_KEY=
   ```

4. Run the development server:
   ```bash
   yarn dev
   ```
5. **Start the server:** Open [http://localhost:5000](http://localhost:5000) in your browser to access the application.

6. **View API Documentation:** Open [http://localhost:5000/api-docs](http://localhost:5000/api-docs) in your browser to explore and test all API endpoints via Swagger UI.
