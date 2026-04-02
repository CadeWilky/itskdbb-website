# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Install dependencies
npm install

# Run full stack locally (frontend + backend concurrently)
npm run dev

# Run frontend only (Vite, port 3000)
npm run dev:web

# Run backend only (Express, port 3001)
npm run dev:api

# Build for production
npm run build

# Run unit tests (Vitest)
npm test

# Run unit tests in watch mode
npm run test:watch

# Run E2E tests (Playwright)
npm run test:e2e

# Run with Docker
docker compose up --build
```

## Architecture

This is a full-stack TypeScript portfolio site with a split tsconfig setup:
- `tsconfig.app.json` — frontend/browser code (`src/` excluding `src/api/`)
- `tsconfig.node.json` — backend and tooling (`src/api/`, `tests/`, `vite.config.ts`)

**Frontend** (React 19 + Vite, port 3000): `src/`
- `main.tsx` → `components/App.tsx` — tab-based single-page router (no router library)
- `components/pages/` — one file per tab: Home, Links, Portfolio, Posts
- `lib/api.ts` — shared TypeScript types (`User`, `Post`, `ApiStatus`) and fetch helpers

**Backend** (Express 5, port 3001): `src/api/`
- `server.ts` — entry point, CORS enabled, mounts route files
- `data.ts` — in-memory data store (no database)
- `routes/users.ts` and `routes/posts.ts` — REST endpoints under `/api/`

**Proxy**: Vite dev server proxies `/api/*` → `http://api:3001` (the Docker service name). For local non-Docker dev this fails gracefully — run `dev:api` alongside `dev:web`.

**Docker**: Two services (`web`, `api`) defined in `compose.yaml`, both using hot-reload dev commands so volume mounts reflect live changes.

**Tests**: Vitest for unit tests (`tests/unit/`), Playwright for E2E (`tests/integration/`). Unit tests import directly from `src/api/data.ts` — no HTTP layer mocked.
