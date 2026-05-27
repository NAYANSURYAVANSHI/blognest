# Blog Platform Architecture

## 🏗️ System Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                         CLIENT SIDE                          │
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │              React Application (Port 3000)          │    │
│  │                                                     │    │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────────┐    │    │
│  │  │  Pages   │  │Components│  │   Context    │    │    │
│  │  │          │  │          │  │  (Auth State)│    │    │
│  │  │ - Home   │  │ - Navbar │  │              │    │    │
│  │  │ - Login  │  │ - PostCard│  └──────────────┘    │    │
│  │  │ - Post   │  │ - Comments│                      │    │
│  │  │ - Create │  │ - Private │                      │    │
│  │  └──────────┘  └──────────┘                       │    │
│  │                                                     │    │
│  │              ┌──────────────┐                      │    │
│  │              │ API Service  │                      │    │
│  │              │   (Axios)    │                      │    │
│  │              └──────┬───────┘                      │    │
│  └─────────────────────┼──────────────────────────────┘    │
└────────────────────────┼───────────────────────────────────┘
                         │
                         │ HTTP/HTTPS
                         │ JSON
                         │
┌────────────────────────┼───────────────────────────────────┐
│                        ▼        SERVER SIDE                 │
│  ┌─────────────────────────────────────────────────────┐   │
│  │        Express.js Server (Port 5000)                │   │
│  │                                                      │   │
│  │  ┌──────────────┐  ┌──────────────┐               │   │
│  │  │  Middleware  │  │    Routes    │               │   │
│  │  │              │  │              │               │   │
│  │  │ - CORS       │  │ - /api/auth  │               │   │
│  │  │ - JSON       │  │ - /api/posts │               │   │
│  │  │ - Auth       │  │ - /api/comments              │   │
│  │  └──────────────┘  └──────┬───────┘               │   │
│  │                            │                        │   │
│  │                    ┌───────▼────────┐              │   │
│  │                    │  Controllers   │              │   │
│  │                    │  (Route Logic) │              │   │
│  │                    └───────┬────────┘              │   │
│  │                            │                        │   │
│  │                    ┌───────▼────────┐              │   │
│  │                    │     Models     │              │   │
│  │                    │   (Mongoose)   │              │   │
│  │                    │                │              │   │
│  │                    │ - User         │              │   │
│  │                    │ - Post         │              │   │
│  │                    │ - Comment      │              │   │
│  │                    └───────┬────────┘              │   │
│  └────────────────────────────┼──────────────────────┘   │
└─────────────────────────────────┼────────────────────────┘
                                  │
                                  │ MongoDB Protocol
                                  │
┌─────────────────────────────────▼────────────────────────┐
│                    DATABASE LAYER                         │
│                                                           │
│  ┌────────────────────────────────────────────────┐     │
│  │         MongoDB (Port 27017)                   │     │
│  │                                                 │     │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐    │     │
│  │  │  users   │  │  posts   │  │ comments │    │     │
│  │  │          │  │          │  │          │    │     │
│  │  │ Collection│  │Collection│  │Collection│    │     │
│  │  └──────────┘  └──────────┘  └──────────┘    │     │
│  └────────────────────────────────────────────────┘     │
└──────────────────────────────────────────────────────────┘
```

## 🔄 Request Flow

### 1. User Registration Flow
```
User fills form → React validates → API call (POST /api/auth/register)
                                           ↓
                                    Express receives
                                           ↓
                                    Validate input
                                           ↓
                                    Check if user exists
                                           ↓
                                    Hash password (bcrypt)
                                           ↓
                                    Save to MongoDB
                                           ↓
                                    Generate JWT token
                                           ↓
                                    Return token + user data
                                           ↓
React stores token → Update auth context → Redirect to home
```

### 2. Create Post Flow
```
User writes post → Click submit → Check auth token
                                        ↓
                                  API call (POST /api/posts)
                                  + Authorization header
                                        ↓
                                  Express receives
                                        ↓
                                  Auth middleware verifies JWT
                                        ↓
                                  Validate post data
                                        ↓
                                  Create post in MongoDB
                                        ↓
                                  Return new post
                                        ↓
React updates UI → Redirect to post detail page
```

### 3. View Posts Flow
```
User visits home → React component mounts → API call (GET /api/posts)
                                                  ↓
                                            Express receives
                                                  ↓
                                            Query MongoDB
                                                  ↓
                                            Return posts array
                                                  ↓
React receives data → Update state → Render PostCard components
```

### 4. Add Comment Flow
```
User types comment → Submit → Check auth
                                   ↓
                             API call (POST /api/comments)
                             + Authorization header
                                   ↓
                             Express receives
                                   ↓
                             Auth middleware
                                   ↓
                             Validate comment
                                   ↓
                             Check post exists
                                   ↓
                             Save comment to MongoDB
                                   ↓
                             Return new comment
                                   ↓
React updates comment list → Display new comment
```

## 🔐 Authentication Flow

```
┌──────────────┐
│   Register   │
│   or Login   │
└──────┬───────┘
       │
       ▼
┌──────────────────────┐
│  Send credentials    │
│  to /api/auth/*      │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────┐
│  Server validates    │
│  and creates JWT     │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────┐
│  Client receives     │
│  token + user data   │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────┐
│  Store token in      │
│  localStorage        │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────┐
│  Update AuthContext  │
│  with user data      │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────┐
│  All API requests    │
│  include token in    │
│  Authorization header│
└──────────────────────┘
```

## 📦 Component Hierarchy

```
App
├── AuthProvider (Context)
│   └── Router
│       ├── Navbar
│       │   ├── Logo/Link
│       │   ├── Auth Status
│       │   └── Navigation Links
│       │
│       └── Routes
│           ├── Home
│           │   └── PostCard (multiple)
│           │       ├── Title
│           │       ├── Author Info
│           │       ├── Content Preview
│           │       └── Read More Link
│           │
│           ├── Login
│           │   └── Login Form
│           │
│           ├── Register
│           │   └── Register Form
│           │
│           ├── PostDetail
│           │   ├── Post Content
│           │   ├── Edit/Delete Buttons (if author)
│           │   └── CommentSection
│           │       ├── Comment Form (if logged in)
│           │       └── Comment List
│           │           └── Comment (multiple)
│           │               ├── Author
│           │               ├── Content
│           │               └── Delete Button (if author)
│           │
│           └── CreateEditPost (PrivateRoute)
│               └── Post Form
```

## 🗄️ Data Model Relationships

```
┌─────────────┐
│    User     │
│             │
│ - username  │
│ - email     │
│ - password  │
└──────┬──────┘
       │
       │ 1:N (one user, many posts)
       │
       ▼
┌─────────────┐
│    Post     │
│             │
│ - title     │
│ - content   │
│ - author ───┼──→ References User._id
│ - authorName│
└──────┬──────┘
       │
       │ 1:N (one post, many comments)
       │
       ▼
┌─────────────┐
│   Comment   │
│             │
│ - content   │
│ - post ─────┼──→ References Post._id
│ - author ───┼──→ References User._id
│ - authorName│
└─────────────┘
```

## 🔒 Security Layers

```
┌─────────────────────────────────────────┐
│         Client-Side Security            │
│                                         │
│  • Form validation                      │
│  • Protected routes (PrivateRoute)      │
│  • Token storage (localStorage)         │
│  • XSS protection (React escaping)      │
└────────────────┬────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────┐
│        Transport Security               │
│                                         │
│  • HTTPS (in production)                │
│  • CORS configuration                   │
│  • Authorization headers                │
└────────────────┬────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────┐
│         Server-Side Security            │
│                                         │
│  • JWT verification                     │
│  • Input validation (express-validator) │
│  • Password hashing (bcrypt)            │
│  • Authorization checks                 │
│  • Error handling                       │
└────────────────┬────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────┐
│         Database Security               │
│                                         │
│  • MongoDB authentication               │
│  • Parameterized queries (Mongoose)     │
│  • No sensitive data exposure           │
└─────────────────────────────────────────┘
```

## 📡 API Communication Pattern

```
Frontend (React)
    │
    │ Uses Axios with interceptors
    │
    ▼
┌─────────────────────────┐
│   API Service Layer     │
│                         │
│  • authAPI              │
│  • postsAPI             │
│  • commentsAPI          │
│                         │
│  Automatically adds:    │
│  • Authorization header │
│  • Content-Type         │
└────────┬────────────────┘
         │
         │ HTTP Requests
         │
         ▼
┌─────────────────────────┐
│   Express Routes        │
│                         │
│  /api/auth/*            │
│  /api/posts/*           │
│  /api/comments/*        │
└────────┬────────────────┘
         │
         │ Calls
         │
         ▼
┌─────────────────────────┐
│   Route Handlers        │
│                         │
│  • Validate input       │
│  • Check authorization  │
│  • Process request      │
│  • Return JSON response │
└────────┬────────────────┘
         │
         │ Uses
         │
         ▼
┌─────────────────────────┐
│   Mongoose Models       │
│                         │
│  • User.find()          │
│  • Post.create()        │
│  • Comment.delete()     │
└─────────────────────────┘
```

## 🔄 State Management

```
┌─────────────────────────────────────────┐
│          AuthContext (Global)           │
│                                         │
│  State:                                 │
│  • user (current user object)           │
│  • loading (auth check in progress)     │
│  • isAuthenticated (boolean)            │
│                                         │
│  Methods:                               │
│  • login(email, password)               │
│  • register(username, email, password)  │
│  • logout()                             │
│  • checkAuth()                          │
└────────────────┬────────────────────────┘
                 │
                 │ Provides to all components
                 │
    ┌────────────┼────────────┐
    │            │            │
    ▼            ▼            ▼
┌────────┐  ┌────────┐  ┌────────┐
│ Navbar │  │  Pages │  │PrivateRoute
└────────┘  └────────┘  └────────┘

┌─────────────────────────────────────────┐
│      Component Local State              │
│                                         │
│  Each page/component manages:           │
│  • Form inputs (useState)               │
│  • Loading states                       │
│  • Error messages                       │
│  • Fetched data (posts, comments)       │
└─────────────────────────────────────────┘
```

## 🚀 Deployment Architecture

```
┌─────────────────────────────────────────┐
│              Production                  │
└─────────────────────────────────────────┘

Frontend (Static Hosting)
┌─────────────────────────┐
│  Vercel / Netlify       │
│  AWS S3 + CloudFront    │
│                         │
│  • Serves build folder  │
│  • HTTPS enabled        │
│  • CDN distribution     │
└────────┬────────────────┘
         │
         │ API Calls
         │
         ▼
Backend (Server Hosting)
┌─────────────────────────┐
│  Heroku / AWS / DigitalOcean
│                         │
│  • Node.js server       │
│  • Environment vars     │
│  • Process manager (PM2)│
│  • HTTPS/SSL            │
└────────┬────────────────┘
         │
         │ Database Connection
         │
         ▼
Database (Cloud)
┌─────────────────────────┐
│  MongoDB Atlas          │
│                         │
│  • Managed MongoDB      │
│  • Automatic backups    │
│  • Authentication       │
│  • IP whitelist         │
└─────────────────────────┘
```

## 📊 Performance Considerations

### Frontend Optimization
```
• Code splitting (React.lazy)
• Lazy loading images
• Memoization (useMemo, useCallback)
• Debouncing search inputs
• Optimistic UI updates
• Caching API responses
```

### Backend Optimization
```
• Database indexing
• Query optimization
• Response compression
• Rate limiting
• Caching (Redis)
• Connection pooling
```

### Database Optimization
```
• Indexes on frequently queried fields
• Denormalized data (authorName)
• Pagination for large datasets
• Aggregation pipelines
• Proper schema design
```

## 🎯 Key Design Decisions

### Why JWT?
- Stateless authentication
- Scalable across multiple servers
- Mobile-friendly
- Contains user info (no extra DB query)

### Why Denormalize authorName?
- Faster reads (no join needed)
- Author name rarely changes
- Trade-off: slight data duplication for performance

### Why Context API?
- Built into React (no extra library)
- Perfect for auth state
- Simple for this app size
- Easy to understand

### Why Mongoose?
- Schema validation
- Middleware hooks
- Cleaner syntax than raw MongoDB
- Built-in type casting

### Why Tailwind CSS?
- Rapid development
- Consistent design
- Small bundle size (purged)
- No CSS file management

## 📈 Scalability Path

```
Current → Small Scale → Medium Scale → Large Scale
  │            │              │              │
  │            │              │              │
  ▼            ▼              ▼              ▼
Single       Load          Microservices   Distributed
Server       Balancer      Architecture    System
  │            │              │              │
  ├─ Node     ├─ Multiple    ├─ Auth       ├─ K8s
  ├─ MongoDB  │  Node        │  Service    ├─ Redis
  └─ React    │  instances   ├─ Post       │  Cluster
              ├─ MongoDB     │  Service    ├─ MongoDB
              │  Replica     ├─ Comment    │  Sharding
              │  Set         │  Service    └─ CDN
              └─ Redis       └─ API
                 Cache          Gateway
```

---

This architecture provides a solid foundation for a blog platform while remaining simple enough to understand and extend. The modular design allows for easy scaling and feature additions as the application grows.
