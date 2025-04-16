# Project Name

#### [Server Live Link]()

## Overview

## Features

## Technology Stack

- **Programming Language:** TypeScript
- **Backend Framework:** Express.js
- **Database:** MongoDB (with Mongoose)
- **Authentication:** JWT (JSON Web Token)
- **Password Hashing:** bcrypt
- **Input Validation:** Zod
- **Security:** Rate Limit, Helmet, Cors

## Project Setup Instructions

1. Clone the repository:

   ```bash
   git clone https://github.com/Sabbir2809/express-mongoose-modular-starter-template
   cd express-mongoose-modular-starter-template
   ```

2. Install dependencies:
   ```bash
   yarn install
   ```
3. Setup environment variables in `.env`.

   ```bash
    NODE_ENVIRONMENT=your_environment
    PORT=500
    CORS_ORIGIN=your_client_url
    DATABASE_URL=your_database_url

    BCRYPT_SALT_ROUNDS=your_bcrypt_salt_rounds
    JWT_SECRET=your_jwt_secret
    JWT_EXPIRES_IN=your_jwt_expires_in
    REFRESH_JWT_SECRET=your_refresh_jwt_secret
    REFRESH_JWT_EXPIRES_IN=your_refresh_jwt_expires_in

    CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
    CLOUDINARY_API_KEY=your_cloudinary_api_key
    CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

4. Run the development server:
   ```bash
   yarn dev
   ```
5. Open `http://localhost:5000` in your browser.
