# ⚡ Quick Deploy Instructions

## 🚨 IMPORTANT: Before Deploying

You need a **MongoDB Atlas** connection string for production. 

### Quick MongoDB Atlas Setup (5 minutes):

1. **Go to**: https://www.mongodb.com/cloud/atlas/register
2. **Sign up** for free account
3. **Create Cluster**: 
   - Choose FREE M0 tier
   - Select region closest to you
   - Click "Create Cluster"
4. **Create Database User**:
   - Security → Database Access → Add New User
   - Username: `blognest`
   - Password: Generate secure password (save it!)
   - User Privileges: Read and write to any database
5. **Whitelist IP**:
   - Security → Network Access → Add IP Address
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
6. **Get Connection String**:
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your actual password
   - Add database name at the end: `/blognest`
   
   Example: `mongodb+srv://blognest:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/blognest`

---

## 🚀 Deploy Backend

```bash
cd backend

# Deploy to Vercel
vercel --prod

# When prompted:
# - Set up and deploy? Y
# - Which scope? (select your account)
# - Link to existing project? N
# - Project name? blognest-backend
# - Directory? ./ (just press Enter)
# - Override settings? N
```

After deployment completes, you'll get a URL like: `https://blognest-backend-xxx.vercel.app`

### Set Environment Variables:

```bash
# Set MongoDB connection string
vercel env add MONGODB_URI production
# Paste your MongoDB Atlas connection string when prompted

# Set JWT secret
vercel env add JWT_SECRET production
# Enter a strong random string (at least 32 characters)

# Set Node environment
vercel env add NODE_ENV production
# Enter: production

# Redeploy with environment variables
vercel --prod
```

**✅ Backend deployed!** Save your backend URL.

---

## 🎨 Deploy Frontend

```bash
cd ../frontend

# Deploy to Vercel
vercel --prod

# When prompted:
# - Set up and deploy? Y
# - Which scope? (select your account)
# - Link to existing project? N
# - Project name? blognest
# - Directory? ./ (just press Enter)
# - Override settings? N
```

### Set Environment Variable:

```bash
# Set API URL (use your backend URL from above)
vercel env add REACT_APP_API_URL production
# Enter: https://blognest-backend-xxx.vercel.app/api

# Redeploy with environment variable
vercel --prod
```

**✅ Frontend deployed!**

---

## 🎯 Update Backend CORS

```bash
cd ../backend

# Add frontend URL to backend
vercel env add FRONTEND_URL production
# Enter your frontend URL: https://blognest-xxx.vercel.app

# Redeploy backend one more time
vercel --prod
```

---

## ✅ Done! Your URLs:

- **Frontend**: Check terminal output or Vercel dashboard
- **Backend**: Check terminal output or Vercel dashboard
- **Test**: Visit your frontend URL and try to register/login

---

## 🌱 Seed Database (Optional)

To add test accounts to production:

1. Create a temporary `.env` file in backend with production MongoDB URI
2. Run: `node seed.js`
3. Delete the temporary `.env` file

---

## 📱 Alternative: Deploy via Vercel Dashboard

If CLI doesn't work, use the web interface:

1. Go to: https://vercel.com/new
2. Import your GitHub repo: `NAYANSURYAVANSHI/blognest`
3. Deploy backend first (root directory: `backend`)
4. Then deploy frontend (root directory: `frontend`)
5. Add environment variables in project settings

---

**Need help?** The full guide is in `VERCEL_DEPLOYMENT_GUIDE.md`
