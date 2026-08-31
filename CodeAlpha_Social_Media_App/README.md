# CodeAlpha Social Media App

A full-stack MERN social media platform built for the CodeAlpha Full Stack Development internship submission.

## Tech Stack

- Frontend: React + Vite + React Router + Tailwind CSS
- State management: Redux Toolkit
- Backend: Node.js + Express.js
- Database: MongoDB + Mongoose
- Authentication: JWT + bcrypt
- HTTP client: Axios

## Features

- User registration and login with JWT auth
- Editable user profile with name, bio, and profile picture
- Public user profile pages with follower/following stats
- Create and view social posts with optional images
- Like/unlike posts with live counts
- Comment on posts under each feed item
- Follow/unfollow users from profiles and post cards
- Feed prioritizes posts from followed users
- Responsive social-media style UI
- Seed script to populate demo data

## Project Structure

```bash
CodeAlpha_Social_Media_App/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── seeds/
│   ├── .env
│   ├── .env.example
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── src/
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── vite.config.js
├── README.md
└── .gitignore
```

## Setup Instructions

### 1. Clone / open the project

```bash
cd CodeAlpha_Social_Media_App
```

### 2. Backend setup

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

Your backend will run on:

```bash
http://localhost:5000
```

### 3. Frontend setup

Open a second terminal:

```bash
cd CodeAlpha_Social_Media_App/frontend
npm install
npm run dev
```

Your frontend will run on:

```bash
http://localhost:5173
```

## Environment Variables

Backend `.env` file:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/codealpha_social_media
JWT_SECRET=supersecretjwtkey
```

## Demo Data

To populate sample users/posts/comments:

```bash
cd backend
npm run seed
```

## API Overview

- `POST /api/auth/register` — Register a new user
- `POST /api/auth/login` — Login and receive JWT
- `GET /api/auth/me` — Get current user
- `GET /api/users/:id` — Get a user profile
- `PUT /api/users/profile` — Edit current profile
- `PUT /api/users/:id/follow` — Follow/unfollow user
- `GET /api/posts/feed` — Get feed for logged-in user
- `GET /api/posts/user/:userId` — Get a user's posts
- `POST /api/posts` — Create a post
- `PUT /api/posts/:id/like` — Like/unlike a post
- `DELETE /api/posts/:id` — Delete a post
- `POST /api/comments` — Add a comment to a post

## Notes

This project is structured to be easy to extend, demo, and present for internship evaluation. It follows a clean separation between backend and frontend while keeping the app functional and production-friendly.
