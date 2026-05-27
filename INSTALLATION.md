# Complete Installation Guide

## Table of Contents
1. [System Requirements](#system-requirements)
2. [Installation Steps](#installation-steps)
3. [Database Setup](#database-setup)
4. [Running the Application](#running-the-application)
5. [Testing with Sample Data](#testing-with-sample-data)
6. [Verification](#verification)
7. [Common Issues](#common-issues)

## System Requirements

### Required Software
- **Node.js**: v14.0.0 or higher
- **npm**: v6.0.0 or higher (comes with Node.js)
- **MongoDB**: v4.0 or higher (local) OR MongoDB Atlas account (cloud)

### Check Your Versions
```bash
node --version
npm --version
mongo --version  # or mongod --version
```

## Installation Steps

### Step 1: Clone or Download the Project
If you have the project files, navigate to the project directory:
```bash
cd blog-platform
```

### Step 2: Install Backend Dependencies
```bash
cd backend
npm install
```

Expected packages installed:
- express
- mongoose
- bcryptjs
- jsonwebtoken
- cors
- dotenv
- express-validator
- nodemon (dev dependency)

### Step 3: Install Frontend Dependencies
```bash
cd ../frontend
npm install
```

Expected packages installed:
- react
- react-dom
- react-router-dom
- axios
- react-scripts
- tailwindcss
- autoprefixer
- postcss

### Step 4: Quick Install (Alternative)
From the root directory:
```bash
npm run install-all
```

## Database Setup

### Option 1: Local MongoDB

#### Windows
1. Download MongoDB from [mongodb.com](https://www.mongodb.com/try/download/community)
2. Install with default settings
3. MongoDB should start automatically as a service
4. Verify it's running:
```bash
net start MongoDB
```

#### macOS
```bash
# Using Homebrew
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

#### Linux (Ubuntu/Debian)
```bash
sudo apt-get install mongodb
sudo systemctl start mongodb
sudo systemctl enable mongodb
```

#### Verify MongoDB is Running
```bash
# Try connecting
mongo
# or
mongosh

# You should see the MongoDB shell
```

### Option 2: MongoDB Atlas (Cloud)

1. **Create Account**
   - Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for a free account

2. **Create Cluster**
   - Click "Build a Database"
   - Choose "Free" tier (M0)
   - Select a cloud provider and region
   - Click "Create Cluster"

3. **Configure Access**
   - Create a database user (username + password)
   - Add your IP address to the IP Access List (or use 0.0.0.0/0 for testing)

4. **Get Connection String**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password

5. **Update Backend Configuration**
   Edit `backend/.env`:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/blog-platform?retryWrites=true&w=majority
   ```

## Running the Application

### Terminal 1: Start Backend Server

```bash
cd backend
npm run dev
```

**Expected Output:**
```
[nodemon] starting `node server.js`
Server running on port 5000
Connected to MongoDB
```

**If you see this, the backend is ready! ✅**

### Terminal 2: Start Frontend Server

Open a **NEW terminal window**:

```bash
cd frontend
npm start
```

**Expected Output:**
```
Compiled successfully!

You can now view blog-frontend in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.x.x:3000
```

**Your browser should automatically open to http://localhost:3000 ✅**

## Testing with Sample Data

### Option 1: Use the Seed Script

This will create sample users, posts, and comments:

```bash
cd backend
npm run seed
```

**Sample Credentials Created:**
- User 1: `john@example.com` / `password123`
- User 2: `jane@example.com` / `password123`

### Option 2: Manual Testing

1. **Register a New User**
   - Click "Register" in the navbar
   - Fill in username, email, and password
   - Click "Register"

2. **Create a Post**
   - After logging in, click "Create Post"
   - Enter a title and content
   - Click "Create Post"

3. **Add a Comment**
   - Click on any post to view details
   - Scroll to the comment section
   - Type a comment and click "Post Comment"

## Verification

### Backend Health Check
Open your browser or use curl:
```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{"status":"ok","message":"Server is running"}
```

### Frontend Check
Navigate to: http://localhost:3000

You should see:
- ✅ Navbar with "BlogPlatform" logo
- ✅ "Login" and "Register" buttons (if not logged in)
- ✅ "Latest Posts" heading
- ✅ Either posts displayed or "No posts yet" message

### API Endpoints Check

Test the API directly:

```bash
# Get all posts
curl http://localhost:5000/api/posts

# Register a user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"password123"}'
```

## Common Issues

### Issue: "Cannot connect to MongoDB"

**Solution 1: Check if MongoDB is running**
```bash
# Windows
net start MongoDB

# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongodb
```

**Solution 2: Check connection string**
- Verify `MONGODB_URI` in `backend/.env`
- For local: `mongodb://localhost:27017/blog-platform`
- For Atlas: Check username, password, and cluster URL

### Issue: "Port 5000 already in use"

**Solution: Change the backend port**
Edit `backend/.env`:
```env
PORT=5001
```

Then update frontend proxy in `frontend/package.json`:
```json
"proxy": "http://localhost:5001"
```

### Issue: "Port 3000 already in use"

**Solution: Use a different port**
When prompted, type `Y` to run on a different port, or:

Set environment variable:
```bash
# Windows
set PORT=3001 && npm start

# macOS/Linux
PORT=3001 npm start
```

### Issue: "Module not found"

**Solution: Reinstall dependencies**
```bash
# Backend
cd backend
rm -rf node_modules package-lock.json
npm install

# Frontend
cd frontend
rm -rf node_modules package-lock.json
npm install
```

### Issue: "JWT token invalid"

**Solution: Clear browser storage**
1. Open browser DevTools (F12)
2. Go to Application tab
3. Click "Local Storage"
4. Delete all items
5. Refresh the page

### Issue: "CORS error"

**Solution: Verify proxy configuration**
Check `frontend/package.json` has:
```json
"proxy": "http://localhost:5000"
```

Restart the frontend server after changes.

### Issue: Tailwind styles not working

**Solution: Rebuild the frontend**
```bash
cd frontend
npm run build
npm start
```

## Environment Variables Reference

### Backend (.env)
```env
PORT=5000                                    # Server port
MONGODB_URI=mongodb://localhost:27017/blog-platform  # Database connection
JWT_SECRET=your_secret_key_here             # JWT signing key (change this!)
NODE_ENV=development                         # Environment mode
```

### Frontend (.env) - Optional
```env
REACT_APP_API_URL=http://localhost:5000/api  # Backend API URL
```

## Next Steps

Once everything is running:

1. ✅ Register a new account
2. ✅ Create your first blog post
3. ✅ Add comments to posts
4. ✅ Edit and delete your own content
5. ✅ Explore the codebase
6. ✅ Customize the styling
7. ✅ Add new features

## Getting Help

If you encounter issues not covered here:

1. Check the [README.md](README.md) for detailed documentation
2. Review the [FEATURES.md](FEATURES.md) for feature descriptions
3. Look at the browser console for error messages (F12)
4. Check the backend terminal for server errors
5. Verify all environment variables are set correctly

## Success Checklist

- [ ] Node.js and npm installed
- [ ] MongoDB running (local or Atlas)
- [ ] Backend dependencies installed
- [ ] Frontend dependencies installed
- [ ] Backend .env file configured
- [ ] Backend server running on port 5000
- [ ] Frontend server running on port 3000
- [ ] Can access http://localhost:3000 in browser
- [ ] Can register and login
- [ ] Can create posts and comments

If all items are checked, you're ready to go! 🎉
