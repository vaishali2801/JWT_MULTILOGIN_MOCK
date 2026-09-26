# 🔐 JWT Multi Login & Manager Management API

> Secure authentication and manager management using JWT.

A backend REST API built with **Node.js, Express.js, MongoDB, and JWT authentication**.

This project demonstrates authentication using JSON Web Tokens, password hashing with bcrypt, token-based authorization, multi-device login sessions, and CRUD operations for manager management.

---

## 📌 About the Project

**JWT Multi Login Mock** is an authentication and management API designed to demonstrate how JWT-based authentication can be implemented in a Node.js and Express application.

The application provides two main modules:

- 👤 Admin Authentication
- 👨‍💼 Manager Management

Admins can register and log in using email and password. After successful authentication, the server generates a JWT token and stores the token in the admin's token collection, allowing multiple active login sessions.

Protected Manager APIs require a valid JWT token before they can be accessed.

## screenshot
<img width="1280" height="832" alt="Screenshot 2026-09-26 at 12 51 08 PM" src="https://github.com/user-attachments/assets/5bde64d9-5bd6-4d1d-8520-64c3db9bf9a8" />
<img width="1280" height="832" alt="Screenshot 2026-09-26 at 12 51 53 PM" src="https://github.com/user-attachments/assets/2d3a5500-38e7-4458-9adb-4ee5e01d0590" />
<img width="1280" height="832" alt="Screenshot 2026-09-26 at 12 52 46 PM" src="https://github.com/user-attachments/assets/617c51ae-2d2c-4f7d-969c-4b124faac61d" />
<img width="1280" height="832" alt="Screenshot 2026-09-26 at 12 53 06 PM" src="https://github.com/user-attachments/assets/74466ed7-c6c7-4071-8a7b-314a559a6024" />
<img width="1280" height="832" alt="Screenshot 2026-09-26 at 12 56 15 PM" src="https://github.com/user-attachments/assets/1933b3b8-3044-4823-864c-1f8ce959d560" />
<img width="1280" height="832" alt="Screenshot 2026-09-26 at 12 59 02 PM" src="https://github.com/user-attachments/assets/3957781d-ebb0-49a5-a8ce-c250e88f1641" />
<img width="1280" height="832" alt="Screenshot 2026-09-26 at 1 00 05 PM" src="https://github.com/user-attachments/assets/b29cedca-57c2-49b1-952f-7e85ed14c5c2" />
<img width="1280" height="832" alt="Screenshot 2026-09-26 at 1 01 30 PM" src="https://github.com/user-attachments/assets/e3a854f5-a3b9-4fed-be74-2c3a62359ccd" />
<img width="1280" height="832" alt="Screenshot 2026-09-26 at 1 03 10 PM" src="https://github.com/user-attachments/assets/674cf172-32e6-4b7e-87bd-b97b63bd69fc" />


## ✨ Features

### 🔐 Admin Authentication

The project provides:

- Admin registration
- Admin login
- Password hashing using bcrypt
- JWT token generation
- JWT token verification
- Authentication middleware
- Admin profile retrieval
- Logout from current device
- Logout from all devices
- Multiple active login sessions

Passwords are hashed before being stored, and authentication tokens are generated using `jsonwebtoken`. :contentReference[oaicite:1]{index=1}

---

### 👥 Multi-Login Support

The application supports multiple login sessions by storing generated JWT tokens inside the Admin document.

When an admin logs in:

```text
Admin Login
     ↓
Validate Email & Password
     ↓
Generate JWT
     ↓
Store Token
     ↓
Return Token
```
👨‍💼 Manager Management

Authenticated users can manage managers through CRUD operations.

Manager Fields
Name
Email
Salary
Designation
Status

The Manager model defines these fields using Mongoose.

Available Operations
➕ Create Manager
📋 Get All Managers
🔍 Get Manager By ID
✏️ Update Manager
🗑️ Delete Manager

The manager listing, individual lookup, update, and delete routes are protected by authentication middleware.

🛡️ Authentication Flow
```
                    Client
                      │
                      ▼
                Admin Login
                      │
                      ▼
             Email + Password
                      │
                      ▼
             bcrypt Verification
                      │
                      ▼
                Generate JWT
                      │
                      ▼
             Store Token in DB
                      │
                      ▼
                Return Token
                      │
                      ▼
             Authorization Header
                      │
                      ▼
              Authentication
                Middleware
                      │
             ┌────────┴────────┐
             ▼                 ▼
          Valid              Invalid
             │                 │
             ▼                 ▼
       Allow Request       401 Error
```
The authentication middleware reads the Authorization header, extracts the Bearer token, verifies it using the configured JWT secret, and checks that the token exists in the authenticated admin's stored token list.

🔑 JWT Authentication

The project uses the jsonwebtoken package.

A generated token contains:

{
    _id: admin._id,
    role: admin.role
}

The token is signed using:

JWT_SECRET

The generated token is then stored with the admin's active tokens.

🔒 Password Security

Passwords are not stored directly.

Before saving an Admin document, the password is hashed using:

bcrypt.hash(admin.password, 8)

During login, the entered password is compared with the stored hash using:

bcrypt.compare()

This authentication logic is implemented in the Admin Mongoose model.

🛠️ Technologies Used
Technology	Purpose
🟢 Node.js	JavaScript runtime
🚂 Express.js	Backend framework
🍃 MongoDB	Database
🦫 Mongoose	MongoDB object modeling
🔐 JSON Web Token	Authentication
🔒 bcryptjs	Password hashing
⚙️ dotenv	Environment variables
🔄 Nodemon	Development server

The repository currently uses Express 5, Mongoose 9, jsonwebtoken, bcryptjs, dotenv, and Nodemon.

📂 Project Structure
```
JWT_MULTILOGIN_MOCK/
│
├── controller/
│   ├── AdminController.js
│   └── ManagerController.js
│
├── db/
│   └── config.js
│
├── middleware/
│   ├── auth.js
│   └── HttpError.js
│
├── model/
│   ├── Admin.js
│   └── Manager.js
│
├── routes/
│   ├── AdminRoute.js
│   └── ManagerRoute.js
│
├── .env
├── app.js
├── package.json
├── package-lock.json
└── README.md
```
The repository currently contains separate controller, database, middleware, model, and route directories.

📡 API Endpoints
👤 Admin APIs
Register Admin
POST /admin/registerAdmin

Example request:
```
{
    "username": "Vaishali",
    "email": "vaishali@example.com",
    "password": "123456",
    "role": "admin"
}
Admin Login
POST /admin/login

Example:

{
    "email": "vaishali@example.com",
    "password": "123456"
}

Returns an authentication token after successful login.

Get Admin Profile
GET /admin/getAdminProfile
Logout
POST /admin/logOut
Logout From All Devices
POST /admin/logOutAll

The Admin routes expose registration, login, profile, single-session logout, and all-session logout operations.

👨‍💼 Manager APIs
Create Manager
POST /manager/createManager

Example:

{
    "name": "John",
    "email": "john@example.com",
    "salary": "50000",
    "designation": "Project Manager",
    "status": true
}
Get All Managers
GET /manager/managers

🔒 Requires authentication.

Get Manager By ID
GET /manager/managers/:id

🔒 Requires authentication.

Update Manager
PUT /manager/update/:id

🔒 Requires authentication.

Delete Manager
DELETE /manager/delete/:id

🔒 Requires authentication.

The Manager routes use the auth middleware for manager listing, individual retrieval, update, and delete operations.

🔐 Authorization Header

Protected routes require the JWT token in the request header:

Authorization: Bearer <your-jwt-token>

Example:

Authorization: Bearer eyJhbGciOiJIUzI1NiIs...

The authentication middleware extracts and verifies this Bearer token before allowing access to protected routes.

⚙️ Environment Variables

Create a .env file in the project root:

PORT=5001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

The application loads environment variables using dotenv and connects to MongoDB using MONGO_URI.

⚠️ Never commit real database credentials or JWT secrets to GitHub.

🚀 Installation

Clone the repository:

git clone https://github.com/vaishali2801/JWT_MULTILOGIN_MOCK.git

Move into the project:

cd JWT_MULTILOGIN_MOCK

Install dependencies:

npm install

Create your .env file:

PORT=5001
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
▶️ Run the Project
Development Mode
npm run dev
Production Mode
npm start

The project defines both dev and start scripts in package.json.

🌐 Deployment

The repository currently has a deployed backend available on Render:

Live API:
https://jwt-multilogin-mock-1.onrender.com/

The GitHub repository lists this deployed URL in its About section.

🧠 Learning Outcomes

Through this project, I practiced:

Node.js backend development
Express.js
REST API development
MongoDB
Mongoose
JWT authentication
JWT authorization
Password hashing with bcrypt
Authentication middleware
Bearer tokens
Multi-device login sessions
Single-device logout
Logout from all devices
CRUD operations
MVC-style project structure
Error handling middleware
Environment variables
API testing with Postman
🔄 Complete Project Flow
                    JWT MULTI LOGIN
                          │
             ┌────────────┴────────────┐
             ▼                         ▼
        ADMIN MODULE              MANAGER MODULE
             │                         │
       ┌─────┴─────┐             Authentication
       ▼           ▼                   │
   Register      Login                ▼
       │           │              Manager CRUD
       │           ▼
       │       Generate JWT
       │           │
       │           ▼
       │       Store Token
       │           │
       └───────────┤
                   ▼
             Auth Middleware
                   │
          ┌────────┴────────┐
          ▼                 ▼
        Valid             Invalid
          │                 │
          ▼                 ▼
      Protected API       401
🚀 Future Improvements

Possible future improvements:

🔑 Role-based authorization for different admin roles
🔄 Refresh token implementation
⏱️ JWT expiration handling
📧 Email verification
🔐 Forgot/reset password
🚫 Account blocking/deactivation
📝 API documentation with Swagger
🧪 Automated API testing
🛡️ Helmet and rate limiting
📊 Admin dashboard
👥 More user roles and permissions
🍪 HttpOnly cookie-based authentication
👩‍💻 Author

Vaishali Chauhan

B.Tech Information Technology
Frontend / MERN Stack Developer

GitHub:
https://github.com/vaishali2801

⭐ Support

If you found this project useful for learning JWT Authentication and Node.js backend development, consider giving the repository a ⭐.

📄 License

This project is created for learning and educational purposes.
