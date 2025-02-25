# Bicycle Store API Server
https://bycle-server.vercel.app/api'
This repository contains the server-side code for a bicycle store platform, built using Node.js, Express.js, TypeScript, and MongoDB (via Mongoose). This server provides RESTful APIs for managing bicycle products, orders, and user authentication.

## Features

- User Registration and Login (with password encryption using bcrypt)
- Bicycle CRUD operations
- Order management
- Role-based access control (Admin functionalities)
- Secure authentication with JWT
- User role management and access control

## Technologies Used

- **Node.js**: JavaScript runtime environment
- **Express.js**: Web framework for Node.js
- **TypeScript**: Typed JavaScript
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling tool
- **bcrypt**: Password hashing
- **jsonwebtoken**: Secure authentication
- **dotenv**: Manage environment variables

## API Endpoints

### Order Routes
- **Verify payment**: `GET /api/orders/verify` - `orderController.verifyPayment`
- **Create an order**: `POST /api/orders` - `orderController.createOrder`
- **Get all orders**: `GET /api/orders` - `orderController.getAllOrders`
- **Get revenue**: `GET /api/orders/revenue` - `orderController.getRevenue`
- **Delete an order**: `DELETE /api/orders/:productId` - `orderController.deleteOrderdb`

### Bicycle Routes
- **Create a bicycle**: `POST /api/bicycles` - `validateRequest(bycleValidation.bycleValidationZodSchema), productController.createBicycle`
- **Get all bicycles**: `GET /api/bicycles` - `productController.getAllBicycles`
- **Get a single bicycle**: `GET /api/bicycles/:productId` - `productController.getASingleBicycle`
- **Delete a bicycle**: `DELETE /api/bicycles/:productId` - `productController.deleteASingeBicycle`
- **Update a bicycle**: `PUT /api/bicycles/:productId` - `productController.updateBicycle`

### User Management
- **Register a user**: `POST /api/users/register` - `validation(uservalidationAll.userRegistervalidation), AlluserController.userRegister`
- **Login a user**: `POST /api/users/login` - `validation(uservalidationAll.userLoginvalidation), AlluserController.userLogin`
- **Refresh token**: `POST /api/users/refresh-token` - `AlluserController.refreshToken`
- **Get all users (Admin only)**: `GET /api/users/alluser` - `authorizeRole(['admin']), AlluserController.AlluserGet`
- **Get a single user (User/Admin)**: `GET /api/users/sigleusr` - `authorizeRole(['user','admin']), AlluserController.singleUser`
- **Update a user (User/Admin)**: `PUT /api/users/:id` - `authorizeRole(['user','admin']), AlluserController.upateUserInDB`
- **Update user role (Admin only)**: `PUT /api/users/updateRole/:id` - `authorizeRole(['admin']), AlluserController.UpdateRole`
- **Delete a user (Admin only)**: `DELETE /api/users/deletedUsers/:id` - `authorizeRole(['admin']), AlluserController.DeletedUser`
- **Change password (User/Admin)**: `PUT /api/users/changePassword` - `authorizeRole(['user','admin']), AlluserController.changePasswordService`




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

