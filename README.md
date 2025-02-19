# Blogging Site Server


This repository contains the server-side code for a blogging platform, built using Node.js, Express.js, TypeScript, and MongoDB (via Mongoose). This server provides RESTful APIs for managing blogs, user authentication, and admin functionalities.

## Features

- User Registration and Login (with password encryption using bcrypt)
- Blog CRUD operations
- Role-based access control (Admin functionalities)
- Secure authentication with JWT
- Block user functionality for admins

## Technologies Used

- **Node.js**: JavaScript runtime environment
- **Express.js**: Web framework for Node.js
- **TypeScript**: Typed JavaScript
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling tool
- **bcrypt**: Password hashing
- **jsonwebtoken**: Secure authentication
- **dotenv**: Manage environment variables

***Server: https://assignment003-three.vercel.app***
## API Endpoints

### Blogs
- **Fetch all blogs**: `GET /api/blogs`
- **Create a new blog**: `POST /api/blogs`
- **Get a single blog by ID**: `GET /api/blogs/:id`
- **Update a blog by ID**: `PUT /api/blogs/:id`
- **Delete a blog by ID**: `DELETE /api/blogs/:id`
- **Delete a blog by Admin**: `DELETE /api/admin/blogs/:id`

### User Management
- **Register a user**: `POST /api/auth/register`
- **Login a user**: `POST /api/auth/login`
- **Block a user by Admin**: `PUT /api/admin/:userId/block`

## Project Structure

```
blogging-site-server/
├── dist/                      # Compiled TypeScript files
├── node_modules/              # Installed dependencies
├── src/                       # Source code
│   ├── app/                   # Application-specific files
│   │   ├── config/            # Configuration files (e.g., database connection)
│   │   ├── errors/            # Custom error handling
│   │   ├── helper/            # Helper functions
│   │   ├── interface/         # TypeScript interfaces
│   │   ├── middlewares/       # Express middlewares (e.g., authentication, error handling)
│   │   ├── modules/           # Feature-specific modules
│   │   ├── routes/            # Express route handlers
│   │   └── utils/             # Utility functions (e.g., helpers)
│   ├── app.ts                 # Main application file
│   └── server.ts              # Entry point of the application
├── .env                       # Environment variables
├── .gitignore                 # Files and directories to ignore in git
├── package.json               # Project metadata and dependencies
├── package-lock.json          # Dependency tree lock file
├── README.md                  # Project documentation (this file)
├── tsconfig.json              # TypeScript configuration
└── tsconfig.build.json        # TypeScript build configuration
```

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/mydul62/Blog-Server.git
  
   ```
. **then:**
   ```bash
  cd Blog-Server 
  
   ```


 2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory and configure the following:
   ```env
   PORT=5000
   DATABASE_URL=your_mongo_db_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. **Run the application:**
   ```bash
   npm run dev
   ```
   The server will be running at `http://localhost:5000`.

## Scripts

- **Start production server:**
  ```bash
  npm run start:prod
  ```
- **Start development server:**
  ```bash
  npm run dev
  ```
- **Build TypeScript:**
  ```bash
  npm run build
  ```
- **Run ESLint:**
  ```bash
  npm run lint
  ```
- **Fix ESLint issues:**
  ```bash
  npm run lint:fix
  ```
- **Format code with Prettier:**
  ```bash
  npm run format
  ```
- **Test application:**
  ```bash
  npm run test
  ```

---

