# TaskInter - Premium Frontend Assignment

**Author**: Devira  
**Role**: Frontend Developer Intern  

## Overview
TaskInter is a modern, responsive web application for managing personal tasks. It features a complete Authentication system (JWT), a Dashboard with full CRUD capabilities, and a Profile management section. The UI is built with React and TailwindCSS, focusing on a premium, clean user experience with "Fantastic" animations.

## Tech Stack (Premium Upgrade)

### Frontend
- **Framework**: React (Vite)
- **Styling**: TailwindCSS + Class Variance Authority (CVA)
- **Animations**: Framer Motion (Spring Physics, Staggered Reveals)
- **State Management**: React Context API
- **Routing**: React Router DOM v6
- **HTTP Client**: Axios (with Interceptors)
- **Icons**: Lucide React
- **UI Components**: Custom "Shadcn-style" primitives

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB Atlas (Cloud)
- **Auth**: JWT (JSON Web Tokens) + bcryptjs
- **Validation**: express-validator

## Setup Instructions

### Prerequisites
- Node.js (v14+)

### 1. Backend Setup
1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up Environment Variables:
   - Create a `.env` file in `backend/` (if it doesn't exist).
   - Add the following:
     ```env
     PORT=4000
     MONGO_URI=mongodb+srv://sathwik:Harrypotter99@health.segdei1.mongodb.net/onehealth
     JWT_SECRET=your_super_secure_secret_key_123
     ```
4. Start the Server:
   ```bash
   npm run dev
   ```
   *Server works on http://localhost:4000*

### 2. Frontend Setup
1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Dev Server:
   ```bash
   npm run dev
   ```
   *App runs on http://localhost:5173*

## Premium Features
- **Bento Grid Dashboard**: Masonry-style grid layout similar to Linear/Apple services.
- **Staggered Animations**: Content flows in with a smooth staggered delay.
- **Sidebar Navigation**: Collapsible sidebar with high-end spring physics.
- **Glassmorphism**: Backdrop blur effects on cards and headers.
- **Skeleton Loading**: "Premium" loading states instead of spinners.

---

## Scaling for Production (Short Note)
To scale this application for production, I would:
1. **LazyMotion**: Implement `LazyMotion` from Framer Motion to drastically reduce initial bundle size by loading animation features only when needed.
2. **Database**: Add indexing on frequently queried fields (`owner`, `completed`, `title`) in MongoDB. Use a cloud cluster (Atlas) with sharding if data grows massive.
3. **Caching**: Implement Redis to cache `GET /tasks` results, invalidating the cache only on mutations (POST/PUT/DELETE) to reduce DB load.
4. **Deployment**: Dockerize both services (Frontend served via Nginx, Backend via node). Orchestrate with Kubernetes or use platforms like Vercel (FE) + Railway/AWS (BE).
