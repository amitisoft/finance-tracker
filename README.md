# Personal Finance Tracker

Deployment-ready full stack app for personal finance management.

## Stack
- Frontend: React + TypeScript + Vite
- Backend: ASP.NET Core Web API (`net10.0`)
- Database: PostgreSQL 16
- Auth: JWT + refresh tokens
- ORM: EF Core + Npgsql

## Deployment-First Run (Podman/Docker)
From repo root:
```bash
podman compose -f compose.yml up --build
```

Default ports:
- Frontend: `http://localhost:4173`
- Backend API: `http://localhost:5213`
- PostgreSQL: `localhost:5432`

## Local Dev Run (without containers)
1. Backend
```bash
dotnet restore backend/FinanceTracker.slnx --configfile NuGet.Config
dotnet run --project backend/src/FinanceTracker.Api/FinanceTracker.Api.csproj
```
2. Frontend
```bash
cd frontend
npm install
npm run dev
```

Dev ports:
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5213`

## Fresh User Login Flow (important)
1. Open app and **Register** a new user.
2. Login with the same credentials.
3. Default categories are auto-created for that user.
4. Create at least one account.
5. Start adding transactions/budgets/goals/recurring items.

## Notes
- API migrations run automatically on startup by default.
- If using a clean database, first app start may take a few seconds.
- SQL utility scripts are in `backend/scripts/`.

## Module Docs
- Frontend: `frontend/README.md`
- Backend: `backend/README.md`
