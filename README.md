# 📦 ph-Healthcare

A simple and scalable TypeScript + Prisma + Express setup for building a healthcare server backend using PostgreSQL.

## 📋 Table of Contents

- [🚀 Getting Started](#-getting-started)
- [✅ Prerequisites](#-prerequisites)
- [🛠 Setup Instructions](#-setup-instructions)
- [📁 Project Structure](#-project-structure)
- [🔧 Environment Variables](#-environment-variables)
- [📚 API Documentation](#-api-documentation)
- [🧪 Testing](#-testing)
- [🔒 Security](#-security)
- [📦 Dependencies](#-dependencies)
- [🤝 Contributing](#-contributing)
- [📝 License](#-license)

## 🚀 Getting Started

Follow the steps below to set up and run the project locally.

### ✅ Prerequisites

- Node.js (v18 or higher)
- Yarn (v1.22 or higher)
- PostgreSQL (v14 or higher)
- Git

## 🛠 Setup Instructions

### Manual Project Initialization

#### 1. Initialize Yarn Project

```bash
yarn init
```

#### 2. Install Core Dependencies

```bash
yarn add prisma typescript ts-node @types/node -D
```

#### 3. Initialize TypeScript Configuration

```bash
npx tsc --init
```

In `tsconfig.json`, update the paths to:

```json
{
  "compilerOptions": {
    "rootDir": "./src",
    "outDir": "./dist"
  }
}
```

#### 4. Initialize Prisma

```bash
npx prisma init
```

#### 5. Install Express and Dependencies

```bash
# Install Express
yarn add express

# Install Development Tools
yarn add ts-node-dev -D

# Install CORS Middleware
yarn add cors
yarn add @types/cors -D
```

#### 6. Create Project Structure

Create the following directory structure:

```
ph-healthcare/
│
├── prisma/
│ └── schema.prisma
├── src/
│ ├── app.ts
│ └── server.ts
├── .env
├── package.json
├── tsconfig.json
└── README.md
```

#### 7. Create Server Files

##### `src/server.ts`

```typescript
import app from "./app";

const port = 3000;

app.listen(port, () => {
  console.log("APP is listening on port ", port);
});
```

##### `src/app.ts`

```typescript
import cors from "cors";
import express, { Application, Request, Response } from "express";

const app: Application = express();

// Apply CORS middleware globally
app.use(cors());

// Define route
app.get("/", (req: Request, res: Response) => {
  res.send({
    Message: "Ph Health care server",
  });
});

export default app;
```

#### 8. Add Script to package.json

Add a dev script in `package.json` to run the server in development mode:

```json
{
  "scripts": {
    "dev": "ts-node-dev --respawn --transpile-only src/server.ts"
  }
}
```

### Quick Start (Alternative)

If you prefer a quicker setup, you can clone the repository and follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/your-username/ph-healthcare.git
cd ph-healthcare
```

2. Install dependencies:

```bash
yarn install
```

3. Environment Setup:
   Create a `.env` file in the root directory:

```bash
# Database
DATABASE_URL="postgresql://<username>:<password>@localhost:5432/ph-health?schema=public"

# Server
PORT=3000
NODE_ENV=development

# JWT (for authentication)
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=24h

# CORS
CORS_ORIGIN=http://localhost:3000
```

4. Database Setup:

```bash
# Generate Prisma Client
npx prisma generate

# Run Migrations
npx prisma migrate dev

# Seed Database (optional)
npx prisma db seed
```

5. Start the Development Server:

```bash
yarn dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your server running.

## 📁 Project Structure

```
ph-healthcare/
│
├── prisma/
│   ├── migrations/     # Database migrations
│   ├── seed.ts        # Database seeding script
│   └── schema.prisma  # Prisma schema
│
├── src/
│   ├── config/        # Configuration files
│   ├── controllers/   # Route controllers
│   ├── middleware/    # Custom middleware
│   ├── models/        # Data models
│   ├── routes/        # API routes
│   ├── services/      # Business logic
│   ├── utils/         # Utility functions
│   ├── app.ts         # Express app setup
│   └── server.ts      # Server entry point
│
├── tests/             # Test files
├── .env               # Environment variables
├── .gitignore         # Git ignore file
├── package.json       # Project dependencies
├── tsconfig.json      # TypeScript configuration
└── README.md          # Project documentation
```

## 🔧 Environment Variables

| Variable       | Description                          | Default               |
| -------------- | ------------------------------------ | --------------------- |
| DATABASE_URL   | PostgreSQL connection string         | -                     |
| PORT           | Server port                          | 3000                  |
| NODE_ENV       | Environment (development/production) | development           |
| JWT_SECRET     | JWT secret key                       | -                     |
| JWT_EXPIRES_IN | JWT expiration time                  | 24h                   |
| CORS_ORIGIN    | Allowed CORS origin                  | http://localhost:3000 |

## 📚 API Documentation

The API documentation is available at `/api-docs` when running the server in development mode.

### Authentication

All protected routes require a JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

### API Endpoints

- `GET /api/health` - Health check endpoint
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/users` - Get all users (protected)
- `GET /api/users/:id` - Get user by ID (protected)

## 🧪 Testing

```bash
# Run tests
yarn test

# Run tests with coverage
yarn test:coverage

# Run tests in watch mode
yarn test:watch
```

## 🔒 Security

- JWT-based authentication
- Password hashing with bcrypt
- CORS enabled
- Rate limiting
- Input validation
- SQL injection prevention (Prisma)
- XSS protection

## 📦 Dependencies

### Production Dependencies

- express - Web framework
- prisma - ORM
- cors - CORS middleware
- jsonwebtoken - JWT authentication
- bcrypt - Password hashing
- zod - Schema validation

### Development Dependencies

- typescript - TypeScript support
- ts-node-dev - Development server
- jest - Testing framework
- @types/\* - Type definitions
- prisma - Development tools

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Made with ❤️ by EMTIAZ AHMED
