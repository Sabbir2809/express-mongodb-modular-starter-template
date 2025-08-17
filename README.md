# Project Name

#### [Server Live Link]()

## Overview

## Features

## Technology Stack

- **Programming Language:** TypeScript
- **Backend Framework:** Node.js, Express.js
- **Database:** MongoDB (Mongoose)
- **Authentication:** JWT (JSON Web Token)
- **Password Hashing:** bcrypt
- **Input Validation:** Zod
- **Security:** Rate Limit, Helmet, Cors
- **API Documentation:** Swagger, Postman

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
5. Open `http://localhost:5000` in your browser.
