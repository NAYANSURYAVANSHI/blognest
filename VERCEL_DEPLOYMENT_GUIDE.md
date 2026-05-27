# 🚀 Vercel Deployment Guide for BlogNest

## Overview
We'll deploy both backend and frontend on Vercel:
- **Backend**: Separate Vercel project (API)
- **Frontend**: Main Vercel project (React app)

---

## Prerequisites
✅ Vercel CLI installed (already done!)
✅ GitHub repository pushed (already done!)
✅ MongoDB Atlas account (for production database)

---

## Step 1: Set Up MongoDB Atlas (Free)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Create a free account
3. Create a new cluster (Free M0 tier)
4. Click "Connect" → "Connect your application"
5. Copy the connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/`)
6. Replace `<password>` with your actual password
7. Add `/blognest` at the end: `mongodb+srv://username:password@cluster.mongodb.net/blognest`

---

## Step 2: Deploy Backend to Vercel

### Option A: Using Vercel CLI (Recommended)

```bash
# Navigate to backend directory
cd backend

# Login to Vercel (if not already logged in)
vercel login

# Deploy backend
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? blognest-backend
# - Directory? ./
# - Override settings? No

# After deployment, set environment variables
vercel env add MONGODB_URI
# Paste your MongoDB Atlas connection string

vercel env add JWT_SECRET
# Enter a strong random secret (e.g., use: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")

vercel env add NODE_ENV
# Enter: production

# Deploy to production
vercel --prod
```

### Option B: Using Vercel Dashboard

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New" → "Project"
3. Import your GitHub repository: `NAYANSURYAVANSHI/blognest`
4. Configure:
   - **Project Name**: `blognest-backend`
   - **Root Directory**: `backend`
   - **Framework Preset**: Other
5. Add Environment Variables:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: Strong random secret
   - `NODE_ENV`: production
6. Click "Deploy"

**Save your backend URL**: `https://blognest-backend.vercel.app`

---

## Step 3: Deploy Frontend to Vercel

### Option A: Using Vercel CLI (Recommended)

```bash
# Navigate to frontend directory
cd ../frontend

# Deploy frontend
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? blognest
# - Directory? ./
# - Override settings? No

# Set environment variable for API URL
vercel env add REACT_APP_API_URL
# Enter: https://blognest-backend.vercel.app/api

# Deploy to production
vercel --prod
```

### Option B: Using Vercel Dashboard

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New" → "Project"
3. Import your GitHub repository: `NAYANSURYAVANSHI/blognest`
4. Configure:
   - **Project Name**: `blognest`
   - **Root Directory**: `frontend`
   - **Framework Preset**: Create React App
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
5. Add Environment Variables:
   - `REACT_APP_API_URL`: `https://blognest-backend.vercel.app/api`
6. Click "Deploy"

---

## Step 4: Update Backend CORS

After deploying frontend, update backend environment variable:

```bash
cd backend
vercel env add FRONTEND_URL
# Enter your frontend URL: https://blognest.vercel.app

# Redeploy backend
vercel --prod
```

Or in Vercel Dashboard:
1. Go to backend project settings
2. Add environment variable: `FRONTEND_URL` = `https://blognest.vercel.app`
3. Redeploy

---

## Step 5: Seed Database (Optional)

To add test data to your production database:

1. Update `backend/.env` temporarily with production MongoDB URI
2. Run: `node seed.js`
3. Remove production URI from local `.env`

Or deploy a one-time seed function on Vercel.

---

## 🎉 Your Deployment URLs

- **Frontend**: `https://blognest.vercel.app`
- **Backend**: `https://blognest-backend.vercel.app`
- **API Health Check**: `https://blognest-backend.vercel.app/api/health`

---

## Troubleshooting

### CORS Errors
- Ensure `FRONTEND_URL` is set in backend environment variables
- Check that frontend is using correct `REACT_APP_API_URL`

### Database Connection Issues
- Verify MongoDB Atlas connection string
- Check IP whitelist in MongoDB Atlas (allow all: `0.0.0.0/0`)
- Ensure database user has read/write permissions

### Build Failures
- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Verify Node.js version compatibility

### Environment Variables Not Working
- Environment variables need redeployment to take effect
- Use `vercel --prod` after adding/changing env vars

---

## Custom Domain (Optional)

1. Go to project settings in Vercel
2. Click "Domains"
3. Add your custom domain
4. Update DNS records as instructed

---

## Monitoring

- View logs: Vercel Dashboard → Project → Deployments → Click deployment
- Analytics: Available in Vercel Dashboard
- Error tracking: Consider adding Sentry

---

## Automatic Deployments

Vercel automatically deploys when you push to GitHub:
- Push to `main` branch → Production deployment
- Push to other branches → Preview deployment

---

**Need Help?** Check [Vercel Documentation](https://vercel.com/docs)
