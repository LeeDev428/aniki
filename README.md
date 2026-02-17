# Aniki - Anime & Manga Hub

An anime-focused web application built with Next.js, Express, and MongoDB.

## Project Structure

```
aniki/
├── frontend/          # Next.js frontend
├── backend/           # Express.js API server
└── README.md
```

## Quick Start

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Update .env with your MongoDB URI
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

## Deployment

### Frontend (Vercel)
1. Push code to GitHub
2. Import project in Vercel dashboard
3. Set root directory to `frontend`
4. Add environment variables:
   - `NEXT_PUBLIC_API_URL`: Your Render backend URL

### Backend (Render)
1. Create new Web Service on Render
2. Connect GitHub repo
3. Set root directory to `backend`
4. Build command: `npm install`
5. Start command: `npm start`
6. Add environment variables:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: Random secure string
   - `FRONTEND_URL`: Your Vercel frontend URL

## Tech Stack
- **Frontend**: Next.js 14, TailwindCSS, Framer Motion
- **Backend**: Express.js, MongoDB, Mongoose
- **Auth**: JWT tokens
- **Deployment**: Vercel + Render
