# Useful Commands Reference

Quick reference for all commands you'll need to work with this project.

## 📦 Installation Commands

### Install All Dependencies (from root)
```bash
npm run install-all
```

### Install Backend Only
```bash
cd backend
npm install
```

### Install Frontend Only
```bash
cd frontend
npm install
```

### Clean Install (if having issues)
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

## 🚀 Running the Application

### Start Backend Server (Development)
```bash
cd backend
npm run dev
```
Runs on: http://localhost:5000

### Start Backend Server (Production)
```bash
cd backend
npm start
```

### Start Frontend Server
```bash
cd frontend
npm start
```
Runs on: http://localhost:3000

### Run Both (requires 2 terminals)
**Terminal 1:**
```bash
cd backend && npm run dev
```

**Terminal 2:**
```bash
cd frontend && npm start
```

## 🗄️ Database Commands

### Start MongoDB (Local)

**Windows:**
```bash
net start MongoDB
```

**macOS:**
```bash
brew services start mongodb-community
```

**Linux:**
```bash
sudo systemctl start mongodb
```

### Stop MongoDB (Local)

**Windows:**
```bash
net stop MongoDB
```

**macOS:**
```bash
brew services stop mongodb-community
```

**Linux:**
```bash
sudo systemctl stop mongodb
```

### Connect to MongoDB Shell
```bash
mongo
# or for newer versions
mongosh
```

### Seed Database with Sample Data
```bash
cd backend
npm run seed
```

### Clear Database (MongoDB Shell)
```javascript
use blog-platform
db.users.deleteMany({})
db.posts.deleteMany({})
db.comments.deleteMany({})
```

## 🧪 Testing Commands

### Test Backend API Endpoints

**Health Check:**
```bash
curl http://localhost:5000/api/health
```

**Get All Posts:**
```bash
curl http://localhost:5000/api/posts
```

**Register User:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"password123"}'
```

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

**Create Post (with token):**
```bash
curl -X POST http://localhost:5000/api/posts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{"title":"Test Post","content":"This is a test post"}'
```

## 🏗️ Build Commands

### Build Frontend for Production
```bash
cd frontend
npm run build
```
Creates optimized production build in `frontend/build/`

### Serve Production Build Locally
```bash
cd frontend
npm install -g serve
serve -s build
```

## 🔍 Debugging Commands

### Check Node Version
```bash
node --version
```

### Check npm Version
```bash
npm --version
```

### Check MongoDB Version
```bash
mongo --version
# or
mongod --version
```

### View Backend Logs
Backend logs appear in the terminal where you ran `npm run dev`

### View Frontend Logs
Frontend logs appear in:
1. Terminal where you ran `npm start`
2. Browser console (F12 → Console tab)

### Check Running Processes

**Windows:**
```bash
# Check if port 5000 is in use
netstat -ano | findstr :5000

# Check if port 3000 is in use
netstat -ano | findstr :3000
```

**macOS/Linux:**
```bash
# Check if port 5000 is in use
lsof -i :5000

# Check if port 3000 is in use
lsof -i :3000
```

### Kill Process on Port

**Windows:**
```bash
# Find PID
netstat -ano | findstr :5000
# Kill process (replace PID with actual process ID)
taskkill /PID <PID> /F
```

**macOS/Linux:**
```bash
# Kill process on port 5000
kill -9 $(lsof -t -i:5000)

# Kill process on port 3000
kill -9 $(lsof -t -i:3000)
```

## 🧹 Cleanup Commands

### Remove node_modules
```bash
# Backend
cd backend
rm -rf node_modules

# Frontend
cd frontend
rm -rf node_modules
```

### Remove Build Files
```bash
cd frontend
rm -rf build
```

### Clear npm Cache
```bash
npm cache clean --force
```

### Reset Everything
```bash
# Remove all node_modules and lock files
cd backend
rm -rf node_modules package-lock.json

cd ../frontend
rm -rf node_modules package-lock.json build

# Reinstall
cd ../backend
npm install

cd ../frontend
npm install
```

## 📝 Git Commands (if using version control)

### Initialize Git Repository
```bash
git init
```

### Add All Files
```bash
git add .
```

### Commit Changes
```bash
git commit -m "Initial commit"
```

### Create .gitignore (already included)
The project includes `.gitignore` files that exclude:
- node_modules
- .env files
- build directories
- log files

## 🔧 Configuration Commands

### Create Backend .env File
```bash
cd backend
cp .env.example .env
# Then edit .env with your values
```

### Update npm Packages
```bash
# Check for outdated packages
npm outdated

# Update all packages
npm update

# Update specific package
npm update package-name
```

### Install Additional Packages

**Backend:**
```bash
cd backend
npm install package-name
```

**Frontend:**
```bash
cd frontend
npm install package-name
```

## 🌐 Network Commands

### Find Your Local IP Address

**Windows:**
```bash
ipconfig
```

**macOS/Linux:**
```bash
ifconfig
# or
ip addr show
```

### Access from Other Devices
Once you know your IP (e.g., 192.168.1.100):
- Frontend: http://192.168.1.100:3000
- Backend: http://192.168.1.100:5000

## 📊 Monitoring Commands

### Watch Backend Logs
```bash
cd backend
npm run dev
# Logs will appear in real-time
```

### Monitor MongoDB
```bash
# Connect to MongoDB shell
mongosh

# Show databases
show dbs

# Use blog database
use blog-platform

# Show collections
show collections

# Count documents
db.users.countDocuments()
db.posts.countDocuments()
db.comments.countDocuments()

# View recent posts
db.posts.find().sort({createdAt: -1}).limit(5)
```

## 🎯 Quick Workflows

### Fresh Start Workflow
```bash
# 1. Start MongoDB
net start MongoDB  # Windows
# or
brew services start mongodb-community  # macOS

# 2. Start Backend (Terminal 1)
cd backend
npm run dev

# 3. Start Frontend (Terminal 2)
cd frontend
npm start

# 4. Seed data (Terminal 3)
cd backend
npm run seed
```

### Development Workflow
```bash
# Make changes to code
# Backend auto-restarts (nodemon)
# Frontend auto-reloads (React hot reload)
# Just save your files and see changes!
```

### Testing Workflow
```bash
# 1. Seed fresh data
cd backend
npm run seed

# 2. Open browser to http://localhost:3000

# 3. Test features:
#    - Register new user
#    - Login
#    - Create post
#    - Add comment
#    - Edit post
#    - Delete comment
```

### Deployment Workflow
```bash
# 1. Build frontend
cd frontend
npm run build

# 2. Test production build locally
serve -s build

# 3. Deploy backend to hosting service
# 4. Deploy frontend build folder to static hosting
# 5. Update environment variables
```

## 🆘 Emergency Commands

### Server Won't Start
```bash
# Kill all node processes
# Windows
taskkill /F /IM node.exe

# macOS/Linux
killall node

# Then restart
```

### Database Connection Issues
```bash
# Restart MongoDB
# Windows
net stop MongoDB
net start MongoDB

# macOS
brew services restart mongodb-community

# Linux
sudo systemctl restart mongodb
```

### Port Already in Use
```bash
# Change backend port in backend/.env
PORT=5001

# Change frontend port
# Windows
set PORT=3001 && npm start

# macOS/Linux
PORT=3001 npm start
```

## 📚 Help Commands

### npm Help
```bash
npm help
npm help install
npm help run-script
```

### View Package Info
```bash
npm info package-name
npm view package-name versions
```

### List Installed Packages
```bash
npm list
npm list --depth=0  # Top-level only
```

## 🎓 Learning Commands

### Explore Project Structure
```bash
# Windows
tree /F

# macOS/Linux
tree
# or
find . -type f -not -path "*/node_modules/*"
```

### View Package Dependencies
```bash
cd backend
npm list

cd ../frontend
npm list
```

### Check for Security Vulnerabilities
```bash
npm audit
npm audit fix  # Auto-fix if possible
```

---

## 💡 Pro Tips

1. **Use two terminals** - one for backend, one for frontend
2. **Keep MongoDB running** - start it once and leave it
3. **Watch the logs** - they tell you what's happening
4. **Use the seed script** - quick way to get test data
5. **Clear browser cache** - if seeing old data
6. **Check .env file** - most config issues are here
7. **Read error messages** - they usually tell you what's wrong

---

**Need more help?** Check the other documentation files:
- `README.md` - Complete documentation
- `QUICKSTART.md` - Fast setup guide
- `INSTALLATION.md` - Detailed installation
- `PROJECT_SUMMARY.md` - Project overview
