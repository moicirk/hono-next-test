# Job Board

A full-stack job board application built with Next.js and Hono in a Turborepo monorepo.

## Stack

- **Frontend** — Next.js 16 (App Router), Tailwind CSS v4, shadcn/ui
- **Backend** — Hono.js on Node.js, Drizzle ORM, SQLite

## Project structure

```
apps/
  api/   — Hono REST API (port 8000)
  web/   — Next.js frontend (port 3000)
```

---

## Local development

### Prerequisites

- Node.js 22+
- npm

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

```bash
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env
```

| File | Variable | Default |
|---|---|---|
| `apps/api/.env` | `WEB_BASE_URL` | `http://localhost:3000` |
| `apps/web/.env` | `NEXT_PUBLIC_API_BASE_URL` | `http://localhost:8000` |

### 3. Set up the database

```bash
cd apps/api

# Run migrations
npm run db:migrate

# Seed with sample data
npm run db:seed
```

### 4. Start development servers

From the repo root (runs both apps in parallel via Turborepo):

```bash
npm run dev
```

Or start individually:

```bash
# Terminal 1 — API
cd apps/api && npm run dev

# Terminal 2 — Web
cd apps/web && npm run dev
```

The API will be available at `http://localhost:8000` and the frontend at `http://localhost:3000`.

---

## Docker

### Build and run all services

```bash
# Create the shared network (once)
docker network create app_network

# Build and start
docker compose -f docker-compose.yaml -f docker-compose.override.yaml up --build
```

### Run in the background

```bash
docker compose -f docker-compose.yaml -f docker-compose.override.yaml up --build -d
```

### Stop

```bash
docker compose down
```

---

## Other commands

```bash
# Lint (from repo root)
npm run lint

# Format
npm run format

# Tests
cd apps/web && npm run test
```

---

## API reference

| Method | Path | Description |
|---|---|---|
| GET | `/api/companies` | List all companies |
| POST | `/api/companies` | Create a company |
| PATCH | `/api/companies/:id` | Rename a company |
| DELETE | `/api/companies/:id` | Delete a company |
| GET | `/api/companies/:companyId/jobs` | List jobs for a company |
| POST | `/api/companies/:companyId/jobs` | Create a job |
| PATCH | `/api/companies/:companyId/jobs/:id` | Update a job |
| GET | `/api/jobs/:jobId/applications` | List applications for a job |
| POST | `/api/jobs/:jobId/applications` | Submit an application |
| PATCH | `/api/jobs/:jobId/applications/:id` | Update application status |
| GET | `/api/clients` | List all clients |
