@echo off
echo ========================================
echo   BlogNest Vercel Deployment Script
echo ========================================
echo.

echo Step 1: Deploying Backend...
echo.
cd backend
call vercel --prod
echo.
echo Backend deployed! Copy the URL above.
echo.

pause

echo.
echo Step 2: Setting Backend Environment Variables...
echo.
echo Enter your MongoDB Atlas connection string:
call vercel env add MONGODB_URI production
echo.
echo Enter your JWT secret (random string, 32+ characters):
call vercel env add JWT_SECRET production
echo.
echo Enter NODE_ENV:
call vercel env add NODE_ENV production
echo.

echo Redeploying backend with environment variables...
call vercel --prod
echo.

pause

echo.
echo Step 3: Deploying Frontend...
echo.
cd ..\frontend
call vercel --prod
echo.
echo Frontend deployed! Copy the URL above.
echo.

pause

echo.
echo Step 4: Setting Frontend Environment Variable...
echo.
echo Enter your backend API URL (from Step 1):
echo Example: https://blognest-backend-xxx.vercel.app/api
call vercel env add REACT_APP_API_URL production
echo.

echo Redeploying frontend with environment variable...
call vercel --prod
echo.

pause

echo.
echo Step 5: Updating Backend CORS...
echo.
cd ..\backend
echo Enter your frontend URL (from Step 3):
echo Example: https://blognest-xxx.vercel.app
call vercel env add FRONTEND_URL production
echo.

echo Final backend deployment...
call vercel --prod
echo.

echo ========================================
echo   Deployment Complete!
echo ========================================
echo.
echo Your BlogNest application is now live!
echo.
echo Check your Vercel dashboard for the URLs:
echo https://vercel.com/dashboard
echo.
pause
