@echo off
color 0A
title BlogNest Deployment Wizard

echo.
echo ========================================================
echo.
echo          BlogNest Deployment Wizard
echo          Premium Blog Platform Setup
echo.
echo ========================================================
echo.
echo This wizard will help you deploy BlogNest to Vercel!
echo.
echo You'll need:
echo   1. MongoDB Atlas account (free)
echo   2. Vercel account (free)
echo.
pause

cls
echo.
echo ========================================================
echo   Step 1: MongoDB Atlas Setup
echo ========================================================
echo.
echo Please complete these steps in your browser:
echo.
echo 1. Go to: https://www.mongodb.com/cloud/atlas/register
echo 2. Sign up for FREE account
echo 3. Create a FREE M0 Cluster
echo 4. Create database user:
echo    - Username: blognest
echo    - Password: (generate and save it!)
echo 5. Network Access: Allow 0.0.0.0/0
echo 6. Get connection string (Connect -^> Drivers)
echo.
echo Your connection string should look like:
echo mongodb+srv://blognest:PASSWORD@cluster0.xxxxx.mongodb.net/blognest
echo.
echo Opening MongoDB Atlas in browser...
start https://www.mongodb.com/cloud/atlas/register
echo.
pause

cls
echo.
echo ========================================================
echo   Step 2: Generate JWT Secret
echo ========================================================
echo.
echo Generating secure JWT secret...
echo.

node -e "console.log('Your JWT Secret: ' + require('crypto').randomBytes(32).toString('hex'))" > jwt_secret.txt
type jwt_secret.txt
echo.
echo This secret has been saved to jwt_secret.txt
echo.
pause

cls
echo.
echo ========================================================
echo   Step 3: Deploy Backend to Vercel
echo ========================================================
echo.
echo Opening Vercel dashboard...
start https://vercel.com/new
echo.
echo Follow these steps in Vercel:
echo.
echo 1. Import your GitHub repository: NAYANSURYAVANSHI/blognest
echo 2. Project Name: blognest-backend
echo 3. Root Directory: backend
echo 4. Framework: Other
echo 5. Add Environment Variables:
echo    - MONGODB_URI = (paste your MongoDB connection string)
echo    - JWT_SECRET = (paste from jwt_secret.txt)
echo    - NODE_ENV = production
echo 6. Click Deploy
echo.
echo After deployment, COPY THE URL!
echo Example: https://blognest-backend-xxx.vercel.app
echo.
pause

cls
echo.
echo ========================================================
echo   Step 4: Deploy Frontend to Vercel
echo ========================================================
echo.
echo Opening Vercel dashboard again...
start https://vercel.com/new
echo.
echo Follow these steps in Vercel:
echo.
echo 1. Import your GitHub repository: NAYANSURYAVANSHI/blognest
echo 2. Project Name: blognest
echo 3. Root Directory: frontend
echo 4. Framework: Create React App
echo 5. Add Environment Variable:
echo    - REACT_APP_API_URL = (your backend URL)/api
echo      Example: https://blognest-backend-xxx.vercel.app/api
echo 6. Click Deploy
echo.
echo After deployment, COPY THE URL!
echo Example: https://blognest-xxx.vercel.app
echo.
pause

cls
echo.
echo ========================================================
echo   Step 5: Update Backend CORS
echo ========================================================
echo.
echo Go back to your BACKEND project in Vercel:
echo.
echo 1. Click Settings -^> Environment Variables
echo 2. Add new variable:
echo    - FRONTEND_URL = (your frontend URL)
echo      Example: https://blognest-xxx.vercel.app
echo 3. Go to Deployments tab
echo 4. Click ... menu -^> Redeploy
echo.
pause

cls
echo.
echo ========================================================
echo.
echo          DEPLOYMENT COMPLETE!
echo.
echo ========================================================
echo.
echo Your BlogNest application is now LIVE!
echo.
echo Visit your frontend URL and:
echo   1. Register a new account
echo   2. Create your first blog post
echo   3. Share with the world!
echo.
echo ========================================================
echo.
echo Your credentials are saved in jwt_secret.txt
echo Keep this file safe!
echo.
echo ========================================================
echo.
pause
