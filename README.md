# 🎬 Movie Manager - Full Stack Application

A robust and modern Movie Management application built with the MERN stack (MongoDB, Express, React, Node.js). It features seamless Google Authentication, a premium dark-mode UI, responsive design, and personal movie collection management.

## ✨ Key Features

### 🔐 Authentication & User Profile
- **Google Sign-In**: One-click login using Firebase Authentication.
- **Secure Auth**: JWT-based session management with HTTP-only cookies.
- **Profile Management**: Update username, email, and password securely.
- **My Collection**: Private movie list for each user.

### 🎨 Modern UI/UX
- **Premium Aesthetics**: Glassmorphism, smooth gradients, and polished animations using **Framer Motion**.
- **Dark/Light Mode**: Fully dynamic theme toggle with persistent preference.
- **Responsive Design**: Optimized for everything from mobile phones to large desktops.
- **Interactive Graphs**: Visual genre distribution charts using **Recharts**.

### 🎬 Movie Management
- **TMDB Integration**: Browse popular, top-rated, and upcoming movies from The Movie Database.
- **CRUD Operations**: Add, Edit, and Delete movies from your personal collection.
- **Smart Search**: Filter and find movies instantly.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18 (Vite)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Http Client**: Axios
- **Notifications**: React Hot Toast

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose Schema)
- **Auth**: Firebase Admin SDK & JWT
- **Security**: Cookie Parser, CORS, Bcrypt

---

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v16+)
- MongoDB (Local or Atlas)
- Firebase Project (for Google Auth)

### 1. Backend Setup
1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` directory:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   NODE_ENV=development
   JWT_SECRET=your_jwt_secret_key
   ```
4. Start the server:
   ```bash
   npm run dev
   ```

### 2. Frontend Setup
1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite server:
   ```bash
   npm run dev
   ```

---

## 📡 API Endpoints

### 🟢 Auth & Profile
| Method | Endpoint | Description | Auth Required |
|:-------|:---------|:------------|:--------------|
| `POST` | `/api/auth/register` | Register new user | ❌ |
| `POST` | `/api/auth/login` | Login with Email/Pass | ❌ |
| `POST` | `/api/auth/logout` | Logout user | ❌ |
| `GET` | `/api/auth/me` | Get current user profile | ✅ |
| `PUT` | `/api/auth/profile` | Update profile details | ✅ |

### 🎬 Movies
| Method | Endpoint | Description | Auth Required |
|:-------|:---------|:------------|:--------------|
| `GET` | `/api/movies` | Get user's movies | ✅ |
| `POST` | `/api/movies` | Add a new movie | ✅ |
| `PUT` | `/api/movies/:id` | Update a movie | ✅ |
| `DELETE` | `/api/movies/:id` | Delete a movie | ✅ |

---

## 🤝 Contributing
1. Fork the repo
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
