# Quick Start Guide

Get the blog platform running in 5 minutes!

## Prerequisites
- Node.js installed (v14+)
- MongoDB installed and running locally OR MongoDB Atlas account

## Step 1: Install Dependencies

From the root directory, install all dependencies:

```bash
npm run install-all
```

Or install manually:

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

## Step 2: Configure MongoDB

### Option A: Local MongoDB
Make sure MongoDB is running on your machine:
```bash
# On Windows (if installed as service)
net start MongoDB

# On Mac/Linux
mongod
```

The default `.env` file in `backend/.env` is already configured for local MongoDB.

### Option B: MongoDB Atlas (Cloud)
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get your connection string
4. Update `backend/.env`:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/blog-platform?retryWrites=true&w=majority
```

## Step 3: Start the Backend

Open a terminal in the `backend` folder:

```bash
cd backend
npm run dev
```

You should see:
```
Server running on port 5000
Connected to MongoDB
```

## Step 4: Start the Frontend

Open a **new terminal** in the `frontend` folder:

```bash
cd frontend
npm start
```

The browser will automatically open to `http://localhost:3000`

## Step 5: Use the Application

1. **Register** a new account
2. **Login** with your credentials
3. **Create** your first blog post
4. **Comment** on posts
5. **Edit/Delete** your own posts

## Troubleshooting

### "Cannot connect to MongoDB"
- Make sure MongoDB is running
- Check your connection string in `backend/.env`
- For Atlas, ensure your IP is whitelisted

### "Port 3000 already in use"
- Stop other React apps or change the port
- The app will prompt you to use a different port

### "Port 5000 already in use"
- Stop other services using port 5000
- Or change the PORT in `backend/.env`

### Authentication not working
- Clear browser localStorage (F12 → Application → Local Storage → Clear)
- Make sure JWT_SECRET is set in `backend/.env`

## Default Configuration

- **Backend**: http://localhost:5000
- **Frontend**: http://localhost:3000
- **Database**: mongodb://localhost:27017/blog-platform

## Next Steps

- Read the full [README.md](README.md) for detailed documentation
- Explore the API endpoints
- Customize the styling with Tailwind CSS
- Deploy to production

## Need Help?

Check the main README.md for:
- Complete API documentation
- Project structure
- Deployment guides
- Security best practices

Happy blogging! 🚀
