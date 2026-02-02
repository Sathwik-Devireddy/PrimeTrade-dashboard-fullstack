# TaskInter Backend

Minimal Express + MongoDB backend for the assignment.

Setup

1. Copy `.env.example` to `.env` and set `MONGO_URI` and `JWT_SECRET`.
2. Install dependencies: `npm install` in the `backend` folder.
3. Run dev server: `npm run dev`.

APIs (prefix `/api/v1`)

- `POST /api/v1/auth/signup` - signup
- `POST /api/v1/auth/login` - login
- `GET/PUT /api/v1/me` - profile
- `GET/POST /api/v1/tasks` - list/create
- `GET/PUT/DELETE /api/v1/tasks/:id` - single operations
