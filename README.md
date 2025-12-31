# ZScroll

Short-form food video scrolling app (frontend + backend).

## Tech Stack

- **Frontend**: React + Vite (runs on `http://localhost:5173`)
- **Backend**: Node.js + Express (runs on `http://localhost:3000`)
- **Database**: MongoDB (Mongoose)
- **Auth**: JWT + cookies
- **Uploads**: Multer (memory) + ImageKit (used in backend dependencies)

## Project Structure

- **`frontend/`**: React app
- **`backend/`**: Express API server

## Prerequisites

- Node.js (LTS recommended)
- MongoDB connection string (MongoDB Atlas or local)

## Setup

### 1) Backend

```bash
cd backend
npm install
```

#### Configure environment variables

Create a `backend/.env` file (recommended) and add values like:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
```

> Note: The current codebase connects to MongoDB using a hardcoded connection string in `backend/src/db/db.js`. It’s best practice to move that into `MONGODB_URI`.

#### Run backend

From `backend/`:

```bash
node server.js
```

Or (recommended for development):

```bash
npx nodemon server.js
```

The backend listens on `http://localhost:3000`.

### 2) Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`.

## CORS / Local Development

Backend CORS is configured to allow:

- `origin: http://localhost:5173`
- `credentials: true`

So keep the frontend dev server on port `5173`, or update `backend/src/app.js` accordingly.

## API Overview

Base URL: `http://localhost:3000`

### Auth (`/api/auth`)

- `POST /api/auth/user/register`
- `POST /api/auth/user/login`
- `GET  /api/auth/user/logout`
- `POST /api/auth/foodpartner/register`
- `POST /api/auth/foodpartner/login`
- `GET  /api/auth/foodpartner/logout`

### Food (`/api/food`)

- `POST /api/food` (food-partner protected, accepts `multipart/form-data` with `video`)
- `GET  /api/food` (user protected)
- `POST /api/food/like` (user protected)
- `POST /api/food/save` (user protected)
- `POST /api/food/comment` (user protected)
- `GET  /api/food/:id/comments` (user protected)
- `GET  /api/food/saved/list` (user protected)

### Food Partner (`/api/food-partner`)

- `GET /api/food-partner/:id` (user protected)

## Scripts

### Frontend (`frontend/package.json`)

- `npm run dev` - start dev server
- `npm run build` - production build
- `npm run preview` - preview build

### Backend (`backend/package.json`)

No start script is currently defined. Use `node server.js` or `npx nodemon server.js`.

## Troubleshooting

- If requests fail with CORS/cookie issues, verify:
  - backend `credentials: true` is set
  - frontend requests are made with `withCredentials: true` (Axios)
  - correct ports (`5173` frontend, `3000` backend)

