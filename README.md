# Writora
A full-stack blog platform with Role-Based Access Control (RBAC) built using:

- Node.js + Express.js (Backend)
- MongoDB (Database)
- React.js + TailwindCSS (Frontend)

### Hosted Link: https://writora.vercel.app/

---

## Features ✨

- Signup / Login with email/password
- Email verification on signup
- JWT-based authentication
- Role-based access control (user/admin)
- Admin dashboard to create/update/delete blogs
- Public blogs view (for authenticated users)
- Fully responsive modern UI with TailwindCSS
- Secure password hashing and email token expiration

---

## Technologies Used 🛠️

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose
- bcryptjs for password hashing
- jsonwebtoken for authentication
- nodemailer for email services

**Frontend:**
- React.js (Vite or CRA)
- React Router
- Axios for API calls
- TailwindCSS for styling
- React Toastify for alerts

---

## Setup Instructions ⚙️

### Backend:

```bash
cd server
npm install
npm start
```

### Configure .env (backend)

```bash
PORT=1234
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_FROM=your_email@gmail.com
EMAIL_PASS=your_app_password
CLIENT_URL=http://localhost:3000
```

### Frontend

```bash
cd client
npm install
npm start
```

## Detailed Flow

Signup Flow:
- User submits signup form → backend creates user with verification token → sends email.

Email Verification Flow:
- User clicks email verification link → backend verifies token → activates account.

Login Flow:
- User submits login → backend checks credentials → returns JWT token.

Authenticated Access:
- Token attached in Authorization header → backend middleware verifies user → grants/denies access.

Admin Access:
- Admin-only routes checked with role middleware.
- Admin can create/update/delete blogs.

Blogs Fetch:
- All authenticated users can view blogs.

## Pages screenshots

### Signup
<img width="1440" alt="Screenshot 2025-04-26 at 9 46 44 PM" src="https://github.com/user-attachments/assets/b397ff73-f25f-4c55-b5ca-c4a420ba42fe" />

### Loign
<img width="1440" alt="Screenshot 2025-04-26 at 9 46 26 PM" src="https://github.com/user-attachments/assets/3d304b9c-83d0-4203-bb1e-29d999ffe3c5" />

### HomeScreen
<img width="1440" alt="Screenshot 2025-04-26 at 9 47 30 PM" src="https://github.com/user-attachments/assets/168a1adf-a05a-45a4-a2f8-a8e1b65b5e9a" />

### BlogList
<img width="1440" alt="Screenshot 2025-04-26 at 9 47 42 PM" src="https://github.com/user-attachments/assets/814f0a6e-5890-443b-ad38-ea5e81cf67a9" />

### AdminDashboard
<img width="1440" alt="Screenshot 2025-04-26 at 9 47 55 PM" src="https://github.com/user-attachments/assets/3ffd6a84-36ae-4b2f-a81c-84c6262279a2" />
<img width="1440" alt="Screenshot 2025-04-26 at 9 48 01 PM" src="https://github.com/user-attachments/assets/f69f77ac-f704-42cf-b1f7-b865520edb2a" />
