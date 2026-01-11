# Gallery App (MERN Stack)

## Project Overview
This is a MERN stack application with:
- User Authentication
- Forgot Password (basic testing flow)
- Photo Gallery Logic
- File Upload feature

## Tech Stack
- Frontend: React.js
- Backend: Node.js, Express.js
- Database: MongoDB
- File Upload: Multer
- Password Security: bcrypt

## Project Structure
project-root/
│
├── client/ # React frontend
├── server/ # Node + Express backend
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── uploads/ # File uploads (gitignored) // you can create manually uploads folder
│ └── index.js
│
├── .gitignore
└── README.md

## Install dependencies
```bash
cd server
npm install
similar to frontend

## MongoDB Configuration
PORT=3000
MONGO_URI=your_mongodb_connection_string

## Run Backend Server
node server.js

## Run Frontend Server
npm run dev
