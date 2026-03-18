# Backend

ASP.NET Core Web API for auth, finance modules, and reporting.

## Tech and Packages
- .NET `net10.0`
- ASP.NET Core Web API
- EF Core 9 + Npgsql (PostgreSQL)
- JWT auth + refresh tokens
- BCrypt password hashing
- Serilog (console logging)
- Swagger/OpenAPI

## Features
- Auth: register/login/refresh/me/profile/password flows
- Accounts, categories, transactions
- Budgets, goals, recurring transactions
- Dashboard summary and reports
- CSV export
- Auto migration on startup (`RunMigrationsOnStartup=true`)
- Default category seeding per user

## Run
```bash
dotnet restore backend/FinanceTracker.slnx --configfile NuGet.Config
dotnet run --project backend/src/FinanceTracker.Api/FinanceTracker.Api.csproj
```

API URL: `http://localhost:5213`  
Swagger (Development): `http://localhost:5213/swagger`

## Config (important)
Required in production:
- `ConnectionStrings__Postgres`
- `Jwt__Issuer`
- `Jwt__Audience`
- `Jwt__Key`

Common optional:
- `RunMigrationsOnStartup` (default `true`)
- `EnableSwagger` (default `false`)
- `UseHttpsRedirection`
- `Cors__AllowedOrigins__0`, `Cors__AllowedOrigins__1`

## Scripts
`backend/scripts/`:
- `reset-db.sql` (truncate user data tables)
- `cleanup-user-data.sql` (cleanup single user data)
- `seed-user-realistic-data.sql` (validation/demo data)
