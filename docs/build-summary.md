# Build Summary

## What was built

### Frontend (React + Vite, port 3000)
- **Home page** — ItsKDBB brand hero (bio, CTA buttons), "About" section with profile placeholder, "Latest from the feed" pulling live post data with resolved author names
- **Links page** — Branded links hub ("Find me everywhere") with featured OnlyFans card and platform links (Instagram, TikTok, Snapchat, X, Bookings)
- **Portfolio page** — 6-item responsive grid with image placeholders, category badges (Editorial, Lifestyle, Brand Work), and campaign titles/descriptions
- **Posts & Users page** — Users list with avatar placeholders and handles; posts list with author name/handle resolved from API data
- Persistent hero header in `App.tsx` with tab navigation

### Backend API (Express 5, port 3001)
- `GET /api/health` — returns `{ ok, appName, timestamp }`
- `GET /api/users` — returns all users
- `GET /api/users/:id` — returns single user or 404
- `POST /api/users` — validates `name`, `handle`, `bio`; returns 201 or 400
- `GET /api/posts` — returns all posts
- `GET /api/posts/:id` — returns single post or 404
- `POST /api/posts` — validates `title`, `body`, `authorId`; returns 201 or 400
- In-memory seed data: 5 users, 5 posts with valid authorId cross-references

### API response shapes
```
User:   { id: number, name: string, handle: string, bio: string }
Post:   { id: number, title: string, body: string, authorId: number }
Health: { ok: boolean, appName: string, timestamp: string }
```

### Tests
- **20 unit tests** (Vitest) — data shape validation, unique ID checks, authorId referential integrity, POST body validation logic
- **6 E2E tests** (Playwright) — page load, hero visibility, tab navigation, links hub, portfolio grid, API data rendering
- See `tests/report.md` for full results

### Infrastructure
- Docker Compose (`compose.yaml`) with two services: `web` (port 3000), `api` (port 3001)
- Vite dev server proxies `/api/*` → `http://api:3001` (used in Docker; local dev bypasses proxy and hits port 3001 directly)
- Vitest configured to exclude `tests/integration/` (Playwright tests run separately)

## Key decisions
- TypeScript across the full stack with split `tsconfig.app.json` (browser) and `tsconfig.node.json` (Node/API)
- In-memory data only — no database in v1
- No authentication in v1
- Tab-based navigation in App.tsx (no router library) to keep the dependency surface minimal
- Vite proxy target uses Docker service name `api` — local non-Docker dev connects directly to `localhost:3001`

## How to run

### Local (no Docker)
```bash
npm install
npm run dev        # starts both frontend (3000) and backend (3001) concurrently
```

### Docker Compose
```bash
docker compose up --build
```

### Tests
```bash
npm test            # unit tests (no server required)
npm run test:e2e    # Playwright E2E (requires dev server running)
```

## Visual direction
- Color palette: soft pink/purple (`#fff8fc` background, `#b73a76` accent, `#111827` dark CTA)
- Typography: Inter, system-ui fallback
- Card-based layout with 24px border-radius and subtle box-shadows
- Portfolio grid: `auto-fill` with 280px minimum column width
- Links hub: full-width cards, featured OnlyFans card uses dark gradient treatment
- Mobile-responsive breakpoints at 600px and 800px
