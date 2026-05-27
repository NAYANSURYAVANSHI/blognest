# 🌟 BlogNest - Premium Blog Platform

<div align="center">

![BlogNest](https://img.shields.io/badge/BlogNest-Premium%20Edition-FFD700?style=for-the-badge)
![MERN Stack](https://img.shields.io/badge/MERN-Stack-00D9FF?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**A luxury full-stack blog platform with premium black & gold futuristic UI**

[Features](#-features) • [Tech Stack](#-tech-stack) • [Installation](#-installation) • [API](#-api-endpoints)

</div>

---

## ✨ Features

### 🎨 Premium UI/UX
- **Luxury Black & Gold Theme** - Elegant futuristic design with glassmorphism
- **Cinematic Animations** - Smooth transitions and golden glow effects
- **Responsive Design** - Perfect on all devices from mobile to desktop
- **Premium Components** - Custom-designed cards, buttons, and modals

### 🔐 Authentication & Security
- Secure user registration and login with JWT
- Protected routes and authenticated API endpoints
- Password encryption with bcrypt
- Token-based session management

### 📝 Blog Management
- **Create & Edit Posts** - Rich text editor with premium styling
- **My Posts Dashboard** - Manage all your posts in one place
- **Delete with Confirmation** - Premium modal with safety checks
- **Real-time Updates** - Instant UI updates without page refresh

### 💬 Social Features
- Comment system on all posts
- User profiles with post history
- Author attribution on posts
- Community engagement

### 🚀 Performance
- Optimized loading states with premium spinners
- Error handling with toast notifications
- Efficient API calls with axios
- MongoDB indexing for fast queries

---

## 🛠 Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **React Router v6** - Client-side routing
- **Tailwind CSS** - Utility-first styling
- **Axios** - HTTP client
- **React Toastify** - Toast notifications
- **Context API** - State management

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

---

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Quick Start

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/blognest.git
cd blognest
```

2. **Install dependencies**
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. **Environment Setup**

Create `.env` file in the `backend` directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/blog-platform
JWT_SECRET=your_super_secret_jwt_key_change_this
NODE_ENV=development
```

4. **Start MongoDB**
```bash
# If using local MongoDB
mongod
```

5. **Seed Database (Optional)**
```bash
cd backend
node seed.js
```

This creates 5 test accounts with sample posts. All test accounts use password: `password123`

6. **Run the Application**

```bash
# Terminal 1 - Start Backend (from backend directory)
npm start

# Terminal 2 - Start Frontend (from frontend directory)
npm start
```

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5000`

---

## 🎯 Test Accounts

After running the seed script, you can login with:

| Email | Password | Posts |
|-------|----------|-------|
| john@example.com | password123 | 3 |
| jane@example.com | password123 | 3 |
| alex@example.com | password123 | 2 |
| sarah@example.com | password123 | 2 |
| mike@example.com | password123 | 2 |

---

## 📁 Project Structure

```
blognest/
├── backend/
│   ├── middleware/
│   │   └── auth.js              # JWT authentication middleware
│   ├── models/
│   │   ├── User.js              # User schema
│   │   ├── Post.js              # Post schema
│   │   └── Comment.js           # Comment schema
│   ├── routes/
│   │   ├── auth.js              # Authentication routes
│   │   ├── posts.js             # Post CRUD routes
│   │   └── comments.js          # Comment routes
│   ├── .env.example             # Environment variables template
│   ├── server.js                # Express server setup
│   ├── seed.js                  # Database seeding script
│   └── package.json
│
├── frontend/
│   ├── public/
│   │   ├── index.html
│   │   ├── logo.svg             # BlogNest logo
│   │   └── logo-icon.svg        # Favicon
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js        # Premium navigation bar
│   │   │   ├── PostCard.js      # Post display card
│   │   │   ├── CommentSection.js # Comments component
│   │   │   └── PrivateRoute.js  # Protected route wrapper
│   │   ├── context/
│   │   │   └── AuthContext.js   # Authentication context
│   │   ├── pages/
│   │   │   ├── Home.js          # Landing page
│   │   │   ├── Login.js         # Login page
│   │   │   ├── Register.js      # Registration page
│   │   │   ├── MyPosts.js       # User's posts dashboard
│   │   │   ├── CreateEditPost.js # Post editor
│   │   │   ├── PostDetail.js    # Single post view
│   │   │   └── Profile.js       # User profile
│   │   ├── services/
│   │   │   └── api.js           # API service layer
│   │   ├── App.js               # Main app component
│   │   ├── index.js             # React entry point
│   │   └── index.css            # Premium theme styles
│   ├── tailwind.config.js
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## 🔌 API Endpoints

### Authentication
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | ❌ |
| POST | `/api/auth/login` | Login user | ❌ |

### Posts
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/posts` | Get all posts | ❌ |
| GET | `/api/posts/:id` | Get single post | ❌ |
| POST | `/api/posts` | Create new post | ✅ |
| PUT | `/api/posts/:id` | Update post | ✅ |
| DELETE | `/api/posts/:id` | Delete post | ✅ |

### Comments
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/comments/post/:postId` | Get post comments | ❌ |
| POST | `/api/comments` | Create comment | ✅ |
| DELETE | `/api/comments/:id` | Delete comment | ✅ |

---

## 🎨 Design Features

### Premium Black & Gold Theme
- **Color Palette**:
  - Main Background: `#050505`
  - Secondary Background: `#0D0D0D`
  - Premium Gold: `#FFD700`
  - Soft Gold: `#F5C542`
  - Accent Glow: `#FFB800`

### Visual Effects
- ✨ Glassmorphism cards with backdrop blur
- 🌟 Golden glow animations
- 💫 Smooth hover transitions
- 🎭 Cinematic shadows
- ⚡ Premium loading spinners
- 🔮 Pulse animations
- 📱 Fully responsive design

---

## 🚀 Deployment

### Backend Deployment (Heroku/Railway)
1. Set environment variables
2. Update MongoDB URI to production database
3. Deploy backend

### Frontend Deployment (Vercel/Netlify)
1. Update API base URL in `frontend/src/services/api.js`
2. Build: `npm run build`
3. Deploy build folder

---

## 📝 License

MIT License - feel free to use this project for personal or commercial purposes.

---

## 👨‍💻 Author

Built with ❤️ and premium design principles

---

## 🙏 Acknowledgments

- Design inspired by luxury cyberpunk aesthetics
- Icons from Heroicons
- Fonts: Inter, Orbitron, Fira Code

---

<div align="center">

**⭐ Star this repo if you like it! ⭐**

Made with 🔥 by passionate developers

</div>
