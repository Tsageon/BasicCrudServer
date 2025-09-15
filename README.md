**Employee & User Management API (Firebase Auth + Express.js)**
A Node.js + Express backend for managing employees, admins, superadmins, and regular users with Firebase Authentication and Firestore.
Supports role-based access control, CRUD operations, and secure authentication.

**Features**
Firebase Authentication for all users

Role-based access control (user, admin, superadmin)

Superadmin can create admins and employees

Admin can manage employees and users

Regular Users can register, login, and update their own profile

CRUD endpoints for employees and users

JWT verification middleware

Firebase email handling for password resets

**Requirements**
Node.js v16+

Firebase project (with Admin SDK enabled)

Service account JSON file from Firebase console

Firestore database set up

**Installation**
Clone the repo
git clone https://github.com/your-repo/employee-management-api.git
cd employee-management-api

Install dependencies
npm install

Create .env file:
PORT=5000
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=your_client_email
FIREBASE_PRIVATE_KEY="your_private_key"

Running the Server
node Server.js

**Project Structure**
├── Config
│   └── Firebase.js       # Firebase Admin SDK config
├── Controller
│   ├── Employee.js       # Employee CRUD logic
│   ├── User.js           # Regular user CRUD logic
│   └── Auth.js           # Registration, login, password reset
├── Middleware
│   └── authMiddleware.js # verifyToken, checkRole, verifySuperAdmin
├── Routes
│   ├── employeeRoutes.js
│   ├── userRoutes.js
│   └── authRoutes.js
├── server.js             # Main entry point
└── package.json

**Middleware**
verifyToken
Verifies the Firebase ID token from the request header.
verifyToken(req, res, next)

checkRole(roles)
Checks if the authenticated user has one of the allowed roles.
checkRole(["admin", "superadmin"])

verifySuperAdmin
Ensures only a superadmin can access certain routes.

**API Endpoints**
Auth

| Method | Endpoint         | Description                 | Roles Allowed     |
| ------ | ---------------- | --------------------------- | ----------------- |
| POST   | `/auth/register` | Register a new regular user | Public            |
| POST   | `/auth/login`    | Login user and get ID token | Public            |
| POST   | `/auth/reset`    | Send password reset email   | Admin, Superadmin |

Employees

| Method | Endpoint               | Description       | Roles Allowed     |
| ------ | ---------------------- | ----------------- | ----------------- |
| GET    | `/employee/get`        | Get all employees | Superadmin |
| POST   | `/employee/add`        | Add new employee  | Superadmin        |
| PUT    | `/employee/update/:id` | Update employee   | Superadmin |
| DELETE | `/employee/delete/:id` | Delete employee   | Superadmin        |

Users

| Method | Endpoint           | Description   | Roles Allowed     |
| ------ | ------------------ | ------------- | ----------------- |
| GET    | `/user/get`        | Get all users | Admin, Superadmin |
| POST   | `/user/add`        | Add new user  | Admin, Superadmin |
| PUT    | `/user/update/:id` | Update user   | Admin, Superadmin |
| DELETE | `/user/delete/:id` | Delete user   | Admin, Superadmin |

**Authentication Flow**
Register:

Regular users register via /auth/register

Admins/Superadmins can create accounts directly for employees/users

Login:

Use /auth/login to get Firebase ID token

Send Authorization: Bearer <token> in all protected requests

Role Checks:

Middleware verifies token and role

Access is granted only if user role matches allowed roles for that route

