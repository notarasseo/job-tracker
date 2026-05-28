# JobTracker - Portfolio Project Notes

## Project Summary
A full-stack Job Application Tracker built as a portfolio project for a mid-level software developer role.

## Tech Stack
- **Frontend**: React (Vite) + Ant Design + React Router
- **Backend**: Node.js + Express
- **Database**: MongoDB Atlas (free tier)
- **Hosting**: Render (both frontend and backend)

## Live URLs
- **Frontend**: https://job-tracker-frontend-g6dm.onrender.com
- **Backend**: https://job-tracker-api-v3sp.onrender.com

## GitHub
- **Repo**: https://github.com/notarasseo/job-tracker

## Features
- User registration and login (JWT auth)
- Add, edit, delete job applications
- Track status: Applied, Interview, Offer, Rejected, Withdrawn
- Search and filter applications
- Dashboard with stats (total, interviews, offers, rejections)
- Success rate calculation
- Follow-up date tracking with overdue highlighting
- Responsive layout with collapsible sidebar

## Project Structure
```
job-tracker/
├── backend/
│   ├── src/
│   │   ├── models/       # User.js, Job.js
│   │   ├── routes/       # auth.js, jobs.js
│   │   ├── middleware/   # auth.js (JWT)
│   │   └── server.js
│   ├── .env              # local only, not committed
│   └── package.json
└── frontend/
    ├── src/
    │   ├── pages/        # LoginPage, RegisterPage, DashboardPage, JobsPage
    │   ├── components/   # AppLayout, JobForm
    │   ├── context/      # AuthContext
    │   ├── services/     # api.js (axios)
    │   └── App.jsx
    └── package.json
```

## Environment Variables

### Backend (.env)
```
PORT=5000
MONGO_URI=mongodb+srv://admin:<password>@job-tracker.g65uauh.mongodb.net/job-tracker
JWT_SECRET=jobtracker_super_secret_key_2024
JWT_EXPIRES_IN=7d
```

### Frontend (.env)
```
VITE_API_URL=https://job-tracker-api-v3sp.onrender.com
```

## Running Locally
```bash
# Backend
cd backend
npm install
cp .env.example .env  # fill in values
npm run dev           # runs on port 5000

# Frontend
cd frontend
npm install
npm run dev           # runs on port 5173
```

## Deployment Notes
- Backend deployed as a **Web Service** on Render
- Frontend deployed as a **Static Site** on Render
- `frontend/public/_redirects` handles React Router on Render
- Render free tier backend spins down after inactivity (~30s cold start)
- VITE_API_URL must be set before build time (Vite bakes it in at build)

## Git Credentials
- GitHub username: notarasseo
- Email: delarosaernz@gmail.com
