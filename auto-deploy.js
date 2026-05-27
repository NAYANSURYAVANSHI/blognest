#!/usr/bin/env node

const { execSync } = require('child_process');
const readline = require('readline');
const crypto = require('crypto');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

function exec(command, cwd = process.cwd()) {
  try {
    console.log(`\n🔄 Running: ${command}`);
    const output = execSync(command, { 
      cwd, 
      stdio: 'inherit',
      shell: true 
    });
    return output;
  } catch (error) {
    console.error(`❌ Error executing: ${command}`);
    throw error;
  }
}

async function main() {
  console.log(`
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║        🌟 BlogNest Automated Deployment Setup 🌟          ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
  `);

  console.log('\n📋 This script will help you deploy BlogNest to Vercel!\n');

  // Step 1: Generate JWT Secret
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📝 Step 1: Generating JWT Secret');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  
  const jwtSecret = crypto.randomBytes(32).toString('hex');
  console.log('✅ JWT Secret generated!');
  console.log(`🔑 Your JWT Secret: ${jwtSecret}`);
  console.log('💾 (This has been saved for deployment)\n');

  // Step 2: MongoDB Setup
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📝 Step 2: MongoDB Atlas Setup');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  
  console.log('⚠️  You need to set up MongoDB Atlas manually (it\'s free!):\n');
  console.log('1. Go to: https://www.mongodb.com/cloud/atlas/register');
  console.log('2. Sign up for a free account');
  console.log('3. Create a FREE M0 Cluster');
  console.log('4. Create database user (username: blognest)');
  console.log('5. Whitelist all IPs: 0.0.0.0/0');
  console.log('6. Get connection string\n');
  
  const mongoUri = await question('📥 Paste your MongoDB connection string here: ');
  
  if (!mongoUri || !mongoUri.includes('mongodb')) {
    console.log('❌ Invalid MongoDB connection string!');
    process.exit(1);
  }
  
  console.log('✅ MongoDB connection string saved!\n');

  // Step 3: Check Vercel Login
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📝 Step 3: Vercel Authentication');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  
  try {
    exec('vercel whoami');
    console.log('✅ Already logged in to Vercel!\n');
  } catch {
    console.log('🔐 Logging in to Vercel...\n');
    exec('vercel login');
  }

  // Step 4: Deploy Backend
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📝 Step 4: Deploying Backend');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  
  console.log('🚀 Deploying backend to Vercel...\n');
  
  const backendDir = require('path').join(__dirname, 'backend');
  
  // Deploy backend
  exec('vercel --prod --yes --name blognest-backend', backendDir);
  
  console.log('\n✅ Backend deployed!\n');
  
  const backendUrl = await question('📥 Enter your backend URL (from output above): ');
  
  // Set backend environment variables
  console.log('\n🔧 Setting backend environment variables...\n');
  
  exec(`vercel env add MONGODB_URI production --yes`, backendDir);
  process.stdin.write(mongoUri + '\n');
  
  exec(`vercel env add JWT_SECRET production --yes`, backendDir);
  process.stdin.write(jwtSecret + '\n');
  
  exec(`vercel env add NODE_ENV production --yes`, backendDir);
  process.stdin.write('production\n');
  
  console.log('\n🔄 Redeploying backend with environment variables...\n');
  exec('vercel --prod --yes', backendDir);
  
  console.log('✅ Backend fully configured!\n');

  // Step 5: Deploy Frontend
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📝 Step 5: Deploying Frontend');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  
  const frontendDir = require('path').join(__dirname, 'frontend');
  
  console.log('🚀 Deploying frontend to Vercel...\n');
  exec('vercel --prod --yes --name blognest', frontendDir);
  
  console.log('\n✅ Frontend deployed!\n');
  
  const frontendUrl = await question('📥 Enter your frontend URL (from output above): ');
  
  // Set frontend environment variable
  console.log('\n🔧 Setting frontend environment variables...\n');
  
  const apiUrl = backendUrl.replace(/\/$/, '') + '/api';
  exec(`vercel env add REACT_APP_API_URL production --yes`, frontendDir);
  process.stdin.write(apiUrl + '\n');
  
  console.log('\n🔄 Redeploying frontend with environment variables...\n');
  exec('vercel --prod --yes', frontendDir);
  
  console.log('✅ Frontend fully configured!\n');

  // Step 6: Update Backend CORS
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📝 Step 6: Updating Backend CORS');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  
  exec(`vercel env add FRONTEND_URL production --yes`, backendDir);
  process.stdin.write(frontendUrl + '\n');
  
  console.log('\n🔄 Final backend deployment...\n');
  exec('vercel --prod --yes', backendDir);

  // Success!
  console.log(`
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║              🎉 DEPLOYMENT SUCCESSFUL! 🎉                  ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝

📱 Your BlogNest Application is LIVE!

🌐 Frontend URL: ${frontendUrl}
🔌 Backend URL:  ${backendUrl}
🔍 API Health:   ${backendUrl}/api/health

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎯 Next Steps:

1. Visit your frontend: ${frontendUrl}
2. Register a new account
3. Create your first blog post!

💡 Optional: Seed test data
   - Update backend/.env with production MongoDB URI
   - Run: node backend/seed.js
   - Remove production URI from .env

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔐 Save these credentials:
   - MongoDB URI: ${mongoUri}
   - JWT Secret: ${jwtSecret}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✨ Congratulations! Your premium blog platform is deployed! ✨
  `);

  rl.close();
}

main().catch(error => {
  console.error('\n❌ Deployment failed:', error.message);
  rl.close();
  process.exit(1);
});
